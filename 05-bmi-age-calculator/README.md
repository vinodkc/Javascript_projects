# BMI & Age Calculator

A comprehensive dual-purpose health calculator featuring Body Mass Index (BMI) calculations and precise age calculations. Perfect for health tracking and date mathematics!

## 🎯 Learning Objectives

By completing this project, you will:
- Master complex date mathematics and time calculations
- Learn unit conversion between metric and imperial systems
- Understand tab-based navigation and dynamic UI switching
- Work with radio buttons and form validation
- Implement classification systems with conditional logic
- Create data-driven visual feedback systems

## 📚 What You'll Learn

### Core Concepts
1. **Tab System**: Creating multi-section interfaces with navigation
2. **Date Manipulation**: Advanced Date object operations and calculations
3. **Unit Conversion**: Mathematical conversions between measurement systems
4. **Classification Logic**: Categorizing values into meaningful ranges
5. **Dynamic Forms**: Showing/hiding inputs based on user selection
6. **Radio Button Groups**: Managing mutually exclusive options

### Skills Developed
- Complex date arithmetic (years, months, days calculations)
- Unit conversion formulas (imperial ↔ metric)
- BMI calculation and WHO classification
- Tab switching with data attributes
- Dynamic CSS class management
- Number formatting with `toLocaleString()`
- Input validation and error handling
- Conditional rendering of form sections

## 🔧 Implementation Explanation

### How It Works

**1. Tab Navigation System**
- Uses `data-tab` attributes to link buttons with content
- Single event listener manages all tab switches
- Removes `active` class from all, adds to selected
- Smooth fade-in animations for content transitions

**2. Unit Selection with Radio Buttons**
- Radio buttons grouped by `name` attribute
- `change` event toggles input field visibility
- Shows metric (cm, kg) or imperial (ft, in, lbs) inputs
- Converts to standard units before calculation

**3. BMI Calculation Flow**
```
Input → Convert to Metric → Calculate BMI → Classify → Display
```

**4. BMI Formula**
```javascript
BMI = weight (kg) / height² (m²)
```
Example: 70kg ÷ (1.75m)² = 70 ÷ 3.06 = 22.9

**5. Unit Conversions**
```javascript
// Imperial to Metric
height(m) = inches × 0.0254
weight(kg) = pounds × 0.453592

// Metric
height(m) = cm / 100
```

**6. BMI Classification (WHO Standard)**
- Underweight: BMI < 18.5
- Normal: 18.5 ≤ BMI < 25
- Overweight: 25 ≤ BMI < 30
- Obese: BMI ≥ 30

**7. Age Calculation Challenges**
- Handle months with different lengths (28-31 days)
- "Borrow" logic for negative days/months
- Account for leap years
- Validate against future dates

**8. Age Calculation Steps**
```
1. Calculate year difference
2. Calculate month difference
3. Calculate day difference
4. Adjust if days negative (borrow from months)
5. Adjust if months negative (borrow from years)
```

**9. Total Time Calculations**
```javascript
milliseconds = today - birthdate
days = ms / (1000 * 60 * 60 * 24)
hours = ms / (1000 * 60 * 60)
weeks = days / 7
months = days / 30.44 (average)
```

**10. Next Birthday Logic**
- Create date for this year's birthday
- If already passed, use next year
- Calculate days between today and that date

## 🎯 Features

### BMI Calculator
- ✅ Support for both **Metric** (cm, kg) and **Imperial** (ft, in, lbs) units
- ✅ Real-time BMI calculation
- ✅ BMI classification with color coding (Underweight, Normal, Overweight, Obese)
- ✅ Visual BMI chart with active category highlighting
- ✅ Personalized health recommendations based on BMI
- ✅ Input validation with helpful error messages
- ✅ Automatic unit conversion
- ✅ Precise calculations with proper rounding

### Age Calculator
- ✅ Calculate exact age in years, months, and days
- ✅ Display total time lived in:
  - Months
  - Weeks
  - Days
  - Hours (approximate)
- ✅ Days until next birthday countdown
- ✅ Beautiful visual presentation
- ✅ Date validation (prevents future dates)
- ✅ Handles leap years correctly

## 📖 Further Learning - W3Schools

- [JavaScript Date Objects](https://www.w3schools.com/js/js_dates.asp)
- [JavaScript Date Methods](https://www.w3schools.com/js/js_date_methods.asp)
- [JavaScript Math pow()](https://www.w3schools.com/jsref/jsref_pow.asp)
- [JavaScript Number toLocaleString()](https://www.w3schools.com/jsref/jsref_tolocalestring_number.asp)
- [HTML Radio Buttons](https://www.w3schools.com/tags/att_input_type_radio.asp)
- [HTML Date Input](https://www.w3schools.com/tags/att_input_type_date.asp)
- [CSS @keyframes](https://www.w3schools.com/cssref/css3_pr_animation-keyframes.php)

## 🚀 How to Use

### BMI Calculator
1. Open `index.html` in your browser
2. Click on "BMI Calculator" tab (default active)
3. Choose your preferred unit system:
   - **Metric**: Centimeters (cm) and Kilograms (kg)
   - **Imperial**: Feet/Inches and Pounds (lbs)
4. Enter your height and weight
5. Click "Calculate BMI" or press Enter
6. View your results:
   - BMI value (with 1 decimal place)
   - BMI category (color-coded)
   - Health recommendations
   - Visual category indicator

### Age Calculator
1. Click on "Age Calculator" tab
2. Select your date of birth using the date picker
3. Click "Calculate Age" or press Enter
4. View comprehensive age information:
   - Exact age (years, months, days)
   - Total months lived
   - Total weeks lived
   - Total days lived
   - Total hours lived (approximate)
   - Days until next birthday

## 📚 Concepts & Learning Points

### HTML Concepts Used

#### 1. Tab System Structure
```html
<div class="tabs">
    <button class="tab-btn active" data-tab="bmi">BMI Calculator</button>
    <button class="tab-btn" data-tab="age">Age Calculator</button>
</div>

<div id="bmi-calculator" class="tab-content active">
    <!-- BMI calculator content -->
</div>

<div id="age-calculator" class="tab-content">
    <!-- Age calculator content -->
</div>
```
**Key points:**
- `data-tab` attribute links buttons to content sections
- `active` class controls visibility
- Semantic organization for maintainability

#### 2. Radio Buttons for Unit Selection
```html
<div class="unit-selector">
    <label>
        <input type="radio" name="unit" value="metric" checked>
        Metric (cm, kg)
    </label>
    <label>
        <input type="radio" name="unit" value="imperial">
        Imperial (ft, in, lbs)
    </label>
</div>
```
**Benefits:**
- `name="unit"` groups radio buttons (only one selectable)
- `checked` attribute sets default selection
- `value` attribute stores selection data

#### 3. Date Input with Constraints
```html
<input 
    type="date" 
    id="birthdate" 
    max="2026-01-01"
    required>
```
**`max` attribute**: Prevents selecting future dates
**`type="date"`**: Native date picker on all modern browsers

### CSS Concepts Used

#### 1. Tab Switching with Display Property
```css
.tab-content {
    display: none;  /* Hide all tabs by default */
}

.tab-content.active {
    display: block;  /* Show active tab */
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}
```
**Pattern**: Simple show/hide with CSS classes
**Enhancement**: Fade-in animation for smooth transitions

#### 2. Dynamic Input Field Visibility
```css
#metricInputs, #imperialInputs {
    display: none;
}

#metricInputs.active, #imperialInputs.active {
    display: block;
}
```
**JavaScript toggles**: `.active` class based on radio button selection

#### 3. Color-Coded BMI Categories
```css
.category-underweight { background: #3b82f6; color: white; }
.category-normal { background: #10b981; color: white; }
.category-overweight { background: #f59e0b; color: white; }
.category-obese { background: #ef4444; color: white; }
```
**Visual feedback**: Colors reinforce health categories
**Accessibility**: Good contrast ratios for readability

#### 4. Grid Layout for Stats
```css
.age-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
}

.stat-card {
    background: #f9fafb;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
}
```
**`repeat(auto-fit, minmax(150px, 1fr))`**:
- Auto-fits as many columns as possible
- Minimum width: 150px
- Grows to fill available space
- Automatically responsive!

### JavaScript Concepts Used

#### 1. Tab Switching Logic
```javascript
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active from all tabs and buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Add active to clicked button
        button.classList.add('active');
        
        // Add active to corresponding content
        const tabId = button.dataset.tab;
        document.getElementById(`${tabId}-calculator`).classList.add('active');
    });
});
```
**Pattern breakdown:**
1. Remove `active` from all elements
2. Add `active` to clicked button
3. Use `data-tab` to find matching content
4. Add `active` to corresponding content

#### 2. Dynamic Input Field Switching
```javascript
const unitRadios = document.querySelectorAll('input[name="unit"]');
const metricInputs = document.getElementById('metricInputs');
const imperialInputs = document.getElementById('imperialInputs');

unitRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'metric') {
            metricInputs.classList.add('active');
            imperialInputs.classList.remove('active');
        } else {
            metricInputs.classList.remove('active');
            imperialInputs.classList.add('active');
        }
    });
});
```
**`change` event**: Fires when radio button selection changes
**Toggle visibility**: Show relevant inputs based on selection

#### 3. Unit Conversion Functions
```javascript
// Convert imperial to metric for BMI calculation
function convertToMetric(feet, inches, pounds) {
    // Convert height to meters
    const totalInches = (parseInt(feet) * 12) + parseInt(inches);
    const heightInMeters = totalInches * 0.0254;
    
    // Convert weight to kilograms
    const weightInKg = pounds * 0.453592;
    
    return { height: heightInMeters, weight: weightInKg };
}

// Convert centimeters to meters
function cmToMeters(cm) {
    return cm / 100;
}
```
**Conversion formulas:**
- 1 inch = 0.0254 meters
- 1 pound = 0.453592 kilograms
- 1 meter = 100 centimeters

**Example:**
```
Height: 5 feet 10 inches
= (5 × 12) + 10 = 70 inches
= 70 × 0.0254 = 1.778 meters

Weight: 180 pounds
= 180 × 0.453592 = 81.65 kg
```

#### 4. BMI Calculation
```javascript
function calculateBMI(heightInMeters, weightInKg) {
    // BMI = weight (kg) / height² (m²)
    const bmi = weightInKg / (heightInMeters ** 2);
    
    // Round to 1 decimal place
    return parseFloat(bmi.toFixed(1));
}

// Usage
const bmi = calculateBMI(1.75, 70);  // 22.9
```
**Formula**: BMI = weight (kg) ÷ height² (m²)
**Exponentiation**: `** 2` means "squared" (height × height)

**Example calculation:**
```
Height: 1.75m, Weight: 70kg
BMI = 70 / (1.75 × 1.75)
    = 70 / 3.0625
    = 22.86
    ≈ 22.9 (rounded)
```

#### 5. BMI Classification Logic
```javascript
function classifyBMI(bmi) {
    if (bmi < 18.5) {
        return {
            category: 'Underweight',
            class: 'underweight',
            advice: 'Consider consulting a healthcare provider. Focus on nutrient-rich foods and strength training.',
            color: '#3b82f6'
        };
    } else if (bmi >= 18.5 && bmi < 25) {
        return {
            category: 'Normal Weight',
            class: 'normal',
            advice: 'Great job! Maintain a balanced diet and regular exercise routine.',
            color: '#10b981'
        };
    } else if (bmi >= 25 && bmi < 30) {
        return {
            category: 'Overweight',
            class: 'overweight',
            advice: 'Consider gradual lifestyle changes: healthier diet and increased physical activity.',
            color: '#f59e0b'
        };
    } else {
        return {
            category: 'Obese',
            class: 'obese',
            advice: 'Consult a healthcare provider for personalized advice and support.',
            color: '#ef4444'
        };
    }
}
```
**BMI Categories (WHO Standard):**
- **Underweight**: BMI < 18.5
- **Normal**: 18.5 ≤ BMI < 25
- **Overweight**: 25 ≤ BMI < 30
- **Obese**: BMI ≥ 30

**Returning object**: Groups related data together for easy use

#### 6. Age Calculation (Complex Date Math)
```javascript
function calculateAge(birthdate) {
    const today = new Date();
    const birth = new Date(birthdate);
    
    // Validate: birthdate can't be in future
    if (birth > today) {
        throw new Error('Birthdate cannot be in the future');
    }
    
    // Calculate years
    let years = today.getFullYear() - birth.getFullYear();
    
    // Calculate months
    let months = today.getMonth() - birth.getMonth();
    
    // Calculate days
    let days = today.getDate() - birth.getDate();
    
    // Adjust for negative days
    if (days < 0) {
        months--;
        // Get days in previous month
        const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += previousMonth.getDate();
    }
    
    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }
    
    return { years, months, days };
}
```

**Date calculation challenges:**
1. Months have different lengths (28-31 days)
2. Need to "borrow" from previous month if days are negative
3. Need to "borrow" from previous year if months are negative

**Example:**
```
Today: January 15, 2026
Birthdate: March 20, 1990

Years: 2026 - 1990 = 36
Months: 1 (Jan) - 3 (Mar) = -2 → Need adjustment!
Days: 15 - 20 = -5 → Need adjustment!

After adjustment:
Years: 35
Months: 10
Days: 26
```

#### 7. Total Time Calculations
```javascript
function calculateTotalTime(birthdate) {
    const today = new Date();
    const birth = new Date(birthdate);
    
    // Calculate total milliseconds lived
    const diffMs = today - birth;
    
    // Convert to different units
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = Math.floor(totalDays / 30.44);  // Average month length
    
    return {
        months: totalMonths,
        weeks: totalWeeks,
        days: totalDays,
        hours: totalHours
    };
}
```

**Conversion formulas:**
```javascript
1 day = 24 hours
1 hour = 60 minutes
1 minute = 60 seconds
1 second = 1000 milliseconds

Therefore:
1 day = 24 * 60 * 60 * 1000 = 86,400,000 milliseconds
1 hour = 60 * 60 * 1000 = 3,600,000 milliseconds
```

#### 8. Next Birthday Calculation
```javascript
function daysUntilNextBirthday(birthdate) {
    const today = new Date();
    const birth = new Date(birthdate);
    
    // Create this year's birthday
    const nextBirthday = new Date(
        today.getFullYear(),
        birth.getMonth(),
        birth.getDate()
    );
    
    // If birthday already passed this year, use next year
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    // Calculate difference in days
    const diffMs = nextBirthday - today;
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    return days;
}
```
**Logic:**
1. Create date for this year's birthday
2. If already passed, use next year
3. Calculate days until that date
4. Use `Math.ceil()` to round up (partial days count as 1)

#### 9. Number Formatting for Display
```javascript
function displayResults(age, totals, daysToNext) {
    // Format with thousands separators
    const formattedHours = totals.hours.toLocaleString();  // "315,360"
    const formattedDays = totals.days.toLocaleString();    // "13,140"
    
    // Display age
    document.getElementById('ageYears').textContent = age.years;
    document.getElementById('ageMonths').textContent = age.months;
    document.getElementById('ageDays').textContent = age.days;
    
    // Display totals
    document.getElementById('totalMonths').textContent = totals.months;
    document.getElementById('totalWeeks').textContent = totals.weeks;
    document.getElementById('totalDays').textContent = formattedDays;
    document.getElementById('totalHours').textContent = formattedHours;
    
    // Display next birthday
    document.getElementById('nextBirthday').textContent = `${daysToNext} days`;
}
```
**`toLocaleString()`**: Adds thousands separators based on user's locale
- US: 1,234,567
- Europe: 1.234.567
- Some Asian countries: 1,234,567

## 🧮 Calculation Examples

### BMI Examples

#### Example 1: Metric Input
- **Height**: 175 cm (1.75 m)
- **Weight**: 70 kg

**Calculation:**
```
BMI = 70 / (1.75)²
    = 70 / 3.0625
    = 22.9
Category: Normal Weight
```

#### Example 2: Imperial Input
- **Height**: 5 feet 10 inches
- **Weight**: 180 lbs

**Conversion:**
```
Height = (5 × 12) + 10 = 70 inches
       = 70 × 0.0254 = 1.778 m
Weight = 180 × 0.453592 = 81.65 kg
```

**BMI Calculation:**
```
BMI = 81.65 / (1.778)²
    = 81.65 / 3.161
    = 25.8
Category: Overweight
```

### Age Examples

#### Example 1: Simple Age
- **Birthdate**: January 1, 2000
- **Today**: January 1, 2026

**Result:**
- Age: **26 years, 0 months, 0 days**
- Total days: 9,497 days (includes leap years)
- Days to next birthday: 365 days

#### Example 2: Complex Age
- **Birthdate**: March 20, 1995
- **Today**: January 15, 2026

**Calculation:**
```
Years: 2026 - 1995 = 31, but...
Months: 1 (Jan) - 3 (Mar) = -2
Days: 15 - 20 = -5

Adjustments:
- Borrow from months: months = -2 - 1 = -3, days = 15 + 31 = 26
- Borrow from years: years = 31 - 1 = 30, months = -3 + 12 = 9

Final: 30 years, 9 months, 26 days
```

**Days until next birthday:**
```
Next birthday: March 20, 2026
From January 15 to March 20 = 64 days
```

## 🎨 UI/UX Features

### Visual Feedback
- Color-coded BMI categories (blue, green, orange, red)
- Active tab highlighting
- Smooth transitions between tabs
- Animated result appearance
- Loading states during calculation

### Responsive Design
- Mobile-first approach
- Stacked layout on small screens
- Touch-friendly buttons (44px minimum)
- Optimized input sizes for mobile keyboards

### Error Handling
- Validates all numerical inputs
- Prevents future dates in age calculator
- Helpful error messages
- Input constraints (min/max values)

## 💡 Key Takeaways

### Formulas Summary

```javascript
// BMI Calculation
BMI = weight (kg) / height² (m²)

// Unit Conversions
meters = inches × 0.0254
kg = pounds × 0.453592
meters = centimeters / 100

// Date Calculations
age = today - birthdate (with adjustments)
totalDays = (today - birthdate) / millisecondsPerDay
daysToNext = nextBirthday - today
```

### Best Practices Demonstrated

1. **Input Validation**: Check for valid numbers and dates
2. **Unit Conversion**: Standardize to metric for calculations
3. **User Feedback**: Visual indicators for categories
4. **Error Prevention**: Max date constraints, input limits
5. **Accessibility**: Proper labels, color contrast, keyboard support
6. **Code Organization**: Separate concerns (calculation vs. display)
7. **Number Formatting**: Locale-aware, appropriate precision

### Common Patterns

**Pattern 1: Date Validation**
```javascript
const date = new Date(input);
if (date > new Date()) {
    throw new Error('Date cannot be in future');
}
```

**Pattern 2: Conditional Classification**
```javascript
function classify(value) {
    if (value < threshold1) return 'low';
    if (value < threshold2) return 'medium';
    return 'high';
}
```

**Pattern 3: Tab System**
```javascript
// Hide all → Show selected
tabs.forEach(t => t.classList.remove('active'));
selectedTab.classList.add('active');
```

## 🚀 Future Enhancement Ideas

- [ ] Add BMR (Basal Metabolic Rate) calculator
- [ ] Include ideal weight calculator based on height
- [ ] Add body fat percentage calculator
- [ ] Support for more age formats (seconds, minutes)
- [ ] Historical BMI tracking with charts
- [ ] Export age/BMI reports as PDF
- [ ] Add zodiac sign based on birthdate
- [ ] Calculate age on specific future date
- [ ] Compare age with historical events
- [ ] Multiple profile management
- [ ] Health tips based on age group
- [ ] BMI percentile for children

---

**Stay Healthy! 💪📊**
