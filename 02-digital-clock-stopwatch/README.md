# Digital Clock & Stopwatch

A beautiful digital clock with live time display and a fully functional stopwatch with lap time recording.

## 🎯 Learning Objectives

By completing this project, you will:
- Master JavaScript Date object and time manipulation
- Learn to use setInterval and clearInterval for timers
- Understand state management for start/pause/reset functionality
- Implement dynamic DOM element creation
- Work with millisecond-precision timing
- Create smooth CSS animations and transitions

## 📚 What You'll Learn

### Core Concepts
1. **Time Handling**: Working with Date objects, timestamps, and time calculations
2. **Interval Management**: Starting, pausing, and clearing intervals
3. **Dynamic DOM**: Creating and inserting elements on the fly
4. **State Tracking**: Managing running state and lap counters
5. **String Formatting**: Padding numbers and formatting time displays

### Skills Developed
- Using `setInterval()` for recurring functions
- Calculating time differences with `Date.now()`
- String padding with `padStart()` for consistent formatting
- Creating elements with `createElement()` and `insertBefore()`
- Keyboard event handling for accessibility
- Button state management (enable/disable)

## 🔧 Implementation Explanation

### How It Works

**1. Digital Clock Component**
- Uses `setInterval()` to update every second (1000ms)
- Creates new Date object on each update
- Extracts hours, minutes, seconds using Date methods
- Formats display using `padStart()` for leading zeros
- Updates both time and date displays

**2. Stopwatch State Management**
```javascript
stopwatchTime: accumulated elapsed time in milliseconds
stopwatchInterval: stores interval ID for clearing
isRunning: boolean to track start/pause state
lapCounter: increments for each lap recorded
```

**3. Stopwatch Flow**
- **Start**: Records start timestamp, begins interval updating every 10ms
- **Pause**: Clears interval, preserves elapsed time
- **Resume**: Continues from stored elapsed time
- **Reset**: Clears time, stops interval, removes all laps
- **Lap**: Records current time and adds to lap list

**4. Time Calculation**
```javascript
currentTime = Date.now()
elapsed = currentTime - startTime + stopwatchTime
hours = Math.floor(elapsed / 3600000)
minutes = Math.floor((elapsed % 3600000) / 60000)
seconds = Math.floor((elapsed % 60000) / 1000)
milliseconds = Math.floor((elapsed % 1000) / 10)
```

**5. Dynamic Lap Creation**
- Creates new `<li>` element for each lap
- Uses `insertBefore()` to add at top of list
- Increments lap counter for numbering
- Displays formatted time for that lap

**6. Keyboard Integration**
- Space bar: Start/Pause toggle
- R key: Reset stopwatch
- L key: Record lap time
- Uses `e.code` for reliable key detection

## Features

### Digital Clock
- ✅ Real-time hours, minutes, and seconds display
- ✅ Current date with full formatting
- ✅ 24-hour format
- ✅ Auto-updates every second

### Stopwatch
- ✅ Start/Pause functionality
- ✅ Reset button to clear time
- ✅ Lap time recording with counter
- ✅ Millisecond precision
- ✅ Smooth animations
- ✅ Keyboard shortcuts

## Keyboard Shortcuts

- `Space`: Start/Pause stopwatch
- `R`: Reset stopwatch
- `L`: Record lap time

## How to Use

1. Open `index.html` in your browser
2. The digital clock automatically displays current time
3. Use the stopwatch controls:
   - Click **Start** to begin timing
   - Click **Pause** to stop temporarily
   - Click **Lap** to record current time
   - Click **Reset** to clear everything

## 📖 Further Learning - W3Schools

- [JavaScript Date Objects](https://www.w3schools.com/js/js_dates.asp)
- [JavaScript setInterval()](https://www.w3schools.com/jsref/met_win_setinterval.asp)
- [JavaScript clearInterval()](https://www.w3schools.com/jsref/met_win_clearinterval.asp)
- [JavaScript Date Methods](https://www.w3schools.com/js/js_date_methods.asp)
- [JavaScript String padStart()](https://www.w3schools.com/jsref/jsref_string_padstart.asp)
- [JavaScript Math.floor()](https://www.w3schools.com/jsref/jsref_floor.asp)
- [CSS Animations](https://www.w3schools.com/css/css3_animations.asp)

## Learning Points

### HTML Concepts
- **Semantic Sections**: Separate sections for clock and stopwatch
- **Button States**: `disabled` attribute for inactive buttons
- **Descriptive IDs**: Meaningful element identifiers
- **Container Hierarchy**: Nested div structure for organization
- **Accessibility**: Button labels and semantic HTML

### CSS Concepts
- **Flexbox Layout**: Centering with `display: flex; justify-content: center; align-items: center`
- **CSS Grid**: `.controls { display: grid; grid-template-columns: repeat(4, 1fr); }`
- **CSS Animations**: `@keyframes slideIn` for smooth entrances
- **Transitions**: `transition: all 0.3s` for hover effects
- **Disabled State**: `.btn:disabled { opacity: 0.5; cursor: not-allowed; }`
- **Transform Property**: `transform: translateY(-2px)` for lift effect
- **Background Gradients**: Linear gradients for visual appeal
- **Font Families**: Monospace for numbers (`'Courier New', monospace`)
- **Overflow Handling**: `overflow-y: auto` for scrollable lap list
- **Media Queries**: `@media (max-width: 600px)` for responsive design
- **CSS Variables**: Could use for theming
- **Box Shadow**: Depth and elevation effects

### JavaScript Concepts
- **Date Object**:
  - `new Date()` - Current date/time
  - `getHours()`, `getMinutes()`, `getSeconds()` - Extract time parts
  - `toLocaleDateString()` - Format date with locale
- **Timers**:
  - `setInterval(callback, delay)` - Repeat function every delay ms
  - `clearInterval(intervalId)` - Stop interval
  - `Date.now()` - Get current timestamp in milliseconds
- **String Methods**:
  - `String(value).padStart(2, '0')` - Pad numbers to 2 digits
- **Math Operations**:
  - `Math.floor()` - Round down to nearest integer
- **State Management**:
  - `stopwatchInterval` - Store interval ID
  - `stopwatchTime` - Track elapsed time
  - `isRunning` - Boolean state
  - `lapCounter` - Increment counter
- **DOM Manipulation**:
  - `document.createElement()` - Create new elements
  - `element.insertBefore()` - Insert at specific position
  - `element.textContent` - Set text content
- **Event Listeners**:
  - Click events on buttons
  - Keyboard events (`e.code`, `e.key`)
  - `e.preventDefault()` - Prevent default behavior
- **Template Literals**: `${hours}:${minutes}:${seconds}`
- **Options Object**: Configure `toLocaleDateString({ weekday, year, month, day })`
- **Modulo Operator**: `%` for extracting time units

