////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Players = require("../models/players.js");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

router.get("/", (req,res) => {
    Players.find()
    .then((players)=>{
        console.log(players)
        let constraints = {
            cost: {"max":50000},
            "QB": {"max":1,"min":1},
            "RB": {"max":3,"min":3},
            "WR": {"max":3,"min":3},
            "TE": {"max":1,"min":1},
            "DEF": {"max":1, "min":1},
        }
        let variables = {}
        for(const player of players){
            constraints[player.Name] = {"max":1}
            variables[player.Name + " " + player.Position] = {
            }
            variables[player.Name + " " + player.Position][player.Name] = 1
            variables[player.Name + " " + player.Position].projpts = player.ProjPts
            variables[player.Name + " " + player.Position].cost = player.Salary
            variables[player.Name + " " + player.Position][player.Position] = 1
        }

        res.send(variables)
    })
    .catch((error) =>{
        console.log(error)
        console.log('this is an error')
        res.json(error)
    })
})


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router; //router contains all info in here
