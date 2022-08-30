import pandas as pd
from pulp import *
import re

players = pd.read_csv(r"/Users/jordan/Desktop/J-G/seed.csv", usecols=['Name','Position','Salary','ProjPts'])

availables = players.groupby(["Position", "Name", "ProjPts", "Salary"]).agg('count')
availables = availables.reset_index()

salaries = {}
points = {}

for pos in availables.Position.unique():
    available_pos = availables[availables.Position == pos]
    salary = list(available_pos[['Name','Salary']].set_index('Name').to_dict().values())[0]
    point = list(available_pos[['Name','ProjPts']].set_index('Name').to_dict().values())[0]

    salaries[pos] = salary
    points[pos] = point

print(salaries)
print(points)

# RB in flex
pos_num_available = {
    "QB": 1,
    "RB": 3,
    "WR": 3,
    "TE": 1,
    "DST":1
}


