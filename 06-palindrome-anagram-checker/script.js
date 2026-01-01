/**
 * ==============================================
 * PALINDROME & ANAGRAM CHECKER - Learning Documentation
 * ==============================================
 * 
 * CONCEPTS COVERED:
 * - String Manipulation: split(), reverse(), join(), toLowerCase()
 * - Regular Expressions: /[^a-z0-9]/g pattern matching
 * - Array Methods: sort() for alphabetical ordering
 * - String Comparison: === for equality
 * - Tab System: Multiple tool interface
 * - Data Attributes: Storing example data in HTML
 * 
 * KEY LEARNING POINTS:
 * 1. Palindrome algorithm: compare string with its reverse
 * 2. Anagram algorithm: sort letters and compare
 * 3. String normalization: removing spaces/punctuation
 * 4. Regular expressions for pattern matching
 * 5. Method chaining: split().reverse().join()
 */

// ==============================================
// DOM ELEMENTS
// ==============================================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const checkPalindromeBtn = document.getElementById('checkPalindrome');
const checkAnagramBtn = document.getElementById('checkAnagram');
const palindromeInput = document.getElementById('palindromeInput');
const anagramInput1 = document.getElementById('anagramInput1');
const anagramInput2 = document.getElementById('anagramInput2');

// ==============================================
// TAB SYSTEM
// ==============================================

/**
 * Tab switching between Palindrome and Anagram checkers
 * LEARNING: Reusable tab pattern for multi-tool interfaces
 */
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        // Update button states
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update content visibility
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
// STRING NORMALIZATION
// ==============================================

/**
 * Normalizes string for comparison
 * LEARNING: Multiple string operations in sequence
 * 
 * @param {string} str - String to normalize
 * @returns {string} Lowercase alphanumeric string only
 * 
 * Steps:
 * 1. Convert to lowercase: "RaceCar" → "racecar"
 * 2. Remove non-alphanumeric: "A man, a plan" → "amanaplan"
 * 
 * Examples:
 * - "Madam" → "madam"
 * - "A Santa at NASA" → "asantaatnasa"
 * - "race-car" → "racecar"
 */
function normalizeString(str) {
    // LEARNING: Method chaining - operations execute left to right
    
    // Step 1: Convert to lowercase
    // toLowerCase() makes comparison case-insensitive
    // Step 2: Remove all non-alphanumeric characters
    // LEARNING: Regular expression /[^a-z0-9]/g
    // [^...] means "NOT these characters"
    // a-z = lowercase letters
    // 0-9 = digits
    // g flag = global (replace all matches, not just first)
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// ==============================================
// PALINDROME CHECKER
// ==============================================

/**
 * Checks if input is a palindrome
 * LEARNING: Palindrome algorithm - string equals its reverse
 * 
 * Algorithm:
 * 1. Normalize input (remove spaces, punctuation, lowercase)
 * 2. Reverse the normalized string
 * 3. Compare: if identical, it's a palindrome
 * 
 * Examples:
 * - "racecar" → "racecar" ✓ (same forwards and backwards)
 * - "A man, a plan, a canal: Panama" → "amanaplanacanalpanama" ✓
 * - "hello" → "olleh" ✗ (different)
 */
function checkPalindrome() {
    const input = palindromeInput.value.trim();
    
    // Validation
    if (!input) {
        alert('Please enter some text to check!');
        return;
    }
    
    // Normalize string (remove spaces, punctuation, lowercase)
    const normalized = normalizeString(input);
    
    // Reverse the string
    // LEARNING: String reversal technique
    // 1. split('') - convert string to array of characters
    //    "abc" → ['a', 'b', 'c']
    // 2. reverse() - reverse array order
    //    ['a', 'b', 'c'] → ['c', 'b', 'a']
    // 3. join('') - convert array back to string
    //    ['c', 'b', 'a'] → "cba"
    const reversed = normalized.split('').reverse().join('');
    
    // Check if palindrome
    // LEARNING: Simple string comparison
    const isPalindrome = normalized === reversed;
    
    // Display result
    displayPalindromeResult(input, normalized, reversed, isPalindrome);
}

/**
 * Displays palindrome check result
 * LEARNING: Conditional UI updates with success/error states
 * 
 * @param {string} original - Original input
 * @param {string} normalized - Normalized string
 * @param {string} reversed - Reversed string
 * @param {boolean} isPalindrome - Check result
 */
function displayPalindromeResult(original, normalized, reversed, isPalindrome) {
    const resultCard = document.getElementById('palindromeResult');
    const icon = document.getElementById('palindromeIcon');
    const text = document.getElementById('palindromeText');
    
    // Remove all previous state classes
    // LEARNING: classList.remove() can take multiple arguments
    resultCard.classList.remove('hidden', 'success', 'error');
    
    if (isPalindrome) {
        // Success state
        resultCard.classList.add('success');
        icon.textContent = '✓';
        text.textContent = 'Yes! This is a palindrome!';
    } else {
        // Error state
        resultCard.classList.add('error');
        icon.textContent = '✗';
        text.textContent = 'No, this is not a palindrome.';
    }
    
    // Display analysis details
    document.getElementById('palindromeOriginal').textContent = original;
    document.getElementById('palindromeNormalized').textContent = normalized;
    document.getElementById('palindromeReversed').textContent = reversed;
}

// ==============================================
// ANAGRAM CHECKER
// ==============================================

/**
 * Checks if two inputs are anagrams
 * LEARNING: Anagram algorithm - sorted letters are identical
 * 
 * Algorithm:
 * 1. Normalize both inputs
 * 2. Sort letters alphabetically in each
 * 3. Compare: if identical when sorted, they're anagrams
 * 
 * Examples:
 * - "listen" → "eilnst", "silent" → "eilnst" ✓ (same letters)
 * - "earth" → "aehrt", "heart" → "aehrt" ✓
 * - "hello" → "ehllo", "world" → "dlorw" ✗ (different letters)
 */
function checkAnagram() {
    const input1 = anagramInput1.value.trim();
    const input2 = anagramInput2.value.trim();
    
    // Validation
    if (!input1 || !input2) {
        alert('Please enter both words/phrases to compare!');
        return;
    }
    
    // Normalize both inputs
    const normalized1 = normalizeString(input1);
    const normalized2 = normalizeString(input2);
    
    // Sort letters alphabetically
    // LEARNING: String → Array → Sort → String
    // "listen" → ['l','i','s','t','e','n'] → ['e','i','l','n','s','t'] → "eilnst"
    const sorted1 = normalized1.split('').sort().join('');
    const sorted2 = normalized2.split('').sort().join('');
    
    // Check if anagrams
    // LEARNING: Two conditions with && (AND)
    // 1. Sorted strings must match
    // 2. Length must be > 0 (reject empty strings)
    const isAnagram = sorted1 === sorted2 && normalized1.length > 0;
    
    // Display result
    displayAnagramResult(normalized1, normalized2, isAnagram);
}

/**
 * Displays anagram check result
 * LEARNING: Similar pattern to palindrome result display
 * 
 * @param {string} normalized1 - First normalized string
 * @param {string} normalized2 - Second normalized string
 * @param {boolean} isAnagram - Check result
 */
function displayAnagramResult(normalized1, normalized2, isAnagram) {
    const resultCard = document.getElementById('anagramResult');
    const icon = document.getElementById('anagramIcon');
    const text = document.getElementById('anagramText');
    
    // Clear previous states
    resultCard.classList.remove('hidden', 'success', 'error');
    
    if (isAnagram) {
        // Success state
        resultCard.classList.add('success');
        icon.textContent = '✓';
        text.textContent = 'Yes! These are anagrams!';
    } else {
        // Error state
        resultCard.classList.add('error');
        icon.textContent = '✗';
        text.textContent = 'No, these are not anagrams.';
    }
    
    // Display analysis details
    document.getElementById('anagram1Normalized').textContent = normalized1;
    document.getElementById('anagram2Normalized').textContent = normalized2;
    document.getElementById('anagramLetters').textContent = `${normalized1.length} letters`;
}

// ==============================================
// EVENT LISTENERS
// ==============================================

/**
 * Check button handlers
 */
checkPalindromeBtn.addEventListener('click', checkPalindrome);
checkAnagramBtn.addEventListener('click', checkAnagram);

/**
 * Enter key support
 * LEARNING: Keyboard shortcuts for better UX
 */
palindromeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkPalindrome();
    }
});

anagramInput2.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnagram();
    }
});

/**
 * Example chip handlers - Palindrome
 * LEARNING: Pre-filled examples for quick testing
 */
document.querySelectorAll('#palindrome .chip').forEach(chip => {
    chip.addEventListener('click', () => {
        // Get example from data attribute
        // LEARNING: data-example stores the example text
        const example = chip.dataset.example;
        
        // Fill input and run check
        palindromeInput.value = example;
        checkPalindrome();
    });
});

/**
 * Example chip handlers - Anagram
 * LEARNING: Parsing comma-separated values from data attribute
 */
document.querySelectorAll('#anagram .chip').forEach(chip => {
    chip.addEventListener('click', () => {
        // Parse word pair from data attribute
        // LEARNING: data-pair stores "word1,word2"
        // split(',') converts to array ['word1', 'word2']
        const pair = chip.dataset.pair.split(',');
        
        // Fill both inputs
        anagramInput1.value = pair[0];
        anagramInput2.value = pair[1];
        
        // Run check
        checkAnagram();
    });
});
