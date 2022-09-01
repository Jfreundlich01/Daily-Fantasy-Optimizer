let solver = require("javascript-lp-solver"),
  results,
  model = {
    "optimize": "projpts",
    "opType": "max",
    "constraints": {
        cost: {"max": 23000},
        "QB" : {"max": 1,"min":1},
        "WR" : {"max": 3,"min":3},
        "Joe Flacco" : {"max": 1},
        "Jameis Winston" : {"max": 1},
        "Daniel Jones" : {"max": 1},
        "Davante Adams" : {"max": 1},
        "Deonte Harty" : {"max": 1},
        "Michael Pittman Jr." : {"max": 1},
        "Brandin Cooks" : {"max": 1},
    },
    "variables": {
        "Joe Flacco": {
            "Joe Flacco": 1,
            "projpts": 34.05,
            cost: 4800,
            "QB" : 1
        },
        "Jameis Winston": {
            "Jameis Winston": 1,
            "projpts": 26.8,
            cost: 5300,
            "QB" : 1
        },
        "Daniel Jones": {
            "Daniel Jones": 1,
            "projpts": 34,
            cost: 5000,
            "QB" : 1
        },
        "Davante Adams": {
            "Davante Adams": 1,
            "projpts": 18.56,
            cost: 8100,
            "WR" : 1
        },
        "Deonte Harty": {
            "Deonte Harty": 1,
            "projpts": 6.83,
            cost: 3000,
            "WR" : 1
        },
        "Michael Pittman Jr.": {
            "Michael Pittman Jr.": 1,
            "projpts": 11.08,
            cost: 5500,
            "WR" : 1
        },
        "Brandin Cooks": {
            "Brandin Cooks": 1,
            "projpts": 11.24,
            cost: 6300,
            "WR" : 1
        },
        
    },
    "ints": {
        "Joe Flacco": 1,
         "Jameis Winston": 1,
         "Daniel Jones": 1,
         "Davante Adams": 1,
         "Michael Pittman": 1,
         "Deonte Harty": 1,
         "Brandin Cooks": 1,
    }
}
results = solver.Solve(model);
console.log(results);