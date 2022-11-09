let history = document.querySelector('[data-history]');
let display = document.querySelector('[data-display]');

let numbers = document.querySelectorAll('[data-number]');
let operators = document.querySelectorAll('[data-operator]');
let equal = document.querySelector('[data-equal]');
let changeSign = document.querySelector('[data-change-sign]');
let clearAll = document.querySelector('[data-clear-all]');
let clearInput = document.querySelector('[data-clear-input]');

let historyString = '';
let currentNumber = '';
let lastOperation = '';
let result = '';
let temporaryResult = '';
let isDecimal = false;

equal.addEventListener('click', () => {
    if (!historyString || !currentNumber) return;

    calculate();
    setHistory();

    display.innerText = result;
    currentNumber = result;
    if (currentNumber == 'dividing by zero') currentNumber = 0;
    historyString = '';
    history.innerText = ''
    temporaryResult = '';
});

changeSign.addEventListener('click', () => {
    if (currentNumber) {
        currentNumber = - currentNumber;
        display.innerText = currentNumber;
    }
});

clearAll.addEventListener('click', () => {
    isDecimal = false;
    historyString = '';
    history.innerText = '';
    currentNumber = '';
    display.innerText = '';
    result = '';
    temporaryResult = '';
});

clearInput.addEventListener('click', () => {
    if (!(/[\+\-x\/]$/g.test(history.innerText))) {
        clearAll.click();
        return;
    }

    isDecimal = false;
    currentNumber = '';
    display.innerText = '';
});

function setHistory(operation) {
    if (operation == '÷') operation = ':';
    if (operation != '%') {
        historyString = result + ' ' + operation + ' ';
    } else {
        historyString = result;
    }
    
    isDecimal = false;
    history.innerText = historyString;
    currentNumber = '';
    display.innerText = '';
    temporaryResult = result;
}

numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
        let value = event.target.dataset.number;

        if (currentNumber.toString().length > 18) {
            return;
        }

        if (value == '.') {
            if (isDecimal) return;
            isDecimal = true;
        }

        currentNumber += value;

        if (currentNumber == '.') {
            display.innerText = currentNumber = '0' + currentNumber;
        } else if (currentNumber.includes('.')) {
            let temp = currentNumber.split('.');
            temp[0] = parseFloat(temp[0]);
            display.innerText = temp.join('.');
        } else {
            display.innerText = parseFloat(currentNumber);
        }
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', (event) => {
        if (!currentNumber) return;

        let operation = event.target.dataset.operator;
        
        if (operation == '%') {
            calculatePercent();
        } else {
            if (historyString && currentNumber && lastOperation) {
                calculate();
            } else {
                result = parseFloat(currentNumber);
            }   
        }

        setHistory(operation);

        lastOperation = operation;

        if (lastOperation == '%') {
            historyString = '';
            currentNumber = result;
            display.innerText = result;
            temporaryResult = '';
        }
    });
});

function calculate() {
    let temp = '';

    if (lastOperation === 'x') {
        temp = (parseFloat(result) * parseFloat(currentNumber)).toFixed(10);
    } else if (lastOperation == '÷') {
        temp = (parseFloat(result) / parseFloat(currentNumber)).toFixed(10);
        if (isNaN(temp) || !isFinite(temp)) temp = 'dividing by zero';
    } else if (lastOperation == '+') {
        temp = (parseFloat(result) + parseFloat(currentNumber)).toFixed(10);
    } else if (lastOperation == '-') { 
        temp = (parseFloat(result) - parseFloat(currentNumber)).toFixed(10);
    }
    if (temp == 'dividing by zero') {
        result = temp;
        currentNumber = 0;
    } else {
        result = parseFloat(temp);
    }
}

function calculatePercent() {
    let percent = parseFloat(currentNumber) / 100;
    let temp;

    if (temporaryResult) {
        if (lastOperation == '+') {
            temp = (parseFloat(temporaryResult) + parseFloat(temporaryResult) * percent).toFixed(10);
        } else if (lastOperation == '-') {
            temp = (parseFloat(temporaryResult) - parseFloat(temporaryResult) * percent).toFixed(10);
        } else if (lastOperation == 'x') {
            temp = (parseFloat(temporaryResult) * percent).toFixed(10);
        } else if (lastOperation == '÷') {
            temp = (parseFloat(temporaryResult) / percent).toFixed(10);
        }
        temporaryResult = result = parseFloat(temp);
    } else {
        temporaryResult = result = parseFloat((percent).toFixed(10));
    }
}