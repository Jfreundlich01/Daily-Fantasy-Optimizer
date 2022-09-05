////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const mongoose = require("./connections.js"); //same value as if left here but now passing through new file

const { Schema, model } = mongoose;
// make players schema
const playerSchema = new Schema({
  Name: String,
  Team: String,
  Position: String,
  Week: Number,
  Opponent: String,
  Salary: Number,
  ProjPts: Number,
  FantasyDataProj: Number,
  BuildAround: Boolean
});

// make Player model
const Players = model("Players", playerSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Players;