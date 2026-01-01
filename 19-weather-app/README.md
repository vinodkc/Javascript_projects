## Project 19: 🌤️ Weather Widget

A real-time weather application using the OpenWeatherMap API with geolocation support!

## 🎯 Learning Objectives

By completing this project, you will:
- Master async/await for API calls
- Learn the Fetch API for HTTP requests
- Understand Geolocation API for location detection
- Implement API error handling
- Work with JSON data parsing
- Create dynamic backgrounds based on data

## 📚 What You'll Learn

### Core Concepts
1. **Fetch API**: Make HTTP requests to external APIs
2. **Async/Await**: Handle asynchronous operations
3. **Geolocation API**: Get user's current location
4. **API Integration**: Work with real weather data
5. **Error Handling**: Try/catch for failed requests
6. **JSON Parsing**: Extract data from API responses

### Skills Developed
- fetch() with API URLs and parameters
- async/await syntax
- navigator.geolocation.getCurrentPosition()
- Error handling with try/catch
- JSON data extraction
- Dynamic UI updates based on API data
- LocalStorage for recent searches

## 🔧 Implementation Explanation

### How It Works

**1. Fetch API with Async/Await**
```javascript
async function fetchWeather(city) {
  const url = `${API_URL}?q=${city}&appid=${API_KEY}`
  const response = await fetch(url)
  const data = await response.json()
  return data
}
```

**2. Geolocation API**
```javascript
navigator.geolocation.getCurrentPosition(
  position => {
    lat = position.coords.latitude
    lon = position.coords.longitude
  },
  error => console.error(error)
)
```

**3. Error Handling**
```javascript
try {
  const data = await fetchWeather(city)
} catch (error) {
  showError('City not found')
}
```

**4. Temperature Conversion**
```javascript
celsius = kelvin - 273.15
fahrenheit = (kelvin - 273.15) * 9/5 + 32
```

## 📖 Further Learning - W3Schools

- [JavaScript Fetch API](https://www.w3schools.com/js/js_api_fetch.asp)
- [JavaScript Async/Await](https://www.w3schools.com/js/js_async.asp)
- [JavaScript JSON.parse()](https://www.w3schools.com/js/js_json_parse.asp)
- [JavaScript Try/Catch](https://www.w3schools.com/js/js_errors.asp)
- [JavaScript Promises](https://www.w3schools.com/js/js_promise.asp)
- [HTML Geolocation API](https://www.w3schools.com/html/html5_geolocation.asp)

### ✨ Features

- **Real API Integration**: Fetches live weather data
- **Demo Mode**: Try without API key using sample data
- **Geolocation**: Get weather for your current location
- **Recent Searches**: Quick access to previously searched cities
- **Dynamic Backgrounds**: Changes based on weather conditions
- **Comprehensive Data**: Temperature, humidity, wind, visibility, sunrise/sunset
- **Responsive Design**: Works on all devices

### 🚀 Setup Instructions

**Option 1: Real API (Recommended)**
1. Visit [OpenWeatherMap.org](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Enter API key in the app

**Option 2: Demo Mode**
- Click "Use Demo Data" to try with sample weather

### 📚 Key Concepts

**1. Fetch API with Async/Await**
```javascript
async function fetchWeather(city) {
    const url = `${API_URL}?q=${city}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
```

**2. Geolocation API**
```javascript
navigator.geolocation.getCurrentPosition(
    (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
    }
);
```

**3. Error Handling**
```javascript
try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('City not found!');
    }
    const data = await response.json();
} catch (error) {
    showError(error.message);
}
```

**4. LocalStorage for Searches**
```javascript
// Save recent searches
localStorage.setItem('searches', JSON.stringify(searches));

// Load recent searches
const saved = localStorage.getItem('searches');
const searches = JSON.parse(saved);
```

**5. Dynamic Backgrounds**
```javascript
function updateBackground(weather) {
    document.body.classList.remove('clear', 'rain', 'snow');
    document.body.classList.add(weather.toLowerCase());
}
```

### 🎯 Learning Outcomes

✅ Fetch API and HTTP requests
✅ Async/await pattern
✅ API authentication
✅ Error handling strategies
✅ Geolocation API
✅ LocalStorage persistence
✅ Dynamic UI updates
✅ URL encoding
✅ JSON parsing

### 🌍 API Details

**OpenWeatherMap API:**
- Free tier: 60 calls/minute
- Data: Current weather, forecast, air quality
- Documentation: [openweathermap.org/api](https://openweathermap.org/api)

**Weather Data Returned:**
- Temperature (°C)
- Feels like temperature
- Humidity (%)
- Wind speed (m/s)
- Pressure (hPa)
- Visibility (km)
- Cloudiness (%)
- Sunrise/Sunset times

---

**Built for learning JavaScript APIs and async programming! 🌤️🚀**
