const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');
const playPauseBtn = document.getElementById('playPauseBtn');
const speedControl = document.getElementById('speedControl');
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');
const autoplayStatusEl = document.getElementById('autoplayStatus');

let currentSlide = 0;
let autoplayInterval = null;
let autoplaySpeed = 3000;
let isPlaying = true;

function createIndicators() {
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    slides[currentSlide].classList.add('active');
    updateIndicators();
    updateInfo();
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function goToSlide(index) {
    showSlide(index);
    if (isPlaying) {
        resetAutoplay();
    }
}

function startAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
    }
    autoplayInterval = setInterval(nextSlide, autoplaySpeed);
    isPlaying = true;
    playPauseBtn.textContent = '⏸️ Pause';
    autoplayStatusEl.textContent = 'On';
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
    isPlaying = false;
    playPauseBtn.textContent = '▶️ Play';
    autoplayStatusEl.textContent = 'Off';
}

function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
}

function toggleAutoplay() {
    if (isPlaying) {
        stopAutoplay();
    } else {
        startAutoplay();
    }
}

function changeSpeed() {
    autoplaySpeed = parseInt(speedControl.value);
    if (isPlaying) {
        resetAutoplay();
    }
}

function updateInfo() {
    currentSlideEl.textContent = currentSlide + 1;
}

function handleKeyboard(e) {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        if (isPlaying) resetAutoplay();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        if (isPlaying) resetAutoplay();
    } else if (e.key === ' ') {
        e.preventDefault();
        toggleAutoplay();
    }
}

prevBtn.addEventListener('click', () => {
    prevSlide();
    if (isPlaying) resetAutoplay();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    if (isPlaying) resetAutoplay();
});

playPauseBtn.addEventListener('click', toggleAutoplay);
speedControl.addEventListener('change', changeSpeed);
document.addEventListener('keydown', handleKeyboard);

let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.slider-container').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.slider-container').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
        if (isPlaying) resetAutoplay();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
        if (isPlaying) resetAutoplay();
    }
}

totalSlidesEl.textContent = slides.length;
createIndicators();
updateInfo();
startAutoplay();

