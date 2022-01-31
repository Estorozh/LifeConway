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

const prepareForHistory = (population) => {
    let allDied = true;
    let history = "";
    run({
        fn: (x, y) => {
            if (allDied && population[x][y].isAlive) allDied = false;
            history += population[x][y].isAlive;
        },
    });

    return [allDied, history];
};

const run = ({ fn, field, isExecField }) => {
    for (let x = 0; x < countCell; x++) {
        for (let y = 0; y < countRow; y++) {
            if (field) {
                if (isExecField) {
                    population[x][y][field]();
                } else {
                    population[x][y][field] = fn(x, y);
                }
            } else {
                fn(x, y);
            }
        }
    }
};
