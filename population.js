let population = {};
let lastPopulation = {};
let allNeighborsCell = [];
const history = [];

function toogleLife(x, y) {
    const fieldName = getName(x, y);
    if (population[fieldName]) {
        delete population[fieldName];
    } else {
        population[fieldName] = true;
    }
}

function changeLife(x, y, isAddLife) {
    if (isAddLife) {
        population[getName(x, y)] = true;
    } else {
        delete population[getName(x, y)];
    }
}

function isAlive(x, y) {
    return !!population[getName(x, y)];
}

function getNeighbors(x, y) {
    return NEIGHBORS.map(([diffX, diffY]) => getName(x - diffX, y - diffY)); //todo это можно сделать сразу за один проход массива???
}

function checkNeighbors(fieldName, neighbors) {
    const [x, y] = fieldName.split(":");
    let countLife = 0;
    neighbors.forEach((fieldName) => {
        if (lastPopulation[fieldName]) {
            countLife += 1;
        }
    });
    if (countLife === 3) {
        population[getName(x, y)] = true;
    } else {
        isAlive(x, y) && countLife !== 2 && delete population[getName(x, y)];
    }
}

function getPopulateRandom () {
    const newPopulation = {}
    for (let x = 0; x < COUNT_ROW; x++) {
        for (let y =0; y< COUNT_CELL; y++) {
            if(Math.random() < .3) {
                newPopulation[getName(x,y)] = true
            }
        }
    }
    return newPopulation
}