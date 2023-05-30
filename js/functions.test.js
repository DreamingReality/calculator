const add = function (a, b) {
    return a + b;
};

const subtract = function (a, b) {
    return a - b;
};

const sum = function (numbers) {
    let result = 0;
    for (let number of numbers) {
        result += number;
    }
    return result;
};

const multiply = function (numbers) {
    if (!numbers || numbers.length === 0) {
        return 0;
    }
    let result = 1;
    for (let number of numbers) {
        result *= number;
    }
    return result;
};

const power = function (a, b) {
    return a ** b;
};

const factorial = function (a) {
    let result = 1;
    for (let number = 1; number <= a; number++) {
        result *= number;
    }
    return result;
};

module.exports = {
    add,
    subtract,
    sum,
    multiply,
    power,
    factorial,
};
