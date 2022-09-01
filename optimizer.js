let solver = require("javascript-lp-solver"),
  results,
  model = {
    "optimize": "projpts",
    "opType": "max",
    "constraints": {
        cost: {"max": 21500},
        "QB" : {"max": 1,"min":1},
        "WR" : {"max": 3,"min":3},
        "RB" : {"max": 3,"min":3},
        "TE" : {"max": 1,"min":1},
        "DST" : {"max": 1,"min":1},
        "Joe Flacco" : {"max": 1},
        "Jameis Winston" : {"max": 1},
        "Daniel Jones" : {"max": 1},
        "Davante Adams" : {"max": 1},
        "Deonte Harty" : {"max": 1},
        "Michael Pittman Jr." : {"max": 1},
        "Brandin Cooks" : {"max": 1},
    },
    "variables": {
        "Joe Flacco QB": {
            "Joe Flacco": 1,
            "projpts": 34.05,
            cost: 4800,
            "QB" : 1
        },
        "Jameis Winston QB": {
            "Jameis Winston": 1,
            "projpts": 26.8,
            cost: 5300,
            "QB" : 1
        },
        "Daniel Jones QB": {
            "Daniel Jones": 1,
            "projpts": 34,
            cost: 5000,
            "QB" : 1
        },
        "Davante Adams WR": {
            "Davante Adams": 1,
            "projpts": 18.56,
            cost: 8100,
            "WR" : 1
        },
        "Deonte Harty WR": {
            "Deonte Harty": 1,
            "projpts": 6.83,
            cost: 3000,
            "WR" : 1
        },
        "Michael Pittman Jr. WR": {
            "Michael Pittman Jr.": 1,
            "projpts": 11.08,
            cost: 5500,
            "WR" : 1
        },
        "Brandin Cooks WR": {
            "Brandin Cooks": 1,
            "projpts": 11.24,
            cost: 6300,
            "WR" : 1
        },
        
    },
    "ints": {
         "Joe Flacco QB": 1,
         "Jameis Winston QB": 1,
         "Daniel Jones QB": 1,
         "Davante Adams WR": 1,
         "Michael Pittman WR": 1,
         "Deonte Harty WR": 1,
         "Brandin Cooks WR": 1,
    }
}
results = solver.Solve(model);

// console.log(results);

function getObjKey(obj, value) {
    return Object.keys(obj).filter(key => obj[key] === value)
}

const arr = getObjKey(results,1)

team = {
    fptsprpj : results.result,
    QB:"",
    WRs: [],
    Rbs:[],
    TE: "",
    DST: ""
}

for (const item of arr){
    itemarr = item.split(' ')
    if(itemarr.includes("QB")){
        itemarr.pop()
        string = itemarr.join(" ")
        team.QB = string
    } else if(itemarr.includes("WR")){
        itemarr.pop()
        string = itemarr.join(" ")
        team.WRs.push(string)
    }
}

console.log(team)
