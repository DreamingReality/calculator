function CalculatorUI() {
    const InputStep = {
        FirstNumber: 0,
        Operator: 1,
        SecondNumber: 2,
        Calculate: 3,
    };

    let firstNumber = 0;
    let secondNumber = 0;
    let operator;
    let prevOperator;
    let userInput = '0';
    let calculationResult = '';

    let userInputElement;
    let calculationResultElement;
    let inputIndex = InputStep.FirstNumber;
    let dotApplied = false;

    let logElement;

    const InputMaxLength = 16;

    const calc = new CalculatorFunctions();

    function createLayout() {
        let elements = [
            { tagName: 'div', className: 'layout' },
            { tagName: 'div', className: 'input-wrapper' },
            { tagName: 'div', className: 'buttons-wrapper' },
            { tagName: 'div', className: 'log-wrapper' },
        ];
        return UiUtil.createParentAndChildren(elements);
    }

    function createInput() {
        let elements = [
            { tagName: 'div', className: 'input-content' },
            { tagName: 'div', className: 'calculation-result', id: 'calculationResult', textContent: '' },
            { tagName: 'div', className: 'user-input', id: 'userInput', textContent: '' },
        ];
        return UiUtil.createParentAndChildren(elements);
    }

    function createButtons() {
        let elements = [
            { tagName: 'div', className: 'buttons-content' },
            { tagName: 'button', id: 'btnPercent', textContent: '%' },
            { tagName: 'button', id: 'btnClearEntry', textContent: 'CE' },
            { tagName: 'button', id: 'btnClear', textContent: 'C' },
            { tagName: 'button', id: 'btnBackspace', innerHTML: '<i class="material-icons">backspace</i>' },
            { tagName: 'button', id: 'btnFraction', textContent: '1/x' },
            { tagName: 'button', id: 'btnSquare', innerHTML: 'x<sup>2</sup>' },
            { tagName: 'button', id: 'btnSquareRoot', innerHTML: '<sup>2</sup>&radic;x' },
            { tagName: 'button', id: 'btnDivide', innerHTML: '&divide;' },
            { tagName: 'button', textContent: '7', dataset: { value: 7 } },
            { tagName: 'button', textContent: '8', dataset: { value: 8 } },
            { tagName: 'button', textContent: '9', dataset: { value: 9 } },
            { tagName: 'button', id: 'btnMultiply', textContent: 'x' },
            { tagName: 'button', textContent: '4', dataset: { value: 4 } },
            { tagName: 'button', textContent: '5', dataset: { value: 5 } },
            { tagName: 'button', textContent: '6', dataset: { value: 6 } },
            { tagName: 'button', id: 'btnSubstract', textContent: '-' },
            { tagName: 'button', textContent: '1', dataset: { value: 1 } },
            { tagName: 'button', textContent: '2', dataset: { value: 2 } },
            { tagName: 'button', textContent: '3', dataset: { value: 3 } },
            { tagName: 'button', id: 'btnAdd', textContent: '+' },
            { tagName: 'button', id: 'btnSign', innerHTML: '&plusmn;' },
            { tagName: 'button', textContent: '0', dataset: { value: 0 } },
            { tagName: 'button', id: 'btnDot', textContent: '.' },
            { tagName: 'button', id: 'btnCalculate', className: 'active', textContent: '=' },
        ];

        return UiUtil.createParentAndChildren(elements);
    }

    function bindButtonsEvents(buttons) {
        buttons.addEventListener('click', function (ev) {
            let clickedElement = ev.target;
            if (
                clickedElement.tagName !== 'BUTTON' &&
                clickedElement.parentNode &&
                clickedElement.parentNode.tagName === 'BUTTON'
            ) {
                clickedElement = clickedElement.parentNode;
            }
            if (clickedElement.tagName === 'BUTTON') {
                switch (clickedElement.id) {
                    case 'btnClear':
                        clearInput();
                        updateCalculationResult(calculationResult);
                        break;
                    case 'btnClearEntry':
                        clearUserInput();
                        break;
                    default:
                        let action = clickedElement.id ? clickedElement.id : clickedElement.dataset.value;
                        setAction(action);
                        break;
                }
                updateInput();
            }
        });
    }

    function bindKeyboardEvents() {
        window.addEventListener('keyup', function (ev) {
            let buttonElement;
            switch (ev.key) {
                case '+':
                    buttonElement = document.querySelector('#btnAdd');
                    break;
                case '-':
                    buttonElement = document.querySelector('#btnSubstract');
                    break;
                case '.':
                    buttonElement = document.querySelector('#btnDot');
                    break;
                case '/':
                    buttonElement = document.querySelector('#btnDivide');
                    break;
                case '*':
                    buttonElement = document.querySelector('#btnMultiply');
                    break;
                case 'C':
                case 'c':
                    buttonElement = document.querySelector('#btnClear');
                    break;
                case 'E':
                case 'e':
                    buttonElement = document.querySelector('#btnClearEntry');
                    break;
                case 'Backspace':
                    buttonElement = document.querySelector('#btnBackspace');
                    break;
                case '%':
                    buttonElement = document.querySelector('#btnPercent');
                    break;
                default:
                    if (ev.key >= '1' && ev.key <= '9') {
                        const btnId = 'button[data-value="' + ev.key + '"]';
                        buttonElement = document.querySelector(btnId);
                        break;
                    }
            }
            if (buttonElement) {
                buttonElement.click();
            }
        });
    }

    function setAction(action) {
        switch (action) {
            case 'btnPercent':
                handlePercent();
                break;
            case 'btnBackspace':
                handleDelete();
                break;
            case 'btnFraction':
                handleFraction();
                break;
            case 'btnSquare':
                handleSquare();
                break;
            case 'btnSquareRoot':
                handleSquareRoot();
                break;
            case 'btnDivide':
                handleDivide();
                break;
            case 'btnMultiply':
                handleMultiply();
                break;
            case 'btnSubstract':
                handleSubstract();
                break;
            case 'btnAdd':
                handleAdd();
                break;
            case 'btnSign':
                handleSign();
                break;
            case 'btnDot':
                handleDot();
                break;
            case 'btnCalculate':
                handleCalculate();
                break;
            default:
                handleNumericInput(action);
                break;
        }
        // log();
    }

    function updateCalculationResult(val) {
        calculationResultElement.innerText = val;
    }

    function clearInput() {
        userInput = '0';
        calculationResult = '';
        firstNumber = 0;
        secondNumber = 0;
        operator = '';
        prevOperator = '';
        dotApplied = false;
        inputIndex = InputStep.FirstNumber;
    }

    function clearUserInput() {
        if (inputIndex === InputStep.FirstNumber || inputIndex === InputStep.SecondNumber) {
            userInput = '0';
            userInputElement.innerText = userInput;
            dotApplied = false;
        }
    }

    function handleNumericInput(action) {
        if (inputIndex === InputStep.Operator) {
            inputIndex = InputStep.SecondNumber;
            userInput = '';
        } else if (inputIndex === InputStep.Calculate) {
            inputIndex = InputStep.FirstNumber;
            userInput = '';
        }
        if (userInput.length < InputMaxLength) {
            if (userInput === '0') {
                userInput = '';
            }
            userInput += action;
        }
    }

    function handleDot() {
        if (!dotApplied) {
            dotApplied = true;
            if (inputIndex === InputStep.Operator) {
                userInput = '0.';
                inputIndex = InputStep.SecondNumber;
                updateInput();
            } else if (inputIndex === InputStep.FirstNumber && firstNumber === 0) {
                userInput = '0.';
                updateInput();
            } else {
                userInput = userInput + '.';
            }
        }
    }

    function handleDelete() {
        if (inputIndex === InputStep.FirstNumber || inputIndex === InputStep.SecondNumber) {
            if (userInput.length > 0) {
                userInput = userInput.substring(0, userInput.length - 1);
            }
        }
    }

    function handleCalculate() {
        inputIndex = InputStep.Calculate;
        applyOperator();
    }

    function updateInput() {
        if (inputIndex === InputStep.FirstNumber || inputIndex === InputStep.SecondNumber) {
            userInputElement.innerText = userInput;
        }
    }

    function performOperation(a, operator, b) {
        let result;
        switch (operator) {
            case '+':
                result = calc.add(a, b);
                break;
            case '-':
                result = calc.subtract(a, b);
                break;
            case '*':
                result = calc.multiply(a, b);
                break;
            case '/':
                result = calc.divide(a, b);
                break;
        }

        return result;
    }

    function applyOperator() {
        switch (inputIndex) {
            case InputStep.FirstNumber:
                firstNumber = parseFloat(userInput);
                calculationResult = firstNumber + ' ' + operator;
                inputIndex = InputStep.Operator;
                prevOperator = operator;
                break;
            case InputStep.Operator:
                firstNumber = parseFloat(userInput);
                calculationResult = firstNumber + ' ' + operator;
                break;
            case InputStep.SecondNumber:
                secondNumber = parseFloat(userInput);
                userInput = performOperation(firstNumber, prevOperator, secondNumber);
                calculationResult = userInput + ' ' + operator;
                firstNumber = userInput;
                inputIndex = InputStep.FirstNumber;
                updateInput();
                inputIndex = InputStep.Operator;
                prevOperator = operator;
                break;
            case InputStep.Calculate:
                secondNumber = parseFloat(userInput);
                userInput = performOperation(firstNumber, operator, secondNumber);
                calculationResult = firstNumber + ' ' + operator + ' ' + secondNumber + ' =';
                inputIndex = InputStep.FirstNumber;
                firstNumber = secondNumber;
                updateInput();
                break;
        }
        updateCalculationResult(calculationResult);
        dotApplied = false;
    }

    function createUI() {
        let layout = createLayout();
        let input = createInput();
        let buttons = createButtons();

        bindButtonsEvents(buttons);
        bindKeyboardEvents();

        userInputElement = input.querySelector('#userInput');
        calculationResultElement = input.querySelector('#calculationResult');
        logElement = layout.querySelector('.log-wrapper');

        layout.querySelector('.input-wrapper').appendChild(input);
        layout.querySelector('.buttons-wrapper').appendChild(buttons);

        document.body.appendChild(layout);
    }

    function handleAdd() {
        operator = '+';
        applyOperator();
    }

    function handleSubstract() {
        operator = '-';
        applyOperator();
    }

    function handleMultiply() {
        operator = '*';
        applyOperator();
    }

    function handleDivide() {
        operator = '/';
        applyOperator();
    }

    function handleSign() {
        if (
            userInput.length > 0 &&
            userInput !== '0' &&
            (inputIndex === InputStep.FirstNumber || inputIndex === InputStep.SecondNumber)
        ) {
            if (userInput.charAt(0) === '-') {
                userInput = userInput.substring(1);
            } else {
                userInput = '-' + userInput;
            }
        }
    }

    function handleSquare() {
        if (userInput && userInput !== '0') {
            let result = parseFloat(userInput);
            result *= result;
            userInput = result;
        }
    }

    function handleSquareRoot() {
        if (userInput && userInput !== '0') {
            let result = parseFloat(userInput);
            result = Math.sqrt(result);
            userInput = result;
        }
    }

    function handleSquareRoot() {
        if (userInput && userInput !== '0') {
            let result = parseFloat(userInput);
            result = Math.sqrt(result);
            userInput = result;
        }
    }

    function handleFraction() {
        if (userInput && userInput !== '0') {
            let result = parseFloat(userInput);
            result = 1 / result;
            userInput = result;
        }
    }

    function handlePercent() {
        if (inputIndex === InputStep.Operator || inputIndex === InputStep.SecondNumber) {
            let currentNumber = parseFloat(userInput);
            let result = (firstNumber * currentNumber) / 100;
            userInput = result;
            handleCalculate();
        } else {
            userInput = 0;
        }
    }

    function init() {
        createUI();
        updateInput();
    }

    function log() {
        let info = `<ul><li>firstNumber: ${firstNumber}</li><li>secondNumber: ${secondNumber}</li><li>operator: ${operator}</li>
        <li>prevOperator: ${prevOperator}</li><li>userInput: ${userInput}</li><li>calculationResult: ${calculationResult}</li>
        <li>dotApplied: ${dotApplied}</li><li>inputIndex: ${inputIndex}</li>`;
        logElement.innerHTML = info;
    }

    init();
}

new CalculatorUI();
