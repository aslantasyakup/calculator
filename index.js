
const display = document.getElementById('calculatorInput');
const buttons = document.querySelectorAll('.calculator-button');

let currentInput = '0';
let previousInput = '';
let operation = null;


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('clear')) {
            clearCalculator();
        } else if (button.classList.contains('operator')) {
            if (value === '=') {
                calculate();
            } else {
                handleOperator(value);
            }
        } else {
            handleNumber(value);
        }

        updateDisplay();
    });
});


function handleNumber(num) {
    if (currentInput === '0') {
        currentInput = num;
    } else {
        currentInput += num;
    }
}

function handleOperator(op) {
    if (op === '.') {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
        return;
    }

    if (previousInput && operation && currentInput !== '0') {
        calculate();
    }

    previousInput = currentInput;
    currentInput = '0';
    operation = op;
}


function calculate() {
    if (!previousInput || !operation) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result = 0;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current !== 0 ? prev / current : 'Error';
            break;
    }

    currentInput = result.toString();
    operation = null;
    previousInput = '';
}


function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operation = null;
}


function updateDisplay() {
    display.value = currentInput;
}


updateDisplay();