const CELL_SIZE = 5;
const HALF_CELL = CELL_SIZE / 2;
const COLOR_ALIVE = "#3c3c3c";
const COLOR_DIED = "#fefefe";
const NEIGHBORS = [
    [1, 1],
    [1, 0],
    [1, -1],
    [0, 1],
    [0, -1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
];
const store = {};