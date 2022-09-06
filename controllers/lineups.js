////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Players = require("../models/players.js");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

router.get("/:numOfLineups", (req, res) => {
  const numOfLineups = req.params.numOfLineups
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
      const locks = []
      const avoids = []
      for (const player of players) {
        if(locks.includes(player.Name)){
            constraints[player.Name]= {max:1, min:1}
        } else if(avoids.includes(player.Name)) {
            constraints[player.Name]= {max:0}
        } else {
            constraints[player.Name] = { max: 1 };
        }
        variables[player.Name + " " + player.Team + " " + player.FantasyDataProj + " " + player.Position] = {};
        variables[player.Name + " " + player.Team + " " + player.FantasyDataProj + " " + player.Position][player.Name] = 1;
        variables[player.Name + " " + player.Team + " " + player.FantasyDataProj + " " + player.Position].projpts = player.FantasyDataProj;
        variables[player.Name + " " + player.Team + " " + player.FantasyDataProj + " " + player.Position].proj = player.FantasyDataProj;
        variables[player.Name + " " + player.Team + " " + player.FantasyDataProj + " " + player.Position].cost = player.Salary;
        variables[player.Name + " " + player.Team + " " + player.FantasyDataProj + " " + player.Position][player.Position] = 1;
        ints[player.Name + " " + player.Team + " " + player.FantasyDataProj + " " + player.Position] = 1;
      }

      //D.J Moore, James Connor, Jamar Chase, Joe Flacco 

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
      
      for(let i = 0; i < numOfLineups ; i++){
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
            QB: {
              name: "",
              team: "",
              fpts: 0
            },
            RBS: [],
            WRS: [],
            TE: {
              name: "",
              team: "",
              fpts: 0
            },
            DST: {
              name: "",
              team: "",
              fpts: 0
            }
        }

        function getObjKey(obj, value) {
            return Object.keys(obj).filter(key => obj[key] === value)
        }
        
        const arr = getObjKey(results,1)
        for (const item of arr){
            itemarr = item.split(' ')
            if(itemarr.includes("QB")){
              string = itemarr.slice(0, -3).join(' ');
              lineup.QB.name = string
              lineup.QB.team = itemarr[itemarr.length - 3]
              lineup.QB.fpts = itemarr[itemarr.length - 2]
            } else if(itemarr.includes("WR")){
                let wr = {
                  name: "",
                  team: "",
                  fpts: 0
                }
                string = itemarr.slice(0, -3).join(' ');
                wr.name = string
                wr.team = itemarr[itemarr.length - 3]
                wr.fpts = itemarr[itemarr.length - 2]
                lineup.WRS.push(wr)
            } else if(itemarr.includes("RB")){
              let rb = {
                name: "",
                team: "",
                fpts: 0
              }
              string = itemarr.slice(0, -3).join(' ');
              rb.name = string
              rb.team = itemarr[itemarr.length - 3]
              rb.fpts = itemarr[itemarr.length - 2]
              lineup.RBS.push(rb)
            }  else if(itemarr.includes("TE")){
              string = itemarr.slice(0, -3).join(' ');
              lineup.TE.name = string
              lineup.TE.team = itemarr[itemarr.length - 3]
              lineup.TE.fpts = itemarr[itemarr.length - 2]
            } else if(itemarr.includes("DST")){
              string = itemarr.slice(0, -3).join(' ');
              lineup.DST.name = string
              lineup.DST.team = itemarr[itemarr.length - 3]
              lineup.DST.fpts = itemarr[itemarr.length - 2]
            }
            id = id + 1

        }
        lineups.push(lineup)
      }
      res.render("players/show.liquid", {lineups});
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
