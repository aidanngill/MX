const fs = require("fs");
const path = require("path");

module.exports = {
  commands: fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js")),
  events: fs.readdirSync(path.join(__dirname, "events")).filter(file => file.endsWith(".js"))
};