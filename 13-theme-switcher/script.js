/**
 * ==============================================
 * THEME SWITCHER - Learning Documentation
 * ==============================================
 * 
 * CONCEPTS COVERED:
 * - CSS Custom Properties (Variables): Dynamically updating styles
 * - Data Attributes: data-theme for theme switching
 * - localStorage: Persistent theme preferences
 * - Color Picker Input: type="color"
 * - Hex Color Validation: Regular expression
 * - Media Queries in JS: matchMedia() for system preferences
 * - Random Number Generation: For random colors
 * - Base Conversion: toString(16) for hex colors
 * - padStart(): Ensuring consistent hex length
 * - JSON Export: Blob API for file download
 * 
 * KEY LEARNING POINTS:
 * 1. CSS Custom Properties manipulation from JavaScript
 * 2. System theme preference detection
 * 3. Color format validation (hex)
 * 4. Random color generation
 * 5. Theme export functionality
 */

// ==============================================
// DOM ELEMENTS
// ==============================================

// Theme mode buttons (Light, Dark, Auto)
const themeButtons = document.querySelectorAll('.theme-btn');

// Color picker inputs (visual color selector)
const primaryColorPicker = document.getElementById('primaryColor');
const secondaryColorPicker = document.getElementById('secondaryColor');
const accentColorPicker = document.getElementById('accentColor');

// Hex input fields (manual color entry)
const primaryColorHex = document.getElementById('primaryColorHex');
const secondaryColorHex = document.getElementById('secondaryColorHex');
const accentColorHex = document.getElementById('accentColorHex');

// Preset and action buttons
const presetButtons = document.querySelectorAll('.preset-btn');
const resetBtn = document.getElementById('resetBtn');
const randomBtn = document.getElementById('randomBtn');
const exportBtn = document.getElementById('exportBtn');

// Info display elements
const currentMode = document.getElementById('currentMode');
const currentPrimary = document.getElementById('currentPrimary');
const currentSecondary = document.getElementById('currentSecondary');
const currentAccent = document.getElementById('currentAccent');

// ==============================================
// COLOR PRESETS
// ==============================================

/**
 * Predefined color schemes
 * LEARNING: Object of objects for organized presets
 */
const presets = {
    default: { primary: '#667eea', secondary: '#764ba2', accent: '#48bb78' },
    ocean: { primary: '#4facfe', secondary: '#00f2fe', accent: '#43e97b' },
    sunset: { primary: '#fa709a', secondary: '#fee140', accent: '#ff6b6b' },
    forest: { primary: '#56ab2f', secondary: '#a8e063', accent: '#38ef7d' },
    royal: { primary: '#8e2de2', secondary: '#4a00e0', accent: '#da22ff' }
};

// ==============================================
// THEME LOADING
// ==============================================

/**
 * Loads saved theme from localStorage
 * LEARNING: Application initialization pattern
 */
function loadTheme() {
    // Load saved preferences or use defaults
    // LEARNING: || operator for fallback values
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedColors = JSON.parse(localStorage.getItem('colors')) || presets.default;
    
    // Apply loaded settings
    applyTheme(savedTheme);
    applyColors(savedColors);
}

// ==============================================
// THEME APPLICATION
// ==============================================

/**
 * Applies theme mode (light/dark/auto)
 * LEARNING: Data attributes for CSS switching
 * 
 * @param {string} theme - 'light', 'dark', or 'auto'
 * 
 * Auto mode:
 * - Detects system preference
 * - Uses matchMedia to check (prefers-color-scheme: dark)
 */
function applyTheme(theme) {
    if (theme === 'auto') {
        // Detect system preference
        // LEARNING: window.matchMedia() queries CSS media features
        // Returns MediaQueryList object with .matches property
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set theme based on system preference
        document.body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        currentMode.textContent = 'Auto (' + (prefersDark ? 'Dark' : 'Light') + ')';
    } else {
        // Manual theme selection
        // LEARNING: data-theme attribute triggers CSS rules
        // CSS: body[data-theme="dark"] { ... }
        document.body.setAttribute('data-theme', theme);
        
        // Capitalize first letter for display
        // LEARNING: charAt(0).toUpperCase() + slice(1)
        // "light" → "Light"
        currentMode.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
    }
    
    // Update button states
    themeButtons.forEach(btn => {
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Save preference
    localStorage.setItem('theme', theme);
}

/**
 * Applies custom colors to CSS custom properties
 * LEARNING: CSS Custom Properties (CSS Variables) manipulation
 * 
 * @param {Object} colors - { primary, secondary, accent }
 * 
 * CSS Custom Properties:
 * - Defined in CSS: --primary-color: #667eea;
 * - Updated from JS: setProperty('--primary-color', newValue)
 * - Used in CSS: background: var(--primary-color);
 */
function applyColors(colors) {
    // Update CSS custom properties
    // LEARNING: document.documentElement is the <html> element
    // setProperty() updates CSS variable values
    document.documentElement.style.setProperty('--primary-color', colors.primary);
    document.documentElement.style.setProperty('--secondary-color', colors.secondary);
    document.documentElement.style.setProperty('--accent-color', colors.accent);
    
    // Sync color picker values
    primaryColorPicker.value = colors.primary;
    secondaryColorPicker.value = colors.secondary;
    accentColorPicker.value = colors.accent;
    
    // Sync hex input values
    primaryColorHex.value = colors.primary;
    secondaryColorHex.value = colors.secondary;
    accentColorHex.value = colors.accent;
    
    // Update info display
    updateInfo();
    
    // Save to localStorage
    // LEARNING: Must stringify objects for localStorage
    localStorage.setItem('colors', JSON.stringify(colors));
}

/**
 * Updates current color info display
 */
function updateInfo() {
    currentPrimary.textContent = primaryColorPicker.value;
    currentSecondary.textContent = secondaryColorPicker.value;
    currentAccent.textContent = accentColorPicker.value;
}

// ==============================================
// COLOR INPUT SYNCHRONIZATION
// ==============================================

/**
 * Synchronizes color picker and hex input
 * LEARNING: Two-way binding between related inputs
 * 
 * @param {HTMLInputElement} picker - Color picker input
 * @param {HTMLInputElement} hex - Hex text input
 * 
 * Pattern:
 * - Change picker → update hex
 * - Change hex (if valid) → update picker
 */
function syncColorInputs(picker, hex) {
    // Picker changed: update hex
    picker.addEventListener('input', () => {
        hex.value = picker.value;
        
        // Apply new colors
        applyColors({
            primary: primaryColorPicker.value,
            secondary: secondaryColorPicker.value,
            accent: accentColorPicker.value
        });
    });
    
    // Hex changed: validate and update picker
    hex.addEventListener('input', () => {
        // Validate hex format
        // LEARNING: Regular expression for hex color validation
        // ^#[0-9A-F]{6}$ means:
        // ^ = start of string
        // # = literal hash
        // [0-9A-F]{6} = exactly 6 hex digits
        // $ = end of string
        // i flag = case insensitive
        if (/^#[0-9A-F]{6}$/i.test(hex.value)) {
            picker.value = hex.value;
            
            // Apply new colors
            applyColors({
                primary: primaryColorPicker.value,
                secondary: secondaryColorPicker.value,
                accent: accentColorPicker.value
            });
        }
    });
}

// ==============================================
// RANDOM COLOR GENERATION
// ==============================================

/**
 * Generates random hex color
 * LEARNING: Random color with base conversion
 * 
 * @returns {string} Hex color (e.g., "#a3f2b4")
 * 
 * Algorithm:
 * 1. Generate random number: 0 to 16,777,215 (0xFFFFFF)
 * 2. Convert to hex: toString(16)
 * 3. Pad to 6 digits: padStart(6, '0')
 * 4. Add # prefix
 * 
 * Example:
 * - Math.random() = 0.5
 * - 0.5 * 16777215 = 8388607
 * - Math.floor(8388607) = 8388607
 * - 8388607.toString(16) = "7fffff"
 * - "#" + "7fffff" = "#7fffff"
 */
function generateRandomColor() {
    // LEARNING: 16777215 = 0xFFFFFF = maximum RGB value
    // toString(16) converts number to hexadecimal string
    // padStart(6, '0') ensures 6 characters (e.g., "ff" → "0000ff")
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

/**
 * Applies random colors to all three color slots
 * LEARNING: Generating multiple random values
 */
function randomizeColors() {
    const colors = {
        primary: generateRandomColor(),
        secondary: generateRandomColor(),
        accent: generateRandomColor()
    };
    applyColors(colors);
}

// ==============================================
// RESET FUNCTION
// ==============================================

/**
 * Resets to default theme and colors
 */
function resetToDefault() {
    applyTheme('light');
    applyColors(presets.default);
}

// ==============================================
// EXPORT FUNCTION
// ==============================================

/**
 * Exports current theme as JSON file
 * LEARNING: JSON download with Blob API
 * 
 * Creates downloadable file containing:
 * - Theme mode (light/dark/auto)
 * - Custom colors
 */
function exportTheme() {
    // Gather current theme settings
    const theme = {
        mode: localStorage.getItem('theme') || 'light',
        colors: JSON.parse(localStorage.getItem('colors')) || presets.default
    };
    
    // Convert to formatted JSON string
    // LEARNING: JSON.stringify(object, replacer, space)
    // null = no replacer function
    // 2 = indent with 2 spaces (pretty print)
    const dataStr = JSON.stringify(theme, null, 2);
    
    // Create Blob (file data)
    // LEARNING: Blob with JSON MIME type
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    // Create temporary URL
    const url = URL.createObjectURL(dataBlob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = `theme-${Date.now()}.json`;  // Unique filename
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// ==============================================
// EVENT LISTENERS
// ==============================================

/**
 * Theme button handlers
 */
themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        applyTheme(btn.dataset.theme);
    });
});

/**
 * Preset button handlers
 */
presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Get preset by name
        const preset = presets[btn.dataset.preset];
        applyColors(preset);
    });
});

/**
 * Sync color inputs (picker ↔ hex)
 */
syncColorInputs(primaryColorPicker, primaryColorHex);
syncColorInputs(secondaryColorPicker, secondaryColorHex);
syncColorInputs(accentColorPicker, accentColorHex);

/**
 * Action button handlers
 */
resetBtn.addEventListener('click', resetToDefault);
randomBtn.addEventListener('click', randomizeColors);
exportBtn.addEventListener('click', exportTheme);

/**
 * System theme change listener
 * LEARNING: Reacting to OS theme changes
 * 
 * When user changes system theme (OS-level):
 * - If app is in 'auto' mode, update to match
 */
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const currentTheme = localStorage.getItem('theme');
    
    // Only react if in auto mode
    if (currentTheme === 'auto') {
        applyTheme('auto');
    }
});

// ==============================================
// INITIALIZATION
// ==============================================

/**
 * Load saved theme on page load
 */
loadTheme();
