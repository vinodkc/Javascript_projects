const themeButtons = document.querySelectorAll('.theme-btn');
const primaryColorPicker = document.getElementById('primaryColor');
const secondaryColorPicker = document.getElementById('secondaryColor');
const accentColorPicker = document.getElementById('accentColor');
const primaryColorHex = document.getElementById('primaryColorHex');
const secondaryColorHex = document.getElementById('secondaryColorHex');
const accentColorHex = document.getElementById('accentColorHex');
const presetButtons = document.querySelectorAll('.preset-btn');
const resetBtn = document.getElementById('resetBtn');
const randomBtn = document.getElementById('randomBtn');
const exportBtn = document.getElementById('exportBtn');
const currentMode = document.getElementById('currentMode');
const currentPrimary = document.getElementById('currentPrimary');
const currentSecondary = document.getElementById('currentSecondary');
const currentAccent = document.getElementById('currentAccent');

const presets = {
    default: { primary: '#667eea', secondary: '#764ba2', accent: '#48bb78' },
    ocean: { primary: '#4facfe', secondary: '#00f2fe', accent: '#43e97b' },
    sunset: { primary: '#fa709a', secondary: '#fee140', accent: '#ff6b6b' },
    forest: { primary: '#56ab2f', secondary: '#a8e063', accent: '#38ef7d' },
    royal: { primary: '#8e2de2', secondary: '#4a00e0', accent: '#da22ff' }
};

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedColors = JSON.parse(localStorage.getItem('colors')) || presets.default;
    
    applyTheme(savedTheme);
    applyColors(savedColors);
}

function applyTheme(theme) {
    if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        currentMode.textContent = 'Auto (' + (prefersDark ? 'Dark' : 'Light') + ')';
    } else {
        document.body.setAttribute('data-theme', theme);
        currentMode.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
    }
    
    themeButtons.forEach(btn => {
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    localStorage.setItem('theme', theme);
}

function applyColors(colors) {
    document.documentElement.style.setProperty('--primary-color', colors.primary);
    document.documentElement.style.setProperty('--secondary-color', colors.secondary);
    document.documentElement.style.setProperty('--accent-color', colors.accent);
    
    primaryColorPicker.value = colors.primary;
    secondaryColorPicker.value = colors.secondary;
    accentColorPicker.value = colors.accent;
    
    primaryColorHex.value = colors.primary;
    secondaryColorHex.value = colors.secondary;
    accentColorHex.value = colors.accent;
    
    updateInfo();
    
    localStorage.setItem('colors', JSON.stringify(colors));
}

function updateInfo() {
    currentPrimary.textContent = primaryColorPicker.value;
    currentSecondary.textContent = secondaryColorPicker.value;
    currentAccent.textContent = accentColorPicker.value;
}

function syncColorInputs(picker, hex) {
    picker.addEventListener('input', () => {
        hex.value = picker.value;
        applyColors({
            primary: primaryColorPicker.value,
            secondary: secondaryColorPicker.value,
            accent: accentColorPicker.value
        });
    });
    
    hex.addEventListener('input', () => {
        if (/^#[0-9A-F]{6}$/i.test(hex.value)) {
            picker.value = hex.value;
            applyColors({
                primary: primaryColorPicker.value,
                secondary: secondaryColorPicker.value,
                accent: accentColorPicker.value
            });
        }
    });
}

function generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function randomizeColors() {
    const colors = {
        primary: generateRandomColor(),
        secondary: generateRandomColor(),
        accent: generateRandomColor()
    };
    applyColors(colors);
}

function resetToDefault() {
    applyTheme('light');
    applyColors(presets.default);
}

function exportTheme() {
    const theme = {
        mode: localStorage.getItem('theme') || 'light',
        colors: JSON.parse(localStorage.getItem('colors')) || presets.default
    };
    
    const dataStr = JSON.stringify(theme, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `theme-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        applyTheme(btn.dataset.theme);
    });
});

presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const preset = presets[btn.dataset.preset];
        applyColors(preset);
    });
});

syncColorInputs(primaryColorPicker, primaryColorHex);
syncColorInputs(secondaryColorPicker, secondaryColorHex);
syncColorInputs(accentColorPicker, accentColorHex);

resetBtn.addEventListener('click', resetToDefault);
randomBtn.addEventListener('click', randomizeColors);
exportBtn.addEventListener('click', exportTheme);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'auto') {
        applyTheme('auto');
    }
});

loadTheme();

