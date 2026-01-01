/**
 * ==============================================
 * DIGITAL CLOCK & STOPWATCH - Learning Documentation
 * ==============================================
 * 
 * CONCEPTS COVERED:
 * - Date Object: new Date(), getHours(), getMinutes(), getSeconds()
 * - Intervals: setInterval(), clearInterval()
 * - Time Calculations: milliseconds to hours/mins/secs conversion
 * - String Formatting: padStart() for leading zeros
 * - DOM Creation: createElement(), appendChild(), insertBefore()
 * - Template Literals: ${} for string interpolation
 * - Date.now(): Get current timestamp in milliseconds
 * 
 * KEY LEARNING POINTS:
 * 1. Date object methods for getting current time
 * 2. setInterval for repeating functions every N milliseconds
 * 3. Mathematical time conversions
 * 4. Dynamic DOM element creation for lap times
 * 5. Button state management (enable/disable)
 */

// ==============================================
// DOM ELEMENTS
// ==============================================
// Digital Clock elements
const clockElement = document.getElementById('clock');
const dateElement = document.getElementById('date');

// Stopwatch elements
const stopwatchDisplay = document.getElementById('stopwatchDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

// ==============================================
// STATE VARIABLES
// ==============================================
/**
 * stopwatchInterval: Stores the interval ID so we can clear it later
 * LEARNING: setInterval returns an ID that clearInterval needs
 */
let stopwatchInterval = null;

/**
 * stopwatchTime: Total elapsed time in milliseconds
 * LEARNING: Storing time in milliseconds gives us precision
 */
let stopwatchTime = 0;

/**
 * isRunning: Boolean flag tracking stopwatch state
 * LEARNING: Boolean flags are useful for state management
 */
let isRunning = false;

/**
 * lapCounter: Counts lap numbers sequentially
 * LEARNING: Simple counter incremented with each lap
 */
let lapCounter = 1;

// ==============================================
// DIGITAL CLOCK FUNCTIONS
// ==============================================

/**
 * Updates the clock display with current time and date
 * LEARNING: Date object provides current system time
 * 
 * Key concepts:
 * - new Date() creates object with current date/time
 * - getHours(), getMinutes(), getSeconds() extract time parts
 * - padStart(2, '0') ensures 2 digits (e.g., "09" not "9")
 * - Template literals (${}) for string interpolation
 */
function updateClock() {
    // Create Date object with current time
    // LEARNING: new Date() with no arguments = current date/time
    const now = new Date();
    
    // Extract time components and format with leading zeros
    // LEARNING: padStart(2, '0') pads string to 2 chars with '0'
    // Example: "9" becomes "09", "15" stays "15"
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Update clock display using template literal
    // LEARNING: Template literals allow embedded expressions ${variable}
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    
    // Format date with locale options
    // LEARNING: toLocaleDateString() formats date according to options
    const options = { 
        weekday: 'long',      // "Monday" 
        year: 'numeric',      // "2026"
        month: 'long',        // "January"
        day: 'numeric'        // "15"
    };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
}

// ==============================================
// STOPWATCH FUNCTIONS
// ==============================================

/**
 * Formats milliseconds into HH:MM:SS.mmm format
 * LEARNING: Mathematical operations for time conversion
 * 
 * @param {number} milliseconds - Time in milliseconds
 * @returns {string} Formatted time string
 * 
 * Conversion logic:
 * - 1 second = 1000 milliseconds
 * - 1 minute = 60 seconds
 * - 1 hour = 60 minutes = 3600 seconds
 */
function formatStopwatchTime(milliseconds) {
    // Convert milliseconds to total seconds
    // LEARNING: Math.floor() rounds down to nearest integer
    const totalSeconds = Math.floor(milliseconds / 1000);
    
    // Calculate hours: total seconds ÷ 3600
    const hours = Math.floor(totalSeconds / 3600);
    
    // Calculate minutes: remaining seconds ÷ 60
    // LEARNING: Modulo (%) gets remainder after division
    // Example: 3750 % 3600 = 150, then 150 / 60 = 2.5 → 2 minutes
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    // Calculate seconds: remaining after removing hours and minutes
    const seconds = totalSeconds % 60;
    
    // Get milliseconds component
    const ms = milliseconds % 1000;
    
    // Format with leading zeros
    // LEARNING: padStart ensures consistent width (e.g., "09" not "9")
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

/**
 * Updates the stopwatch display with current time
 * LEARNING: Separation of concerns - format logic separate from display logic
 */
function updateStopwatchDisplay() {
    stopwatchDisplay.textContent = formatStopwatchTime(stopwatchTime);
}

/**
 * Starts or resumes the stopwatch
 * LEARNING: setInterval() executes function repeatedly
 * 
 * Flow:
 * 1. Guard clause: return if already running
 * 2. Calculate start time (accounting for paused time)
 * 3. Create interval that updates every 10ms
 * 4. Update button states
 */
function startStopwatch() {
    // Guard clause: prevent multiple intervals
    if (isRunning) return;
    
    isRunning = true;
    
    // Calculate start time to account for paused time
    // LEARNING: Date.now() returns current timestamp in milliseconds
    // Subtract stopwatchTime to continue from where we paused
    const startTime = Date.now() - stopwatchTime;
    
    // Create interval that runs every 10 milliseconds
    // LEARNING: setInterval(function, delay) repeats function every delay ms
    stopwatchInterval = setInterval(() => {
        // Calculate elapsed time
        stopwatchTime = Date.now() - startTime;
        updateStopwatchDisplay();
    }, 10);  // Update every 10ms for smooth display
    
    // Update button states
    // LEARNING: disabled property enables/disables buttons
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
}

/**
 * Pauses the stopwatch (maintains current time)
 * LEARNING: clearInterval() stops the repeating function
 */
function pauseStopwatch() {
    // Guard clause: can't pause if not running
    if (!isRunning) return;
    
    isRunning = false;
    
    // Stop the interval
    // LEARNING: clearInterval(id) stops interval created by setInterval
    // Must pass the interval ID returned by setInterval
    clearInterval(stopwatchInterval);
    
    // Update button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

/**
 * Resets the stopwatch to zero and clears all laps
 * LEARNING: Resetting multiple state variables
 */
function resetStopwatch() {
    // First pause the stopwatch
    pauseStopwatch();
    
    // Reset state variables
    stopwatchTime = 0;
    lapCounter = 1;
    
    // Update display
    updateStopwatchDisplay();
    
    // Clear all lap times
    // LEARNING: innerHTML = '' clears all child elements
    lapsContainer.innerHTML = '';
    
    // Reset button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

/**
 * Records current time as a lap
 * LEARNING: Dynamic DOM element creation and insertion
 * 
 * Steps:
 * 1. Create container div
 * 2. Create and populate lap number element
 * 3. Create and populate lap time element
 * 4. Append children to container
 * 5. Insert at top of list (most recent first)
 */
function recordLap() {
    // Can only record lap while running
    if (!isRunning) return;
    
    // Create container for lap item
    // LEARNING: createElement() creates new HTML element
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';  // Add CSS class
    
    // Create lap number element
    const lapNumber = document.createElement('span');
    lapNumber.className = 'lap-number';
    lapNumber.textContent = `Lap ${lapCounter}`;
    
    // Create lap time element
    const lapTime = document.createElement('span');
    lapTime.className = 'lap-time';
    lapTime.textContent = formatStopwatchTime(stopwatchTime);
    
    // Assemble the lap item
    // LEARNING: appendChild() adds child element to parent
    lapItem.appendChild(lapNumber);
    lapItem.appendChild(lapTime);
    
    // Insert at beginning of list (most recent first)
    // LEARNING: insertBefore(new, existing) inserts before existing element
    // firstChild is the first element in container
    lapsContainer.insertBefore(lapItem, lapsContainer.firstChild);
    
    // Increment counter for next lap
    lapCounter++;
}

// ==============================================
// EVENT LISTENERS
// ==============================================

/**
 * BUTTON CLICK HANDLERS
 * LEARNING: addEventListener() attaches event handlers to elements
 */
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

/**
 * KEYBOARD SHORTCUTS
 * LEARNING: Keyboard event handling for accessibility
 * 
 * Supported keys:
 * - Space: Start/Pause toggle
 * - R: Reset stopwatch
 * - L: Record lap
 * 
 * Note: e.code vs e.key
 * - e.code: Physical key ("Space", "KeyA")
 * - e.key: Character value ("", "a", "A")
 */
document.addEventListener('keydown', (e) => {
    // Space bar: Toggle start/pause
    if (e.code === 'Space') {
        // Prevent default space behavior (page scroll)
        // LEARNING: preventDefault() stops default browser action
        e.preventDefault();
        
        // Toggle based on current state
        if (isRunning) {
            pauseStopwatch();
        } else {
            startStopwatch();
        }
    }
    
    // R key: Reset stopwatch
    // Check both lowercase and uppercase
    if (e.key === 'r' || e.key === 'R') {
        resetStopwatch();
    }
    
    // L key: Record lap
    if (e.key === 'l' || e.key === 'L') {
        recordLap();
    }
});

// ==============================================
// INITIALIZATION
// ==============================================

/**
 * Initialize clock and set up update interval
 * LEARNING: Immediate execution + scheduled updates
 */

// Update clock immediately on page load
updateClock();

// Set up interval to update clock every 1000ms (1 second)
// LEARNING: setInterval without storing ID (runs forever)
setInterval(updateClock, 1000);

// Display initial stopwatch time (00:00:00.000)
updateStopwatchDisplay();
