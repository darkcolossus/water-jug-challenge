# water-jug-challenge
Water Jug Riddle Solution

## Description of Framework used

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker-compose
In case you want to run the app using Docker:

```bash
# build docker-compose
docker-compose up --build

This will build two services: 
 - the app itself running on port 3000 
 - redis client for cache operations running on port 6379.
```

## How to request the endpoints
There is a Postman collection inside the project so users can use it.

Examples of usage:

1) No solution puzzle:

```bash

/POST
http://localhost:3000/solve

Body:
{
    "x_capacity": 50000,
    "y_capacity": 100000,
    "z_amount_wanted": 20000
}

Response:
 {
    "solution": [
        {
            "step": 0,
            "bucketX": 0,
            "bucketY": 0,
            "action": "",
            "status": "No solution!"
        }
    ]
}
```

2) Solution puzzle
```bash

/POST
http://localhost:3000/solve

Body:
{
    "x_capacity": 2,
    "y_capacity": 10,
    "z_amount_wanted": 4
}

Response:
 {
    "solution": [
        {
            "step": 0,
            "bucketX": 0,
            "bucketY": 0,
            "action": "Start",
            "status": ""
        },
        {
            "step": 1,
            "bucketX": 2,
            "bucketY": 0,
            "action": "Fill bucket x",
            "status": ""
        },
        {
            "step": 2,
            "bucketX": 0,
            "bucketY": 2,
            "action": "Transfer from bucket x to bucket y",
            "status": ""
        },
        {
            "step": 3,
            "bucketX": 2,
            "bucketY": 2,
            "action": "Fill bucket x",
            "status": ""
        },
        {
            "step": 4,
            "bucketX": 0,
            "bucketY": 4,
            "action": "Transfer from bucket x to bucket y",
            "status": "Solved"
        }
    ]
}
```

## Swagger
You can access to the description of the API by bitting:

```bash
    http://localhost/3000/api
```

## Algorithms
Water Jug Service implements a solve method which receives:
 - payload
 - method: 'bfs' | 'dfs' | 'aStar'|

1) BFS - this algorithm uses:
    - a queue data structure in order to push all steps nodes when finding the solution.
    - a set of visited nodes to avoid analyzing nodes that were previously visited in the aim of searching the solution node.

2) DFS - this algorithm uses:
    - a stack data structure in order to push all steps Nodes when finding the solution.
    - a set of visited nodes to avoid analyzing nodes that were previously visited in the aim of searching the solution node.

3) ASTAR - this algortihm uses:
    - a priority queue based on an heuristic function
    - each Node in the priority queue contains:
        a) param g = cost value from start to current node. For simplicity, it considers any possible movement/action from node to node with a cost of 1.
        b) param h = cost value from current node to the goal.
        c) param f = f + g which is the total cost of the node.
    - heuristic function: this function returns Min( |z_amount_wanted - currentNode.state.bucketX|, |z_amount_wanted - currentNode.state.bucketY|).

The algorithm used can be configure in .env file by using variable:

```bash
SOLVE_METHOD=
```

where possible values here are: 
    aStar, bfs or dfs (aStar is set by default)