const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const files = require("./files");
const { token, clientId } = require("../config.json");

const commands = [];

for (const file of files.commands) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
  .then(() => console.log("Successfully deployed all commands."))
  .catch(console.error);
