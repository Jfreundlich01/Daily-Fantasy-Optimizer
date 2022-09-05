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
    .then((players) => {
      console.log(players);
      const lineups = []
      let constraints = {
        "cost": {"max": 50000 },
        // "proj": {"max": 154},
        "QB": { max: 1, min: 1 },
        "RB": { max: 3, min: 3 },
        "WR": { max: 3, min: 3 },
        "TE": { max: 1, min: 1 },
        "DST": { max: 1, min: 1 },
      };
      let variables = {};
      let ints = {};
      for (const player of players) {
        if(player.Name === "Davante Adams"){
            constraints[player.Name]= {max:1, min:1}
        } else {
            constraints[player.Name] = { max: 1 };
        }
        variables[player.Name + " " + player.Position] = {};
        variables[player.Name + " " + player.Position][player.Name] = 1;
        variables[player.Name + " " + player.Position].projpts = player.ProjPts;
        variables[player.Name + " " + player.Position].proj = player.ProjPts;
        variables[player.Name + " " + player.Position].cost = player.Salary;
        variables[player.Name + " " + player.Position][player.Position] = 1;
        ints[player.Name + " " + player.Position] = 1;
      }

      let solver = require("javascript-lp-solver"),
        results,
        model = {
          "optimize": "projpts",
          "opType": "max",
          "constraints": constraints,
          "variables": variables,
          "ints": ints,
        };
      results = solver.Solve(model);
      let projmax = results.result
      
      for(let i = 0; i < 25 ; i++){
        constraints.proj = {"max" : projmax - .001}
        let solver = require("javascript-lp-solver"),
        results,
        model = {
          "optimize": "projpts",
          "opType": "max",
          "constraints": constraints,
          "variables": variables,
          "ints": ints,
        };
        results = solver.Solve(model);
        console.log(results)
        projmax = results.result
        let id = 0
        let lineup = {
            id : id,
            projpts: results.result,
            QB: "",
            RBS: [],
            WRS: [],
            TE: "",
            DST: ""
        }

        function getObjKey(obj, value) {
            return Object.keys(obj).filter(key => obj[key] === value)
        }
        
        const arr = getObjKey(results,1)
        for (const item of arr){
            itemarr = item.split(' ')
            if(itemarr.includes("QB")){
                itemarr.pop()
                string = itemarr.join(" ")
                lineup.QB = string
            } else if(itemarr.includes("WR")){
                itemarr.pop()
                string = itemarr.join(" ")
                lineup.WRS.push(string)
            } else if(itemarr.includes("RB")){
                itemarr.pop()
                string = itemarr.join(" ")
                lineup.RBS.push(string)
            }  else if(itemarr.includes("TE")){
                itemarr.pop()
                string = itemarr.join(" ")
                lineup.TE = string
            } else if(itemarr.includes("DST")){
                itemarr.pop()
                string = itemarr.join(" ")
                lineup.DST = string
            }
            id = id + 1

        }
        lineups.push(lineup)
      }
      

      res.send(lineups);
    })
    .catch((error) => {
      console.log(error);
      console.log("this is an error");
      res.json(error);
    });
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router; //router contains all info in here
