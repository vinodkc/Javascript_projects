# Palindrome & Anagram Checker

A powerful dual-purpose string analyzer that checks for palindromes and anagrams with intelligent string normalization. Learn string manipulation, algorithms, and regular expressions!

## 🎯 Learning Objectives

By completing this project, you will:
- Master string manipulation methods (split, join, reverse, sort)
- Learn regular expressions for pattern matching and text cleaning
- Understand algorithmic thinking (palindromes and anagrams)
- Implement string normalization techniques
- Work with multiple algorithms and compare their efficiency
- Create educational UIs that show step-by-step transformations

## 📚 What You'll Learn

### Core Concepts
1. **String Algorithms**: Palindrome checking and anagram detection
2. **Regular Expressions**: Pattern matching to clean and normalize text
3. **Array Methods**: split(), reverse(), join(), sort()
4. **Algorithm Complexity**: Understanding time and space complexity
5. **String Normalization**: Case-insensitive, punctuation removal
6. **Multiple Approaches**: Different algorithmsfor the same problem (two pointers vs reverse, sorting vs character count)

### Skills Developed
- String method chaining (`.toLowerCase().replace().split()`)
- Regular expression patterns (`/[^a-z0-9]/g`)
- Algorithm implementation (two-pointer technique, character frequency)
- Visual result presentation with step-by-step breakdown
- Input validation and edge case handling
- Tab-based interface navigation

## 🔧 Implementation Explanation

### How It Works

**1. String Normalization (Core Function)**
```javascript
normalizeString(str):
  - Convert to lowercase
  - Remove spaces, punctuation, special characters
  - Keep only letters and numbers
  Uses: .toLowerCase() + .replace(/[^a-z0-9]/g, '')
```

**2. Palindrome Algorithm**
```
Input → Normalize → Reverse → Compare
```
- Split string into array of characters
- Reverse the array
- Join back to string
- Compare original normalized with reversed

**3. Two-Pointer Palindrome (Alternative)**
- Start from both ends
- Compare characters moving inward
- More efficient (O(1) space vs O(n))

**4. Anagram Algorithm**
```
Input 1, Input 2 → Normalize Both → Sort → Compare
```
- Normalize both strings
- Convert to character arrays
- Sort alphabetically
- Compare sorted strings

**5. Character Count Anagram (Alternative)**
- Count frequency of each character in string 1
- Decrement counts for each character in string 2
- If all counts are zero, it's an anagram
- More efficient for long strings

**6. Visual Feedback System**
- Shows original text
- Shows normalized text
- Shows transformed text (reversed/sorted)
- Color-coded success/failure
- Educational breakdown of steps

## 🎯 Features

### Palindrome Checker
- ✅ Check if text reads the same forwards and backwards
- ✅ **Case-insensitive** checking
- ✅ **Ignores** spaces, punctuation, and special characters
- ✅ Shows original, normalized, and reversed text
- ✅ Visual success/failure indication with colors
- ✅ Quick example buttons for testing
- ✅ Detailed step-by-step breakdown
- ✅ Instant feedback as you type

### Anagram Checker
- ✅ Compare two words/phrases for anagram detection
- ✅ **Case-insensitive** comparison
- ✅ **Ignores** spaces and special characters
- ✅ Shows normalized versions of both inputs
- ✅ Displays alphabetically sorted letters
- ✅ Letter count comparison
- ✅ Pre-loaded famous examples
- ✅ Side-by-side comparison view

## 📖 Further Learning - W3Schools

- [JavaScript String Methods](https://www.w3schools.com/js/js_string_methods.asp)
- [JavaScript Array split()](https://www.w3schools.com/jsref/jsref_split.asp)
- [JavaScript Array reverse()](https://www.w3schools.com/jsref/jsref_reverse.asp)
- [JavaScript Array sort()](https://www.w3schools.com/jsref/jsref_sort.asp)
- [JavaScript Regular Expressions](https://www.w3schools.com/js/js_regexp.asp)
- [JavaScript toLowerCase()](https://www.w3schools.com/jsref/jsref_tolowercase.asp)
- [JavaScript replace()](https://www.w3schools.com/jsref/jsref_replace.asp)

## 🚀 How to Use

### Palindrome Checker
1. Open `index.html` in your browser
2. Enter a word or phrase in the text field
3. Click "Check Palindrome" or press **Enter**
4. View the comprehensive result:
   - Original text
   - Normalized text (cleaned)
   - Reversed text
   - Palindrome status (Yes/No)
5. Try example buttons for instant testing:
   - "racecar" (simple palindrome)
   - "A man a plan a canal Panama" (phrase palindrome)
   - "Was it a car or a cat I saw?" (with punctuation)

### Anagram Checker
1. Click the **"Anagram Checker"** tab
2. Enter the first word or phrase
3. Enter the second word or phrase
4. Click "Check Anagram" or press **Enter**
5. View the detailed comparison:
   - Both normalized texts
   - Alphabetically sorted letters
   - Letter count
   - Anagram status (Yes/No)
6. Use example buttons to test famous anagrams:
   - "listen" ↔ "silent"
   - "dormitory" ↔ "dirty room"
   - "astronomer" ↔ "moon starer"

## 📚 Concepts & Learning Points

### HTML Concepts Used

#### 1. Tab System for Multiple Tools
```html
<div class="tabs">
    <button class="tab-btn active" data-tab="palindrome">
        Palindrome Checker
    </button>
    <button class="tab-btn" data-tab="anagram">
        Anagram Checker
    </button>
</div>

<div id="palindrome-checker" class="tab-content active">
    <!-- Palindrome UI -->
</div>

<div id="anagram-checker" class="tab-content">
    <!-- Anagram UI -->
</div>
```
**Benefits:**
- Single page, multiple tools
- Clean, organized interface
- Easy navigation

#### 2. Example Buttons with Data Attributes
```html
<!-- Palindrome examples -->
<button class="example-btn" data-text="racecar">racecar</button>
<button class="example-btn" data-text="A man a plan a canal Panama">
    Panama palindrome
</button>

<!-- Anagram examples -->
<button class="example-btn" 
        data-text1="listen" 
        data-text2="silent">
    listen ↔ silent
</button>
```
**`data-*` attributes**: Store example data directly in HTML for easy access

#### 3. Result Display Areas
```html
<div class="result success">
    <div class="result-icon">✓</div>
    <div class="result-message">Yes, it's a palindrome!</div>
    <div class="result-details">
        <p><strong>Original:</strong> <span id="originalText"></span></p>
        <p><strong>Normalized:</strong> <span id="normalizedText"></span></p>
        <p><strong>Reversed:</strong> <span id="reversedText"></span></p>
    </div>
</div>
```
**Dynamic classes**: `.success` or `.failure` for color coding

### CSS Concepts Used

#### 1. Tab Styling with Active States
```css
.tab-btn {
    padding: 12px 30px;
    background: transparent;
    border: none;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
}

.tab-btn.active {
    border-bottom-color: #667eea;
    color: #667eea;
    font-weight: bold;
}

.tab-btn:hover:not(.active) {
    border-bottom-color: #cbd5e0;
}
```
**Key techniques:**
- Bottom border for active indicator
- `:hover:not(.active)` for non-active hover effect
- Smooth transitions

#### 2. Success/Failure Color Coding
```css
.result {
    padding: 20px;
    border-radius: 10px;
    margin-top: 20px;
}

.result.success {
    background: #d1fae5;
    border: 2px solid #10b981;
    color: #065f46;
}

.result.failure {
    background: #fee2e2;
    border: 2px solid #ef4444;
    color: #991b1b;
}
```
**Visual feedback**: Immediate understanding through color

#### 3. Example Button Grid
```css
.examples {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
    margin-top: 15px;
}

.example-btn {
    padding: 10px 15px;
    background: #f3f4f6;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
}

.example-btn:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
}
```
**Responsive grid**: Adapts to available space automatically

### JavaScript Concepts Used

#### 1. String Normalization (Core Algorithm)
```javascript
function normalizeString(str) {
    return str
        .toLowerCase()              // Convert to lowercase
        .replace(/[^a-z0-9]/g, ''); // Remove non-alphanumeric characters
}

// Examples:
normalizeString("Hello World!")           // "helloworld"
normalizeString("A man, a plan!")         // "amanplan"
normalizeString("Was it a cat I saw?")    // "wasitacatisaw"
```

**Step-by-step breakdown:**
1. **`toLowerCase()`**: "Hello" → "hello"
2. **`replace(/[^a-z0-9]/g, '')`**: Remove everything that's NOT a letter or number

**Regular expression explained:**
- `/[^a-z0-9]/g`
  - `[^...]` = NOT (negation)
  - `a-z` = lowercase letters
  - `0-9` = digits
  - `g` = global (all occurrences)
- **Meaning**: "Remove anything that's not a-z or 0-9"

**What gets removed:**
- Spaces: " "
- Punctuation: , . ! ? ; :
- Special characters: @ # $ % & *
- Uppercase letters: Converted to lowercase first

#### 2. Palindrome Algorithm
```javascript
function isPalindrome(str) {
    // Step 1: Normalize the string
    const normalized = normalizeString(str);
    
    // Step 2: Reverse the normalized string
    const reversed = normalized.split('').reverse().join('');
    
    // Step 3: Compare
    return normalized === reversed;
}

// Example walkthrough: "A man a plan a canal Panama"
// Step 1: normalizeString() → "amanaplanacanalpanama"
// Step 2: 
//   split('') → ["a","m","a","n",..."a","m","a"]
//   reverse() → ["a","m","a",..."n","a","m","a"]
//   join('') → "amanaplanacanalpanama"
// Step 3: "amanaplanacanalpanama" === "amanaplanacanalpanama" → true!
```

**Array method chain explained:**
1. **`split('')`**: Convert string to array of characters
   ```javascript
   "abc".split('')  // ["a", "b", "c"]
   ```

2. **`reverse()`**: Reverse array in place
   ```javascript
   ["a", "b", "c"].reverse()  // ["c", "b", "a"]
   ```

3. **`join('')`**: Combine array back to string
   ```javascript
   ["c", "b", "a"].join('')  // "cba"
   ```

**Complete example:**
```javascript
isPalindrome("racecar")
// Normalized: "racecar"
// Reversed: "racecar"
// Result: true ✓

isPalindrome("hello")
// Normalized: "hello"
// Reversed: "olleh"
// Result: false ✗

isPalindrome("A man, a plan, a canal: Panama")
// Normalized: "amanaplanacanalpanama"
// Reversed: "amanaplanacanalpanama"
// Result: true ✓
```

#### 3. Alternative Palindrome Algorithm (Two Pointers)
```javascript
function isPalindromeTwoPointers(str) {
    const normalized = normalizeString(str);
    let left = 0;
    let right = normalized.length - 1;
    
    // Check characters from both ends moving inward
    while (left < right) {
        if (normalized[left] !== normalized[right]) {
            return false;  // Mismatch found
        }
        left++;
        right--;
    }
    
    return true;  // All characters matched
}

// Example: "racecar"
// r a c e c a r
// ↑           ↑  left=0, right=6: 'r' === 'r' ✓
//   ↑       ↑    left=1, right=5: 'a' === 'a' ✓
//     ↑   ↑      left=2, right=4: 'c' === 'c' ✓
//       ↑        left=3, right=3: stop (left === right)
// Result: true!
```
**Benefits**: More efficient (O(n/2) vs O(n)), no extra array creation

#### 4. Anagram Algorithm
```javascript
function areAnagrams(str1, str2) {
    // Step 1: Normalize both strings
    const normalized1 = normalizeString(str1);
    const normalized2 = normalizeString(str2);
    
    // Step 2: Check if lengths match (quick optimization)
    if (normalized1.length !== normalized2.length) {
        return false;
    }
    
    // Step 3: Sort characters alphabetically
    const sorted1 = normalized1.split('').sort().join('');
    const sorted2 = normalized2.split('').sort().join('');
    
    // Step 4: Compare sorted strings
    return sorted1 === sorted2;
}

// Example walkthrough: "listen" and "silent"
// Step 1: Both normalize to "listen" and "silent"
// Step 2: Both length 6 ✓
// Step 3:
//   "listen".split('') → ["l","i","s","t","e","n"]
//   .sort() → ["e","i","l","n","s","t"]
//   .join('') → "eilnst"
//   
//   "silent".split('') → ["s","i","l","e","n","t"]
//   .sort() → ["e","i","l","n","s","t"]
//   .join('') → "eilnst"
// Step 4: "eilnst" === "eilnst" → true!
```

**Why sorting works:**
- Anagrams have the same letters in different order
- Sorting arranges letters identically if same letters present
- Easy comparison after sorting

**Visual example:**
```
"dormitory" → normalize → "dormitory"
              sort     → "dimoorty"

"dirty room" → normalize → "dirtyroom"
               sort     → "dimoorty"

"dimoorty" === "dimoorty" → Anagram! ✓
```

#### 5. Alternative Anagram Algorithm (Character Count)
```javascript
function areAnagramsCharCount(str1, str2) {
    const normalized1 = normalizeString(str1);
    const normalized2 = normalizeString(str2);
    
    if (normalized1.length !== normalized2.length) {
        return false;
    }
    
    // Count character frequencies
    const charCount = {};
    
    // Increment for first string
    for (let char of normalized1) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    // Decrement for second string
    for (let char of normalized2) {
        if (!charCount[char]) {
            return false;  // Character not in first string
        }
        charCount[char]--;
    }
    
    // Check if all counts are zero
    return Object.values(charCount).every(count => count === 0);
}

// Example: "listen" and "silent"
// After first loop: {l:1, i:1, s:1, t:1, e:1, n:1}
// After second loop: {l:0, i:0, s:0, t:0, e:0, n:0}
// All zeros → Anagram! ✓
```
**Benefit**: Slightly more efficient for very long strings (O(n) vs O(n log n))

#### 6. Event Handling with Example Buttons
```javascript
// Palindrome example buttons
document.querySelectorAll('.palindrome-example').forEach(button => {
    button.addEventListener('click', () => {
        const exampleText = button.dataset.text;
        document.getElementById('palindromeInput').value = exampleText;
        checkPalindrome();  // Auto-check
    });
});

// Anagram example buttons
document.querySelectorAll('.anagram-example').forEach(button => {
    button.addEventListener('click', () => {
        const text1 = button.dataset.text1;
        const text2 = button.dataset.text2;
        document.getElementById('anagramInput1').value = text1;
        document.getElementById('anagramInput2').value = text2;
        checkAnagram();  // Auto-check
    });
});
```
**Pattern**: Pre-fill inputs and auto-trigger check for seamless UX

#### 7. Result Display with Visual Feedback
```javascript
function displayPalindromeResult(original, normalized, reversed, isPalindrome) {
    const resultDiv = document.getElementById('palindromeResult');
    
    // Clear previous result
    resultDiv.className = 'result';
    
    // Add success or failure class
    resultDiv.classList.add(isPalindrome ? 'success' : 'failure');
    
    // Build result HTML
    resultDiv.innerHTML = `
        <div class="result-icon">${isPalindrome ? '✓' : '✗'}</div>
        <div class="result-message">
            ${isPalindrome ? 'Yes, it\'s a palindrome!' : 'No, not a palindrome.'}
        </div>
        <div class="result-details">
            <p><strong>Original:</strong> "${original}"</p>
            <p><strong>Normalized:</strong> "${normalized}"</p>
            <p><strong>Reversed:</strong> "${reversed}"</p>
            <p><strong>Match:</strong> ${normalized} ${isPalindrome ? '===' : '!=='} ${reversed}</p>
        </div>
    `;
    
    // Show result with animation
    resultDiv.style.display = 'block';
    setTimeout(() => resultDiv.classList.add('show'), 10);
}
```
**Educational value**: Shows transformation steps, not just yes/no

#### 8. Input Validation
```javascript
function checkPalindrome() {
    const input = document.getElementById('palindromeInput').value.trim();
    
    // Validate input
    if (!input) {
        alert('Please enter some text!');
        return;
    }
    
    const normalized = normalizeString(input);
    
    // Check if anything left after normalization
    if (!normalized) {
        alert('Please enter letters or numbers!');
        return;
    }
    
    // Perform check
    const reversed = normalized.split('').reverse().join('');
    const result = normalized === reversed;
    
    displayPalindromeResult(input, normalized, reversed, result);
}
```
**Validation checks:**
1. Not empty (`.trim()` removes whitespace)
2. Contains alphanumeric characters after normalization

### Regular Expressions Deep Dive

#### Understanding `/[^a-z0-9]/g`

```javascript
// Character class: [...]
// Negation: ^
// Range: a-z, 0-9
// Global flag: g

const regex = /[^a-z0-9]/g;

"Hello, World!".replace(regex, '')  // "helloworld"
//      ^      ^ removed
//           ^^ removed

"Test123!@#".replace(regex, '')     // "test123"
//         ^^^^ removed
```

**Breaking it down:**
- `[a-z0-9]` - matches letters and numbers
- `[^a-z0-9]` - matches everything EXCEPT letters and numbers
- `g` flag - replace ALL matches, not just first

**Other useful patterns:**
```javascript
// Remove only punctuation
str.replace(/[.,!?;:]/g, '')

// Remove only spaces
str.replace(/\s/g, '')

// Remove digits
str.replace(/\d/g, '')

// Keep only letters (remove numbers too)
str.replace(/[^a-z]/gi, '')  // i flag = case-insensitive
```

## 🔍 Algorithm Complexity

### Palindrome Check
- **Time**: O(n) where n = string length
- **Space**: O(n) for reversed string
- **Alternative (two pointers)**: O(1) space

### Anagram Check
- **Time**: O(n log n) due to sorting
- **Space**: O(n) for sorted strings
- **Alternative (character count)**: O(n) time, O(k) space (k = unique chars)

## 🎯 Examples & Test Cases

### Palindrome Examples

#### Simple Words
```
"racecar" → "racecar" → ✓ Palindrome
"level"   → "level"   → ✓ Palindrome
"hello"   → "olleh"   → ✗ Not palindrome
```

#### Phrases (spaces ignored)
```
"race car" → "racecar" → ✓ Palindrome
"taco cat" → "tacocat" → ✓ Palindrome
"hello world" → "olleh dlrow" → ✗ Not palindrome
```

#### With Punctuation
```
"A man, a plan, a canal: Panama"
→ normalize: "amanaplanacanalpanama"
→ reverse: "amanaplanacanalpanama"
→ ✓ Palindrome!

"Was it a car or a cat I saw?"
→ normalize: "wasitacaroracatisaw"
→ reverse: "wasitacaroracatisaw"
→ ✓ Palindrome!
```

#### Case-Insensitive
```
"RaceCar" → "racecar" → ✓ Palindrome
"No lemon, no melon" → "nolemonomelon" → ✓ Palindrome
```

### Anagram Examples

#### Simple Anagrams
```
"listen" ↔ "silent"
→ both sort to "eilnst" → ✓ Anagrams!

"elbow" ↔ "below"
→ both sort to "below" → ✓ Anagrams!

"hello" ↔ "world"
→ different letters → ✗ Not anagrams
```

#### Phrase Anagrams
```
"dormitory" ↔ "dirty room"
→ normalize: "dormitory" ↔ "dirtyroom"
→ both sort to "dimoorty" → ✓ Anagrams!

"astronomer" ↔ "moon starer"
→ normalize: "astronomer" ↔ "moonstarer"
→ both sort to "aemnooorrst" → ✓ Anagrams!

"conversation" ↔ "voices rant on"
→ normalize: "conversation" ↔ "voicesranton"
→ both sort to "aceinnooorstv" → ✓ Anagrams!
```

#### Non-Anagrams
```
"hello" ↔ "goodbye"
→ different letter counts → ✗ Not anagrams

"abc" ↔ "abcd"
→ different lengths → ✗ Not anagrams
```

## 💡 Key Takeaways

### String Methods Used
```javascript
str.toLowerCase()           // Convert to lowercase
str.toUpperCase()           // Convert to uppercase
str.replace(regex, '')      // Replace matching patterns
str.trim()                  // Remove leading/trailing spaces
str.split('')               // Convert to character array
str.split(' ')              // Split by spaces
arr.join('')                // Combine array to string
arr.reverse()               // Reverse array
arr.sort()                  // Sort array alphabetically
```

### Best Practices Demonstrated

1. **String Normalization**: Standardize input before processing
2. **Method Chaining**: Combine operations efficiently
3. **Regular Expressions**: Powerful pattern matching
4. **Visual Feedback**: Show transformation steps
5. **Input Validation**: Check for edge cases
6. **Code Reusability**: Single `normalizeString()` for both tools
7. **User Experience**: Example buttons, instant results
8. **Algorithm Choice**: Multiple approaches shown

### Common Patterns

**Pattern 1: Normalize → Process → Compare**
```javascript
const normalized = normalizeString(input);
const processed = processString(normalized);
return compare(normalized, processed);
```

**Pattern 2: String to Array to String**
```javascript
str.split('').methodName().join('')
```

**Pattern 3: Character Counting**
```javascript
const count = {};
for (let char of str) {
    count[char] = (count[char] || 0) + 1;
}
```

## 🚀 Future Enhancement Ideas

- [ ] Letter frequency visualization with charts
- [ ] Support for Unicode/emoji characters
- [ ] Palindrome/anagram generator tool
- [ ] History of checked strings with localStorage
- [ ] Export results as text or image
- [ ] Phonetic palindrome checker ("eye" vs "I")
- [ ] Multi-word anagram solver (find all anagrams)
- [ ] Anagram dictionary lookup via API
- [ ] Performance comparison (different algorithms)
- [ ] Educational mode with step-by-step visualization
- [ ] Challenge mode: Find the palindrome/anagram
- [ ] Support for multiple languages

## 🐛 Edge Cases Handled

✅ Empty strings  
✅ Only special characters  
✅ Mixed case  
✅ Very long strings  
✅ Numbers included  
✅ Spaces and punctuation  
✅ Single character  
✅ Different length strings (anagram)

---

**Master String Manipulation! 🔤🔄**
