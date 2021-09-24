const fs = require("fs");
const tmp = require("tmp");
const https = require("https");
const color = require("colorthief");

const { SlashCommandBuilder } = require("@discordjs/builders");

const { Role } = require("../db");
const { sleep } = require("../util");

const fetchColorFromAvatar = (user) => {
  const fileTemp = tmp.fileSync();
  const fileObject = fs.createWriteStream(fileTemp.name);

  return new Promise((resolve, reject) => {
    https.get(user.avatarURL({ format: "png", size: 64 }), (res) => {
      res.pipe(fileObject);
  
      res.on("end", async () => {
        fileObject.close();
  
        // Wait a bit for the file to finish writing.
        await sleep(25);
  
        // Rename to avoid issues with reading in PNG files...
        const newName = fileTemp.name + ".png";

        fs.renameSync(fileTemp.name, newName);
  
        color.getColor(newName)
          .then(resolve)
          .catch(reject);
      });
    });
  });
};

const handleAvatar = async (interaction, color) => {
  const {
    user,
    member,
    guild
  } = interaction;

  let roleEntry = await Role.findOne({
    user: user.id,
    guild: guild.id
  });

  const roleGuild = roleEntry ? guild.roles.cache.get(roleEntry.id) : false;

  // Make a new role if it isn't in the database.
  if (!roleEntry) {
    roleEntry = new Role({
      user: user.id,
      guild: guild.id,
      color: color
    });
  }

  try {
    if (roleGuild) {
      // If the role already exists in the guild, edit its color.
      roleGuild.edit({ color: color });
    } else {
      // Otherwise, make a new role and assign it to the user.
      const newRole = await guild.roles.create({
        name: user.username,
        color: color,
        reason: "Custom color role."
      });

      roleEntry.id = newRole.id;
      member.roles.add(newRole);
    }

    await interaction.reply({
      content: "Updated your color successfully.",
      ephemeral: true
    });
  } catch (error) {
    console.error(error);

    await interaction.reply({
      content: "Failed to update your color.",
      ephemeral: true
    });

    // Exit early so as to not insert a new database entry.
    return;
  }

  roleEntry.color = color;

  // Upsert the final role entry.
  await Role.updateOne({ guild: guild.id, user: user.id }, roleEntry, { upsert: true });
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("color")
    .setDescription("Anything to do with colors.")
    .addSubcommand(subcommand =>
      subcommand
        .setName("avatar")
        .setDescription("Update your role color to the color of your avatar.")
    ),
  async execute(interaction) {
    switch (interaction.options.getSubcommand()) {
    case "avatar":
      fetchColorFromAvatar(interaction.user)
        .then(async color => await handleAvatar(interaction, color));
      break;
    default:
      break;
    }
  }
};