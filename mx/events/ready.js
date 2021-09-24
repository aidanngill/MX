module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    client.user.setStatus("dnd");
    client.user.setActivity({
      name: "for your commands",
      type: "WATCHING"
    });

    console.log(`Ready, logged in as ${client.user.tag}.`);
  }
};