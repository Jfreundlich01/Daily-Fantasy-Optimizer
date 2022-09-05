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
        res.render("players/index.liquid", {players})
    })
    .catch((error) =>{
        console.log(error)
        res.json({error})
    })
  });

router.put("/", (req, res) =>{
    console.log(req.body)
    // for (let i = 0; i<req.body.buildAround.length; i++) {
    //     Players.findOneAndUpdate({Name:req.body.buildAround[i]},{$set:{BuildAround : "true"}})
    // }
    // for (let i = 0; i<req.body.avoid.length; i++) {
    //     Players.findOneAndUpdate({Name:req.body.avoid[i]},{$set:{Avoid : "true"}})
    // }
    res.redirect(`lineups/${req.body.numOfLineups}`)
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router; //router contains all info in here
