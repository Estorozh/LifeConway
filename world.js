let interval, countRow, countCell;
function onResize() {
    [canvas.width, canvas.height] = [world.offsetWidth, world.offsetHeight];
    prepareGame();
    onFill();
}
window.addEventListener("resize", throttle(onResize));
window.addEventListener("DOMContentLoaded", prepareGame)

function prepareGame() {
    countCell = canvas.width / CELL_SIZE;
    countRow = canvas.height / CELL_SIZE;

    for(let x = 0; x < countCell; x++) {
        population[x] = [];
        for(let y = 0; y< countRow; y++) {
            population[x][y] = getCell(Math.random() < 0.3);
        }
    }

    run(getNeighbors);
    onFill()
}

function fillRect(x, y) {
    if (!ctx, population[x][y].prevState === population[x][y].isAlive) return;
    ctx.fillStyle = population[x][y].isAlive ? COLOR_ALIVE : COLOR_DIED;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function clickInWorld(e) {
    const x = Math.floor((e.pageX - this.offsetLeft) / CELL_SIZE);
    const y = Math.floor((e.pageY - this.offsetTop) / CELL_SIZE);
    population[x][y].toggleLife();
    fillRect(x, y);
}
world.addEventListener("click", clickInWorld);

function onStart() {
    if(interval) {
        onStop();
        prepareGame();
        history = [];
    }
    // interval = setInterval(nextTick, 100);
    nextTick()
}

function onStop() {
    clearInterval(interval);
}

function onClear() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function onFillAuto() {
    onStop()
    prepareGame()
    run((x,y) => population[x][y].isAlive = Math.random < .3)
    onFill()
}

function onFill() {
    console.log(population)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    run(fillRect)
}

function nextTick() {
    const [allDied, lastPopulation] = prepareForHistory(population)
    history.push(lastPopulation);
    console.log(population, 'beforetick')
    run(tick);
    onFill()

    if (
        allDied ||
        history.includes(prepareForHistory(population))
    ) {
        clearInterval(interval);
    }
}
