let population = [];
let lastPopulation = {};
let checked = {};
let allNeighborsCell = [];
let history = [];

class Cell {
    constructor(isAlive) {
        this.neighbors = [];
        this.isAlive = isAlive;
        this.nextState = null;
        this.color = isAlive ? COLOR_ALIVE : COLOR_DIED
    }

    calcAlive() {
        let countNeighbor = 0;

        this.neighbors.forEach(
            (neighbor) => neighbor.isAlive && countNeighbor++
        );

        if (countNeighbor === 3 || (countNeighbor === 2 && this.isAlive)) {
            this.nextState = true;
            this.color = COLOR_ALIVE
        } else {
            this.nextState = false;
            this.color = COLOR_DIED
        }
    }

    changeAlive() {
        this.isAlive = this.nextState;
    }

    toggleLife() {
        this.isAlive = !this.isAlive;
        this.color = this.isAlive ? COLOR_ALIVE : COLOR_DIED
    }
}

const getNeighbors = (x, y) => {
    let neighbors = [];
    NEIGHBORS.forEach(([diffX, diffY]) => {
        const nX = x - diffX,
            nY = y - diffY;
        if (
            nX < 0 ||
            nX > countCell ||
            nY < 0 ||
            nY > countRow ||
            !population?.[nX]?.[nY]
        )
            return;
        neighbors.push(population[nX][nY]);
    });
    return neighbors;
};
