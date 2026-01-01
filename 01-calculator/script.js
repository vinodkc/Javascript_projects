/**
 * ==============================================
 * CALCULATOR - Learning Documentation
 * ==============================================
 * 
 * CONCEPTS COVERED:
 * - DOM Manipulation: getElementById, textContent
 * - Event Handling: addEventListener, click events
 * - State Management: tracking calculator state
 * - String/Number Conversion: parseFloat()
 * - Conditional Logic: if/else, switch statements
 * - Error Handling: division by zero check
 * 
 * KEY LEARNING POINTS:
 * 1. State variables track calculator's current status
 * 2. Event delegation for efficient button handling
 * 3. String manipulation for display management
 * 4. Mathematical operations with proper operator precedence
 */

// ==============================================
// DOM ELEMENTS
// ==============================================
// Select the display element where numbers/results appear
const display = document.getElementById('display');

// ==============================================
// STATE VARIABLES
// ==============================================
// These variables maintain the calculator's state throughout operations

// currentValue: What's currently shown on display
let currentValue = '0';

// previousValue: Stores the first number when an operation is selected
let previousValue = '';

// operation: Stores the current operation (+, -, *, /, %)
let operation = null;

// shouldResetDisplay: Flag to clear display on next number input
// Used after pressing equals or selecting an operation
let shouldResetDisplay = false;

// ==============================================
// DISPLAY FUNCTIONS
// ==============================================

/**
 * Updates the calculator display with current value
 * LEARNING: DOM manipulation using textContent
 */
function updateDisplay() {
    display.textContent = currentValue;
}

/**
 * Clears all calculator state and resets to initial values
 * LEARNING: Resetting application state
 */
function clear() {
    currentValue = '0';
    previousValue = '';
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
}

/**
 * Deletes the last digit from current value
 * LEARNING: String manipulation with slice()
 * - slice(0, -1) removes last character
 * - Always maintain at least '0' on display
 */
function deleteLastDigit() {
    if (currentValue.length > 1) {
        // Remove last character using slice
        currentValue = currentValue.slice(0, -1);
    } else {
        // If only one digit, reset to '0'
        currentValue = '0';
    }
    updateDisplay();
}

/**
 * Appends a number or decimal point to the display
 * LEARNING: String concatenation and validation
 * @param {string} number - The digit or '.' to append
 */
function appendNumber(number) {
    // Reset display if flag is set (after operation or equals)
    if (shouldResetDisplay) {
        currentValue = '';
        shouldResetDisplay = false;
    }
    
    // Prevent multiple decimal points
    // LEARNING: includes() method checks if string contains a character
    if (number === '.' && currentValue.includes('.')) return;
    
    // Replace '0' with new number (except for decimal point)
    if (currentValue === '0' && number !== '.') {
        currentValue = number;
    } else {
        // Concatenate number to current value
        currentValue += number;
    }
    
    updateDisplay();
}

// ==============================================
// OPERATION FUNCTIONS
// ==============================================

/**
 * Sets the operation and prepares for second number
 * LEARNING: State management for calculator operations
 * @param {string} op - The operation symbol (+, -, *, /, %)
 * 
 * Flow: If operation already exists, calculate first (chaining)
 *       Then store current value and set new operation
 */
function setOperation(op) {
    // If operation already set, calculate first (chain operations)
    // Example: 5 + 3 * 2 → calculates 5+3 first, then prepares for *2
    if (operation !== null) {
        calculate();
    }
    
    // Store current value as the first operand
    previousValue = currentValue;
    // Set the operation to perform
    operation = op;
    // Flag to clear display when next number is entered
    shouldResetDisplay = true;
}

/**
 * Performs the calculation based on stored operation
 * LEARNING: Switch statements, parseFloat, error handling
 * 
 * Steps:
 * 1. Convert strings to numbers using parseFloat()
 * 2. Use switch statement to handle different operations
 * 3. Handle division by zero error
 * 4. Update state with result
 */
function calculate() {
    // Guard clause: Can't calculate without operation or previous value
    if (operation === null || previousValue === '') return;
    
    // Convert string values to numbers
    // LEARNING: parseFloat() converts "123.45" to 123.45
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    let result;
    
    // LEARNING: switch statement for multiple conditions
    // More efficient than multiple if/else for many cases
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
            // ERROR HANDLING: Division by zero check
            if (current === 0) {
                alert('Cannot divide by zero!');
                clear();
                return;
            }
            result = prev / current;
            break;
        case '%':
            // Modulo: returns remainder of division
            result = prev % current;
            break;
        default:
            return;
    }
    
    // Convert result back to string for display
    // LEARNING: toString() converts number to string
    currentValue = result.toString();
    operation = null;
    previousValue = '';
    shouldResetDisplay = true;
    updateDisplay();
}

// ==============================================
// EVENT LISTENERS
// ==============================================

/**
 * NUMBER BUTTONS
 * LEARNING: querySelectorAll() selects all matching elements
 * forEach() iterates through the NodeList
 * dataset property accesses data-* attributes
 */
document.querySelectorAll('.btn-number').forEach(button => {
    button.addEventListener('click', () => {
        // Access data-number attribute (e.g., data-number="5" → "5")
        appendNumber(button.dataset.number);
    });
});

/**
 * OPERATOR BUTTONS
 * LEARNING: Event delegation pattern
 * Each operator button has data-operator attribute
 */
document.querySelectorAll('.btn-operator').forEach(button => {
    button.addEventListener('click', () => {
        // Access data-operator attribute (e.g., data-operator="+" → "+")
        setOperation(button.dataset.operator);
    });
});

/**
 * ACTION BUTTONS
 * LEARNING: querySelector() selects first matching element
 * Attribute selectors: [data-action="value"]
 */
document.querySelector('[data-action="clear"]').addEventListener('click', clear);
document.querySelector('[data-action="delete"]').addEventListener('click', deleteLastDigit);
document.querySelector('[data-action="calculate"]').addEventListener('click', calculate);

/**
 * KEYBOARD SUPPORT
 * LEARNING: keydown event, e.key property
 * Makes calculator accessible via keyboard
 * 
 * Supported keys:
 * - 0-9: Number input
 * - .: Decimal point
 * - +, -, *, /, %: Operations
 * - Enter or =: Calculate
 * - Escape: Clear all
 * - Backspace: Delete last digit
 */
document.addEventListener('keydown', (e) => {
    // Check if key is a number (0-9)
    // LEARNING: String comparison for ranges
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    }
    
    // Decimal point
    if (e.key === '.') {
        appendNumber('.');
    }
    
    // Basic operations
    // LEARNING: Multiple OR conditions
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        setOperation(e.key);
    }
    
    // Modulo operation
    if (e.key === '%') {
        setOperation('%');
    }
    
    // Calculate result
    // LEARNING: preventDefault() stops default Enter key behavior
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    }
    
    // Clear all
    if (e.key === 'Escape') {
        clear();
    }
    
    // Delete last digit
    if (e.key === 'Backspace') {
        deleteLastDigit();
    }
});

// ==============================================
// INITIALIZATION
// ==============================================
// Display initial value when page loads
updateDisplay();

