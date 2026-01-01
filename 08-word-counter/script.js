/**
 * ==============================================
 * WORD COUNTER - Learning Documentation
 * ==============================================
 * 
 * CONCEPTS COVERED:
 * - String Methods: split(), trim(), replace(), substring(), toUpperCase(), toLowerCase()
 * - Regular Expressions: /\s+/, /[.!?]+/, /\n\n+/, /\s/g
 * - Array Methods: filter(), reduce(), length
 * - Math Methods: ceil() for rounding up
 * - Blob API: Creating downloadable files
 * - URL.createObjectURL(): Creating temporary URLs for downloads
 * - File downloading: Programmatic link clicking
 * - Real-time calculation on input
 * 
 * KEY LEARNING POINTS:
 * 1. Text analysis with multiple metrics
 * 2. Regular expressions for splitting text
 * 3. reduce() for accumulation (sum, max)
 * 4. File creation and download with Blob API
 * 5. Character limits with validation
 */

// ==============================================
// DOM ELEMENTS
// ==============================================

const textInput = document.getElementById('textInput');

// Stat display elements
const characterCount = document.getElementById('characterCount');
const characterNoSpaces = document.getElementById('characterNoSpaces');
const wordCount = document.getElementById('wordCount');
const sentenceCount = document.getElementById('sentenceCount');
const paragraphCount = document.getElementById('paragraphCount');
const readingTime = document.getElementById('readingTime');
const lineCount = document.getElementById('lineCount');
const avgWordLength = document.getElementById('avgWordLength');
const longestWord = document.getElementById('longestWord');
const speakingTime = document.getElementById('speakingTime');

// Control elements
const characterLimit = document.getElementById('characterLimit');
const limitWarning = document.getElementById('limitWarning');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const uppercaseBtn = document.getElementById('uppercaseBtn');
const lowercaseBtn = document.getElementById('lowercaseBtn');

// ==============================================
// TEXT ANALYSIS FUNCTION
// ==============================================

/**
 * Calculates and displays comprehensive text statistics
 * LEARNING: Complex text analysis with multiple metrics
 * 
 * Metrics calculated:
 * 1. Character count (with and without spaces)
 * 2. Word count
 * 3. Sentence count
 * 4. Paragraph count
 * 5. Line count
 * 6. Reading time (based on 200 words/min)
 * 7. Speaking time (based on 130 words/min)
 * 8. Average word length
 * 9. Longest word
 */
function updateStats() {
    const text = textInput.value;
    const limit = parseInt(characterLimit.value);
    
    // ========== CHARACTER COUNT ==========
    // LEARNING: String.length property
    const chars = text.length;
    
    // Count characters excluding spaces
    // LEARNING: replace(/\s/g, '') removes all whitespace
    // /\s/ matches any whitespace (space, tab, newline)
    // g flag = global (replace all matches)
    const charsNoSpaces = text.replace(/\s/g, '').length;
    
    // ========== WORD COUNT ==========
    // LEARNING: Complex word counting with edge cases
    
    // Split by whitespace
    // /\s+/ matches one or more whitespace characters
    // Example: "hello  world" → ["hello", "world"]
    const words = text.trim() === '' ? [] : text.trim().split(/\s+/);
    
    // Handle edge case: empty string produces array with one empty string
    const wordCountValue = words.length === 1 && words[0] === '' ? 0 : words.length;
    
    // ========== SENTENCE COUNT ==========
    // LEARNING: Regex split with character class
    
    // Split by sentence terminators (. ! ?)
    // /[.!?]+/ matches one or more of these characters
    // filter() removes empty sentences
    // Example: "Hi! How are you? Good." → ["Hi", " How are you", " Good"]
    const sentences = text.split(/[.!?]+/).filter(s => s.trim() !== '').length;
    
    // ========== PARAGRAPH COUNT ==========
    // LEARNING: Double newline indicates paragraph break
    
    // /\n\n+/ matches two or more newlines (blank line)
    // Filter removes empty paragraphs
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim() !== '').length;
    
    // ========== LINE COUNT ==========
    // LEARNING: Count newline characters + 1
    
    // Each \n is a line break
    const lines = text === '' ? 0 : text.split('\n').length;
    
    // ========== READING TIME ==========
    // LEARNING: Average reading speed calculation
    
    // Average adult reading speed: 200 words per minute
    const readingSpeed = 200;
    
    // Math.ceil() rounds up (partial minute counts as full minute)
    const reading = Math.ceil(wordCountValue / readingSpeed);
    
    // ========== SPEAKING TIME ==========
    // Average speaking speed: 130 words per minute
    const speakingSpeed = 130;
    const speaking = Math.ceil(wordCountValue / speakingSpeed);
    
    // ========== AVERAGE WORD LENGTH & LONGEST WORD ==========
    let avgLength = 0;
    let longest = '-';
    
    if (wordCountValue > 0 && words[0] !== '') {
        // Calculate average word length
        // LEARNING: reduce() for summing values
        // reduce(accumulator, currentValue) => newAccumulator
        // Starts with 0, adds each word's length
        const totalChars = words.reduce((sum, word) => sum + word.length, 0);
        avgLength = (totalChars / wordCountValue).toFixed(1);
        
        // Find longest word
        // LEARNING: reduce() for finding maximum
        // Compares each word with current max, keeps longer one
        longest = words.reduce((max, word) => word.length > max.length ? word : max, '');
    }
    
    // ========== UPDATE DISPLAY ==========
    characterCount.textContent = chars;
    characterNoSpaces.textContent = charsNoSpaces;
    wordCount.textContent = wordCountValue;
    sentenceCount.textContent = sentences;
    paragraphCount.textContent = paragraphs;
    readingTime.textContent = reading;
    lineCount.textContent = lines;
    avgWordLength.textContent = avgLength;
    longestWord.textContent = longest;
    speakingTime.textContent = `${speaking} min`;
    
    // ========== CHARACTER LIMIT ENFORCEMENT ==========
    // LEARNING: Optional character limit with truncation
    
    if (limit > 0) {
        if (chars > limit) {
            // Exceeded limit: truncate text
            textInput.classList.add('limit-reached');
            limitWarning.classList.remove('hidden');
            
            // substring(0, limit) extracts first 'limit' characters
            // LEARNING: substring() for text truncation
            textInput.value = text.substring(0, limit);
            
            // Recalculate stats with truncated text
            updateStats();
        } else if (chars === limit) {
            // At limit: show warning but don't truncate
            textInput.classList.add('limit-reached');
            limitWarning.classList.remove('hidden');
        } else {
            // Under limit: remove warnings
            textInput.classList.remove('limit-reached');
            limitWarning.classList.add('hidden');
        }
    } else {
        // No limit set: remove warnings
        textInput.classList.remove('limit-reached');
        limitWarning.classList.add('hidden');
    }
}

// ==============================================
// TEXT MANIPULATION FUNCTIONS
// ==============================================

/**
 * Clears all text from textarea
 * LEARNING: Confirmation dialog for destructive action
 */
function clearText() {
    // Confirm only if there's text to clear
    // LEARNING: Short-circuit evaluation with &&
    if (textInput.value && !confirm('Are you sure you want to clear all text?')) {
        return;
    }
    
    textInput.value = '';
    updateStats();
    textInput.focus();  // Return focus to textarea
}

/**
 * Copies text to clipboard
 * LEARNING: Clipboard API with promise handling
 */
function copyText() {
    if (!textInput.value) {
        alert('Nothing to copy!');
        return;
    }
    
    // Copy to clipboard
    // LEARNING: Promise-based async operation
    navigator.clipboard.writeText(textInput.value)
        .then(() => {
            // Success feedback
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✓ Copied!';
            
            // Reset after 2 seconds
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        })
        .catch(() => {
            alert('Failed to copy text');
        });
}

/**
 * Downloads text as a .txt file
 * LEARNING: Blob API and programmatic file download
 * 
 * Steps:
 * 1. Create Blob (file in memory)
 * 2. Create temporary URL for Blob
 * 3. Create link element
 * 4. Programmatically click link to trigger download
 * 5. Clean up (remove link, revoke URL)
 */
function downloadText() {
    if (!textInput.value) {
        alert('Nothing to download!');
        return;
    }
    
    // Create Blob (file data in memory)
    // LEARNING: Blob represents file-like object of raw data
    // type: 'text/plain' specifies MIME type for .txt file
    const blob = new Blob([textInput.value], { type: 'text/plain' });
    
    // Create temporary URL for the Blob
    // LEARNING: URL.createObjectURL() creates a temporary URL pointing to Blob
    // URL format: "blob:http://example.com/uuid"
    const url = URL.createObjectURL(blob);
    
    // Create invisible download link
    const a = document.createElement('a');
    a.href = url;
    
    // Set filename with timestamp
    // LEARNING: Date.now() provides unique timestamp
    a.download = `text-${Date.now()}.txt`;
    
    // Add to DOM (required for click to work in some browsers)
    document.body.appendChild(a);
    
    // Programmatically click link to trigger download
    // LEARNING: .click() simulates user click
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    
    // Revoke URL to free memory
    // LEARNING: URL.revokeObjectURL() releases memory held by Blob URL
    URL.revokeObjectURL(url);
}

/**
 * Converts all text to uppercase
 * LEARNING: String transformation methods
 */
function convertToUppercase() {
    if (!textInput.value) return;
    
    // LEARNING: toUpperCase() returns new string with all caps
    textInput.value = textInput.value.toUpperCase();
    updateStats();
}

/**
 * Converts all text to lowercase
 */
function convertToLowercase() {
    if (!textInput.value) return;
    
    // LEARNING: toLowerCase() returns new string with all lowercase
    textInput.value = textInput.value.toLowerCase();
    updateStats();
}

// ==============================================
// EVENT LISTENERS
// ==============================================

/**
 * Real-time stats update as user types
 * LEARNING: input event fires on every change
 */
textInput.addEventListener('input', updateStats);

/**
 * Update stats when character limit changes
 */
characterLimit.addEventListener('change', updateStats);

/**
 * Action button handlers
 */
clearBtn.addEventListener('click', clearText);
copyBtn.addEventListener('click', copyText);
downloadBtn.addEventListener('click', downloadText);
uppercaseBtn.addEventListener('click', convertToUppercase);
lowercaseBtn.addEventListener('click', convertToLowercase);

// ==============================================
// INITIALIZATION
// ==============================================

/**
 * Calculate initial stats (shows zeros for empty textarea)
 */
updateStats();
