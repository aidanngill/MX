const { Collection } = require("discord.js");

const files = require("./files");
const client = require("./client");
const { token } = require("../config.json");

client.commands = new Collection();

for (const file of files.commands) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

for (const file of files.events) {
  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(event.name, async (...args) => await event.execute(...args));
  } else {
    client.on(event.name, async (...args) => await event.execute(...args));
  }
}

client.login(token);