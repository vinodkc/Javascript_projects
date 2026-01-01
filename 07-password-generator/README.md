# Password Generator & Strength Checker

A comprehensive password tool that generates secure passwords and analyzes password strength.

## 🎯 Learning Objectives

By completing this project, you will:
- Master random character generation with Math.random()
- Learn cryptographically secure password creation
- Understand password strength scoring algorithms
- Work with character sets and string building
- Implement the Clipboard API for copying text
- Create real-time validation with regex patterns

## 📚 What You'll Learn

### Core Concepts
1. **Random Generation**: Creating unpredictable sequences
2. **Character Sets**: Working with different character types (uppercase, lowercase, digits, symbols)
3. **Regular Expressions**: Testing for character patterns
4. **Scoring Algorithms**: Multi-criteria password strength evaluation
5. **Clipboard API**: Programmatic copying to clipboard
6. **Security Concepts**: Understanding what makes a password strong

### Skills Developed
- Random number generation and character selection
- String concatenation and building
- Regex patterns for validation (`/[A-Z]/`, `/[0-9]/`, etc.)
- Real-time input analysis with `input` event
- Toggle visibility (password ↔ text input types)
- Slider input handling with range inputs
- Visual feedback with progress bars

## 🔧 Implementation Explanation

### How It Works

**1. Password Generation Algorithm**
```
1. Build character pool based on selected options
2. Loop for specified length
3. Random index = Math.floor(Math.random() * pool.length)
4. Add pool[index] to password string
5. Return generated password
```

**2. Character Pools**
```javascript
uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
lowercase = 'abcdefghijklmnopqrstuvwxyz'
numbers = '0123456789'
symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
```

**3. Strength Scoring System**
- Length points: 8+ (20pts), 12+ (10pts), 16+ (10pts)
- Character variety: Each type adds 15 points
- Uniqueness: Up to 20 points for unique characters
- Maximum score: 100 points

**4. Strength Categories**
- Weak (0-39): Red indicator
- Medium (40-69): Orange indicator  
- Strong (70-100): Green indicator

**5. Clipboard API Usage**
```javascript
navigator.clipboard.writeText(password)
```
Copies generated password to system clipboard

**6. Real-Time Validation**
- Regex tests on each keystroke
- Updates criteria checklist instantly
- Shows current strength score
- Visual progress bar updates

## Features

### Password Generator
- ✅ Generate random secure passwords
- ✅ Customizable length (4-32 characters)
- ✅ Character type options:
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z)
  - Numbers (0-9)
  - Symbols (!@#$%^&*)
- ✅ Copy to clipboard with one click
- ✅ Instant strength analysis of generated password
- ✅ Visual strength indicator

### Password Strength Checker
- ✅ Real-time strength analysis as you type
- ✅ Score out of 100
- ✅ Visual strength bar (weak/medium/strong)
- ✅ Criteria checklist:
  - Minimum 8 characters
  - Contains uppercase
  - Contains lowercase
  - Contains numbers
  - Contains symbols
- ✅ Show/hide password toggle
- ✅ Helpful feedback and recommendations

## 📖 Further Learning - W3Schools

- [JavaScript Math.random()](https://www.w3schools.com/js/js_random.asp)
- [JavaScript Math.floor()](https://www.w3schools.com/jsref/jsref_floor.asp)
- [JavaScript Regular Expressions](https://www.w3schools.com/js/js_regexp.asp)
- [JavaScript test() Method](https://www.w3schools.com/jsref/jsref_regexp_test.asp)
- [HTML Range Slider](https://www.w3schools.com/howto/howto_js_rangeslider.asp)
- [HTML Input Types](https://www.w3schools.com/html/html_form_input_types.asp)
- [JavaScript Clipboard API](https://www.w3schools.com/howto/howto_js_copy_clipboard.asp)

## How to Use

### Password Generator
1. Open `index.html` in your browser
2. Adjust the password length slider
3. Select character types to include
4. Click "Generate Password"
5. Copy the password with the copy button

### Strength Checker
1. Click the "Strength Checker" tab
2. Type or paste a password
3. View real-time strength analysis
4. Check which security criteria are met
5. Toggle visibility with the eye icon

## Learning Points

### JavaScript Concepts
- **Random number generation**: `Math.random()`, `Math.floor()`
- **String building**: Concatenating characters
- **Character sets**: Defining available characters
- **Array from Set**: `new Set()` for unique characters
- **Regular expressions**: Testing for character types
  - `/[A-Z]/` - Uppercase letters
  - `/[a-z]/` - Lowercase letters
  - `/[0-9]/` - Numbers
  - `/[^A-Za-z0-9]/` - Special characters
- **Clipboard API**: `navigator.clipboard.writeText()`
- **Input types**: Toggling between 'password' and 'text'
- **Real-time validation**: Input event listeners
- **Scoring algorithms**: Complex conditional logic

### Password Strength Algorithm

The strength score (0-100) is calculated based on:
1. **Length**:
   - 8+ chars: +20 points
   - 12+ chars: +10 points
   - 16+ chars: +10 points
2. **Character variety**: +15 points each for:
   - Uppercase letters
   - Lowercase letters
   - Numbers
   - Symbols
3. **Uniqueness**: Up to +20 points based on unique character count

### Strength Categories
- **Weak**: 0-39 points (red)
- **Medium**: 40-69 points (orange)
- **Strong**: 70-100 points (green)

## Security Best Practices

### Good Password Guidelines
- ✅ At least 12-16 characters
- ✅ Mix of uppercase and lowercase
- ✅ Include numbers and symbols
- ✅ Avoid common words or patterns
- ✅ Unique for each account
- ✅ Use a password manager

### What to Avoid
- ❌ Personal information (names, birthdays)
- ❌ Common words from dictionary
- ❌ Sequential patterns (123, abc)
- ❌ Repeated characters (aaa, 111)
- ❌ Reusing passwords across sites

## Future Enhancement Ideas

- Password history/storage (encrypted)
- Export passwords to file
- Passphrase generator
- Password entropy calculator
- Common password checker
- Breach database check
- Password expiry reminders
- Multi-language support
- Dark mode
- Memorable password patterns

