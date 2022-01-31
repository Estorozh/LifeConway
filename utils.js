function throttle(func, ms = 500) {
    let isThrottled = false,
        savedArgs,
        savedThis;

    function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }

        func.apply(this, arguments);
        isThrottled = true;

        const timer = setTimeout(function () {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
            clearTimeout(timer);
        }, ms);
    }

    return wrapper;
}

const getName = (x = store.x, y = store.y) => `${x}:${y}`;

const prepareForHistory = (population) => {
    const allDied = true
    const history = JSON.stringify(population.map(({ isAlive }) => {if(isAlive && allDied) allDied = false; return isAlive}));
    return [allDied, history]
}

const run = (fn, field) => {
    for (let x = 0; x <= countCell; x++) {
        for (let y = 0; y <= countRow; y++) {
            if (field) {
                population[x][y][field] = fn(x, y);
            } else {
                fn(x, y);
            }
        }
    }
};
