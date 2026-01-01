/**
 * ==============================================
 * IMAGE SLIDER - Learning Documentation
 * ==============================================
 * 
 * CONCEPTS COVERED:
 * - setInterval/clearInterval: Automatic slide transitions
 * - Touch Events: touchstart, touchend for mobile swipe
 * - Keyboard Events: Arrow keys and spacebar
 * - Circular Navigation: Wrapping around at ends
 * - Dynamic Indicators: Click-to-navigate dots
 * - State Management: Current slide, autoplay status
 * - Event Coordination: Reset timer on manual navigation
 * 
 * KEY LEARNING POINTS:
 * 1. Autoplay with setInterval
 * 2. Touch gesture detection (swipe)
 * 3. Circular array navigation
 * 4. Multiple input methods (click, keyboard, touch)
 * 5. Interval management (start, stop, reset)
 */

// ==============================================
// DOM ELEMENTS
// ==============================================
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');
const playPauseBtn = document.getElementById('playPauseBtn');
const speedControl = document.getElementById('speedControl');
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');
const autoplayStatusEl = document.getElementById('autoplayStatus');

// ==============================================
// STATE VARIABLES
// ==============================================

/**
 * currentSlide: Index of currently displayed slide (0-based)
 * LEARNING: Tracks position in slides array
 */
let currentSlide = 0;

/**
 * autoplayInterval: Stores interval ID for autoplay
 * LEARNING: Needed to clear/reset interval
 */
let autoplayInterval = null;

/**
 * autoplaySpeed: Milliseconds between slide changes
 * LEARNING: Configurable timing for autoplay
 */
let autoplaySpeed = 3000;  // 3 seconds

/**
 * isPlaying: Boolean flag for autoplay state
 */
let isPlaying = true;

// ==============================================
// INDICATOR DOTS
// ==============================================

/**
 * Creates indicator dots (one per slide)
 * LEARNING: Dynamic element creation based on data
 */
function createIndicators() {
    // Create indicator for each slide
    // LEARNING: forEach with (value, index) - we only need index
    // Underscore (_) is convention for unused parameter
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        
        // First indicator starts active
        if (index === 0) indicator.classList.add('active');
        
        // Click to jump to slide
        // LEARNING: Closure captures index
        indicator.addEventListener('click', () => goToSlide(index));
        
        indicatorsContainer.appendChild(indicator);
    });
}

/**
 * Updates indicator dots to show current slide
 * LEARNING: Visual feedback synchronization
 */
function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    
    indicators.forEach((indicator, index) => {
        // Highlight indicator matching current slide
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// ==============================================
// SLIDE NAVIGATION
// ==============================================

/**
 * Displays slide at given index
 * LEARNING: Circular navigation with wrapping
 * 
 * @param {number} index - Target slide index
 * 
 * Handles edge cases:
 * - Index >= length: Wrap to first slide
 * - Index < 0: Wrap to last slide
 */
function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Handle wrapping
    // LEARNING: Circular navigation pattern
    if (index >= slides.length) {
        // Past last slide: go to first
        currentSlide = 0;
    } else if (index < 0) {
        // Before first slide: go to last
        currentSlide = slides.length - 1;
    } else {
        // Within range: use as-is
        currentSlide = index;
    }
    
    // Show target slide
    slides[currentSlide].classList.add('active');
    
    // Update UI
    updateIndicators();
    updateInfo();
}

/**
 * Advances to next slide
 * LEARNING: Increment index (wrapping handled by showSlide)
 */
function nextSlide() {
    showSlide(currentSlide + 1);
}

/**
 * Goes to previous slide
 * LEARNING: Decrement index (wrapping handled by showSlide)
 */
function prevSlide() {
    showSlide(currentSlide - 1);
}

/**
 * Jumps directly to specific slide
 * LEARNING: Direct navigation with autoplay reset
 * 
 * @param {number} index - Target slide index
 */
function goToSlide(index) {
    showSlide(index);
    
    // Reset autoplay timer if playing
    // LEARNING: Prevent immediate auto-advance after manual selection
    if (isPlaying) {
        resetAutoplay();
    }
}

// ==============================================
// AUTOPLAY CONTROLS
// ==============================================

/**
 * Starts automatic slide progression
 * LEARNING: setInterval for repeated execution
 * 
 * Steps:
 * 1. Clear any existing interval
 * 2. Create new interval
 * 3. Update UI state
 */
function startAutoplay() {
    // Clear existing interval if any
    // LEARNING: Prevent multiple intervals running simultaneously
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
    }
    
    // Start new interval
    // LEARNING: setInterval(function, delay) repeats function every delay ms
    autoplayInterval = setInterval(nextSlide, autoplaySpeed);
    
    // Update state
    isPlaying = true;
    playPauseBtn.textContent = '⏸️ Pause';
    autoplayStatusEl.textContent = 'On';
}

/**
 * Stops automatic slide progression
 * LEARNING: clearInterval to stop repeated execution
 */
function stopAutoplay() {
    // Clear interval
    if (autoplayInterval) {
        // LEARNING: clearInterval(id) stops interval created by setInterval
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
    
    // Update state
    isPlaying = false;
    playPauseBtn.textContent = '▶️ Play';
    autoplayStatusEl.textContent = 'Off';
}

/**
 * Restarts autoplay timer
 * LEARNING: Pattern for resetting intervals
 * 
 * Use case: User manually navigates → reset timer to prevent
 * immediate auto-advance
 */
function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
}

/**
 * Toggles autoplay on/off
 * LEARNING: Binary state toggle
 */
function toggleAutoplay() {
    if (isPlaying) {
        stopAutoplay();
    } else {
        startAutoplay();
    }
}

/**
 * Changes autoplay speed and restarts if playing
 * LEARNING: Dynamic interval speed adjustment
 */
function changeSpeed() {
    // Get new speed from input
    autoplaySpeed = parseInt(speedControl.value);
    
    // Restart interval with new speed
    // LEARNING: Must recreate interval to change timing
    if (isPlaying) {
        resetAutoplay();
    }
}

// ==============================================
// UI UPDATE
// ==============================================

/**
 * Updates slide counter display
 * LEARNING: Convert 0-based index to 1-based display
 */
function updateInfo() {
    // Add 1 to convert from 0-based to 1-based
    currentSlideEl.textContent = currentSlide + 1;
}

// ==============================================
// KEYBOARD NAVIGATION
// ==============================================

/**
 * Handles keyboard shortcuts
 * LEARNING: Keyboard event handling
 * 
 * @param {KeyboardEvent} e - Keyboard event
 * 
 * Supported keys:
 * - Arrow Left: Previous slide
 * - Arrow Right: Next slide
 * - Space: Toggle autoplay
 */
function handleKeyboard(e) {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        if (isPlaying) resetAutoplay();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        if (isPlaying) resetAutoplay();
    } else if (e.key === ' ') {
        // Prevent default space behavior (page scroll)
        e.preventDefault();
        toggleAutoplay();
    }
}

// ==============================================
// BUTTON EVENT LISTENERS
// ==============================================

/**
 * Previous button handler
 */
prevBtn.addEventListener('click', () => {
    prevSlide();
    if (isPlaying) resetAutoplay();
});

/**
 * Next button handler
 */
nextBtn.addEventListener('click', () => {
    nextSlide();
    if (isPlaying) resetAutoplay();
});

/**
 * Play/Pause button handler
 */
playPauseBtn.addEventListener('click', toggleAutoplay);

/**
 * Speed control handler
 */
speedControl.addEventListener('change', changeSpeed);

/**
 * Keyboard event listener
 */
document.addEventListener('keydown', handleKeyboard);

// ==============================================
// TOUCH/SWIPE SUPPORT
// ==============================================

/**
 * Touch coordinates for swipe detection
 * LEARNING: Track start and end positions
 */
let touchStartX = 0;
let touchEndX = 0;

/**
 * Touchstart handler: Record starting position
 * LEARNING: Touch events provide touch coordinates
 */
document.querySelector('.slider-container').addEventListener('touchstart', (e) => {
    // Get X coordinate of first touch point
    // LEARNING: changedTouches[0] is the first finger
    // screenX is horizontal position
    touchStartX = e.changedTouches[0].screenX;
});

/**
 * Touchend handler: Record ending position and detect swipe
 * LEARNING: Calculate swipe direction from coordinates
 */
document.querySelector('.slider-container').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

/**
 * Detects swipe direction and navigates
 * LEARNING: Gesture recognition through coordinate math
 * 
 * Algorithm:
 * - Swipe left (end < start): Next slide
 * - Swipe right (end > start): Previous slide
 * - Threshold prevents accidental triggers
 */
function handleSwipe() {
    // Minimum swipe distance (pixels)
    // LEARNING: Threshold prevents small accidental touches
    const swipeThreshold = 50;
    
    // Swipe left: next slide
    // LEARNING: touchEndX < touchStartX means moved left
    if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
        if (isPlaying) resetAutoplay();
    }
    
    // Swipe right: previous slide
    // LEARNING: touchEndX > touchStartX means moved right
    if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
        if (isPlaying) resetAutoplay();
    }
}

// ==============================================
// INITIALIZATION
// ==============================================

/**
 * Initialize slider on page load
 * LEARNING: Setup sequence
 */

// Display total slide count
totalSlidesEl.textContent = slides.length;

// Create indicator dots
createIndicators();

// Update display
updateInfo();

// Start autoplay
startAutoplay();
