const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mx");

const Role = mongoose.model("Role", {
  id: String,
  user: String,
  guild: String,
  color: [
    Number,
    Number,
    Number
  ]
});

module.exports = {
  Role
};