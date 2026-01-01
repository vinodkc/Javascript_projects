const textInput = document.getElementById('textInput');
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
const characterLimit = document.getElementById('characterLimit');
const limitWarning = document.getElementById('limitWarning');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const uppercaseBtn = document.getElementById('uppercaseBtn');
const lowercaseBtn = document.getElementById('lowercaseBtn');

function updateStats() {
    const text = textInput.value;
    const limit = parseInt(characterLimit.value);
    
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    
    const words = text.trim() === '' ? [] : text.trim().split(/\s+/);
    const wordCountValue = words.length === 1 && words[0] === '' ? 0 : words.length;
    
    const sentences = text.split(/[.!?]+/).filter(s => s.trim() !== '').length;
    
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim() !== '').length;
    
    const lines = text === '' ? 0 : text.split('\n').length;
    
    const readingSpeed = 200;
    const reading = Math.ceil(wordCountValue / readingSpeed);
    
    const speakingSpeed = 130;
    const speaking = Math.ceil(wordCountValue / speakingSpeed);
    
    let avgLength = 0;
    let longest = '-';
    
    if (wordCountValue > 0 && words[0] !== '') {
        const totalChars = words.reduce((sum, word) => sum + word.length, 0);
        avgLength = (totalChars / wordCountValue).toFixed(1);
        
        longest = words.reduce((max, word) => word.length > max.length ? word : max, '');
    }
    
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
    
    if (limit > 0) {
        if (chars > limit) {
            textInput.classList.add('limit-reached');
            limitWarning.classList.remove('hidden');
            textInput.value = text.substring(0, limit);
            updateStats();
        } else if (chars === limit) {
            textInput.classList.add('limit-reached');
            limitWarning.classList.remove('hidden');
        } else {
            textInput.classList.remove('limit-reached');
            limitWarning.classList.add('hidden');
        }
    } else {
        textInput.classList.remove('limit-reached');
        limitWarning.classList.add('hidden');
    }
}

function clearText() {
    if (textInput.value && !confirm('Are you sure you want to clear all text?')) {
        return;
    }
    textInput.value = '';
    updateStats();
    textInput.focus();
}

function copyText() {
    if (!textInput.value) {
        alert('Nothing to copy!');
        return;
    }
    
    navigator.clipboard.writeText(textInput.value).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(() => {
        alert('Failed to copy text');
    });
}

function downloadText() {
    if (!textInput.value) {
        alert('Nothing to download!');
        return;
    }
    
    const blob = new Blob([textInput.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `text-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function convertToUppercase() {
    if (!textInput.value) return;
    textInput.value = textInput.value.toUpperCase();
    updateStats();
}

function convertToLowercase() {
    if (!textInput.value) return;
    textInput.value = textInput.value.toLowerCase();
    updateStats();
}

textInput.addEventListener('input', updateStats);
characterLimit.addEventListener('change', updateStats);
clearBtn.addEventListener('click', clearText);
copyBtn.addEventListener('click', copyText);
downloadBtn.addEventListener('click', downloadText);
uppercaseBtn.addEventListener('click', convertToUppercase);
lowercaseBtn.addEventListener('click', convertToLowercase);

updateStats();

