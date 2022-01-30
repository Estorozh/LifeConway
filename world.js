let interval, countRow, countCell;
function onResize() {
    [canvas.width, canvas.height] = [world.offsetWidth, world.offsetHeight];
    calcGrid()
    onFill();
}
window.addEventListener("resize", throttle(onResize));
window.addEventListener("load", calcGrid, {once: true})

function fillRect(x, y, isClick) {
    if (!ctx) return;
    ctx.fillStyle = isAlive(x, y) && isClick ? COLOR_DIED : COLOR_ALIVE;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function clickInWorld(e) {
    const x = Math.floor((e.pageX - this.offsetLeft) / CELL_SIZE);
    const y = Math.floor((e.pageY - this.offsetTop) / CELL_SIZE);
    fillRect(x, y, true);
    toogleLife(x, y);
}
world.addEventListener("click", clickInWorld);

function onStart() {
    interval && onStop();
    interval = setInterval(nextTick, 100);
}

function onStop() {
    clearInterval(interval);
}

function onClear() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function onFillAuto() {
    population = getPopulateRandom();
    onFill();
}

function onFill() {
    onClear();
    Object.keys(population).forEach((key) => {
        const [x, y] = key.split(":");
        fillRect(x, y);
    });
}

function nextTick() {
    lastPopulation = { ...population };
    const arrLastPopulation = Object.keys(lastPopulation);
    history.push(prepareForHistory(population));

    arrLastPopulation.forEach(checkNeighbors(true));

    allNeighborsCell = [...new Set(allNeighborsCell)];
    allNeighborsCell.forEach(checkNeighbors(false));

    onFill();
    if (
        !arrLastPopulation.length ||
        history.includes(prepareForHistory(population))
    ) {
        clearInterval(interval);
    }
}

function calcGrid() {
    countCell = canvas.width / CELL_SIZE
    countRow = canvas.height / CELL_SIZE
}