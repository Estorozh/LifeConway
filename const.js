const CELL_SIZE = 10;
const COLOR_ALIVE = "#3c3c3c";
const COLOR_DIED = "#fefefe";
const COUNT_ROW = canvas.height / CELL_SIZE;
const COUNT_CELL = canvas.width / CELL_SIZE;
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
