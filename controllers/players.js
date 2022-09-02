////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Players = require("../models/players.js");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

router.get("/", (req, res) => {
    Players.find()
    .then((players) =>{
        console.log(players)
        res.json(players)
    })
    .catch((error) =>{
        console.log(error)
        res.json({error})
    })
  });

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router; //router contains all info in here
