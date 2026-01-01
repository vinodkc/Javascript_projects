/**
 * ==============================================
 * PASSWORD GENERATOR - Learning Documentation
 * ==============================================
 * 
 * CONCEPTS COVERED:
 * - Random Number Generation: Math.random(), Math.floor()
 * - String Concatenation: Building strings character by character
 * - Regular Expressions: Testing patterns with test()
 * - Set Object: Counting unique values
 * - Clipboard API: navigator.clipboard.writeText()
 * - Range Input: Slider control with value binding
 * - Checkbox State: checked property
 * - setTimeout: Delayed execution
 * - Ternary Operator: Conditional assignments
 * 
 * KEY LEARNING POINTS:
 * 1. Random password generation algorithm
 * 2. Password strength calculation with scoring
 * 3. Clipboard API for copy functionality
 * 4. Regular expressions for pattern matching
 * 5. Dynamic styling based on data
 */

// ==============================================
// DOM ELEMENTS
// ==============================================

// Tab system
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Password generator elements
const generateBtn = document.getElementById('generateBtn');
const copyPasswordBtn = document.getElementById('copyPassword');
const generatedPasswordInput = document.getElementById('generatedPassword');
const passwordLengthSlider = document.getElementById('passwordLength');
const lengthValue = document.getElementById('lengthValue');

// Character type checkboxes
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');

// Password checker elements
const passwordInput = document.getElementById('passwordInput');
const togglePasswordBtn = document.getElementById('togglePassword');
const strengthResult = document.getElementById('strengthResult');
const generatedStrength = document.getElementById('generatedStrength');

// ==============================================
// CHARACTER SETS
// ==============================================

/**
 * Character sets for password generation
 * LEARNING: Organized constants for different character types
 */
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// ==============================================
// TAB SYSTEM
// ==============================================

/**
 * Tab switching between Generator and Checker
 */
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        tabContents.forEach(content => {
            if (content.id === targetTab) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    });
});

// ==============================================
// PASSWORD LENGTH SLIDER
// ==============================================

/**
 * Updates displayed value as slider moves
 * LEARNING: input event for real-time slider feedback
 */
passwordLengthSlider.addEventListener('input', () => {
    lengthValue.textContent = passwordLengthSlider.value;
});

// ==============================================
// PASSWORD GENERATION
// ==============================================

/**
 * Generates random password based on selected criteria
 * LEARNING: Random character selection algorithm
 * 
 * Algorithm:
 * 1. Build character set from selected types
 * 2. Loop for desired length
 * 3. Pick random character from set each iteration
 * 4. Concatenate to build password
 * 
 * Example:
 * - Length: 8
 * - charset: "ABCabc123" (9 characters)
 * - Random indexes: [2, 5, 1, 7, 3, 0, 4, 2]
 * - Result: "CcB3bA1C"
 */
function generatePassword() {
    const length = parseInt(passwordLengthSlider.value);
    let charset = '';
    let password = '';
    
    // Build character set from selected checkboxes
    // LEARNING: .checked property returns true/false
    if (includeUppercase.checked) charset += uppercaseChars;
    if (includeLowercase.checked) charset += lowercaseChars;
    if (includeNumbers.checked) charset += numberChars;
    if (includeSymbols.checked) charset += symbolChars;
    
    // Validation: at least one type must be selected
    if (charset === '') {
        alert('Please select at least one character type!');
        return;
    }
    
    // Generate password character by character
    // LEARNING: for loop with random selection
    for (let i = 0; i < length; i++) {
        // Generate random index in charset range
        // LEARNING: Math.random() returns 0 to 0.999...
        // Multiply by length to get 0 to (length-0.001...)
        // Math.floor() rounds down to get whole number index
        // Example: charset.length = 10
        // Math.random() = 0.7
        // 0.7 * 10 = 7
        // Math.floor(7) = 7
        const randomIndex = Math.floor(Math.random() * charset.length);
        
        // Add random character to password
        password += charset[randomIndex];
    }
    
    // Display generated password
    generatedPasswordInput.value = password;
    
    // Calculate and display strength
    const strength = calculatePasswordStrength(password);
    displayGeneratedStrength(strength);
}

// ==============================================
// PASSWORD STRENGTH CALCULATION
// ==============================================

/**
 * Calculates password strength score (0-100)
 * LEARNING: Multi-criteria scoring algorithm
 * 
 * @param {string} password - Password to analyze
 * @returns {Object} { score, strength, checks }
 * 
 * Scoring criteria:
 * - Length points: 8+ (20pts), 12+ (10pts), 16+ (10pts)
 * - Character types: uppercase (15pts), lowercase (15pts), numbers (15pts), symbols (15pts)
 * - Character variety: unique chars (up to 20pts)
 * - Maximum score: 100
 */
function calculatePasswordStrength(password) {
    let score = 0;
    
    // Regular expression checks for different character types
    // LEARNING: regex.test(string) returns true if pattern found
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),         // Has capital letter
        lowercase: /[a-z]/.test(password),         // Has lowercase letter
        numbers: /[0-9]/.test(password),           // Has digit
        symbols: /[^A-Za-z0-9]/.test(password)     // Has non-alphanumeric
    };
    
    // Length-based scoring
    // LEARNING: Progressive scoring rewards longer passwords
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    if (password.length >= 16) score += 10;
    
    // Character type scoring
    if (checks.uppercase) score += 15;
    if (checks.lowercase) score += 15;
    if (checks.numbers) score += 15;
    if (checks.symbols) score += 15;
    
    // Character variety bonus
    // LEARNING: Set object automatically removes duplicates
    // "aabbcc".split('') → ['a','a','b','b','c','c']
    // new Set(['a','a','b','b','c','c']) → Set {'a', 'b', 'c'}
    // .size → 3 unique characters
    const uniqueChars = new Set(password).size;
    
    // Award points for variety (up to 20 points)
    // LEARNING: Math.min() prevents exceeding maximum
    score += Math.min(uniqueChars * 2, 20);
    
    // Cap score at 100
    score = Math.min(score, 100);
    
    // Categorize strength
    // LEARNING: Threshold-based categorization
    let strength;
    if (score < 40) strength = 'weak';
    else if (score < 70) strength = 'medium';
    else strength = 'strong';
    
    return { score, strength, checks };
}

/**
 * Displays strength for generated password
 * LEARNING: Dynamic styling based on calculated data
 * 
 * @param {Object} result - { score, strength, checks }
 */
function displayGeneratedStrength(result) {
    generatedStrength.classList.remove('hidden');
    
    const bar = document.getElementById('genStrengthBar');
    const text = document.getElementById('genStrengthText');
    
    // Set bar width to match score percentage
    // LEARNING: style.width with template literal
    bar.style.width = `${result.score}%`;
    
    // Set colors based on strength
    // LEARNING: Conditional styling
    if (result.strength === 'weak') {
        bar.style.background = '#fc8181';  // Red
        text.textContent = 'Weak';
        text.style.color = '#fc8181';
    } else if (result.strength === 'medium') {
        bar.style.background = '#ed8936';  // Orange
        text.textContent = 'Medium';
        text.style.color = '#ed8936';
    } else {
        bar.style.background = '#48bb78';  // Green
        text.textContent = 'Strong';
        text.style.color = '#48bb78';
    }
}

// ==============================================
// PASSWORD STRENGTH CHECKER
// ==============================================

/**
 * Checks strength of user-entered password
 * LEARNING: Real-time analysis on input
 */
function checkPasswordStrength() {
    const password = passwordInput.value;
    
    // Hide result if input is empty
    if (!password) {
        strengthResult.classList.add('hidden');
        return;
    }
    
    const result = calculatePasswordStrength(password);
    displayStrengthResult(result);
}

/**
 * Displays detailed strength analysis
 * LEARNING: Comprehensive UI update with multiple elements
 * 
 * @param {Object} result - { score, strength, checks }
 */
function displayStrengthResult(result) {
    strengthResult.classList.remove('hidden');
    
    const scoreCircle = document.getElementById('scoreCircle');
    const scoreValue = document.getElementById('scoreValue');
    const scoreLabel = document.getElementById('scoreLabel');
    const strengthBar = document.getElementById('strengthBar');
    const feedback = document.getElementById('feedback');
    
    // Display score
    scoreValue.textContent = result.score;
    strengthBar.style.width = `${result.score}%`;
    
    // Style based on strength category
    if (result.strength === 'weak') {
        scoreCircle.style.borderColor = '#fc8181';
        scoreLabel.textContent = 'Weak';
        scoreLabel.style.color = '#fc8181';
        strengthBar.style.background = '#fc8181';
        feedback.textContent = 'Your password is weak. Consider making it longer and including different character types.';
    } else if (result.strength === 'medium') {
        scoreCircle.style.borderColor = '#ed8936';
        scoreLabel.textContent = 'Medium';
        scoreLabel.style.color = '#ed8936';
        strengthBar.style.background = '#ed8936';
        feedback.textContent = 'Your password is decent but could be stronger. Try adding more variety in characters.';
    } else {
        scoreCircle.style.borderColor = '#48bb78';
        scoreLabel.textContent = 'Strong';
        scoreLabel.style.color = '#48bb78';
        strengthBar.style.background = '#48bb78';
        feedback.textContent = 'Excellent! Your password is strong and secure.';
    }
    
    // Update criterion checkmarks
    // LEARNING: toggle(class, condition) adds/removes class based on condition
    document.getElementById('criterion1').classList.toggle('met', result.checks.length);
    document.getElementById('criterion2').classList.toggle('met', result.checks.uppercase);
    document.getElementById('criterion3').classList.toggle('met', result.checks.lowercase);
    document.getElementById('criterion4').classList.toggle('met', result.checks.numbers);
    document.getElementById('criterion5').classList.toggle('met', result.checks.symbols);
}

// ==============================================
// CLIPBOARD FUNCTIONALITY
// ==============================================

/**
 * Copies generated password to clipboard
 * LEARNING: Modern Clipboard API with async/await alternative (promises)
 * 
 * Clipboard API:
 * - navigator.clipboard.writeText() returns a Promise
 * - .then() handles success
 * - .catch() handles errors
 */
function copyToClipboard() {
    const password = generatedPasswordInput.value;
    
    // Validation
    if (!password) {
        alert('Generate a password first!');
        return;
    }
    
    // Copy to clipboard
    // LEARNING: Clipboard API is asynchronous (returns Promise)
    navigator.clipboard.writeText(password)
        .then(() => {
            // Success - show visual feedback
            const originalText = copyPasswordBtn.textContent;
            copyPasswordBtn.textContent = '✓';
            
            // Reset button after 2 seconds
            // LEARNING: setTimeout(function, delay) executes after delay
            setTimeout(() => {
                copyPasswordBtn.textContent = originalText;
            }, 2000);  // 2000ms = 2 seconds
        })
        .catch(() => {
            // Error - notify user
            alert('Failed to copy password');
        });
}

// ==============================================
// PASSWORD VISIBILITY TOGGLE
// ==============================================

/**
 * Toggles password visibility in checker
 * LEARNING: Changing input type between 'password' and 'text'
 */
function togglePasswordVisibility() {
    // Toggle type
    // LEARNING: Ternary operator for toggle logic
    // condition ? valueIfTrue : valueIfFalse
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    // Update button icon
    togglePasswordBtn.textContent = type === 'password' ? '👁️' : '🙈';
}

// ==============================================
// EVENT LISTENERS
// ==============================================

/**
 * Button and input event handlers
 */
generateBtn.addEventListener('click', generatePassword);
copyPasswordBtn.addEventListener('click', copyToClipboard);

/**
 * Real-time strength checking as user types
 * LEARNING: input event fires on every keystroke
 */
passwordInput.addEventListener('input', checkPasswordStrength);

togglePasswordBtn.addEventListener('click', togglePasswordVisibility);

// ==============================================
// INITIALIZATION
// ==============================================

/**
 * Generate initial password on page load
 * LEARNING: Auto-populate for better UX
 */
generatePassword();
