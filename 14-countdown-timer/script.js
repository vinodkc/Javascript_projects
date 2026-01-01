const timerSetup = document.getElementById('timerSetup');
const timerDisplay = document.getElementById('timerDisplay');
const completedScreen = document.getElementById('completedScreen');
const eventNameInput = document.getElementById('eventName');
const targetDateInput = document.getElementById('targetDate');
const targetTimeInput = document.getElementById('targetTime');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const editBtn = document.getElementById('editBtn');
const newBtn = document.getElementById('newBtn');
const presetButtons = document.querySelectorAll('.preset-btn');
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

let countdownInterval = null;
let targetDateTime = null;
let startDateTime = null;

function setMinimumDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    targetDateInput.min = `${year}-${month}-${day}`;
    targetDateInput.value = `${year}-${month}-${day}`;
}

function formatTimeUnit(value) {
    return String(value).padStart(2, '0');
}

function formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days !== 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''}`;
    if (minutes > 0) return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDateTime - now;
    
    if (distance < 0) {
        stopCountdown();
        showCompletedScreen();
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    daysEl.textContent = formatTimeUnit(days);
    hoursEl.textContent = formatTimeUnit(hours);
    minutesEl.textContent = formatTimeUnit(minutes);
    secondsEl.textContent = formatTimeUnit(seconds);
    
    remainingDisplay.textContent = formatDuration(distance);
    
    const totalTime = targetDateTime - startDateTime;
    const elapsed = now - startDateTime;
    const progress = Math.min((elapsed / totalTime) * 100, 100);
    progressFill.style.width = `${progress}%`;
}

function startCountdown() {
    const eventName = eventNameInput.value.trim() || 'Your Event';
    const dateValue = targetDateInput.value;
    const timeValue = targetTimeInput.value;
    
    if (!dateValue) {
        alert('Please select a target date!');
        return;
    }
    
    const targetDate = new Date(`${dateValue}T${timeValue}`);
    const now = new Date();
    
    if (targetDate <= now) {
        alert('Please select a future date and time!');
        return;
    }
    
    targetDateTime = targetDate.getTime();
    startDateTime = now.getTime();
    
    eventTitle.textContent = `Countdown to ${eventName}`;
    targetDateDisplay.textContent = targetDate.toLocaleString();
    totalTimeDisplay.textContent = formatDuration(targetDateTime - startDateTime);
    
    timerSetup.classList.add('hidden');
    timerDisplay.classList.remove('hidden');
    
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
    
    saveCountdown(eventName, targetDateTime, startDateTime);
}

function stopCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

function resetCountdown() {
    if (confirm('Are you sure you want to reset the countdown?')) {
        stopCountdown();
        timerDisplay.classList.add('hidden');
        timerSetup.classList.remove('hidden');
        localStorage.removeItem('countdown');
    }
}

function showCompletedScreen() {
    timerDisplay.classList.add('hidden');
    completedScreen.classList.remove('hidden');
    
    const eventName = eventTitle.textContent.replace('Countdown to ', '');
    completedMessage.textContent = `${eventName} is here!`;
    
    localStorage.removeItem('countdown');
}

function newCountdown() {
    completedScreen.classList.add('hidden');
    timerSetup.classList.remove('hidden');
    eventNameInput.value = '';
    setMinimumDate();
}

function editCountdown() {
    stopCountdown();
    timerDisplay.classList.add('hidden');
    timerSetup.classList.remove('hidden');
}

function saveCountdown(eventName, target, start) {
    const data = {
        eventName,
        targetDateTime: target,
        startDateTime: start
    };
    localStorage.setItem('countdown', JSON.stringify(data));
}

function loadCountdown() {
    const saved = localStorage.getItem('countdown');
    if (!saved) return false;
    
    const data = JSON.parse(saved);
    const now = new Date().getTime();
    
    if (data.targetDateTime <= now) {
        localStorage.removeItem('countdown');
        return false;
    }
    
    eventNameInput.value = data.eventName;
    targetDateTime = data.targetDateTime;
    startDateTime = data.startDateTime;
    
    eventTitle.textContent = `Countdown to ${data.eventName}`;
    const targetDate = new Date(targetDateTime);
    targetDateDisplay.textContent = targetDate.toLocaleString();
    totalTimeDisplay.textContent = formatDuration(targetDateTime - startDateTime);
    
    timerSetup.classList.add('hidden');
    timerDisplay.classList.remove('hidden');
    
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
    
    return true;
}

function setPresetTime(minutes = 0, hours = 0, days = 0) {
    const now = new Date();
    const futureDate = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000));
    
    const year = futureDate.getFullYear();
    const month = String(futureDate.getMonth() + 1).padStart(2, '0');
    const day = String(futureDate.getDate()).padStart(2, '0');
    const hour = String(futureDate.getHours()).padStart(2, '0');
    const minute = String(futureDate.getMinutes()).padStart(2, '0');
    
    targetDateInput.value = `${year}-${month}-${day}`;
    targetTimeInput.value = `${hour}:${minute}`;
}

presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const minutes = parseInt(btn.dataset.minutes) || 0;
        const hours = parseInt(btn.dataset.hours) || 0;
        const days = parseInt(btn.dataset.days) || 0;
        setPresetTime(minutes, hours, days);
    });
});

startBtn.addEventListener('click', startCountdown);
resetBtn.addEventListener('click', resetCountdown);
editBtn.addEventListener('click', editCountdown);
newBtn.addEventListener('click', newCountdown);

setMinimumDate();

if (!loadCountdown()) {
    timerSetup.classList.remove('hidden');
}

