let interval, countRow, countCell;
function onResize() {
    [canvas.width, canvas.height] = [world.offsetWidth, world.offsetHeight];
    prepareGame();
    onFill();
}
window.addEventListener("resize", throttle(onResize));
window.addEventListener("DOMContentLoaded", prepareGame);

function prepareGame() {
    countCell = canvas.width / CELL_SIZE;
    countRow = canvas.height / CELL_SIZE;

    for (let x = 0; x < countCell; x++) {
        population[x] = [];
        for (let y = 0; y < countRow; y++) {
            population[x][y] = new Cell(false);
        }
    }

    run({ fn: getNeighbors, field: "neighbors" });
    onFill();
}

function fillRect(x, y, clickColor) {
    if (!ctx) return;
    ctx.fillStyle = clickColor || population[x][y].color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function clickInWorld(e) {
    const x = Math.floor((e.pageX - this.offsetLeft) / CELL_SIZE);
    const y = Math.floor((e.pageY - this.offsetTop) / CELL_SIZE);
    const color = population[x][y].isAlive ? COLOR_DIED : COLOR_ALIVE;
    fillRect(x, y, color);
    population[x][y].toggleLife();
}
world.addEventListener("click", clickInWorld);

function onStart() {
    if (interval) {
        onStop();
        prepareGame();
        history = [];
    }
    interval = setInterval(nextTick, 100);
}

function onStop() {
    clearInterval(interval);
}

function onClear() {
    if (!ctx) return;
    onStop();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function onFillAuto() {
    onStop();
    prepareGame();
    run({
        fn: (x, y) => {
            const isAlive = Math.random() < 0.3;
            population[x][y].isAlive = isAlive;
            population[x][y].color = isAlive ? COLOR_ALIVE : COLOR_DIED;
        },
    });
    onFill();
}

function onFill() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    run({ fn: fillRect });
}

function nextTick() {
    run({ field: "calcAlive", isExecField: true });
    const [allDied, lastPopulation] = prepareForHistory(population);
    run({ field: "changeAlive", isExecField: true });
    onFill();

    if (allDied || history.includes(lastPopulation)) {
        clearInterval(interval);
    }
    history.push(lastPopulation);
}
