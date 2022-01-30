let population = {};
let lastPopulation = {};
let checked = {};
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

function isAlive(x, y) {
    return !!population[getName(x, y)];
}

function getNeighbors(x, y) {
    return NEIGHBORS.map(([diffX, diffY]) => getName(x - diffX, y - diffY));
}

function checkNeighbors(isAddNeighbors) {
    return function (fieldName) {
        const [x, y] = fieldName.split(":");
        if (
            x < 0 ||
            x > countCell ||
            y < 0 ||
            y > countRow ||
            checked[fieldName]
        )
            return;

        let countLife = 0;
        const neighbors = getNeighbors(x, y);

        neighbors.forEach((fieldName) => {
            if (lastPopulation[fieldName]) {
                countLife += 1;
            }
        });

        if (countLife === 3) {
            population[getName(x, y)] = true;
        } else {
            isAlive(x, y) &&
                countLife !== 2 &&
                delete population[getName(x, y)];
        }

        if (isAddNeighbors) {
            allNeighborsCell = [...allNeighborsCell, ...neighbors.filter((fieldName) => !lastPopulation[fieldName])];
        }
        
        checked[fieldName] = true;
    };
}

function getPopulateRandom() {
    const newPopulation = {};
    for (let x = 0; x < countCell; x++) {
        for (let y = 0; y < countRow; y++) {
            if (Math.random() < 0.2) {
                newPopulation[getName(x, y)] = true;
            }
        }
    }
    return newPopulation;
}
