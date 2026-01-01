/**
 * ==============================================
 * BMI & AGE CALCULATOR - Learning Documentation
 * ==============================================
 * 
 * CONCEPTS COVERED:
 * - Tab System: Switching between different views
 * - Unit Conversion: Metric ↔ Imperial
 * - BMI Formula: weight(kg) / height(m)²
 * - Date Arithmetic: Calculating age from birthdate
 * - Conditional Logic: Multi-level if-else chains
 * - Math.floor/ceil: Rounding numbers up/down
 * - toLocaleString(): Number formatting with thousand separators
 * - Closest() method: Finding nearest ancestor element
 * 
 * KEY LEARNING POINTS:
 * 1. Tab-based UI implementation
 * 2. Unit conversion mathematics
 * 3. Date object manipulation
 * 4. Complex age calculations accounting for months/days
 * 5. Dynamic content showing/hiding
 */

// ==============================================
// DOM ELEMENTS
// ==============================================

// Tab system elements
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// BMI Calculator elements
const unitBtns = document.querySelectorAll('.unit-btn');
const metricInputs = document.getElementById('metricInputs');
const imperialInputs = document.getElementById('imperialInputs');
const calculateBMIBtn = document.getElementById('calculateBMI');
const bmiResult = document.getElementById('bmiResult');

// Age Calculator elements
const calculateAgeBtn = document.getElementById('calculateAge');
const ageResult = document.getElementById('ageResult');

// ==============================================
// STATE VARIABLES
// ==============================================

/**
 * currentUnit: Tracks measurement system ('metric' or 'imperial')
 * LEARNING: State variable for switching between two modes
 */
let currentUnit = 'metric';

// ==============================================
// TAB SYSTEM
// ==============================================

/**
 * Tab switching functionality
 * LEARNING: Implementing a tab system with active state management
 * 
 * Flow:
 * 1. Get target tab from clicked button's data attribute
 * 2. Update button active states
 * 3. Show target tab content, hide others
 */
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Get target tab ID from data attribute
        // LEARNING: data-tab attribute stores which tab to show
        const targetTab = btn.dataset.tab;
        
        // Update button states
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update content visibility
        // LEARNING: Loop through all content divs
        tabContents.forEach(content => {
            if (content.id === targetTab) {
                content.classList.add('active');  // Show matching tab
            } else {
                content.classList.remove('active');  // Hide others
            }
        });
    });
});

// ==============================================
// UNIT SYSTEM TOGGLE
// ==============================================

/**
 * Switches between metric and imperial units
 * LEARNING: Toggling UI elements based on state
 * 
 * Metric: cm, kg
 * Imperial: feet, inches, pounds
 */
unitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update current unit
        currentUnit = btn.dataset.unit;
        
        // Update button active states
        unitBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show appropriate input fields
        // LEARNING: Conditional UI display
        if (currentUnit === 'metric') {
            metricInputs.classList.remove('hidden');
            imperialInputs.classList.add('hidden');
        } else {
            metricInputs.classList.add('hidden');
            imperialInputs.classList.remove('hidden');
        }
        
        // Hide previous result when switching units
        bmiResult.classList.add('hidden');
    });
});

// ==============================================
// BMI CALCULATION
// ==============================================

/**
 * Calculates Body Mass Index (BMI)
 * LEARNING: Complex calculation with unit conversion
 * 
 * BMI Formula: weight (kg) / height (m)²
 * 
 * Conversions:
 * - cm to m: divide by 100
 * - feet to inches: multiply by 12
 * - inches to meters: multiply by 0.0254
 * - pounds to kg: multiply by 0.453592
 */
function calculateBMI() {
    let heightInMeters, weightInKg;
    
    if (currentUnit === 'metric') {
        // METRIC CALCULATION
        
        // Parse input values
        const heightCm = parseFloat(document.getElementById('heightCm').value);
        weightInKg = parseFloat(document.getElementById('weightKg').value);
        
        // Validation: ensure positive values
        // LEARNING: Multiple conditions with logical operators
        if (!heightCm || !weightInKg || heightCm <= 0 || weightInKg <= 0) {
            alert('Please enter valid height and weight values!');
            return;
        }
        
        // Convert cm to meters
        // LEARNING: Unit conversion - 170cm = 1.7m
        heightInMeters = heightCm / 100;
        
    } else {
        // IMPERIAL CALCULATION
        
        // Parse input values
        const heightFt = parseFloat(document.getElementById('heightFt').value) || 0;
        const heightIn = parseFloat(document.getElementById('heightIn').value) || 0;
        const weightLbs = parseFloat(document.getElementById('weightLbs').value);
        
        // Validation
        if (heightFt <= 0 || !weightLbs || weightLbs <= 0) {
            alert('Please enter valid height and weight values!');
            return;
        }
        
        // Convert feet and inches to total inches
        // LEARNING: 1 foot = 12 inches
        // Example: 5'7" = (5 * 12) + 7 = 67 inches
        const totalInches = (heightFt * 12) + heightIn;
        
        // Convert inches to meters
        // LEARNING: Conversion factor - 1 inch = 0.0254 meters
        heightInMeters = totalInches * 0.0254;
        
        // Convert pounds to kilograms
        // LEARNING: Conversion factor - 1 lb = 0.453592 kg
        weightInKg = weightLbs * 0.453592;
    }
    
    // Calculate BMI using standard formula
    // LEARNING: BMI = weight(kg) / height(m)²
    // heightInMeters * heightInMeters is height squared
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    
    // Display result
    displayBMIResult(bmi);
}

/**
 * Displays BMI result with category and visual indicator
 * LEARNING: Conditional categorization and dynamic styling
 * 
 * BMI Categories (WHO standard):
 * - < 18.5: Underweight
 * - 18.5 - 24.9: Normal
 * - 25 - 29.9: Overweight
 * - ≥ 30: Obese
 * 
 * @param {number} bmi - Calculated BMI value
 */
function displayBMIResult(bmi) {
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const bmiDescription = document.getElementById('bmiDescription');
    
    // Display BMI with 1 decimal place
    // LEARNING: toFixed(1) formats to one decimal (25.678 → "25.7")
    bmiValue.textContent = bmi.toFixed(1);
    
    // Determine category based on BMI value
    // LEARNING: Multi-level conditional logic (if-else chain)
    let category, description, activeBar;
    
    if (bmi < 18.5) {
        category = 'Underweight';
        description = 'Your BMI is below the normal range. Consider consulting a healthcare provider.';
        activeBar = 'underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        // LEARNING: Range check with && (AND operator)
        category = 'Normal Weight';
        description = 'Great! Your BMI is in the healthy range.';
        activeBar = 'normal';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        description = 'Your BMI is above the normal range. Consider a balanced diet and exercise.';
        activeBar = 'overweight';
    } else {
        // BMI >= 30
        category = 'Obese';
        description = 'Your BMI indicates obesity. We recommend consulting a healthcare provider.';
        activeBar = 'obese';
    }
    
    // Update text content
    bmiCategory.textContent = category;
    bmiDescription.textContent = description;
    
    // Highlight appropriate category bar
    // LEARNING: Visual feedback with CSS classes
    document.querySelectorAll('.chart-bar').forEach(bar => {
        bar.classList.remove('active');
    });
    // Use template literal to select specific bar
    document.querySelector(`.chart-bar.${activeBar}`).classList.add('active');
    
    // Show result section
    bmiResult.classList.remove('hidden');
}

// ==============================================
// AGE CALCULATION
// ==============================================

/**
 * Calculates exact age from birthdate
 * LEARNING: Date arithmetic and complex time calculations
 * 
 * Calculates:
 * - Exact age (years, months, days)
 * - Total months, weeks, days, hours
 * - Days until next birthday
 * 
 * Challenges:
 * - Handling month/day borrowing (like subtraction with carrying)
 * - Different month lengths
 * - Leap years
 */
function calculateAge() {
    const birthdateInput = document.getElementById('birthdate').value;
    
    // Validation: ensure date is entered
    if (!birthdateInput) {
        alert('Please enter your date of birth!');
        return;
    }
    
    // Create Date objects
    // LEARNING: new Date(string) creates date from input value
    const birthdate = new Date(birthdateInput);
    const today = new Date();
    
    // Validation: birthdate cannot be in future
    if (birthdate > today) {
        alert('Birthdate cannot be in the future!');
        return;
    }
    
    // Calculate years, months, and days
    // LEARNING: Date component extraction
    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();
    
    // Adjust for negative days (borrow from month)
    // LEARNING: Date arithmetic with borrowing
    // Example: If born on 25th and today is 20th, days = -5
    // Need to borrow from months
    if (days < 0) {
        months--;  // Reduce month count
        
        // Get number of days in previous month
        // LEARNING: new Date(year, month, 0) gets last day of previous month
        // Month 0 = December of previous year, so this gives last day of last month
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();  // Add days from previous month
    }
    
    // Adjust for negative months (borrow from year)
    // LEARNING: Similar borrowing logic for months
    if (months < 0) {
        years--;     // Reduce year count
        months += 12;  // Add 12 months
    }
    
    // Calculate total time in different units
    // LEARNING: Time conversion calculations
    
    // Total months since birth
    const totalMonths = years * 12 + months;
    
    // Total days since birth
    // LEARNING: Date subtraction gives milliseconds
    // Conversion: milliseconds → seconds → minutes → hours → days
    // 1000ms * 60s * 60min * 24hr = 86,400,000ms per day
    const totalDays = Math.floor((today - birthdate) / (1000 * 60 * 60 * 24));
    
    // Total weeks since birth
    // LEARNING: Math.floor() rounds down to whole number
    const totalWeeks = Math.floor(totalDays / 7);
    
    // Total hours since birth
    const totalHours = totalDays * 24;
    
    // Calculate days until next birthday
    // LEARNING: Forward date calculation
    const nextBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
    
    // If birthday already passed this year, get next year's birthday
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    // Calculate days remaining
    // LEARNING: Math.ceil() rounds up (partial day counts as full day)
    const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    
    // Display results
    // LEARNING: Updating multiple DOM elements
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    
    // Format large numbers with thousand separators
    // LEARNING: toLocaleString() adds commas (e.g., "1,234,567")
    document.getElementById('totalMonths').textContent = totalMonths.toLocaleString();
    document.getElementById('totalWeeks').textContent = totalWeeks.toLocaleString();
    document.getElementById('totalDays').textContent = totalDays.toLocaleString();
    document.getElementById('totalHours').textContent = totalHours.toLocaleString();
    
    document.getElementById('nextBirthday').textContent = `${daysUntilBirthday} days`;
    
    // Show result section
    ageResult.classList.remove('hidden');
}

// ==============================================
// EVENT LISTENERS
// ==============================================

/**
 * Calculate button handlers
 */
calculateBMIBtn.addEventListener('click', calculateBMI);
calculateAgeBtn.addEventListener('click', calculateAge);

/**
 * Enter key support for BMI inputs
 * LEARNING: closest() method finds nearest ancestor matching selector
 */
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            // Check if input is inside BMI tab
            // LEARNING: closest() walks up DOM tree to find ancestor
            if (input.closest('#bmi')) {
                calculateBMI();
            }
        }
    });
});

/**
 * Enter key support for age calculator
 */
document.getElementById('birthdate').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculateAge();
    }
});
