class CalculatorFunctions {
    add(a, b) {
        return a + b;
    }

    subtract(a, b) {
        return a - b;
    }

    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        return a / b;
    }

    sum(numbers) {
        let result = 0;
        for (let number of numbers) {
            result += number;
        }
        return result;
    }

    multiplyArray(numbers) {
        if (!numbers || numbers.length === 0) {
            return 0;
        }
        let result = 1;
        for (let number of numbers) {
            result *= number;
        }
        return result;
    }

    power(a, b) {
        return a ** b;
    }

    factorial(a) {
        let result = 1;
        for (let number = 1; number <= a; number++) {
            result *= number;
        }
        return result;
    }
}
