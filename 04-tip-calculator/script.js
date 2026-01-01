/**
 * ==============================================
 * TIP CALCULATOR - Learning Documentation
 * ==============================================
 * 
 * CONCEPTS COVERED:
 * - parseFloat/parseInt: Converting strings to numbers
 * - Mathematical calculations: Percentage, division
 * - toFixed(): Formatting decimal places
 * - Input events: Real-time calculation updates
 * - Logical OR (||): Default values with fallback
 * - Data attributes: Storing button data
 * - String conversion: toString() method
 * 
 * KEY LEARNING POINTS:
 * 1. Type conversion (string to number)
 * 2. Percentage calculations
 * 3. Number formatting for currency
 * 4. Real-time updates with input event
 * 5. Active button state management
 */

// ==============================================
// DOM ELEMENTS
// ==============================================
const billAmount = document.getElementById('billAmount');
const tipPercentage = document.getElementById('tipPercentage');
const numberOfPeople = document.getElementById('numberOfPeople');
const tipAmount = document.getElementById('tipAmount');
const totalAmount = document.getElementById('totalAmount');
const perPersonAmount = document.getElementById('perPersonAmount');
const resetBtn = document.getElementById('resetBtn');
const tipButtons = document.querySelectorAll('.tip-btn');

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

/**
 * Formats a number as currency with 2 decimal places
 * LEARNING: toFixed() rounds number to specified decimal places
 * 
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string (e.g., "$25.50")
 * 
 * Examples:
 * - formatCurrency(25) → "$25.00"
 * - formatCurrency(25.5) → "$25.50"
 * - formatCurrency(25.567) → "$25.57" (rounds)
 */
function formatCurrency(amount) {
    // LEARNING: toFixed(2) converts to string with 2 decimal places
    // Always shows 2 digits after decimal (25 becomes "25.00")
    return `$${amount.toFixed(2)}`;
}

// ==============================================
// CALCULATION FUNCTIONS
// ==============================================

/**
 * Calculates tip, total, and per-person amounts
 * LEARNING: Multiple mathematical operations and type conversion
 * 
 * Steps:
 * 1. Parse input values (convert strings to numbers)
 * 2. Calculate tip amount (bill × tip percentage)
 * 3. Calculate total (bill + tip)
 * 4. Calculate per-person amount (total ÷ people)
 * 5. Display formatted results
 */
function calculateTip() {
    // Parse input values with default fallbacks
    // LEARNING: parseFloat() converts string to decimal number
    // || operator provides fallback if value is NaN or empty
    
    // Get bill amount (e.g., "45.50" → 45.50)
    const bill = parseFloat(billAmount.value) || 0;
    
    // Get tip percentage (e.g., "15" → 15)
    const tipPercent = parseFloat(tipPercentage.value) || 0;
    
    // Get number of people (e.g., "2" → 2)
    // LEARNING: parseInt() converts string to whole number
    // Default to 1 to avoid division by zero
    const people = parseInt(numberOfPeople.value) || 1;
    
    // Calculate tip amount
    // LEARNING: Percentage calculation - divide by 100
    // Example: $50 bill with 15% tip = 50 * (15/100) = $7.50
    const tip = bill * (tipPercent / 100);
    
    // Calculate total amount
    // LEARNING: Simple addition
    const total = bill + tip;
    
    // Calculate per-person amount
    // LEARNING: Division for splitting bill
    // Example: $57.50 total ÷ 2 people = $28.75 each
    const perPerson = total / people;
    
    // Update display with formatted currency
    tipAmount.textContent = formatCurrency(tip);
    totalAmount.textContent = formatCurrency(total);
    perPersonAmount.textContent = formatCurrency(perPerson);
}

// ==============================================
// UI UPDATE FUNCTIONS
// ==============================================

/**
 * Sets tip percentage and updates button states
 * LEARNING: Managing active state across multiple buttons
 * 
 * @param {number|string} percent - Tip percentage to set
 * 
 * Flow:
 * 1. Update tip input value
 * 2. Loop through all tip buttons
 * 3. Add 'active' class to selected button
 * 4. Remove 'active' from others
 * 5. Recalculate
 */
function setTipPercentage(percent) {
    // Set input value
    tipPercentage.value = percent;
    
    // Update button active states
    // LEARNING: forEach() to iterate over NodeList
    tipButtons.forEach(btn => {
        // Check if button's data-tip matches selected percentage
        // LEARNING: dataset.tip accesses data-tip attribute
        // toString() ensures type consistency (number → string)
        if (btn.dataset.tip === percent.toString()) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Recalculate with new percentage
    calculateTip();
}

/**
 * Resets calculator to default values
 * LEARNING: Resetting multiple inputs to initial state
 * 
 * Default values:
 * - Bill: empty (user must enter)
 * - Tip: 15% (standard tip)
 * - People: 1
 */
function resetCalculator() {
    // Clear bill input
    billAmount.value = '';
    
    // Set tip to default 15%
    tipPercentage.value = '15';
    
    // Set people to 1
    numberOfPeople.value = '1';
    
    // Update button states to show 15% as active
    tipButtons.forEach(btn => {
        if (btn.dataset.tip === '15') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Recalculate to update display
    calculateTip();
}

// ==============================================
// EVENT LISTENERS
// ==============================================

/**
 * Bill amount input - recalculate on change
 * LEARNING: 'input' event fires whenever value changes
 * Triggers on every keystroke for real-time updates
 */
billAmount.addEventListener('input', calculateTip);

/**
 * Tip percentage manual input - clear button states
 * LEARNING: When user types custom percentage, deactivate preset buttons
 */
tipPercentage.addEventListener('input', () => {
    // Remove active state from all preset buttons
    tipButtons.forEach(btn => btn.classList.remove('active'));
    calculateTip();
});

/**
 * Number of people input - recalculate on change
 */
numberOfPeople.addEventListener('input', calculateTip);

/**
 * Preset tip percentage buttons
 * LEARNING: Attaching same handler to multiple buttons
 */
tipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Get percentage from button's data attribute
        // LEARNING: data-* attributes store custom data
        const percent = btn.dataset.tip;
        setTipPercentage(percent);
    });
});

/**
 * Reset button - restore defaults
 */
resetBtn.addEventListener('click', resetCalculator);

// ==============================================
// INITIALIZATION
// ==============================================

/**
 * Calculate tip on page load to show initial values
 * LEARNING: Display default calculation (usually $0.00)
 */
calculateTip();
