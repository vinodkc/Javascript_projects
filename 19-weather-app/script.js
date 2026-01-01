// ========================================
// CONFIGURATION
// ========================================

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const ICON_BASE_URL = 'https://openweathermap.org/img/wn';
const DEMO_MODE_KEY = 'weatherAppDemoMode';
const API_KEY_STORAGE = 'weatherAppApiKey';
const RECENT_SEARCHES_KEY = 'weatherAppRecentSearches';

// Demo data for testing without API key
const DEMO_WEATHER_DATA = {
    name: 'London',
    sys: { country: 'GB', sunrise: 1679900000, sunset: 1679943000 },
    weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    main: { temp: 20, feels_like: 18, humidity: 65, pressure: 1013 },
    wind: { speed: 5 },
    visibility: 10000,
    clouds: { all: 20 },
    coord: { lat: 51.5074, lon: -0.1278 }
};

// ========================================
// DOM ELEMENTS
// ========================================

// API Setup
const apiSetup = document.getElementById('apiSetup');
const apiKeyInput = document.getElementById('apiKeyInput');
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
const demoModeBtn = document.getElementById('demoModeBtn');

// Weather App
const weatherApp = document.getElementById('weatherApp');
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');

// Display Elements
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const weatherDisplay = document.getElementById('weatherDisplay');

// Weather Data
const cityName = document.getElementById('cityName');
const countryName = document.getElementById('countryName');
const lastUpdated = document.getElementById('lastUpdated');
const weatherIcon = document.getElementById('weatherIcon');
const weatherDescription = document.getElementById('weatherDescription');
const temperature = document.getElementById('temperature');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const cloudiness = document.getElementById('cloudiness');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

// Recent Searches
const recentList = document.getElementById('recentList');

// Settings
const changeApiKeyBtn = document.getElementById('changeApiKeyBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// ========================================
// STATE
// ========================================

let appState = {
    apiKey: null,
    isDemoMode: false,
    currentWeather: null,
    recentSearches: []
};

// ========================================
// INITIALIZATION
// ========================================

function init() {
    loadSettings();
    attachEventListeners();
    
    // Check if API key exists or demo mode is on
    if (appState.apiKey || appState.isDemoMode) {
        showWeatherApp();
        loadRecentSearches();
        
        // Load default city if available
        if (appState.recentSearches.length > 0) {
            fetchWeatherByCity(appState.recentSearches[0]);
        }
    } else {
        showApiSetup();
    }
}

function loadSettings() {
    appState.apiKey = localStorage.getItem(API_KEY_STORAGE);
    appState.isDemoMode = localStorage.getItem(DEMO_MODE_KEY) === 'true';
    
    const savedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (savedSearches) {
        appState.recentSearches = JSON.parse(savedSearches);
    }
}

function attachEventListeners() {
    saveApiKeyBtn.addEventListener('click', saveApiKey);
    demoModeBtn.addEventListener('click', enableDemoMode);
    searchBtn.addEventListener('click', searchWeather);
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchWeather();
    });
    locationBtn.addEventListener('click', getUserLocation);
    changeApiKeyBtn.addEventListener('click', () => {
        appState.apiKey = null;
        appState.isDemoMode = false;
        localStorage.removeItem(API_KEY_STORAGE);
        localStorage.removeItem(DEMO_MODE_KEY);
        showApiSetup();
    });
    clearHistoryBtn.addEventListener('click', clearHistory);
}

// ========================================
// API KEY MANAGEMENT
// ========================================

function saveApiKey() {
    const key = apiKeyInput.value.trim();
    
    if (!key) {
        alert('Please enter an API key!');
        return;
    }
    
    appState.apiKey = key;
    appState.isDemoMode = false;
    localStorage.setItem(API_KEY_STORAGE, key);
    localStorage.removeItem(DEMO_MODE_KEY);
    
    showWeatherApp();
    alert('API key saved successfully!');
}

function enableDemoMode() {
    appState.isDemoMode = true;
    appState.apiKey = null;
    localStorage.setItem(DEMO_MODE_KEY, 'true');
    localStorage.removeItem(API_KEY_STORAGE);
    
    showWeatherApp();
    displayWeather(DEMO_WEATHER_DATA);
}

function showApiSetup() {
    apiSetup.style.display = 'block';
    weatherApp.style.display = 'none';
}

function showWeatherApp() {
    apiSetup.style.display = 'none';
    weatherApp.style.display = 'block';
}

// ========================================
// WEATHER FETCHING
// ========================================

async function searchWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name!');
        return;
    }
    
    await fetchWeatherByCity(city);
    cityInput.value = '';
}

async function fetchWeatherByCity(city) {
    if (appState.isDemoMode) {
        // Show demo data
        showLoading();
        setTimeout(() => {
            const demoData = { ...DEMO_WEATHER_DATA, name: city };
            displayWeather(demoData);
            addToRecentSearches(city);
            hideLoading();
        }, 500);
        return;
    }
    
    showLoading();
    
    try {
        const url = `${API_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${appState.apiKey}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found! Please check the spelling.');
            } else if (response.status === 401) {
                throw new Error('Invalid API key! Please check your API key.');
            } else {
                throw new Error('Failed to fetch weather data!');
            }
        }
        
        const data = await response.json();
        displayWeather(data);
        addToRecentSearches(city);
        hideLoading();
    } catch (error) {
        hideLoading();
        showError(error.message);
        console.error('Weather fetch error:', error);
    }
}

async function getUserLocation() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser!');
        return;
    }
    
    showLoading();
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
            hideLoading();
            showError('Unable to get your location! Please enable location permissions.');
            console.error('Geolocation error:', error);
        }
    );
}

async function fetchWeatherByCoords(lat, lon) {
    if (appState.isDemoMode) {
        showLoading();
        setTimeout(() => {
            displayWeather(DEMO_WEATHER_DATA);
            hideLoading();
        }, 500);
        return;
    }
    
    try {
        const url = `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${appState.apiKey}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch weather data!');
        }
        
        const data = await response.json();
        displayWeather(data);
        addToRecentSearches(data.name);
        hideLoading();
    } catch (error) {
        hideLoading();
        showError(error.message);
        console.error('Weather fetch error:', error);
    }
}

// ========================================
// DISPLAY WEATHER
// ========================================

function displayWeather(data) {
    appState.currentWeather = data;
    
    // Location
    cityName.textContent = data.name;
    countryName.textContent = getCountryName(data.sys.country);
    lastUpdated.textContent = new Date().toLocaleTimeString();
    
    // Weather Icon and Description
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `${ICON_BASE_URL}/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;
    weatherDescription.textContent = capitalizeWords(data.weather[0].description);
    
    // Temperature
    temperature.textContent = Math.round(data.main.temp);
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    
    // Details
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    pressure.textContent = `${data.main.pressure} hPa`;
    visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    cloudiness.textContent = `${data.clouds.all}%`;
    
    // Sun Times
    sunrise.textContent = formatTime(data.sys.sunrise);
    sunset.textContent = formatTime(data.sys.sunset);
    
    // Show weather display
    weatherDisplay.style.display = 'block';
    errorMessage.style.display = 'none';
    
    // Update background based on weather
    updateBackground(data.weather[0].main);
}

// ========================================
// RECENT SEARCHES
// ========================================

function addToRecentSearches(city) {
    // Remove if already exists
    appState.recentSearches = appState.recentSearches.filter(c => c.toLowerCase() !== city.toLowerCase());
    
    // Add to beginning
    appState.recentSearches.unshift(city);
    
    // Keep max 5
    appState.recentSearches = appState.recentSearches.slice(0, 5);
    
    // Save
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(appState.recentSearches));
    
    // Display
    displayRecentSearches();
}

function loadRecentSearches() {
    displayRecentSearches();
}

function displayRecentSearches() {
    if (appState.recentSearches.length === 0) {
        recentList.innerHTML = '<p class="no-recent">No recent searches</p>';
        return;
    }
    
    recentList.innerHTML = '';
    
    appState.recentSearches.forEach(city => {
        const item = document.createElement('button');
        item.className = 'recent-item';
        item.textContent = city;
        item.addEventListener('click', () => fetchWeatherByCity(city));
        recentList.appendChild(item);
    });
}

function clearHistory() {
    if (confirm('Are you sure you want to clear search history?')) {
        appState.recentSearches = [];
        localStorage.removeItem(RECENT_SEARCHES_KEY);
        displayRecentSearches();
    }
}

// ========================================
// UI HELPERS
// ========================================

function showLoading() {
    loading.style.display = 'block';
    weatherDisplay.style.display = 'none';
    errorMessage.style.display = 'none';
}

function hideLoading() {
    loading.style.display = 'none';
}

function showError(message) {
    errorText.textContent = message;
    errorMessage.style.display = 'block';
    weatherDisplay.style.display = 'none';
}

function updateBackground(weatherType) {
    const body = document.body;
    body.classList.remove('clear', 'clouds', 'rain', 'snow', 'thunderstorm');
    
    switch(weatherType.toLowerCase()) {
        case 'clear':
            body.classList.add('clear');
            break;
        case 'clouds':
            body.classList.add('clouds');
            break;
        case 'rain':
        case 'drizzle':
            body.classList.add('rain');
            break;
        case 'snow':
            body.classList.add('snow');
            break;
        case 'thunderstorm':
            body.classList.add('thunderstorm');
            break;
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function capitalizeWords(str) {
    return str.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function getCountryName(code) {
    const countries = {
        GB: 'United Kingdom',
        US: 'United States',
        FR: 'France',
        DE: 'Germany',
        IT: 'Italy',
        ES: 'Spain',
        JP: 'Japan',
        CN: 'China',
        IN: 'India',
        BR: 'Brazil',
        AU: 'Australia',
        CA: 'Canada'
    };
    
    return countries[code] || code;
}

// ========================================
// INITIALIZE
// ========================================

init();

console.log('Weather Widget loaded! 🌤️');
console.log('Demo mode:', appState.isDemoMode);
console.log('API key set:', !!appState.apiKey);

