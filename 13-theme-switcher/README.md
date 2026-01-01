# Color Picker & Theme Switcher

A comprehensive theme customization tool with light/dark modes, custom colors, and preset themes.

## 🎯 Learning Objectives

By completing this project, you will:
- Master CSS custom properties (CSS variables)
- Learn matchMedia API for system preference detection
- Understand theme persistence with localStorage
- Implement real-time style updates with JavaScript
- Work with color pickers and hex validation
- Create exportable JSON configurations

## 📚 What You'll Learn

### Core Concepts
1. **CSS Variables**: Dynamic styling with custom properties
2. **matchMedia API**: Detect system dark mode preference
3. **File Export**: Create and download JSON files
4. **Color Management**: Hex codes and color pickers
5. **Theme Persistence**: Save/load user preferences
6. **Real-Time Updates**: Instantly apply style changes

### Skills Developed
- CSS custom properties (`--primary-color`)
- `document.documentElement.style.setProperty()`
- `window.matchMedia('(prefers-color-scheme: dark)')`
- File Blob creation and download
- Hex color validation with regex
- JSON configuration management

## 🔧 Implementation Explanation

### How It Works

**1. CSS Variables**
```css
:root {
  --primary-color: #667eea;
  --text-color: #333;
}
```
Update dynamically with JavaScript

**2. Theme Switching**
```javascript
document.documentElement.setAttribute('data-theme', 'dark')
```

**3. System Preference Detection**
```javascript
window.matchMedia('(prefers-color-scheme: dark)').matches
```

**4. Color Updates**
```javascript
document.documentElement.style.setProperty('--primary-color', '#667eea')
```

**5. Theme Export**
```javascript
blob = new Blob([JSON.stringify(theme)], {type: 'application/json'})
```

## 📖 Further Learning - W3Schools

- [CSS Variables](https://www.w3schools.com/css/css3_variables.asp)
- [JavaScript LocalStorage](https://www.w3schools.com/html/html5_webstorage.asp)
- [HTML Color Picker](https://www.w3schools.com/tags/att_input_type_color.asp)
- [JavaScript JSON](https://www.w3schools.com/js/js_json.asp)
- [CSS Data Attributes](https://www.w3schools.com/css/css3_variables.asp)
- [JavaScript Blob](https://www.w3schools.com/jsref/obj_blob.asp)

## Features

### 🌓 Theme Modes
- ✅ **Light Mode**: Bright, clean interface
- ✅ **Dark Mode**: Easy on the eyes
- ✅ **Auto Mode**: Follows system preference
- ✅ **Smooth transitions** between modes
- ✅ **LocalStorage persistence**

### 🎨 Color Customization
- ✅ **Three color controls**:
  - Primary color
  - Secondary color
  - Accent color
- ✅ **Dual inputs**: Color picker + hex input
- ✅ **Real-time preview**
- ✅ **5 preset themes** (Default, Ocean, Sunset, Forest, Royal)
- ✅ **Random color generator**
- ✅ **Export theme** to JSON file

### 👀 Live Preview
- ✅ Sample card with theme colors
- ✅ Button examples
- ✅ Gradient backgrounds
- ✅ Current theme info display

## How to Use

### Switching Theme Mode
1. Click Light (☀️), Dark (🌙), or Auto (🔄)
2. Theme changes immediately
3. Setting saved to localStorage

### Custom Colors
1. Click color picker or type hex code
2. Changes apply in real-time
3. See preview in sample card
4. Colors saved automatically

### Preset Themes
1. Click any preset button
2. All three colors change instantly
3. Preview updates automatically

### Action Buttons
- **Reset**: Return to default theme and colors
- **Random**: Generate random color combination
- **Export**: Download theme as JSON file

## Learning Points

### JavaScript Concepts

#### CSS Custom Properties (Variables)
```javascript
// Set CSS variables with JavaScript
document.documentElement.style.setProperty('--primary-color', '#667eea');

// Variables defined in CSS
:root {
    --primary-color: #667eea;
}
```

#### LocalStorage for Persistence
```javascript
// Save
localStorage.setItem('theme', 'dark');
localStorage.setItem('colors', JSON.stringify(colorsObject));

// Load
const theme = localStorage.getItem('theme');
const colors = JSON.parse(localStorage.getItem('colors'));
```

#### System Theme Detection
```javascript
// Check user's system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Listen for changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Handle theme change
});
```

#### Color Input Synchronization
Two-way binding between color picker and text input:
```javascript
colorPicker.addEventListener('input', () => {
    hexInput.value = colorPicker.value;
});

hexInput.addEventListener('input', () => {
    if (isValidHex(hexInput.value)) {
        colorPicker.value = hexInput.value;
    }
});
```

#### Random Color Generation
```javascript
function generateRandomColor() {
    // Generate random number, convert to hex, pad to 6 digits
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}
```

#### File Export (Blob & Download)
```javascript
const dataStr = JSON.stringify(theme, null, 2);
const dataBlob = new Blob([dataStr], { type: 'application/json' });
const url = URL.createObjectURL(dataBlob);

const link = document.createElement('a');
link.href = url;
link.download = 'theme.json';
link.click();

URL.revokeObjectURL(url);  // Clean up
```

### CSS Techniques

#### CSS Variables with Fallback
```css
:root {
    --primary-color: #667eea;
}

[data-theme="dark"] {
    --bg-color: #1a202c;
    --text-color: #f7fafc;
}

body {
    background: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s, color 0.3s;
}
```

#### Gradient with Variables
```css
background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
```

#### Gradient Text
```css
background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

## Hex Color Format

Hex colors: `#RRGGBB`
- `#` prefix
- 6 hexadecimal digits (0-9, A-F)
- RR = Red (00-FF)
- GG = Green (00-FF)
- BB = Blue (00-FF)

Examples:
- `#FF0000` = Pure red
- `#00FF00` = Pure green
- `#0000FF` = Pure blue
- `#FFFFFF` = White
- `#000000` = Black

## Preset Themes

### Default
- Primary: `#667eea` (Purple-blue)
- Secondary: `#764ba2` (Purple)
- Accent: `#48bb78` (Green)

### Ocean
- Primary: `#4facfe` (Light blue)
- Secondary: `#00f2fe` (Cyan)
- Accent: `#43e97b` (Mint green)

### Sunset
- Primary: `#fa709a` (Pink)
- Secondary: `#fee140` (Yellow)
- Accent: `#ff6b6b` (Red)

### Forest
- Primary: `#56ab2f` (Green)
- Secondary: `#a8e063` (Light green)
- Accent: `#38ef7d` (Teal)

### Royal
- Primary: `#8e2de2` (Purple)
- Secondary: `#4a00e0` (Deep purple)
- Accent: `#da22ff` (Magenta)

## Browser Support

- **Color input**: Modern browsers
- **CSS Variables**: All modern browsers
- **matchMedia**: All modern browsers
- **Blob API**: All modern browsers
- **localStorage**: All browsers

## Future Enhancement Ideas

- Import theme from JSON file
- Color harmony suggestions
- Accessibility contrast checker
- Color palette generator
- Copy CSS code to clipboard
- Share theme with URL
- Theme gallery/marketplace
- Gradient editor
- Font customization
- Border radius controls
- Shadow customization
- Animation speed controls
- Color history
- Undo/redo functionality

