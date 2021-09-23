module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    client.user.setActivity("for your commands", { type: "WATCHING" });
    console.log(`Ready, logged in as ${client.user.tag}.`);
  }
};