const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const checkPalindromeBtn = document.getElementById('checkPalindrome');
const checkAnagramBtn = document.getElementById('checkAnagram');
const palindromeInput = document.getElementById('palindromeInput');
const anagramInput1 = document.getElementById('anagramInput1');
const anagramInput2 = document.getElementById('anagramInput2');

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

function normalizeString(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function checkPalindrome() {
    const input = palindromeInput.value.trim();
    
    if (!input) {
        alert('Please enter some text to check!');
        return;
    }
    
    const normalized = normalizeString(input);
    const reversed = normalized.split('').reverse().join('');
    const isPalindrome = normalized === reversed;
    
    displayPalindromeResult(input, normalized, reversed, isPalindrome);
}

function displayPalindromeResult(original, normalized, reversed, isPalindrome) {
    const resultCard = document.getElementById('palindromeResult');
    const icon = document.getElementById('palindromeIcon');
    const text = document.getElementById('palindromeText');
    
    resultCard.classList.remove('hidden', 'success', 'error');
    
    if (isPalindrome) {
        resultCard.classList.add('success');
        icon.textContent = '✓';
        text.textContent = 'Yes! This is a palindrome!';
    } else {
        resultCard.classList.add('error');
        icon.textContent = '✗';
        text.textContent = 'No, this is not a palindrome.';
    }
    
    document.getElementById('palindromeOriginal').textContent = original;
    document.getElementById('palindromeNormalized').textContent = normalized;
    document.getElementById('palindromeReversed').textContent = reversed;
}

function checkAnagram() {
    const input1 = anagramInput1.value.trim();
    const input2 = anagramInput2.value.trim();
    
    if (!input1 || !input2) {
        alert('Please enter both words/phrases to compare!');
        return;
    }
    
    const normalized1 = normalizeString(input1);
    const normalized2 = normalizeString(input2);
    
    const sorted1 = normalized1.split('').sort().join('');
    const sorted2 = normalized2.split('').sort().join('');
    
    const isAnagram = sorted1 === sorted2 && normalized1.length > 0;
    
    displayAnagramResult(normalized1, normalized2, isAnagram);
}

function displayAnagramResult(normalized1, normalized2, isAnagram) {
    const resultCard = document.getElementById('anagramResult');
    const icon = document.getElementById('anagramIcon');
    const text = document.getElementById('anagramText');
    
    resultCard.classList.remove('hidden', 'success', 'error');
    
    if (isAnagram) {
        resultCard.classList.add('success');
        icon.textContent = '✓';
        text.textContent = 'Yes! These are anagrams!';
    } else {
        resultCard.classList.add('error');
        icon.textContent = '✗';
        text.textContent = 'No, these are not anagrams.';
    }
    
    document.getElementById('anagram1Normalized').textContent = normalized1;
    document.getElementById('anagram2Normalized').textContent = normalized2;
    document.getElementById('anagramLetters').textContent = `${normalized1.length} letters`;
}

checkPalindromeBtn.addEventListener('click', checkPalindrome);
checkAnagramBtn.addEventListener('click', checkAnagram);

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

document.querySelectorAll('#palindrome .chip').forEach(chip => {
    chip.addEventListener('click', () => {
        const example = chip.dataset.example;
        palindromeInput.value = example;
        checkPalindrome();
    });
});

document.querySelectorAll('#anagram .chip').forEach(chip => {
    chip.addEventListener('click', () => {
        const pair = chip.dataset.pair.split(',');
        anagramInput1.value = pair[0];
        anagramInput2.value = pair[1];
        checkAnagram();
    });
});

