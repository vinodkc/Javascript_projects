const display = document.getElementById('display');

let currentValue = '0';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentValue;
}

function clear() {
    currentValue = '0';
    previousValue = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLastDigit() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentValue = '';
        shouldResetDisplay = false;
    }
    
    if (number === '.' && currentValue.includes('.')) return;
    
    if (currentValue === '0' && number !== '.') {
        currentValue = number;
    } else {
        currentValue += number;
    }
    
    updateDisplay();
}

function setOperation(op) {
    if (operation !== null) {
        calculate();
    }
    
    previousValue = currentValue;
    operation = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operation === null || previousValue === '') return;
    
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    let result;
    
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
            if (current === 0) {
                alert('Cannot divide by zero!');
                clear();
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    
    currentValue = result.toString();
    operation = null;
    previousValue = '';
    shouldResetDisplay = true;
    updateDisplay();
}

document.querySelectorAll('.btn-number').forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.dataset.number);
    });
});

document.querySelectorAll('.btn-operator').forEach(button => {
    button.addEventListener('click', () => {
        setOperation(button.dataset.operator);
    });
});

document.querySelector('[data-action="clear"]').addEventListener('click', clear);
document.querySelector('[data-action="delete"]').addEventListener('click', deleteLastDigit);
document.querySelector('[data-action="calculate"]').addEventListener('click', calculate);

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    }
    
    if (e.key === '.') {
        appendNumber('.');
    }
    
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        setOperation(e.key);
    }
    
    if (e.key === '%') {
        setOperation('%');
    }
    
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    }
    
    if (e.key === 'Escape') {
        clear();
    }
    
    if (e.key === 'Backspace') {
        deleteLastDigit();
    }
});

updateDisplay();

