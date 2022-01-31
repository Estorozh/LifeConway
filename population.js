let population = [];
let lastPopulation = {};
let checked = {};
let allNeighborsCell = [];
let history = [];

const tick = () => {
    let countNeighbor = 0;

    neighbors.forEach(
        (neighbor) =>
            (neighbor.isAlive)
    );

    prevState = isAlive
    if (countNeighbor === 3 || (countNeighbor === 2 && isAlive)) {
        isAlive = true;
    } else {
        isAlive = false;
    }
}

const toggleLife = () => {
    this.isAlive = !this.isAlive;
}

function getCell(isAlive) {
        // this.neighbors = [];
        // this.prevState = null;
        // this.isAlive = isAlive;

    // function tick() {
    //     let countNeighbor = 0;

    //     this.neighbors.forEach(
    //         (neighbor) =>
    //             (countNeighbor += neighbor !== this && neighbor.isAlive)
    //     );

    //     this.prevState = this.isAlive
    //     if (countNeighbor === 3 || (countNeighbor === 2 && this.isAlive)) {
    //         this.isAlive = true;
    //     } else {
    //         this.isAlive = false;
    //     }
    // }


    // toogleLife() {
    //     this.isAlive = !this.isAlive;
    // }
    return {
        isAlive,
        neighbors: [],
        prevState: null,
        toggleLife: toggleLife.bind(this),
        tick: tick.bind(this)
    }
}

//todo рассчитать соседей и записать их сразу
const getNeighbors = (x, y) => {
    let neighbors = []
    NEIGHBORS.forEach(([diffX, diffY]) => {
        const nX = x-diffX, nY = y-diffY;
        if(nX < 0 || nX > countCell || nY < 0 || nY > countRow || !population?.[nX]?.[nY]) return;
        neighbors.push(population[nX][nY])
    });
    return neighbors;
}
