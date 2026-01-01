/**
 * ==============================================
 * COUNTDOWN TIMER - Learning Documentation
 * ==============================================
 * 
 * CONCEPTS COVERED:
 * - Date Arithmetic: Calculating time differences
 * - setInterval: Real-time countdown updates
 * - Date Input: min attribute for validation
 * - Time Breakdown: Converting milliseconds to days/hours/mins/secs
 * - Progress Calculation: Percentage of time elapsed
 * - LocalStorage: Persisting countdown across sessions
 * - String Templates: Date/time formatting
 * - Modulo Operator: Extracting time components
 * - Date.getTime(): Timestamp in milliseconds
 * 
 * KEY LEARNING POINTS:
 * 1. Time difference calculations
 * 2. Breaking down milliseconds into time units
 * 3. Progress tracking with percentage
 * 4. Countdown persistence
 * 5. Date validation (future dates only)
 */

// ==============================================
// DOM ELEMENTS
// ==============================================

// Screen containers
const timerSetup = document.getElementById('timerSetup');
const timerDisplay = document.getElementById('timerDisplay');
const completedScreen = document.getElementById('completedScreen');

// Input elements
const eventNameInput = document.getElementById('eventName');
const targetDateInput = document.getElementById('targetDate');
const targetTimeInput = document.getElementById('targetTime');

// Buttons
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const editBtn = document.getElementById('editBtn');
const newBtn = document.getElementById('newBtn');
const presetButtons = document.querySelectorAll('.preset-btn');

// Display elements
const eventTitle = document.getElementById('eventTitle');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const progressFill = document.getElementById('progressFill');
const targetDateDisplay = document.getElementById('targetDateDisplay');
const totalTimeDisplay = document.getElementById('totalTimeDisplay');
const remainingDisplay = document.getElementById('remainingDisplay');
const completedMessage = document.getElementById('completedMessage');

// ==============================================
// STATE VARIABLES
// ==============================================

/**
 * countdownInterval: Stores interval ID for countdown updates
 */
let countdownInterval = null;

/**
 * targetDateTime: Target timestamp in milliseconds
 * LEARNING: Store as timestamp for easy arithmetic
 */
let targetDateTime = null;

/**
 * startDateTime: When countdown started (for progress calculation)
 */
let startDateTime = null;

// ==============================================
// DATE SETUP
// ==============================================

/**
 * Sets minimum date to today (prevents past dates)
 * LEARNING: Date input validation with min attribute
 */
function setMinimumDate() {
    const today = new Date();
    
    // Extract date components
    const year = today.getFullYear();
    
    // Add 1 because months are 0-indexed (0 = January)
    // LEARNING: Month indexing gotcha in JavaScript
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    // Set input properties
    // LEARNING: Date input format is "YYYY-MM-DD"
    targetDateInput.min = `${year}-${month}-${day}`;
    targetDateInput.value = `${year}-${month}-${day}`;
}

// ==============================================
// FORMATTING FUNCTIONS
// ==============================================

/**
 * Formats time unit with leading zero
 * LEARNING: Consistent display formatting
 * 
 * @param {number} value - Time unit value
 * @returns {string} Two-digit string (e.g., "05")
 */
function formatTimeUnit(value) {
    // padStart(2, '0') ensures 2 digits
    // "5" → "05", "15" → "15"
    return String(value).padStart(2, '0');
}

/**
 * Formats duration in human-readable format
 * LEARNING: Converting milliseconds to appropriate unit
 * 
 * @param {number} ms - Duration in milliseconds
 * @returns {string} Formatted duration (e.g., "5 days")
 * 
 * Shows largest meaningful unit (days > hours > minutes > seconds)
 */
function formatDuration(ms) {
    // Convert to basic units
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    // Return largest unit
    // LEARNING: Cascading conditionals for appropriate precision
    if (days > 0) return `${days} day${days !== 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''}`;
    if (minutes > 0) return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
}

// ==============================================
// COUNTDOWN LOGIC
// ==============================================

/**
 * Updates countdown display every second
 * LEARNING: Complex time breakdown calculation
 * 
 * Steps:
 * 1. Calculate remaining time (distance)
 * 2. Break down into days, hours, minutes, seconds
 * 3. Update display
 * 4. Calculate and update progress bar
 * 5. Check if complete
 */
function updateCountdown() {
    // Get current time as timestamp
    const now = new Date().getTime();
    
    // Calculate remaining time
    const distance = targetDateTime - now;
    
    // Check if countdown complete
    if (distance < 0) {
        stopCountdown();
        showCompletedScreen();
        return;
    }
    
    // Break down time into units
    // LEARNING: Millisecond conversion constants
    // 1000 ms = 1 second
    // 60 seconds = 1 minute
    // 60 minutes = 1 hour
    // 24 hours = 1 day
    
    // Days
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    
    // Hours (remaining after removing days)
    // LEARNING: Modulo (%) gets remainder
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    // Minutes (remaining after removing hours)
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    // Seconds (remaining after removing minutes)
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update display
    daysEl.textContent = formatTimeUnit(days);
    hoursEl.textContent = formatTimeUnit(hours);
    minutesEl.textContent = formatTimeUnit(minutes);
    secondsEl.textContent = formatTimeUnit(seconds);
    
    // Update human-readable remaining time
    remainingDisplay.textContent = formatDuration(distance);
    
    // Calculate progress
    // LEARNING: Progress = (elapsed / total) × 100
    const totalTime = targetDateTime - startDateTime;
    const elapsed = now - startDateTime;
    const progress = Math.min((elapsed / totalTime) * 100, 100);
    
    // Update progress bar width
    progressFill.style.width = `${progress}%`;
}

/**
 * Starts countdown with validation
 * LEARNING: Multi-step initialization process
 */
function startCountdown() {
    // Get inputs
    const eventName = eventNameInput.value.trim() || 'Your Event';
    const dateValue = targetDateInput.value;
    const timeValue = targetTimeInput.value;
    
    // Validation: date required
    if (!dateValue) {
        alert('Please select a target date!');
        return;
    }
    
    // Create target Date object
    // LEARNING: Date string format "YYYY-MM-DDTHH:MM"
    // T separates date and time components
    const targetDate = new Date(`${dateValue}T${timeValue}`);
    const now = new Date();
    
    // Validation: must be future date
    if (targetDate <= now) {
        alert('Please select a future date and time!');
        return;
    }
    
    // Store as timestamps
    // LEARNING: .getTime() converts Date to milliseconds since epoch
    targetDateTime = targetDate.getTime();
    startDateTime = now.getTime();
    
    // Update displays
    eventTitle.textContent = `Countdown to ${eventName}`;
    
    // LEARNING: toLocaleString() formats date for user's locale
    targetDateDisplay.textContent = targetDate.toLocaleString();
    totalTimeDisplay.textContent = formatDuration(targetDateTime - startDateTime);
    
    // Screen transition
    timerSetup.classList.add('hidden');
    timerDisplay.classList.remove('hidden');
    
    // Start countdown
    updateCountdown();  // Immediate update
    countdownInterval = setInterval(updateCountdown, 1000);  // Update every second
    
    // Save to localStorage
    saveCountdown(eventName, targetDateTime, startDateTime);
}

/**
 * Stops countdown interval
 * LEARNING: Cleanup pattern for intervals
 */
function stopCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

/**
 * Resets countdown with confirmation
 * LEARNING: Destructive action with user confirmation
 */
function resetCountdown() {
    if (confirm('Are you sure you want to reset the countdown?')) {
        stopCountdown();
        timerDisplay.classList.add('hidden');
        timerSetup.classList.remove('hidden');
        localStorage.removeItem('countdown');
    }
}

/**
 * Shows completion screen when countdown reaches zero
 * LEARNING: State transition on completion
 */
function showCompletedScreen() {
    timerDisplay.classList.add('hidden');
    completedScreen.classList.remove('hidden');
    
    // Extract event name from title
    // LEARNING: String manipulation with replace()
    const eventName = eventTitle.textContent.replace('Countdown to ', '');
    completedMessage.textContent = `${eventName} is here!`;
    
    // Clear saved countdown
    localStorage.removeItem('countdown');
}

/**
 * Starts new countdown after completion
 */
function newCountdown() {
    completedScreen.classList.add('hidden');
    timerSetup.classList.remove('hidden');
    eventNameInput.value = '';
    setMinimumDate();
}

/**
 * Allows editing current countdown
 */
function editCountdown() {
    stopCountdown();
    timerDisplay.classList.add('hidden');
    timerSetup.classList.remove('hidden');
}

// ==============================================
// PERSISTENCE (LOCALSTORAGE)
// ==============================================

/**
 * Saves countdown to localStorage
 * LEARNING: Persisting countdown across page reloads
 * 
 * @param {string} eventName - Event name
 * @param {number} target - Target timestamp
 * @param {number} start - Start timestamp
 */
function saveCountdown(eventName, target, start) {
    const data = {
        eventName,
        targetDateTime: target,
        startDateTime: start
    };
    localStorage.setItem('countdown', JSON.stringify(data));
}

/**
 * Loads saved countdown from localStorage
 * LEARNING: Restore application state
 * 
 * @returns {boolean} True if countdown loaded, false otherwise
 */
function loadCountdown() {
    const saved = localStorage.getItem('countdown');
    if (!saved) return false;
    
    const data = JSON.parse(saved);
    const now = new Date().getTime();
    
    // Check if countdown already expired
    if (data.targetDateTime <= now) {
        localStorage.removeItem('countdown');
        return false;
    }
    
    // Restore state
    eventNameInput.value = data.eventName;
    targetDateTime = data.targetDateTime;
    startDateTime = data.startDateTime;
    
    // Update displays
    eventTitle.textContent = `Countdown to ${data.eventName}`;
    const targetDate = new Date(targetDateTime);
    targetDateDisplay.textContent = targetDate.toLocaleString();
    totalTimeDisplay.textContent = formatDuration(targetDateTime - startDateTime);
    
    // Show timer screen
    timerSetup.classList.add('hidden');
    timerDisplay.classList.remove('hidden');
    
    // Start countdown
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
    
    return true;
}

// ==============================================
// PRESET TIMES
// ==============================================

/**
 * Sets preset time in the future
 * LEARNING: Date arithmetic for quick presets
 * 
 * @param {number} minutes - Minutes to add
 * @param {number} hours - Hours to add
 * @param {number} days - Days to add
 */
function setPresetTime(minutes = 0, hours = 0, days = 0) {
    const now = new Date();
    
    // Calculate future time
    // LEARNING: Millisecond arithmetic
    // Add: days × 24hr/day × 60min/hr × 60sec/min × 1000ms/sec
    const futureDate = new Date(
        now.getTime() + 
        (days * 24 * 60 * 60 * 1000) + 
        (hours * 60 * 60 * 1000) + 
        (minutes * 60 * 1000)
    );
    
    // Format for inputs
    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    const day = String(futureDate.getDate()).padStart(2, '0');
    const hour = String(futureDate.getHours()).padStart(2, '0');
    const minute = String(futureDate.getMinutes()).padStart(2, '0');
    
    // Set inputs
    targetDateInput.value = `${year}-${month}-${day}`;
    targetTimeInput.value = `${hour}:${minute}`;
}

// ==============================================
// EVENT LISTENERS
// ==============================================

/**
 * Preset button handlers
 */
presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Extract time values from data attributes
        const minutes = parseInt(btn.dataset.minutes) || 0;
        const hours = parseInt(btn.dataset.hours) || 0;
        const days = parseInt(btn.dataset.days) || 0;
        
        setPresetTime(minutes, hours, days);
    });
});

/**
 * Control button handlers
 */
startBtn.addEventListener('click', startCountdown);
resetBtn.addEventListener('click', resetCountdown);
editBtn.addEventListener('click', editCountdown);
newBtn.addEventListener('click', newCountdown);

// ==============================================
// INITIALIZATION
// ==============================================

/**
 * Initialize on page load
 */
setMinimumDate();

// Try to load saved countdown, show setup if none exists
if (!loadCountdown()) {
    timerSetup.classList.remove('hidden');
}
