const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const generateBtn = document.getElementById('generateBtn');
const copyPasswordBtn = document.getElementById('copyPassword');
const generatedPasswordInput = document.getElementById('generatedPassword');
const passwordLengthSlider = document.getElementById('passwordLength');
const lengthValue = document.getElementById('lengthValue');
const includeUppercase = document.getElementById('includeUppercase');
const includeLowercase = document.getElementById('includeLowercase');
const includeNumbers = document.getElementById('includeNumbers');
const includeSymbols = document.getElementById('includeSymbols');
const passwordInput = document.getElementById('passwordInput');
const togglePasswordBtn = document.getElementById('togglePassword');
const strengthResult = document.getElementById('strengthResult');
const generatedStrength = document.getElementById('generatedStrength');

const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

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

passwordLengthSlider.addEventListener('input', () => {
    lengthValue.textContent = passwordLengthSlider.value;
});

function generatePassword() {
    const length = parseInt(passwordLengthSlider.value);
    let charset = '';
    let password = '';
    
    if (includeUppercase.checked) charset += uppercaseChars;
    if (includeLowercase.checked) charset += lowercaseChars;
    if (includeNumbers.checked) charset += numberChars;
    if (includeSymbols.checked) charset += symbolChars;
    
    if (charset === '') {
        alert('Please select at least one character type!');
        return;
    }
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    
    generatedPasswordInput.value = password;
    
    const strength = calculatePasswordStrength(password);
    displayGeneratedStrength(strength);
}

function calculatePasswordStrength(password) {
    let score = 0;
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        numbers: /[0-9]/.test(password),
        symbols: /[^A-Za-z0-9]/.test(password)
    };
    
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    if (password.length >= 16) score += 10;
    
    if (checks.uppercase) score += 15;
    if (checks.lowercase) score += 15;
    if (checks.numbers) score += 15;
    if (checks.symbols) score += 15;
    
    const uniqueChars = new Set(password).size;
    score += Math.min(uniqueChars * 2, 20);
    
    score = Math.min(score, 100);
    
    let strength;
    if (score < 40) strength = 'weak';
    else if (score < 70) strength = 'medium';
    else strength = 'strong';
    
    return { score, strength, checks };
}

function displayGeneratedStrength(result) {
    generatedStrength.classList.remove('hidden');
    
    const bar = document.getElementById('genStrengthBar');
    const text = document.getElementById('genStrengthText');
    
    bar.style.width = `${result.score}%`;
    
    if (result.strength === 'weak') {
        bar.style.background = '#fc8181';
        text.textContent = 'Weak';
        text.style.color = '#fc8181';
    } else if (result.strength === 'medium') {
        bar.style.background = '#ed8936';
        text.textContent = 'Medium';
        text.style.color = '#ed8936';
    } else {
        bar.style.background = '#48bb78';
        text.textContent = 'Strong';
        text.style.color = '#48bb78';
    }
}

function checkPasswordStrength() {
    const password = passwordInput.value;
    
    if (!password) {
        strengthResult.classList.add('hidden');
        return;
    }
    
    const result = calculatePasswordStrength(password);
    displayStrengthResult(result);
}

function displayStrengthResult(result) {
    strengthResult.classList.remove('hidden');
    
    const scoreCircle = document.getElementById('scoreCircle');
    const scoreValue = document.getElementById('scoreValue');
    const scoreLabel = document.getElementById('scoreLabel');
    const strengthBar = document.getElementById('strengthBar');
    const feedback = document.getElementById('feedback');
    
    scoreValue.textContent = result.score;
    strengthBar.style.width = `${result.score}%`;
    
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
    
    document.getElementById('criterion1').classList.toggle('met', result.checks.length);
    document.getElementById('criterion2').classList.toggle('met', result.checks.uppercase);
    document.getElementById('criterion3').classList.toggle('met', result.checks.lowercase);
    document.getElementById('criterion4').classList.toggle('met', result.checks.numbers);
    document.getElementById('criterion5').classList.toggle('met', result.checks.symbols);
}

function copyToClipboard() {
    const password = generatedPasswordInput.value;
    
    if (!password) {
        alert('Generate a password first!');
        return;
    }
    
    navigator.clipboard.writeText(password).then(() => {
        const originalText = copyPasswordBtn.textContent;
        copyPasswordBtn.textContent = '✓';
        
        setTimeout(() => {
            copyPasswordBtn.textContent = originalText;
        }, 2000);
    }).catch(() => {
        alert('Failed to copy password');
    });
}

function togglePasswordVisibility() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePasswordBtn.textContent = type === 'password' ? '👁️' : '🙈';
}

generateBtn.addEventListener('click', generatePassword);
copyPasswordBtn.addEventListener('click', copyToClipboard);
passwordInput.addEventListener('input', checkPasswordStrength);
togglePasswordBtn.addEventListener('click', togglePasswordVisibility);

generatePassword();

