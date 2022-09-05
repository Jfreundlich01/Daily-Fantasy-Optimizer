////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////
// pull schema and model from mongoose
const mongoose = require("./connections.js"); //same value as if left here but now passing through new file

const { Schema, model } = mongoose;
// make players schema
const lineupSchema = new Schema({
  QB: String,
  RB: Array,
  WR: Array,
  TE: String,
  DEF: String
});

// make Player model
const Lineup = model("Lineup", lineupSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Lineup;