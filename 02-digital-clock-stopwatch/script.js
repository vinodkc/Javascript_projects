const clockElement = document.getElementById('clock');
const dateElement = document.getElementById('date');
const stopwatchDisplay = document.getElementById('stopwatchDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

let stopwatchInterval = null;
let stopwatchTime = 0;
let isRunning = false;
let lapCounter = 1;

function updateClock() {
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
}

function formatStopwatchTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const ms = milliseconds % 1000;
    
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

function updateStopwatchDisplay() {
    stopwatchDisplay.textContent = formatStopwatchTime(stopwatchTime);
}

function startStopwatch() {
    if (isRunning) return;
    
    isRunning = true;
    const startTime = Date.now() - stopwatchTime;
    
    stopwatchInterval = setInterval(() => {
        stopwatchTime = Date.now() - startTime;
        updateStopwatchDisplay();
    }, 10);
    
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
}

function pauseStopwatch() {
    if (!isRunning) return;
    
    isRunning = false;
    clearInterval(stopwatchInterval);
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function resetStopwatch() {
    pauseStopwatch();
    stopwatchTime = 0;
    lapCounter = 1;
    updateStopwatchDisplay();
    lapsContainer.innerHTML = '';
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

function recordLap() {
    if (!isRunning) return;
    
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    
    const lapNumber = document.createElement('span');
    lapNumber.className = 'lap-number';
    lapNumber.textContent = `Lap ${lapCounter}`;
    
    const lapTime = document.createElement('span');
    lapTime.className = 'lap-time';
    lapTime.textContent = formatStopwatchTime(stopwatchTime);
    
    lapItem.appendChild(lapNumber);
    lapItem.appendChild(lapTime);
    
    lapsContainer.insertBefore(lapItem, lapsContainer.firstChild);
    
    lapCounter++;
}

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (isRunning) {
            pauseStopwatch();
        } else {
            startStopwatch();
        }
    }
    
    if (e.key === 'r' || e.key === 'R') {
        resetStopwatch();
    }
    
    if (e.key === 'l' || e.key === 'L') {
        recordLap();
    }
});

updateClock();
setInterval(updateClock, 1000);
updateStopwatchDisplay();

