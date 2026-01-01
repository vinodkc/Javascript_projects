# Complete HTML, CSS & JavaScript Concepts Guide

This document explains all the web development concepts used across the JavaScript projects.

## 📄 HTML Concepts

### Document Structure

Every HTML5 document follows this essential structure:

```html
<!DOCTYPE html>                    <!-- Declares HTML5 -->
<html lang="en">                   <!-- Root element, language for accessibility -->
  <head>
    <meta charset="UTF-8">         <!-- Character encoding (UTF-8 supports all characters) -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Responsive -->
    <meta name="description" content="Page description for SEO">
    <title>Page Title</title>      <!-- Browser tab title -->
    <link rel="stylesheet" href="style.css">  <!-- CSS (load in head) -->
  </head>
  <body>
    <!-- All visible content goes here -->
    <h1>Welcome</h1>
    <p>Page content...</p>
    
    <script src="script.js"></script>  <!-- JS at end (DOM loads first) -->
  </body>
</html>
```

**Why this order matters:**
- CSS in `<head>`: Loads before content to prevent "flash of unstyled content"
- JS before `</body>`: Ensures DOM elements exist before script runs
- `viewport` meta tag: Makes page responsive on mobile devices

**Complete Working Example:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple Counter</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        #counter {
            font-size: 4rem;
            color: white;
            margin: 20px;
        }
        button {
            font-size: 1.2rem;
            padding: 10px 20px;
            margin: 5px;
            cursor: pointer;
            border: none;
            background: white;
            color: #667eea;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1 style="color: white;">Counter App</h1>
    <div id="counter">0</div>
    <button onclick="increment()">Increment</button>
    <button onclick="decrement()">Decrement</button>
    <button onclick="reset()">Reset</button>
    
    <script>
        let count = 0;
        const counterEl = document.getElementById('counter');
        
        function increment() {
            count++;
            counterEl.textContent = count;
        }
        
        function decrement() {
            count--;
            counterEl.textContent = count;
        }
        
        function reset() {
            count = 0;
            counterEl.textContent = count;
        }
    </script>
</body>
</html>
```

### Semantic HTML

Semantic elements provide **meaning** to your structure, helping browsers, search engines, and screen readers understand your content.

**Bad (Non-semantic):**
```html
<div class="header">
    <div class="nav">
        <div class="link">Home</div>
        <div class="link">About</div>
    </div>
</div>
<div class="main-content">
    <div class="article">Content here</div>
</div>
<div class="footer">Footer</div>
```

**Good (Semantic):**
```html
<header>
    <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
    </nav>
</header>
<main>
    <article>Content here</article>
</main>
<footer>Footer</footer>
```

**Complete Semantic Structure Example:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Blog Article</title>
</head>
<body>
    <!-- Page header -->
    <header>
        <h1>My Blog</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#articles">Articles</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <!-- Main content (only one per page) -->
    <main>
        <!-- Self-contained article -->
        <article>
            <!-- Article header -->
            <header>
                <h2>Understanding JavaScript</h2>
                <p>Published on <time datetime="2026-01-15">January 15, 2026</time></p>
                <address>By John Doe</address>
            </header>

            <!-- Article sections -->
            <section>
                <h3>Introduction</h3>
                <p>JavaScript is a versatile programming language...</p>
            </section>

            <section>
                <h3>Key Concepts</h3>
                <p>Variables, functions, and objects are fundamental...</p>
                
                <figure>
                    <img src="diagram.png" alt="JavaScript concepts diagram">
                    <figcaption>Figure 1: Core JavaScript concepts</figcaption>
                </figure>
            </section>

            <!-- Article footer -->
            <footer>
                <p>Tags: <mark>JavaScript</mark>, <mark>Programming</mark></p>
            </footer>
        </article>

        <!-- Related sidebar -->
        <aside>
            <h3>Related Articles</h3>
            <ul>
                <li><a href="#">CSS Basics</a></li>
                <li><a href="#">HTML5 Features</a></li>
            </ul>
        </aside>
    </main>

    <!-- Page footer -->
    <footer>
        <p><small>&copy; 2026 My Blog. All rights reserved.</small></p>
    </footer>
</body>
</html>
```

**Semantic Elements Explained:**
- `<header>` - Introductory content (can be used multiple times: page header, article header, section header)
- `<nav>` - Navigation links (main navigation menus)
- `<main>` - Primary page content (only ONE per page)
- `<article>` - Self-contained, independently distributable content (blog post, news article, forum post)
- `<section>` - Thematic grouping of content, typically with a heading
- `<aside>` - Tangentially related content (sidebars, callout boxes)
- `<footer>` - Footer content (can be used multiple times: page footer, article footer, section footer)
- `<figure>` + `<figcaption>` - Image, diagram, or code listing with caption
- `<time>` - Date/time with machine-readable `datetime` attribute
- `<address>` - Contact information for author/owner
- `<mark>` - Highlighted/marked text
- `<small>` - Fine print, copyright, legal text

**Benefits:**
- ✅ Better **SEO** (search engines understand structure)
- ✅ Improved **accessibility** (screen readers navigate better)
- ✅ Cleaner, more **readable code**
- ✅ **Future-proof** (browsers can optimize rendering)

### Forms & Inputs

Forms are essential for user input. HTML5 provides many input types with built-in validation.

**Complete Form Example:**
```html
<form id="registrationForm" onsubmit="handleSubmit(event)">
    <!-- Text input -->
    <div>
        <label for="username">Username:</label>
        <input 
            type="text" 
            id="username" 
            name="username"
            placeholder="Enter username"
            required
            minlength="3"
            maxlength="20"
            pattern="[A-Za-z0-9]+"
            title="Only letters and numbers allowed">
    </div>

    <!-- Email (built-in validation) -->
    <div>
        <label for="email">Email:</label>
        <input 
            type="email" 
            id="email" 
            name="email"
            placeholder="you@example.com"
            required>
    </div>

    <!-- Password -->
    <div>
        <label for="password">Password:</label>
        <input 
            type="password" 
            id="password" 
            name="password"
            required
            minlength="8">
    </div>

    <!-- Number input -->
    <div>
        <label for="age">Age:</label>
        <input 
            type="number" 
            id="age" 
            name="age"
            min="13"
            max="120"
            step="1"
            value="18">
    </div>

    <!-- Date input -->
    <div>
        <label for="birthdate">Birth Date:</label>
        <input 
            type="date" 
            id="birthdate" 
            name="birthdate"
            min="1900-01-01"
            max="2026-12-31">
    </div>

    <!-- Time input -->
    <div>
        <label for="meetingTime">Meeting Time:</label>
        <input 
            type="time" 
            id="meetingTime" 
            name="time"
            min="09:00"
            max="18:00"
            value="12:00">
    </div>

    <!-- Color picker -->
    <div>
        <label for="favoriteColor">Favorite Color:</label>
        <input 
            type="color" 
            id="favoriteColor" 
            name="color"
            value="#667eea">
    </div>

    <!-- Range slider -->
    <div>
        <label for="volume">
            Volume: <span id="volumeValue">50</span>%
        </label>
        <input 
            type="range" 
            id="volume" 
            name="volume"
            min="0"
            max="100"
            step="5"
            value="50"
            oninput="document.getElementById('volumeValue').textContent = this.value">
    </div>

    <!-- Checkbox -->
    <div>
        <label>
            <input type="checkbox" id="newsletter" name="newsletter" checked>
            Subscribe to newsletter
        </label>
    </div>

    <!-- Radio buttons (same name groups them) -->
    <div>
        <p>Gender:</p>
        <label>
            <input type="radio" name="gender" value="male" checked> Male
        </label>
        <label>
            <input type="radio" name="gender" value="female"> Female
        </label>
        <label>
            <input type="radio" name="gender" value="other"> Other
        </label>
    </div>

    <!-- Select dropdown -->
    <div>
        <label for="country">Country:</label>
        <select id="country" name="country" required>
            <option value="">--Select Country--</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
        </select>
    </div>

    <!-- Textarea -->
    <div>
        <label for="bio">Bio:</label>
        <textarea 
            id="bio" 
            name="bio"
            rows="4"
            cols="50"
            maxlength="500"
            placeholder="Tell us about yourself..."></textarea>
    </div>

    <!-- File upload -->
    <div>
        <label for="avatar">Profile Picture:</label>
        <input 
            type="file" 
            id="avatar" 
            name="avatar"
            accept="image/*">
    </div>

    <!-- Submit, Reset, and Custom buttons -->
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
    <button type="button" onclick="alert('Custom action!')">Cancel</button>
</form>

<script>
function handleSubmit(event) {
    event.preventDefault(); // Prevent page reload
    
    // Get form data
    const form = event.target;
    const formData = new FormData(form);
    
    // Convert to object
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    console.log('Form submitted:', data);
    alert('Form submitted! Check console.');
}
</script>
```

**Input Attributes Explained:**

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `required` | Must be filled before submission | `<input required>` |
| `disabled` | Cannot interact with field | `<input disabled>` |
| `readonly` | Can view but not edit | `<input readonly value="Fixed">` |
| `placeholder` | Hint text (disappears when typing) | `<input placeholder="Enter name">` |
| `value` | Default/current value | `<input value="Default">` |
| `min` / `max` | Minimum/maximum value (numbers, dates) | `<input type="number" min="0" max="100">` |
| `step` | Increment value | `<input type="number" step="0.5">` |
| `minlength` / `maxlength` | Character count limits | `<input minlength="3" maxlength="20">` |
| `pattern` | Regular expression validation | `<input pattern="[0-9]{3}-[0-9]{4}">` |
| `accept` | File type filter | `<input type="file" accept=".pdf,.doc">` |
| `multiple` | Allow multiple selections/files | `<select multiple>` or `<input type="file" multiple>` |
| `autofocus` | Auto-focus field on page load | `<input autofocus>` |
| `autocomplete` | Enable/disable autocomplete | `<input autocomplete="off">` |

**Input Types:**

| Type | Use Case | Features |
|------|----------|----------|
| `text` | General text | Basic text input |
| `email` | Email addresses | Built-in validation, mobile keyboard shows @ |
| `password` | Passwords | Hides characters, no copy/paste on some browsers |
| `number` | Numbers | Spinner controls, min/max/step |
| `tel` | Phone numbers | Mobile numeric keyboard |
| `url` | URLs | Built-in validation, mobile keyboard shows .com |
| `search` | Search queries | Clear button on some browsers |
| `date` | Date picker | Native date picker |
| `time` | Time picker | Native time picker |
| `datetime-local` | Date + time | Combined picker |
| `month` | Month picker | Year and month only |
| `week` | Week picker | Week numbers |
| `color` | Color picker | Native color picker |
| `range` | Slider | Visual slider control |
| `checkbox` | Yes/no choice | Check/uncheck |
| `radio` | One choice from group | Group with same `name` |
| `file` | File upload | File browser dialog |
| `submit` | Submit button | Submits form |
| `reset` | Reset button | Clears all fields |
| `button` | Generic button | No default behavior |

### Data Attributes

Data attributes let you store custom data directly in HTML elements. They're perfect for storing IDs, configurations, or state information.

**Syntax:** `data-*` where `*` is your custom name (lowercase, hyphen-separated)

**HTML Example:**
```html
<!-- Button with multiple data attributes -->
<button 
    data-user-id="123" 
    data-user-name="John Doe"
    data-user-role="admin"
    data-premium="true"
    onclick="viewProfile(this)">
    View Profile
</button>

<!-- Product card -->
<div 
    class="product-card"
    data-product-id="456"
    data-product-price="29.99"
    data-product-category="electronics"
    data-in-stock="true">
    <h3>Wireless Mouse</h3>
    <button onclick="addToCart(this.parentElement)">Add to Cart</button>
</div>

<!-- Tab system -->
<div class="tabs">
    <button data-tab="home" class="active">Home</button>
    <button data-tab="about">About</button>
    <button data-tab="contact">Contact</button>
</div>

<div id="home" class="tab-content">Home content</div>
<div id="about" class="tab-content" style="display:none">About content</div>
<div id="contact" class="tab-content" style="display:none">Contact content</div>
```

**JavaScript Access:**
```javascript
// Method 1: Using dataset (recommended - converts to camelCase)
const button = document.querySelector('[data-user-id]');

console.log(button.dataset.userId);        // "123" (data-user-id)
console.log(button.dataset.userName);      // "John Doe" (data-user-name)
console.log(button.dataset.userRole);      // "admin" (data-user-role)
console.log(button.dataset.premium);       // "true" (string, not boolean!)

// Method 2: Using getAttribute (exact attribute name)
console.log(button.getAttribute('data-user-id'));  // "123"

// Setting data attributes
button.dataset.userId = "456";  // Updates data-user-id
button.dataset.newAttr = "value";  // Creates data-new-attr
button.setAttribute('data-custom', 'value');

// Removing data attributes
delete button.dataset.userId;
button.removeAttribute('data-user-id');

// ⚠️ Type conversion (data attributes are always strings!)
const isPremium = button.dataset.premium === 'true';  // Convert to boolean
const userId = parseInt(button.dataset.userId);       // Convert to number
const price = parseFloat(productDiv.dataset.productPrice);  // Convert to float
```

**Practical Use Case: Tab System**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .tabs button {
            padding: 10px 20px;
            cursor: pointer;
            border: none;
            background: #e0e0e0;
        }
        .tabs button.active {
            background: #667eea;
            color: white;
        }
        .tab-content {
            padding: 20px;
            border: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div class="tabs">
        <button data-tab="home" class="active">Home</button>
        <button data-tab="about">About</button>
        <button data-tab="contact">Contact</button>
    </div>

    <div id="home" class="tab-content">Home content</div>
    <div id="about" class="tab-content" style="display:none">About content</div>
    <div id="contact" class="tab-content" style="display:none">Contact content</div>

    <script>
        // Select all tab buttons
        const tabButtons = document.querySelectorAll('[data-tab]');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Get tab name from data attribute
                const tabName = button.dataset.tab;
                
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Hide all tab contents
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.style.display = 'none';
                });
                
                // Show selected tab content
                document.getElementById(tabName).style.display = 'block';
            });
        });
    </script>
</body>
</html>
```

**Practical Use Case: Shopping Cart**
```html
<div class="product" data-product-id="101" data-price="19.99" data-name="T-Shirt">
    <h3>T-Shirt</h3>
    <p>$19.99</p>
    <button onclick="addToCart(this.parentElement)">Add to Cart</button>
</div>

<script>
function addToCart(productElement) {
    const product = {
        id: productElement.dataset.productId,
        name: productElement.dataset.name,
        price: parseFloat(productElement.dataset.price)
    };
    
    console.log('Added to cart:', product);
    
    // Could store in localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`${product.name} added to cart!`);
}
</script>
```

**Selecting by Data Attribute:**
```javascript
// Select element with specific data attribute
const saveButton = document.querySelector('[data-action="save"]');

// Select element with specific data value
const admin = document.querySelector('[data-user-role="admin"]');

// Select all elements with any data-category
const categorized = document.querySelectorAll('[data-category]');

// Select elements with data-price greater than 50 (requires filter)
const expensive = Array.from(document.querySelectorAll('[data-price]'))
    .filter(el => parseFloat(el.dataset.price) > 50);
```

**CSS Styling with Data Attributes:**
```css
/* Style based on data attribute */
[data-status="active"] {
    background-color: green;
}

[data-status="inactive"] {
    background-color: gray;
}

/* Style based on data value */
[data-premium="true"] {
    border: 2px solid gold;
}

/* Attribute exists */
[data-new] {
    position: relative;
}

[data-new]::before {
    content: "NEW";
    position: absolute;
    top: -10px;
    right: -10px;
    background: red;
    color: white;
    padding: 2px 6px;
    font-size: 12px;
}
```

**When to Use Data Attributes:**
- ✅ Storing IDs, configurations, or metadata
- ✅ Creating interactive components (tabs, modals, dropdowns)
- ✅ Passing data from backend to JavaScript
- ✅ Temporary state that doesn't need to be in JavaScript
- ❌ Don't use for styling (use classes instead)
- ❌ Don't use for large amounts of data (use JavaScript objects or separate data files)

### Lists
```html
<ul> <!-- Unordered list -->
  <li>Item</li>
</ul>

<ol> <!-- Ordered list -->
  <li>First</li>
</ol>
```

### Links & Resources
```html
<link rel="stylesheet" href="style.css">
<script src="script.js"></script>
<a href="#section">Internal link</a>
<a href="https://example.com" target="_blank">External link</a>
```

---

## 🎨 CSS Concepts

### Selectors
```css
element { }          /* Type selector */
.class { }           /* Class selector */
#id { }              /* ID selector */
element.class { }    /* Combined */
element > child { }  /* Direct child */
element child { }    /* Descendant */
element:hover { }    /* Pseudo-class */
element::before { }  /* Pseudo-element */
```

### Box Model

The CSS box model determines how elements are sized and spaced. Every element is a box with four layers:

```
┌─────────────────────────────────────┐
│         MARGIN (transparent)         │  ← Space OUTSIDE element
│  ┌───────────────────────────────┐  │
│  │      BORDER (visible)         │  │  ← Element border
│  │  ┌─────────────────────────┐  │  │
│  │  │   PADDING (transparent) │  │  │  ← Space INSIDE element
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │    CONTENT        │  │  │  │  ← Actual content (text, images)
│  │  │  │  (width × height) │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Two Box Model Modes:**

```css
/* Mode 1: content-box (DEFAULT - confusing!) */
.box-content {
    box-sizing: content-box;  /* Default */
    width: 200px;
    height: 100px;
    padding: 20px;
    border: 5px solid blue;
    margin: 10px;
}
/* Total width = 200 + (20×2 padding) + (5×2 border) = 250px ⚠️ */
/* Total height = 100 + (20×2 padding) + (5×2 border) = 150px ⚠️ */
/* Content area = 200 × 100px */

/* Mode 2: border-box (BETTER - intuitive!) */
.box-border {
    box-sizing: border-box;  /* ⭐ Recommended */
    width: 200px;
    height: 100px;
    padding: 20px;
    border: 5px solid green;
    margin: 10px;
}
/* Total width = 200px (includes padding and border) ✅ */
/* Total height = 100px (includes padding and border) ✅ */
/* Content area = 200 - (20×2) - (5×2) = 150 × 50px */

/* Global reset (BEST PRACTICE - use in all projects!) */
* {
    box-sizing: border-box;
}
```

**Visual Example:**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        * {
            box-sizing: border-box;  /* Apply to all elements */
        }

        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }

        .comparison {
            display: flex;
            gap: 20px;
            margin-bottom: 40px;
        }

        .box {
            width: 200px;
            height: 150px;
            padding: 20px;
            border: 5px solid;
            margin: 10px;
            background-color: lightblue;
            background-clip: content-box;  /* Shows padding area */
        }

        .content-box { box-sizing: content-box; border-color: red; }
        .border-box { box-sizing: border-box; border-color: green; }

        .demo-box {
            width: 300px;
            padding: 30px;
            border: 10px solid #667eea;
            margin: 20px;
            background-color: lightblue;
            color: white;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h2>Box Model Demo</h2>
    
    <div class="demo-box">
        This is the CONTENT area.
        The blue background is the PADDING.
        The purple border is the BORDER.
        The white space around is the MARGIN.
    </div>

    <h3>Comparison</h3>
    <div class="comparison">
        <div>
            <div class="box content-box">content-box (default)</div>
            <p style="color: red;">Total width > 200px</p>
        </div>
        <div>
            <div class="box border-box">border-box (better)</div>
            <p style="color: green;">Total width = 200px</p>
        </div>
    </div>
</body>
</html>
```

**Margin vs Padding:**
```css
.element {
    margin: 20px;     /* Space OUTSIDE (transparent, pushes other elements away) */
    padding: 20px;    /* Space INSIDE (inherits background, pushes content inward) */
}

/* Margin can be negative (pull elements closer/overlap) */
.overlap {
    margin-top: -10px;   /* Pull element up */
    margin-left: -5px;   /* Pull element left */
}

/* Padding cannot be negative */
.no-negative-padding {
    padding: -10px;   /* ❌ Invalid! */
}

/* Margin collapse (vertical only, between block elements) */
.box1 { margin-bottom: 30px; }
.box2 { margin-top: 20px; }
/* Actual gap = 30px (larger wins), NOT 50px! */

/* Padding never collapses */
.parent { padding: 20px; }
.child { margin: 10px; }
/* Child's margin stays inside parent's padding */
```

**Shorthand Values:**
```css
/* 4 values: Top Right Bottom Left (clockwise from top) */
.element {
    margin: 10px 20px 30px 40px;
    /* top: 10px, right: 20px, bottom: 30px, left: 40px */
}

/* 3 values: Top Horizontal Bottom */
.element {
    margin: 10px 20px 30px;
    /* top: 10px, right: 20px, bottom: 30px, left: 20px */
}

/* 2 values: Vertical Horizontal */
.element {
    margin: 10px 20px;
    /* top: 10px, right: 20px, bottom: 10px, left: 20px */
}

/* 1 value: All sides */
.element {
    margin: 10px;
    /* All sides: 10px */
}

/* Individual sides */
.element {
    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 30px;
    margin-left: 40px;
}

/* Same rules apply to padding and border */
.element {
    padding: 20px 10px;
    border-width: 2px 4px 2px 4px;
}
```

**Centering with Margin:**
```css
/* Center block element horizontally */
.center-block {
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    /* OR shorthand: */
    margin: 0 auto;  /* 0 vertical, auto horizontal */
}
```

**Practical Examples:**
```css
/* Card with proper spacing */
.card {
    width: 300px;
    padding: 20px;           /* Space inside card */
    margin: 20px;            /* Space between cards */
    border: 1px solid #ddd;
    background: white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

/* Button with padding but no margin collapse issues */
.button {
    padding: 12px 24px;      /* Vertical, horizontal */
    margin: 10px 5px;
    border: none;
    background: #667eea;
    color: white;
    cursor: pointer;
}

/* Container with inner spacing */
.container {
    max-width: 1200px;
    margin: 0 auto;          /* Center horizontally */
    padding: 0 20px;         /* Side spacing (breathing room) */
}
```

### Flexbox Layout

Flexbox is perfect for **one-dimensional** layouts (either row OR column). Use it for components, navigation bars, and flexible layouts.

**Key Concept:** Flexbox has a **main axis** and a **cross axis**:
- `flex-direction: row` → Main axis: horizontal →, Cross axis: vertical ↓
- `flex-direction: column` → Main axis: vertical ↓, Cross axis: horizontal →

**Complete Flexbox Properties:**
```css
.container {
    display: flex;  /* or inline-flex */
    
    /* Direction (defines main axis) */
    flex-direction: row;           /* → (default) */
    flex-direction: row-reverse;   /* ← */
    flex-direction: column;        /* ↓ */
    flex-direction: column-reverse; /* ↑ */
    
    /* Main axis alignment (justify-content) */
    justify-content: flex-start;   /* ←|items    | */
    justify-content: flex-end;     /* |    items|→ */
    justify-content: center;       /* |  items  | */
    justify-content: space-between; /* |item  item| */
    justify-content: space-around;  /* | item item | */
    justify-content: space-evenly;  /* | item item | (equal gaps) */
    
    /* Cross axis alignment (align-items) */
    align-items: stretch;     /* Items stretch to fill (default) */
    align-items: flex-start;  /* Align to top/left */
    align-items: flex-end;    /* Align to bottom/right */
    align-items: center;      /* Center items */
    align-items: baseline;    /* Align text baselines */
    
    /* Wrapping */
    flex-wrap: nowrap;        /* Single line (default, may overflow) */
    flex-wrap: wrap;          /* Multiple lines (top to bottom) */
    flex-wrap: wrap-reverse;  /* Multiple lines (bottom to top) */
    
    /* Align multiple lines (only with flex-wrap) */
    align-content: flex-start;
    align-content: flex-end;
    align-content: center;
    align-content: space-between;
    align-content: space-around;
    align-content: stretch;
    
    /* Gap between items (modern, recommended) */
    gap: 20px;                /* Both row and column gap */
    row-gap: 20px;            /* Vertical gap only */
    column-gap: 30px;         /* Horizontal gap only */
}

.item {
    /* Growth (take extra space) */
    flex-grow: 0;     /* Don't grow (default) */
    flex-grow: 1;     /* Grow proportionally */
    flex-grow: 2;     /* Grow 2x as much as flex-grow: 1 */
    
    /* Shrinking (give up space) */
    flex-shrink: 1;   /* Can shrink (default) */
    flex-shrink: 0;   /* Never shrink */
    
    /* Initial size */
    flex-basis: auto;  /* Based on content (default) */
    flex-basis: 200px; /* Fixed initial width */
    flex-basis: 30%;   /* Percentage of container */
    
    /* Shorthand: grow shrink basis */
    flex: 0 1 auto;   /* Default: don't grow, can shrink, auto size */
    flex: 1;          /* Common: grow proportionally, shrink, auto size */
    flex: 1 0 0;      /* Grow, don't shrink, zero basis (equal widths) */
    flex: 0 0 200px;  /* Fixed 200px width */
    
    /* Self alignment (override container's align-items) */
    align-self: auto;        /* Use container's align-items */
    align-self: flex-start;
    align-self: flex-end;
    align-self: center;
    align-self: stretch;
    
    /* Order (change visual order without changing HTML) */
    order: 0;         /* Default */
    order: -1;        /* Appears first */
    order: 1;         /* Appears last */
}
```

**Practical Flexbox Patterns:**

**1. Center Everything (Most Common!)**
```html
<style>
    .center {
        display: flex;
        justify-content: center;  /* Horizontal center */
        align-items: center;      /* Vertical center */
        height: 100vh;            /* Full viewport height */
    }
</style>

<div class="center">
    <div>Perfectly Centered!</div>
</div>
```

**2. Navigation Bar**
```html
<style>
    .navbar {
        display: flex;
        justify-content: space-between;  /* Logo left, menu right */
        align-items: center;
        padding: 1rem 2rem;
        background: #667eea;
    }
    
    .nav-menu {
        display: flex;
        gap: 20px;
        list-style: none;
    }
</style>

<nav class="navbar">
    <div class="logo">Logo</div>
    <ul class="nav-menu">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
    </ul>
</nav>
```

**3. Equal Column Layout**
```html
<style>
    .columns {
        display: flex;
        gap: 20px;
    }
    
    .columns > * {
        flex: 1;  /* All children get equal width */
    }
</style>

<div class="columns">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
</div>
```

**4. Sidebar + Main Layout**
```html
<style>
    .layout {
        display: flex;
        min-height: 100vh;
    }
    
    .sidebar {
        flex: 0 0 250px;  /* Fixed 250px width, don't grow or shrink */
        background: #f0f0f0;
    }
    
    .main {
        flex: 1;  /* Take remaining space */
        padding: 20px;
    }
</style>

<div class="layout">
    <aside class="sidebar">Sidebar</aside>
    <main class="main">Main Content</main>
</div>
```

**5. Card Footer at Bottom**
```html
<style>
    .card {
        display: flex;
        flex-direction: column;  /* Stack vertically */
        height: 300px;
        border: 1px solid #ddd;
    }
    
    .card-header {
        padding: 15px;
        background: #667eea;
        color: white;
    }
    
    .card-body {
        flex: 1;  /* Grow to fill available space */
        padding: 15px;
    }
    
    .card-footer {
        padding: 15px;
        background: #f0f0f0;
    }
</style>

<div class="card">
    <div class="card-header">Header</div>
    <div class="card-body">
        Content of varying length...
        The footer stays at the bottom!
    </div>
    <div class="card-footer">Footer</div>
</div>
```

**6. Responsive Grid (Flexbox Alternative)**
```html
<style>
    .flex-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }
    
    .flex-grid > * {
        flex: 1 1 300px;  /* Grow, shrink, minimum 300px */
        /* Items wrap when container is < 300px */
    }
</style>

<div class="flex-grid">
    <div class="card">Card 1</div>
    <div class="card">Card 2</div>
    <div class="card">Card 3</div>
    <div class="card">Card 4</div>
</div>
```

**7. Form Layout**
```html
<style>
    .form-row {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-bottom: 15px;
    }
    
    .form-row label {
        flex: 0 0 150px;  /* Fixed label width */
    }
    
    .form-row input {
        flex: 1;  /* Input takes remaining space */
    }
</style>

<form>
    <div class="form-row">
        <label>Name:</label>
        <input type="text">
    </div>
    <div class="form-row">
        <label>Email:</label>
        <input type="email">
    </div>
</form>
```

**8. Button Group**
```html
<style>
    .button-group {
        display: flex;
        gap: 10px;
    }
    
    .button-group button {
        flex: 1;  /* Equal width buttons */
        padding: 10px;
    }
</style>

<div class="button-group">
    <button>Cancel</button>
    <button>Save Draft</button>
    <button>Publish</button>
</div>
```

**Complete Interactive Example:**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        * { box-sizing: border-box; }
        
        body {
            margin: 0;
            font-family: Arial, sans-serif;
        }
        
        /* Page layout */
        .page {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }
        
        /* Header */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background: #667eea;
            color: white;
        }
        
        .nav {
            display: flex;
            gap: 20px;
        }
        
        /* Main layout */
        .main-layout {
            display: flex;
            flex: 1;
        }
        
        .sidebar {
            flex: 0 0 200px;
            background: #f5f5f5;
            padding: 20px;
        }
        
        .content {
            flex: 1;
            padding: 20px;
        }
        
        /* Card grid */
        .cards {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }
        
        .card {
            flex: 1 1 calc(33.333% - 20px);
            min-width: 250px;
            display: flex;
            flex-direction: column;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .card-image {
            height: 150px;
            background: linear-gradient(135deg, #667eea, #764ba2);
        }
        
        .card-content {
            flex: 1;
            padding: 15px;
        }
        
        .card-actions {
            display: flex;
            gap: 10px;
            padding: 15px;
            border-top: 1px solid #eee;
        }
        
        .card-actions button {
            flex: 1;
        }
        
        /* Footer */
        .footer {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            background: #333;
            color: white;
        }
    </style>
</head>
<body>
    <div class="page">
        <header class="header">
            <div class="logo">Logo</div>
            <nav class="nav">
                <a href="#" style="color: white;">Home</a>
                <a href="#" style="color: white;">About</a>
                <a href="#" style="color: white;">Contact</a>
            </nav>
        </header>
        
        <div class="main-layout">
            <aside class="sidebar">
                <h3>Sidebar</h3>
                <ul>
                    <li>Link 1</li>
                    <li>Link 2</li>
                    <li>Link 3</li>
                </ul>
            </aside>
            
            <main class="content">
                <h1>Flexbox Layout Demo</h1>
                
                <div class="cards">
                    <div class="card">
                        <div class="card-image"></div>
                        <div class="card-content">
                            <h3>Card 1</h3>
                            <p>Card description here.</p>
                        </div>
                        <div class="card-actions">
                            <button>View</button>
                            <button>Edit</button>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-image"></div>
                        <div class="card-content">
                            <h3>Card 2</h3>
                            <p>Another card with different content length.</p>
                        </div>
                        <div class="card-actions">
                            <button>View</button>
                            <button>Edit</button>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-image"></div>
                        <div class="card-content">
                            <h3>Card 3</h3>
                            <p>Cards adapt to content.</p>
                        </div>
                        <div class="card-actions">
                            <button>View</button>
                            <button>Edit</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        
        <footer class="footer">
            &copy; 2026 Flexbox Demo
        </footer>
    </div>
</body>
</html>
```

**Flexbox vs Grid Decision:**
- **Use Flexbox**: Components, navigation, flexible rows/columns, one-dimensional layouts
- **Use Grid**: Page layouts, complex 2D grids, magazine-style layouts
- **Use Both**: Grid for overall structure, Flexbox for components within cells

### Grid Layout
```css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);  /* 3 equal columns */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    grid-column: span 2;        /* Item spans 2 columns */
}
```

### Positioning
```css
.element {
    position: static;     /* Default */
    position: relative;   /* Relative to normal position */
    position: absolute;   /* Relative to positioned parent */
    position: fixed;      /* Relative to viewport */
    position: sticky;     /* Hybrid relative/fixed */
    
    top: 10px;
    left: 20px;
    z-index: 1000;       /* Stacking order */
}
```

### Colors & Backgrounds
```css
.element {
    color: #667eea;                    /* Text color */
    background: #ffffff;               /* Background */
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background: rgba(0, 0, 0, 0.5);   /* Transparent */
    opacity: 0.8;                      /* Element transparency */
}
```

### Typography
```css
.text {
    font-family: 'Segoe UI', sans-serif;
    font-size: 16px;        /* or 1rem, 1em */
    font-weight: bold;      /* or 700 */
    line-height: 1.6;       /* Line spacing */
    letter-spacing: 1px;
    text-align: center;
    text-transform: uppercase;
    text-decoration: underline;
}
```

### Transitions & Animations
```css
.element {
    transition: all 0.3s ease;  /* Smooth changes */
    transition: transform 0.3s, opacity 0.3s;
}

.element:hover {
    transform: translateY(-5px) scale(1.1) rotate(5deg);
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.animated {
    animation: fadeIn 0.5s ease;
}
```

### Responsive Design
```css
/* Mobile first */
.container { width: 100%; }

/* Tablet */
@media (min-width: 768px) {
    .container { width: 750px; }
}

/* Desktop */
@media (min-width: 1024px) {
    .container { width: 1000px; }
}
```

### CSS Variables
```css
:root {
    --primary-color: #667eea;
    --spacing: 20px;
}

.element {
    color: var(--primary-color);
    padding: var(--spacing);
}
```

### Modern CSS Features
```css
.element {
    border-radius: 10px;           /* Rounded corners */
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    backdrop-filter: blur(10px);   /* Background blur */
    clip-path: circle(50%);        /* Clipping shape */
    filter: brightness(1.2);       /* Visual filters */
}
```

---

## ⚡ JavaScript Concepts

### Variables & Data Types
```javascript
// Variable declarations
let name = "John";        // Block-scoped, reassignable
const age = 25;           // Block-scoped, constant
var oldStyle = "avoid";   // Function-scoped (old)

// Data types
let string = "Hello";
let number = 42;
let boolean = true;
let nullValue = null;
let undefinedValue = undefined;
let array = [1, 2, 3];
let object = { key: "value" };
```

### String Methods
```javascript
let text = "Hello World";

text.length                    // 11
text.toUpperCase()            // "HELLO WORLD"
text.toLowerCase()            // "hello world"
text.slice(0, 5)              // "Hello"
text.substring(0, 5)          // "Hello"
text.split(" ")               // ["Hello", "World"]
text.replace("World", "JS")   // "Hello JS"
text.includes("World")        // true
text.startsWith("Hello")      // true
text.trim()                   // Remove whitespace
text.padStart(15, "0")        // "0000Hello World"

// Template literals
let name = "John";
let greeting = `Hello, ${name}!`;  // "Hello, John!"
```

### Number Methods
```javascript
let num = 3.14159;

parseInt("42")              // 42
parseFloat("3.14")         // 3.14
num.toFixed(2)             // "3.14"
Number.isNaN(NaN)          // true
Math.round(3.7)            // 4
Math.floor(3.9)            // 3
Math.ceil(3.1)             // 4
Math.random()              // 0 to 0.999...
Math.max(1, 2, 3)          // 3
Math.min(1, 2, 3)          // 1
```

### Array Methods (Complete Guide)

Arrays are one of the most important data structures in JavaScript. Master these methods!

**Creating Arrays:**
```javascript
const arr1 = [1, 2, 3];                    // Literal (most common)
const arr2 = new Array(1, 2, 3);           // Constructor
const arr3 = Array.of(1, 2, 3);            // Static method
const arr4 = Array.from("hello");          // ['h','e','l','l','o']
const arr5 = Array(5).fill(0);             // [0, 0, 0, 0, 0]
const arr6 = [...arr1];                    // Copy array (spread)
const arr7 = Array.from({length: 5}, (_, i) => i); // [0,1,2,3,4]
```

**1. Adding/Removing Elements (Mutate Original)**
```javascript
let fruits = ["apple", "banana"];

// Add to end
fruits.push("orange");               // Returns: 3 (new length)
console.log(fruits);                 // ["apple", "banana", "orange"]
fruits.push("grape", "mango");       // Can add multiple
// Returns: 5, fruits: ["apple", "banana", "orange", "grape", "mango"]

// Remove from end
let last = fruits.pop();             // Returns: "mango"
console.log(fruits);                 // ["apple", "banana", "orange", "grape"]

// Add to beginning
fruits.unshift("strawberry");        // Returns: 5 (new length)
console.log(fruits);                 // ["strawberry", "apple", "banana", "orange", "grape"]

// Remove from beginning
let first = fruits.shift();          // Returns: "strawberry"
console.log(fruits);                 // ["apple", "banana", "orange", "grape"]

// splice - add/remove at specific position
// splice(startIndex, deleteCount, ...itemsToAdd)
fruits.splice(1, 0, "kiwi");         // Insert "kiwi" at index 1
// ["apple", "kiwi", "banana", "orange", "grape"]

fruits.splice(2, 1);                 // Remove 1 element at index 2
// ["apple", "kiwi", "orange", "grape"]

fruits.splice(1, 2, "pear", "plum"); // Replace 2 elements at index 1
// ["apple", "pear", "plum", "grape"]

// Remove all elements
fruits.length = 0;                   // Fast way
fruits = [];                         // Creates new array
```

**2. Searching & Finding (Don't Mutate)**
```javascript
const numbers = [1, 2, 3, 4, 5, 3, 2, 1];

// includes - check if element exists (ES2016)
numbers.includes(3);                 // true
numbers.includes(10);                // false
numbers.includes(3, 4);              // true (search from index 4)

// indexOf - find first index
numbers.indexOf(3);                  // 2 (first occurrence)
numbers.lastIndexOf(3);              // 5 (last occurrence)
numbers.indexOf(10);                 // -1 (not found)

// find - get first element matching condition
const users = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
    { id: 3, name: "Bob", age: 25 }
];

const user = users.find(u => u.age === 25);
console.log(user);                   // { id: 1, name: "John", age: 25 }

const notFound = users.find(u => u.age === 100);
console.log(notFound);               // undefined

// findIndex - get index of first match
const index = users.findIndex(u => u.name === "Jane");
console.log(index);                  // 1

const noIndex = users.findIndex(u => u.age === 100);
console.log(noIndex);                // -1

// some - test if at least ONE element passes
const hasAdult = users.some(u => u.age >= 30);   // true
const hasKid = users.some(u => u.age < 18);      // false

// every - test if ALL elements pass
const allAdults = users.every(u => u.age >= 18); // true
const allSeniors = users.every(u => u.age >= 65); // false
```

**3. Iteration Methods (Don't Mutate)**
```javascript
const nums = [1, 2, 3, 4, 5];

// forEach - execute function for each element (no return value)
nums.forEach((num, index, array) => {
    console.log(`Index ${index}: ${num}`);
});
// Can't break out early!

// map - create NEW array with transformed elements
const doubled = nums.map(n => n * 2);
console.log(doubled);                // [2, 4, 6, 8, 10]
console.log(nums);                   // [1, 2, 3, 4, 5] (unchanged)

const squares = nums.map(n => n ** 2);
console.log(squares);                // [1, 4, 9, 16, 25]

const userNames = users.map(u => u.name);
console.log(userNames);              // ["John", "Jane", "Bob"]

// map with objects - extract properties
const userObjects = users.map(u => ({ name: u.name, adult: u.age >= 18 }));

// filter - create NEW array with elements that pass test
const evens = nums.filter(n => n % 2 === 0);
console.log(evens);                  // [2, 4]

const odds = nums.filter(n => n % 2 !== 0);
console.log(odds);                   // [1, 3, 5]

const adults = users.filter(u => u.age >= 30);
console.log(adults);                 // [{ id: 2, name: "Jane", age: 30 }]

// Chaining methods
const result = nums
    .filter(n => n > 2)              // [3, 4, 5]
    .map(n => n * 2)                 // [6, 8, 10]
    .filter(n => n > 7);             // [8, 10]
console.log(result);

// reduce - reduce array to single value
// reduce(callback, initialValue)
const sum = nums.reduce((total, n) => total + n, 0);
console.log(sum);                    // 15

const product = nums.reduce((prod, n) => prod * n, 1);
console.log(product);                // 120

const max = nums.reduce((max, n) => n > max ? n : max, nums[0]);
console.log(max);                    // 5

// reduce to object
const totalAge = users.reduce((sum, u) => sum + u.age, 0);
console.log(totalAge);               // 80

// Group by age
const usersByAge = users.reduce((obj, user) => {
    const age = user.age;
    if (!obj[age]) obj[age] = [];
    obj[age].push(user);
    return obj;
}, {});
console.log(usersByAge);
// { 25: [{John}, {Bob}], 30: [{Jane}] }

// Count occurrences
const letters = ['a', 'b', 'a', 'c', 'b', 'a'];
const counts = letters.reduce((count, letter) => {
    count[letter] = (count[letter] || 0) + 1;
    return count;
}, {});
console.log(counts);                 // { a: 3, b: 2, c: 1 }
```

**4. Transforming Arrays (Don't Mutate)**
```javascript
const original = [1, 2, 3, 4, 5];

// slice - extract portion (returns NEW array)
const portion = original.slice(1, 4);    // [2, 3, 4] (index 1 to 3)
const lastTwo = original.slice(-2);      // [4, 5] (last 2)
const fromThird = original.slice(2);     // [3, 4, 5] (from index 2 to end)
const copy = original.slice();           // [1, 2, 3, 4, 5] (full copy)

// concat - merge arrays (returns NEW array)
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];
const combined = arr1.concat(arr2, arr3); // [1, 2, 3, 4, 5, 6]

// Modern way with spread
const modern = [...arr1, ...arr2, ...arr3]; // [1, 2, 3, 4, 5, 6]

// flat - flatten nested arrays
const nested = [1, [2, 3], [4, [5, 6]]];
nested.flat();                       // [1, 2, 3, 4, [5, 6]] (1 level default)
nested.flat(2);                      // [1, 2, 3, 4, 5, 6] (2 levels)
nested.flat(Infinity);               // [1, 2, 3, 4, 5, 6] (all levels)

// flatMap - map + flat (1 level) - more efficient than separate calls
const words = ["hello world", "foo bar"];
const split1 = words.map(s => s.split(" ")).flat(); // ["hello", "world", "foo", "bar"]
const split2 = words.flatMap(s => s.split(" "));    // Same, more efficient
```

**5. Sorting & Reversing (Mutate Original)**
```javascript
// reverse - reverse array order
const letters = ['a', 'b', 'c', 'd'];
letters.reverse();                   // ['d', 'c', 'b', 'a']
console.log(letters);                // Modified!

// To avoid mutation
const reversed = [...letters].reverse();

// sort - sort array
const unsorted = [3, 1, 4, 1, 5, 9, 2, 6];

// Default sort (CONVERTS TO STRINGS first!)
unsorted.sort();                     // [1, 1, 2, 3, 4, 5, 6, 9] ✓

// ⚠️ BE CAREFUL with numbers!
[10, 2, 30, 1].sort();              // [1, 10, 2, 30] ❌ Wrong! (string sort)

// Correct number sort - provide compare function
// compare(a, b):
//   return < 0 → a comes before b
//   return 0   → no change
//   return > 0 → b comes before a

// Ascending
unsorted.sort((a, b) => a - b);     // [1, 1, 2, 3, 4, 5, 6, 9]

// Descending
unsorted.sort((a, b) => b - a);     // [9, 6, 5, 4, 3, 2, 1, 1]

// Sort strings (case-sensitive)
const names = ["John", "jane", "Bob", "alice"];
names.sort();                        // ["Bob", "John", "alice", "jane"] (uppercase first)

// Case-insensitive sort
names.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
// ["alice", "Bob", "jane", "John"]

// Sort objects by property
users.sort((a, b) => a.age - b.age);  // Sort by age (ascending)
users.sort((a, b) => b.age - a.age);  // Sort by age (descending)
users.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name

// Complex sorting (multiple criteria)
const products = [
    { name: "A", price: 50, rating: 4 },
    { name: "B", price: 30, rating: 5 },
    { name: "C", price: 30, rating: 3 }
];

// Sort by price (ascending), then rating (descending)
products.sort((a, b) => {
    if (a.price !== b.price) {
        return a.price - b.price;  // Price first
    }
    return b.rating - a.rating;    // Then rating
});
```

**6. Joining & Splitting**
```javascript
// join - array to string
const items = ['apple', 'banana', 'orange'];
items.join();                        // "apple,banana,orange" (default comma)
items.join(', ');                    // "apple, banana, orange"
items.join(' - ');                   // "apple - banana - orange"
items.join('');                      // "applebananaorange"
items.join('\n');                    // Newline-separated

// split - string to array (String method, not Array!)
const text = "hello,world,foo,bar";
text.split(',');                     // ["hello", "world", "foo", "bar"]
text.split('');                      // ["h","e","l","l","o",",","w"...] (every character)
text.split(' ');                     // ["hello,world,foo,bar"] (no spaces to split on)

const sentence = "The quick brown fox";
sentence.split(' ');                 // ["The", "quick", "brown", "fox"]

// Limit splits
text.split(',', 2);                  // ["hello", "world"] (only 2 elements)
```

**7. Advanced Techniques**
```javascript
// Remove duplicates
const withDupes = [1, 2, 2, 3, 3, 4, 5, 5];
const unique = [...new Set(withDupes)];  // [1, 2, 3, 4, 5]

// Unique objects by property
const uniqueUsers = users.filter((user, index, self) =>
    index === self.findIndex(u => u.age === user.age)
);

// Chunk array (split into groups)
function chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}
console.log(chunk([1,2,3,4,5,6,7], 3));  // [[1,2,3], [4,5,6], [7]]

// Shuffle array (Fisher-Yates algorithm)
function shuffle(array) {
    const arr = [...array];  // Copy to avoid mutation
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];  // Swap
    }
    return arr;
}

// Find max/min
const values = [3, 1, 4, 1, 5, 9, 2, 6];
const max = Math.max(...values);     // 9
const min = Math.min(...values);     // 1

// Or with reduce
const maxReduce = values.reduce((max, n) => n > max ? n : max);

// Remove item by value
const removeItem = (arr, item) => arr.filter(i => i !== item);
console.log(removeItem([1,2,3,2,1], 2));  // [1, 3, 1]

// Remove item by index
const removeByIndex = (arr, index) => [
    ...arr.slice(0, index),
    ...arr.slice(index + 1)
];

// Update item in array (immutably)
const updateUser = (users, id, updates) =>
    users.map(u => u.id === id ? { ...u, ...updates } : u);

const updatedUsers = updateUser(users, 2, { age: 31 });

// Intersection (common elements)
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const intersection = arr1.filter(x => arr2.includes(x)); // [3, 4]

// Difference (in arr1 but not arr2)
const difference = arr1.filter(x => !arr2.includes(x)); // [1, 2]

// Zip arrays (combine corresponding elements)
function zip(...arrays) {
    const length = Math.max(...arrays.map(arr => arr.length));
    return Array.from({ length }, (_, i) => arrays.map(arr => arr[i]));
}
console.log(zip([1,2,3], ['a','b','c'], [true, false]));
// [[1,'a',true], [2,'b',false], [3,'c',undefined]]

// Range (create array of numbers)
const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);
console.log(range(1, 10));           // [1,2,3,4,5,6,7,8,9,10]

// Sum, average, etc.
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((a, b) => a + b, 0);  // 15
const avg = sum / numbers.length;    // 3
```

**Performance Tips:**
- ✅ `for` loop: Fastest for simple operations
- ✅ `forEach`: When you need to execute side effects
- ✅ `map`, `filter`, `reduce`: Functional, immutable, chainable
- ❌ Avoid mutating original array if you need to keep it
- ❌ Be careful with nested loops (O(n²) complexity)

### Object Methods
```javascript
let person = {
    name: "John",
    age: 30,
    greet() {
        return `Hello, ${this.name}`;
    }
};

Object.keys(person)         // ["name", "age", "greet"]
Object.values(person)       // ["John", 30, function]
Object.entries(person)      // [["name", "John"], ["age", 30], ...]
Object.assign({}, person)   // Copy object
```

### DOM Manipulation (Complete Guide)

The DOM (Document Object Model) is the JavaScript representation of your HTML. Master these techniques to build interactive websites!

**1. Selecting Elements**
```javascript
// By ID (returns single element or null)
const header = document.getElementById('header');  // Fast, unique IDs

// By class (returns HTMLCollection - live, array-like)
const buttons = document.getElementsByClassName('btn');
// ⚠️ HTMLCollection is LIVE (updates automatically when DOM changes)

// By tag (returns HTMLCollection)
const paragraphs = document.getElementsByTagName('p');

// Query selector - CSS selectors (returns first match or null)
const firstButton = document.querySelector('.btn');
const complexSelect = document.querySelector('#main .card:first-child');
const byAttribute = document.querySelector('[data-id="123"]');
const pseudoClass = document.querySelector('li:nth-child(2)');

// Query selector all (returns NodeList - static, array-like)
const allButtons = document.querySelectorAll('.btn');
const allCards = document.querySelectorAll('.card');
// ⚠️ NodeList is STATIC (doesn't update when DOM changes)

// Convert to real array (to use array methods)
const buttonsArray = Array.from(buttons);
const buttonsList = [...allButtons];

// Traversing the DOM
const element = document.querySelector('.item');
element.parentElement;               // Parent element
element.parentNode;                  // Parent node (can be non-element)
element.children;                    // All child elements (HTMLCollection)
element.childNodes;                  // All child nodes (includes text, comments)
element.firstElementChild;           // First child element
element.lastElementChild;            // Last child element
element.nextElementSibling;          // Next sibling element
element.previousElementSibling;      // Previous sibling element
element.closest('.container');       // Find nearest ancestor matching selector
element.matches('.active');          // Check if element matches selector

// Example: Find all siblings
function getSiblings(element) {
    return [...element.parentElement.children].filter(child => child !== element);
}
```

**2. Modifying Content**
```javascript
const div = document.querySelector('#myDiv');

// textContent - plain text (safe, escapes HTML)
div.textContent = "Hello World";     // Set
const text = div.textContent;        // Get
div.textContent = "<strong>Bold</strong>";  // Shows as plain text, not HTML

// innerHTML - HTML content (renders HTML)
div.innerHTML = "<strong>Bold text</strong>";  // Renders as HTML
div.innerHTML += "<p>More content</p>";        // Append (⚠️ recreates all children!)

// ⚠️ SECURITY WARNING: Never use innerHTML with user input!
// const userInput = "<img src=x onerror=alert('XSS')>";
// div.innerHTML = userInput;  // ❌ DANGEROUS! XSS attack!

// innerText vs textContent
// - textContent: Gets all text (including hidden)
// - innerText: Gets only visible text (respects CSS)

// Input/textarea values
const input = document.querySelector('#nameInput');
input.value = "John Doe";            // Set value
const currentValue = input.value;    // Get value

// Select element
const select = document.querySelector('#country');
select.value = "us";                 // Set selected option
const selected = select.value;       // Get selected value
```

**3. Modifying Attributes**
```javascript
const link = document.querySelector('a');

// getAttribute/setAttribute (works for any attribute)
link.getAttribute('href');           // Get
link.setAttribute('href', 'https://example.com');  // Set
link.removeAttribute('target');      // Remove
link.hasAttribute('href');           // Check (true/false)

// Direct property access (for standard HTML attributes)
link.href = "https://example.com";   // Preferred for standard attributes
link.title = "Click me";
link.id = "myLink";
link.target = "_blank";

// className (string) vs classList (modern, preferred)
link.className = "btn primary";      // Overwrites all classes
const classes = link.className;      // Get all classes as string

// Data attributes
const button = document.querySelector('[data-id]');
button.dataset.id;                   // Get data-id
button.dataset.userId = "123";       // Set data-user-id (camelCase → kebab-case)
button.dataset.userName = "John";    // Set data-user-name
delete button.dataset.userId;        // Remove data-user-id

// Boolean attributes
const checkbox = document.querySelector('#agree');
checkbox.checked = true;             // Check checkbox
checkbox.disabled = false;           // Enable
const isChecked = checkbox.checked;  // Get state
```

**4. Modifying Classes (Modern Way)**
```javascript
const box = document.querySelector('.box');

// classList API (recommended - chainable!)
box.classList.add('active');         // Add single class
box.classList.add('class1', 'class2', 'class3');  // Add multiple
box.classList.remove('hidden');      // Remove single class
box.classList.remove('class1', 'class2');         // Remove multiple
box.classList.toggle('highlight');   // Add if absent, remove if present
box.classList.toggle('active', true);  // Force add
box.classList.toggle('active', false); // Force remove
box.classList.contains('active');    // Check if has class (true/false)
box.classList.replace('old', 'new'); // Replace class

// Get all classes as array
const classArray = [...box.classList];

// Practical: Toggle active class
buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));
        // Add active to clicked button
        button.classList.add('active');
    });
});
```

**5. Modifying Styles**
```javascript
const element = document.querySelector('.element');

// Inline styles (adds to style attribute)
element.style.color = "red";         // camelCase for CSS properties!
element.style.backgroundColor = "blue";  // background-color → backgroundColor
element.style.fontSize = "16px";
element.style.display = "none";      // Hide element
element.style.display = "block";     // Show element
element.style.display = "";          // Remove inline style (use CSS default)

// Multiple styles at once
Object.assign(element.style, {
    color: "white",
    backgroundColor: "black",
    padding: "20px",
    borderRadius: "10px"
});

// Get computed style (includes CSS file styles, not just inline)
const computed = window.getComputedStyle(element);
computed.color;                      // "rgb(255, 0, 0)"
computed.fontSize;                   // "16px"
computed.display;                    // "block"

// Remove inline style
element.style.color = "";            // Remove inline color
element.removeAttribute('style');    // Remove all inline styles

// ⚠️ Prefer classes over inline styles!
// Bad: element.style.backgroundColor = "red";
// Good: element.classList.add('error');  (define .error in CSS)
```

**6. Creating Elements**
```javascript
// Create element
const newDiv = document.createElement('div');
newDiv.textContent = "I'm new!";
newDiv.className = "card";
newDiv.id = "myCard";

// Create with attributes
const newLink = document.createElement('a');
newLink.href = "https://example.com";
newLink.textContent = "Click me";
newLink.target = "_blank";

// Create complex structure (manual)
const card = document.createElement('div');
card.className = "card";

const title = document.createElement('h3');
title.textContent = "Card Title";

const text = document.createElement('p');
text.textContent = "Card description";

const button = document.createElement('button');
button.textContent = "Click me";
button.className = "btn";

card.appendChild(title);
card.appendChild(text);
card.appendChild(button);

// OR using innerHTML (faster for static content, but less safe)
card.innerHTML = `
    <h3>Card Title</h3>
    <p>Card description</p>
    <button class="btn">Click me</button>
`;

// Create from HTML string (advanced)
function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstElementChild;
}

const element = createElementFromHTML('<div class="card">Content</div>');
```

**7. Adding to DOM**
```javascript
const container = document.querySelector('.container');

// appendChild - add to end (old way)
container.appendChild(newDiv);       // Moves element if already in DOM

// append - add to end (modern, more flexible)
container.append(newDiv);            // Can add multiple
container.append(newDiv, newLink, "Some text");  // Elements + text nodes

// prepend - add to beginning
container.prepend(newDiv);

// insertBefore - insert before reference element
const reference = document.querySelector('.reference');
container.insertBefore(newDiv, reference);

// insertAdjacentElement - modern, more flexible
// Positions: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'

<!-- beforebegin -->
<div id="target">
  <!-- afterbegin -->
  content
  <!-- beforeend -->
</div>
<!-- afterend -->

element.insertAdjacentElement('beforebegin', newDiv);  // Before element
element.insertAdjacentElement('afterbegin', newDiv);   // First child
element.insertAdjacentElement('beforeend', newDiv);    // Last child
element.insertAdjacentElement('afterend', newDiv);     // After element

// insertAdjacentHTML - insert HTML string
element.insertAdjacentHTML('beforeend', '<p>New paragraph</p>');

// insertAdjacentText - insert plain text
element.insertAdjacentText('beforeend', 'Plain text');

// replaceWith - replace element
oldElement.replaceWith(newElement);

// replaceChild - replace child (old way)
parent.replaceChild(newChild, oldChild);
```

**8. Removing from DOM**
```javascript
// remove - remove element (modern)
element.remove();

// removeChild - remove child (old way)
parent.removeChild(element);

// Remove all children (fast way)
container.innerHTML = "";            // ⚠️ Loses event listeners

// Remove all children (safer way, preserves event listeners)
while (container.firstChild) {
    container.removeChild(container.firstChild);
}

// OR modern way
container.replaceChildren();         // Removes all children

// Remove specific children
const items = container.querySelectorAll('.item');
items.forEach(item => item.remove());

// Conditional removal
Array.from(container.children).forEach(child => {
    if (child.classList.contains('old')) {
        child.remove();
    }
});
```

**9. Cloning Elements**
```javascript
const original = document.querySelector('.original');

// Shallow clone (element only, no children)
const shallowClone = original.cloneNode();

// Deep clone (element + all descendants)
const deepClone = original.cloneNode(true);

// ⚠️ Event listeners are NOT cloned! Need to reattach.

// Clone and modify
const clone = original.cloneNode(true);
clone.id = "clone-" + Date.now();    // Change ID to avoid duplicates
clone.querySelector('h3').textContent = "Cloned Title";
container.appendChild(clone);
```

**10. Practical Examples**

**Example 1: Create Notification**
```javascript
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? 'green' : type === 'error' ? 'red' : 'blue'};
        color: white;
        border-radius: 5px;
        z-index: 1000;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => notification.remove(), 3000);
}

showNotification("Success!", "success");
```

**Example 2: Render List**
```javascript
function renderList(items, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";  // Clear existing
    
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
        });
        container.appendChild(li);
    });
}

const fruits = ["Apple", "Banana", "Orange"];
renderList(fruits, 'fruitList');
```

**Example 3: Create Card Component**
```javascript
function createCard({ title, description, image, id }) {
    const card = document.createElement('div');
    card.className = "card";
    card.dataset.id = id;
    
    card.innerHTML = `
        <img src="${image}" alt="${title}">
        <div class="card-body">
            <h3>${title}</h3>
            <p>${description}</p>
            <button class="btn-view" data-id="${id}">View</button>
            <button class="btn-delete" data-id="${id}">Delete</button>
        </div>
    `;
    
    // Attach event listeners
    card.querySelector('.btn-view').addEventListener('click', () => {
        console.log('View card:', id);
    });
    
    card.querySelector('.btn-delete').addEventListener('click', () => {
        card.remove();
    });
    
    return card;
}

// Usage
const cardData = {
    id: 1,
    title: "My Card",
    description: "Description here",
    image: "image.jpg"
};

const card = createCard(cardData);
document.querySelector('.container').appendChild(card);
```

**Example 4: Toggle Element Visibility**
```javascript
function toggleElement(element) {
    // Method 1: display none/block
    element.style.display = element.style.display === 'none' ? 'block' : 'none';
    
    // Method 2: class toggle (preferred)
    element.classList.toggle('hidden');  // .hidden { display: none; }
    
    // Method 3: visibility
    element.style.visibility = element.style.visibility === 'hidden' ? 'visible' : 'hidden';
}
```

**Example 5: Form Validation & Feedback**
```javascript
const form = document.querySelector('#myForm');
const input = document.querySelector('#email');

input.addEventListener('input', (e) => {
    const value = e.target.value;
    const isValid = value.includes('@');
    
    // Add/remove error class
    input.classList.toggle('error', !isValid);
    
    // Show/hide error message
    let errorMsg = input.nextElementSibling;
    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        input.insertAdjacentElement('afterend', errorMsg);
    }
    
    errorMsg.textContent = isValid ? '' : 'Invalid email';
    errorMsg.style.display = isValid ? 'none' : 'block';
});
```

**Performance Tips:**
- ✅ Cache selectors: `const el = document.querySelector('.item')` (don't query repeatedly)
- ✅ Batch DOM updates: Make all changes, then add to DOM once
- ✅ Use DocumentFragment for multiple elements
- ✅ Use `classList` instead of `className`
- ✅ Use event delegation instead of multiple listeners
- ❌ Avoid layout thrashing (reading then writing repeatedly)
- ❌ Avoid `innerHTML` for user input (XSS risk)

### Events (Complete Guide)

Events make your website interactive. Master event handling to create dynamic user experiences!

**1. Adding Event Listeners**
```javascript
const button = document.querySelector('#myButton');

// addEventListener (modern, recommended)
button.addEventListener('click', function(event) {
    console.log('Clicked!', event);
});

// Arrow function
button.addEventListener('click', (event) => {
    console.log('Clicked!', event);
});

// Named function (can remove later)
function handleClick(event) {
    console.log('Clicked!', event);
}
button.addEventListener('click', handleClick);

// Remove listener (must be named function)
button.removeEventListener('click', handleClick);

// Old way (avoid - only one handler per event)
button.onclick = function() {
    console.log('Clicked!');
};

// Inline (avoid - mixes HTML and JS)
// <button onclick="handleClick()">Click</button>

// Multiple listeners (addEventListener allows multiple)
button.addEventListener('click', handler1);
button.addEventListener('click', handler2);  // Both will run!

// Options object
button.addEventListener('click', handleClick, {
    once: true,       // Remove after first trigger
    passive: true,    // Won't call preventDefault() (performance)
    capture: false    // Use capture phase (default: false)
});
```

**2. Common Events**

**Mouse Events:**
```javascript
element.addEventListener('click', e => {});        // Click (mousedown + mouseup)
element.addEventListener('dblclick', e => {});     // Double click
element.addEventListener('mousedown', e => {});    // Mouse button pressed
element.addEventListener('mouseup', e => {});      // Mouse button released
element.addEventListener('mouseenter', e => {});   // Mouse enters (no bubbling)
element.addEventListener('mouseleave', e => {});   // Mouse leaves (no bubbling)
element.addEventListener('mouseover', e => {});    // Mouse enters (with bubbling)
element.addEventListener('mouseout', e => {});     // Mouse leaves (with bubbling)
element.addEventListener('mousemove', e => {});    // Mouse moves
element.addEventListener('contextmenu', e => {});  // Right click

// Example: Hover effect
button.addEventListener('mouseenter', () => {
    button.style.backgroundColor = 'blue';
});
button.addEventListener('mouseleave', () => {
    button.style.backgroundColor = '';
});
```

**Keyboard Events:**
```javascript
element.addEventListener('keydown', e => {});      // Key pressed (repeats if held)
element.addEventListener('keyup', e => {});        // Key released
element.addEventListener('keypress', e => {});     // Character typed (deprecated)

// Example: Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+S to save
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();  // Prevent browser save dialog
        saveData();
    }
    
    // Enter to submit
    if (e.key === 'Enter') {
        submitForm();
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Arrow keys for navigation
    if (e.key === 'ArrowRight') {
        nextItem();
    }
});

// Useful keyboard properties
e.key          // "a", "Enter", "ArrowUp", "Escape"
e.code         // "KeyA", "Enter", "ArrowUp", "Escape" (physical key)
e.ctrlKey      // true if Ctrl pressed
e.shiftKey     // true if Shift pressed
e.altKey       // true if Alt pressed
e.metaKey      // true if Cmd (Mac) / Win key pressed
```

**Form Events:**
```javascript
input.addEventListener('input', e => {});          // Value changes (immediate)
input.addEventListener('change', e => {});         // Value changes (on blur)
input.addEventListener('focus', e => {});          // Element focused
input.addEventListener('blur', e => {});           // Element loses focus
form.addEventListener('submit', e => {});          // Form submitted
select.addEventListener('change', e => {});        // Selection changes

// Example: Real-time validation
const email = document.querySelector('#email');
email.addEventListener('input', (e) => {
    const value = e.target.value;
    const isValid = value.includes('@');
    email.classList.toggle('error', !isValid);
});

// Example: Form submission
const form = document.querySelector('#myForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent page reload
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log('Form data:', data);
    
    // Submit via AJAX, etc.
});

// Example: Character counter
const textarea = document.querySelector('#message');
const counter = document.querySelector('#charCount');
textarea.addEventListener('input', (e) => {
    const length = e.target.value.length;
    const max = e.target.maxLength;
    counter.textContent = `${length}/${max}`;
});
```

**Window & Document Events:**
```javascript
window.addEventListener('load', e => {});          // All resources loaded (images, etc.)
document.addEventListener('DOMContentLoaded', e => {});  // DOM ready (fast!)
window.addEventListener('resize', e => {});        // Window resized
window.addEventListener('scroll', e => {});        // Page scrolled
window.addEventListener('beforeunload', e => {});  // Before page unload

// Example: Responsive behavior
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    if (width < 768) {
        // Mobile layout
    } else {
        // Desktop layout
    }
});

// Example: Sticky header on scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Example: Warn before leaving with unsaved changes
let hasUnsavedChanges = false;

form.addEventListener('input', () => {
    hasUnsavedChanges = true;
});

window.addEventListener('beforeunload', (e) => {
    if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';  // Show browser confirmation dialog
    }
});
```

**Touch Events (Mobile):**
```javascript
element.addEventListener('touchstart', e => {});   // Touch begins
element.addEventListener('touchmove', e => {});    // Touch moves
element.addEventListener('touchend', e => {});     // Touch ends
element.addEventListener('touchcancel', e => {});  // Touch interrupted

// Touch event properties
e.touches          // All current touches
e.targetTouches    // Touches on this element
e.changedTouches   // Touches that changed

// Example: Swipe detection
let touchStartX = 0;
let touchEndX = 0;

element.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

element.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        console.log('Swiped left');
    }
    if (touchEndX > touchStartX + 50) {
        console.log('Swiped right');
    }
}
```

**3. Event Object Properties**
```javascript
element.addEventListener('click', (event) => {
    // Target & Current Target
    event.target;              // Element that triggered event (can be child)
    event.currentTarget;       // Element with listener attached (this element)
    
    // Mouse position
    event.clientX;             // X relative to viewport
    event.clientY;             // Y relative to viewport
    event.pageX;               // X relative to page (includes scroll)
    event.pageY;               // Y relative to page
    event.screenX;             // X relative to screen
    event.screenY;             // Y relative to screen
    event.offsetX;             // X relative to target element
    event.offsetY;             // Y relative to target element
    
    // Mouse buttons
    event.button;              // 0: left, 1: middle, 2: right
    event.buttons;             // Bitmask of pressed buttons
    
    // Keyboard
    event.key;                 // Key value ("a", "Enter", "ArrowUp")
    event.code;                // Physical key code ("KeyA", "Enter")
    event.keyCode;             // Numeric key code (deprecated)
    event.ctrlKey;             // Ctrl pressed
    event.shiftKey;            // Shift pressed
    event.altKey;              // Alt pressed
    event.metaKey;             // Cmd/Win pressed
    
    // Event flow
    event.preventDefault();    // Prevent default behavior
    event.stopPropagation();   // Stop event bubbling
    event.stopImmediatePropagation(); // Stop other listeners on same element
    
    // Event info
    event.type;                // Event type ("click", "keydown", etc.)
    event.timeStamp;           // Time event occurred
    event.isTrusted;           // true if user-generated, false if script-generated
    
    // Form-specific
    event.target.value;        // Input value (for form elements)
    event.target.checked;      // Checkbox/radio state
});

// Example: Custom cursor position display
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('#cursor');
    cursor.textContent = `X: ${e.clientX}, Y: ${e.clientY}`;
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
```

**4. Event Propagation (Bubbling & Capturing)**
```html
<div id="outer">
    <div id="middle">
        <button id="inner">Click</button>
    </div>
</div>

<script>
// Event propagation phases:
// 1. Capture phase: window → document → html → body → outer → middle → inner
// 2. Target phase: inner
// 3. Bubble phase: inner → middle → outer → body → html → document → window

const outer = document.querySelector('#outer');
const middle = document.querySelector('#middle');
const inner = document.querySelector('#inner');

// Default: Bubble phase (most common)
outer.addEventListener('click', () => console.log('Outer clicked'));
middle.addEventListener('click', () => console.log('Middle clicked'));
inner.addEventListener('click', () => console.log('Inner clicked'));

// Click inner button:
// Output: "Inner clicked" → "Middle clicked" → "Outer clicked"

// Capture phase (use third parameter: true or {capture: true})
outer.addEventListener('click', () => console.log('Outer clicked (capture)'), true);
middle.addEventListener('click', () => console.log('Middle clicked (capture)'), true);
inner.addEventListener('click', () => console.log('Inner clicked (capture)'), true);

// Click inner button:
// Output: "Outer (capture)" → "Middle (capture)" → "Inner (capture)" → "Inner (bubble)" → "Middle (bubble)" → "Outer (bubble)"

// Stop propagation
inner.addEventListener('click', (e) => {
    e.stopPropagation();  // Stops bubbling
    console.log('Inner clicked only');
});
// Now only "Inner clicked only" appears

// Prevent default
const link = document.querySelector('a');
link.addEventListener('click', (e) => {
    e.preventDefault();  // Don't follow link
    console.log('Link clicked but not followed');
});
</script>
```

**5. Event Delegation (Performance Pattern)**
```javascript
// ❌ Bad: Add listener to each item (performance issue with many items)
const items = document.querySelectorAll('.item');
items.forEach(item => {
    item.addEventListener('click', () => {
        console.log('Item clicked:', item);
    });
});

// ✅ Good: Add ONE listener to parent (event delegation)
const list = document.querySelector('#list');
list.addEventListener('click', (e) => {
    // Check if clicked element is an item
    if (e.target.classList.contains('item')) {
        console.log('Item clicked:', e.target);
        e.target.classList.toggle('active');
    }
    
    // OR use closest() to handle clicks on child elements
    const item = e.target.closest('.item');
    if (item) {
        console.log('Item clicked:', item);
    }
});

// Benefits:
// - Only 1 listener (better performance)
// - Works for dynamically added items
// - Less memory usage

// Example: Todo list with delegation
const todoList = document.querySelector('#todoList');

todoList.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.delete-btn');
    const toggleBtn = e.target.closest('.toggle-btn');
    const todoItem = e.target.closest('.todo-item');
    
    if (deleteBtn) {
        todoItem.remove();
    } else if (toggleBtn) {
        todoItem.classList.toggle('completed');
    }
});
```

**6. Custom Events**
```javascript
// Create custom event
const myEvent = new CustomEvent('userLoggedIn', {
    detail: {
        username: 'john',
        timestamp: Date.now()
    },
    bubbles: true,
    cancelable: true
});

// Dispatch event
element.dispatchEvent(myEvent);

// Listen for custom event
element.addEventListener('userLoggedIn', (e) => {
    console.log('User logged in:', e.detail.username);
});

// Practical example: Communication between components
class Cart {
    addItem(item) {
        this.items.push(item);
        
        // Notify other parts of app
        document.dispatchEvent(new CustomEvent('cartUpdated', {
            detail: { item, total: this.getTotal() }
        }));
    }
}

// Listen anywhere in app
document.addEventListener('cartUpdated', (e) => {
    updateCartBadge(e.detail.total);
    showNotification(`${e.detail.item} added to cart!`);
});
```

**7. Debouncing & Throttling (Performance)**
```javascript
// Debounce: Wait for user to stop before executing
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Example: Search as user types (wait for pause)
const searchInput = document.querySelector('#search');
const search = debounce((query) => {
    console.log('Searching for:', query);
    // Make API call
}, 500);  // Wait 500ms after user stops typing

searchInput.addEventListener('input', (e) => {
    search(e.target.value);
});

// Throttle: Execute at most once per time period
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Example: Scroll handler (limit executions)
const handleScroll = throttle(() => {
    console.log('Scrolled!', window.scrollY);
    // Update UI based on scroll position
}, 200);  // Execute at most every 200ms

window.addEventListener('scroll', handleScroll);
```

**Complete Interactive Example:**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .active { background: yellow; }
        .completed { text-decoration: line-through; opacity: 0.6; }
    </style>
</head>
<body>
    <input type="text" id="todoInput" placeholder="Enter todo...">
    <button id="addBtn">Add</button>
    
    <ul id="todoList"></ul>
    
    <script>
        const input = document.querySelector('#todoInput');
        const addBtn = document.querySelector('#addBtn');
        const list = document.querySelector('#todoList');
        
        // Add todo (multiple ways to trigger)
        function addTodo() {
            const text = input.value.trim();
            if (!text) return;
            
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                <span class="todo-text">${text}</span>
                <button class="toggle-btn">✓</button>
                <button class="delete-btn">×</button>
            `;
            
            list.appendChild(li);
            input.value = '';
        }
        
        // Event 1: Click add button
        addBtn.addEventListener('click', addTodo);
        
        // Event 2: Press Enter in input
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
        
        // Event delegation for todo actions
        list.addEventListener('click', (e) => {
            const item = e.target.closest('.todo-item');
            if (!item) return;
            
            if (e.target.classList.contains('delete-btn')) {
                item.remove();
            } else if (e.target.classList.contains('toggle-btn')) {
                item.classList.toggle('completed');
            }
        });
        
        // Hover effect on items
        list.addEventListener('mouseover', (e) => {
            const item = e.target.closest('.todo-item');
            if (item) {
                item.classList.add('active');
            }
        });
        
        list.addEventListener('mouseout', (e) => {
            const item = e.target.closest('.todo-item');
            if (item) {
                item.classList.remove('active');
            }
        });
    </script>
</body>
</html>
```

**Best Practices:**
- ✅ Use `addEventListener` (not `onclick`)
- ✅ Remove listeners when no longer needed (prevent memory leaks)
- ✅ Use event delegation for dynamic content
- ✅ Debounce/throttle high-frequency events (scroll, resize, input)
- ✅ `preventDefault()` for custom form handling
- ✅ Name your handler functions (easier to debug & remove)
- ❌ Don't add the same listener multiple times
- ❌ Don't forget to `preventDefault()` on forms (or page reloads)

### Async JavaScript
```javascript
// setTimeout & setInterval
setTimeout(() => console.log('After 1s'), 1000);
let interval = setInterval(() => console.log('Every 1s'), 1000);
clearInterval(interval);

// Promises
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// Async/Await
async function fetchData() {
    try {
        const response = await fetch('url');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
```

### Local Storage
```javascript
// Store
localStorage.setItem('key', 'value');
localStorage.setItem('user', JSON.stringify({name: 'John'}));

// Retrieve
let value = localStorage.getItem('key');
let user = JSON.parse(localStorage.getItem('user'));

// Remove
localStorage.removeItem('key');
localStorage.clear();  // Remove all
```

### Date & Time
```javascript
let now = new Date();

now.getFullYear()           // 2026
now.getMonth()              // 0-11 (Jan=0)
now.getDate()               // 1-31
now.getDay()                // 0-6 (Sun=0)
now.getHours()              // 0-23
now.getMinutes()            // 0-59
now.getSeconds()            // 0-59
now.getTime()               // Milliseconds since 1970

now.toLocaleDateString()    // "1/15/2026"
now.toLocaleTimeString()    // "3:45:30 PM"
now.toISOString()           // "2026-01-15T15:45:30.000Z"

Date.now()                  // Current timestamp
```

### Conditionals & Loops
```javascript
// If statements
if (condition) {
    // code
} else if (anotherCondition) {
    // code
} else {
    // code
}

// Ternary operator
let result = condition ? 'yes' : 'no';

// Switch
switch(value) {
    case 1:
        // code
        break;
    case 2:
        // code
        break;
    default:
        // code
}

// For loop
for (let i = 0; i < 10; i++) {
    console.log(i);
}

// While loop
while (condition) {
    // code
}

// For...of (arrays)
for (let item of array) {
    console.log(item);
}

// For...in (objects)
for (let key in object) {
    console.log(key, object[key]);
}
```

### Functions
```javascript
// Function declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Function expression
const greet = function(name) {
    return `Hello, ${name}!`;
};

// Arrow function
const greet = (name) => {
    return `Hello, ${name}!`;
};

// Shorter arrow function
const greet = name => `Hello, ${name}!`;

// Default parameters
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}

// Callback
function process(callback) {
    callback("data");
}
```

### Common Patterns
```javascript
// Debounce (wait for user to stop typing)
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Throttle (limit function calls)
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Random number in range
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Format currency
function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}
```

---

## 🔧 Advanced JavaScript Patterns

### LocalStorage Deep Dive
```javascript
// LocalStorage stores KEY-VALUE pairs as STRINGS

// ========================================
// BASIC OPERATIONS
// ========================================

// Set item
localStorage.setItem('username', 'John');
localStorage.setItem('theme', 'dark');

// Get item
const username = localStorage.getItem('username');  // "John"
const theme = localStorage.getItem('theme');        // "dark"

// Remove item
localStorage.removeItem('username');

// Clear all items
localStorage.clear();

// Check if key exists
if (localStorage.getItem('username') !== null) {
    console.log('Username exists');
}

// Get number of items
const itemCount = localStorage.length;

// Get key by index
const firstKey = localStorage.key(0);

// ========================================
// STORING COMPLEX DATA (Arrays, Objects)
// ========================================

// ❌ Wrong: Will store "[object Object]"
const user = { name: 'John', age: 30 };
localStorage.setItem('user', user);  // ❌ Stores "[object Object]"

// ✅ Correct: Convert to JSON string
localStorage.setItem('user', JSON.stringify(user));

// Retrieve and parse
const retrievedUser = JSON.parse(localStorage.getItem('user'));
console.log(retrievedUser.name);  // "John"

// Example: Store array
const todos = ['Buy milk', 'Walk dog', 'Code project'];
localStorage.setItem('todos', JSON.stringify(todos));

// Retrieve array
const savedTodos = JSON.parse(localStorage.getItem('todos'));
console.log(savedTodos[0]);  // "Buy milk"

// ========================================
// HELPER FUNCTIONS (Best Practice)
// ========================================

// Safe get with default value
function getFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item !== null ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
    }
}

// Safe set
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

// Usage
const settings = getFromStorage('settings', { theme: 'light', lang: 'en' });
saveToStorage('settings', { theme: 'dark', lang: 'en' });

// ========================================
// COMPLETE TODO APP WITH LOCALSTORAGE
// ========================================

class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.render();
    }
    
    loadTodos() {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    }
    
    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    
    addTodo(text) {
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        this.todos.push(todo);
        this.saveTodos();
        this.render();
    }
    
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }
    
    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
    }
    
    render() {
        const list = document.querySelector('#todoList');
        list.innerHTML = '';
        
        this.todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${todo.text}</span>
                <button onclick="app.toggleTodo(${todo.id})">✓</button>
                <button onclick="app.deleteTodo(${todo.id})">×</button>
            `;
            list.appendChild(li);
        });
    }
}

// Initialize app
const app = new TodoApp();

// ========================================
// USER PREFERENCES / SETTINGS
// ========================================

class Settings {
    constructor() {
        this.defaults = {
            theme: 'light',
            fontSize: 'medium',
            notifications: true,
            language: 'en'
        };
        this.settings = this.load();
        this.apply();
    }
    
    load() {
        const saved = localStorage.getItem('settings');
        return saved ? { ...this.defaults, ...JSON.parse(saved) } : this.defaults;
    }
    
    save() {
        localStorage.setItem('settings', JSON.stringify(this.settings));
    }
    
    set(key, value) {
        this.settings[key] = value;
        this.save();
        this.apply();
    }
    
    get(key) {
        return this.settings[key];
    }
    
    apply() {
        // Apply theme
        document.body.className = `theme-${this.settings.theme}`;
        
        // Apply font size
        document.body.style.fontSize = {
            small: '14px',
            medium: '16px',
            large: '18px'
        }[this.settings.fontSize];
    }
}

// Usage
const settings = new Settings();
settings.set('theme', 'dark');
console.log(settings.get('theme'));  // "dark"

// ========================================
// STORAGE EVENTS (Sync Between Tabs)
// ========================================

// Listen for storage changes in OTHER tabs
window.addEventListener('storage', (e) => {
    console.log('Storage changed in another tab:');
    console.log('Key:', e.key);
    console.log('Old value:', e.oldValue);
    console.log('New value:', e.newValue);
    console.log('URL:', e.url);
    
    // Sync data
    if (e.key === 'todos') {
        app.todos = JSON.parse(e.newValue);
        app.render();
    }
});

// ========================================
// STORAGE LIMITS & QUOTAS
// ========================================

// LocalStorage limit: ~5-10MB (varies by browser)

// Check storage usage (Chrome only)
if (navigator.storage && navigator.storage.estimate) {
    navigator.storage.estimate().then(estimate => {
        console.log(`Using ${estimate.usage} of ${estimate.quota} bytes`);
        const percentUsed = (estimate.usage / estimate.quota) * 100;
        console.log(`${percentUsed.toFixed(2)}% used`);
    });
}

// Handle quota exceeded error
function safeSetItem(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            console.error('Storage quota exceeded!');
            // Handle: clear old data, compress, or notify user
            alert('Storage is full. Please clear some data.');
        }
    }
}

// ========================================
// SESSION STORAGE (Tab-specific)
// ========================================

// Similar API to localStorage, but data cleared when tab closes
sessionStorage.setItem('tabId', Math.random().toString(36).substr(2, 9));
sessionStorage.getItem('tabId');
sessionStorage.removeItem('tabId');
sessionStorage.clear();

// Use case: Form data during session
const form = document.querySelector('#myForm');
form.addEventListener('input', (e) => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    sessionStorage.setItem('formDraft', JSON.stringify(data));
});

// Restore form data
const draft = sessionStorage.getItem('formDraft');
if (draft) {
    const data = JSON.parse(draft);
    Object.entries(data).forEach(([key, value]) => {
        const input = form.elements[key];
        if (input) input.value = value;
    });
}

// ========================================
// BEST PRACTICES
// ========================================

// 1. Always wrap in try-catch (private browsing may throw)
// 2. Always JSON.stringify/parse for objects
// 3. Validate data when retrieving
// 4. Don't store sensitive data (passwords, tokens)
// 5. Set expiration for cached data
// 6. Clear old data periodically
// 7. Provide fallback if storage is unavailable

// Storage wrapper with expiration
class StorageWithExpiry {
    set(key, value, expiryMs) {
        const item = {
            value: value,
            expiry: Date.now() + expiryMs
        };
        localStorage.setItem(key, JSON.stringify(item));
    }
    
    get(key) {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) return null;
        
        const item = JSON.parse(itemStr);
        if (Date.now() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        
        return item.value;
    }
}

// Usage
const storage = new StorageWithExpiry();
storage.set('tempData', { foo: 'bar' }, 60000);  // Expires in 1 minute
const data = storage.get('tempData');  // null if expired
```

### Async JavaScript (Promises, Async/Await, Fetch)
```javascript
// ========================================
// CALLBACKS (Old way - callback hell)
// ========================================

function getUserData(userId, callback) {
    setTimeout(() => {
        callback({ id: userId, name: 'John' });
    }, 1000);
}

getUserData(1, (user) => {
    console.log(user);
    // Nested callbacks = callback hell 😱
    getUserPosts(user.id, (posts) => {
        getComments(posts[0].id, (comments) => {
            // Too much nesting!
        });
    });
});

// ========================================
// PROMISES (Better!)
// ========================================

// Create promise
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve({ data: 'Success!' });  // Success
        } else {
            reject(new Error('Failed!'));   // Failure
        }
    }, 1000);
});

// Consume promise
myPromise
    .then(result => {
        console.log(result.data);  // "Success!"
        return 'Next value';
    })
    .then(value => {
        console.log(value);  // "Next value"
    })
    .catch(error => {
        console.error('Error:', error.message);
    })
    .finally(() => {
        console.log('Cleanup code here');
    });

// Promise chain (avoid callback hell)
function getUserData(userId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id: userId, name: 'John' }), 1000);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve([{ id: 1, title: 'Post 1' }]), 1000);
    });
}

getUserData(1)
    .then(user => {
        console.log('User:', user);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log('Posts:', posts);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// ========================================
// ASYNC/AWAIT (Best! Cleaner syntax)
// ========================================

// async function always returns a Promise
async function fetchUserData() {
    try {
        // await pauses execution until Promise resolves
        const user = await getUserData(1);
        console.log('User:', user);
        
        const posts = await getUserPosts(user.id);
        console.log('Posts:', posts);
        
        return posts;  // Wrapped in Promise automatically
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call async function
fetchUserData().then(posts => console.log('Done:', posts));

// ========================================
// FETCH API (HTTP Requests)
// ========================================

// GET request
async function getUsers() {
    try {
        const response = await fetch('https://api.example.com/users');
        
        // Check if request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();  // Parse JSON
        console.log(users);
        return users;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// POST request
async function createUser(userData) {
    try {
        const response = await fetch('https://api.example.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const newUser = await response.json();
        return newUser;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Usage
createUser({ name: 'John', email: 'john@example.com' });

// PUT request (update)
async function updateUser(userId, updates) {
    const response = await fetch(`https://api.example.com/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    return response.json();
}

// DELETE request
async function deleteUser(userId) {
    const response = await fetch(`https://api.example.com/users/${userId}`, {
        method: 'DELETE'
    });
    return response.ok;
}

// ========================================
// PARALLEL REQUESTS (Promise.all)
// ========================================

// Wait for ALL promises to resolve
async function fetchAllData() {
    try {
        const [users, posts, comments] = await Promise.all([
            fetch('/api/users').then(r => r.json()),
            fetch('/api/posts').then(r => r.json()),
            fetch('/api/comments').then(r => r.json())
        ]);
        
        console.log('All data loaded:', { users, posts, comments });
    } catch (error) {
        // If ANY promise fails, Promise.all fails
        console.error('Error:', error);
    }
}

// Promise.race - first to resolve/reject wins
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await Promise.race([
            fetch(url, { signal: controller.signal }),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), timeout)
            )
        ]);
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        console.error('Request failed:', error.message);
    }
}

// Promise.allSettled - wait for all, don't fail if one fails
async function fetchMultipleEndpoints() {
    const results = await Promise.allSettled([
        fetch('/api/users'),
        fetch('/api/posts'),
        fetch('/api/invalid')  // This will fail
    ]);
    
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`Request ${index} succeeded:`, result.value);
        } else {
            console.log(`Request ${index} failed:`, result.reason);
        }
    });
}

// ========================================
// REAL-WORLD EXAMPLE: Weather App
// ========================================

class WeatherApp {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    }
    
    async getWeather(city) {
        try {
            const response = await fetch(
                `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`
            );
            
            if (!response.ok) {
                throw new Error('City not found');
            }
            
            const data = await response.json();
            
            return {
                city: data.name,
                temp: Math.round(data.main.temp),
                description: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed
            };
        } catch (error) {
            console.error('Error fetching weather:', error);
            throw error;
        }
    }
    
    async displayWeather(city) {
        const weatherDiv = document.querySelector('#weather');
        weatherDiv.innerHTML = '<p>Loading...</p>';
        
        try {
            const weather = await this.getWeather(city);
            
            weatherDiv.innerHTML = `
                <h2>${weather.city}</h2>
                <p class="temp">${weather.temp}°C</p>
                <p>${weather.description}</p>
                <p>Humidity: ${weather.humidity}%</p>
                <p>Wind: ${weather.windSpeed} m/s</p>
            `;
        } catch (error) {
            weatherDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        }
    }
}

// Usage
const weather = new WeatherApp('your-api-key');
weather.displayWeather('London');

// ========================================
// ERROR HANDLING PATTERNS
// ========================================

// Pattern 1: Try-catch in async function
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;  // Return fallback
    }
}

// Pattern 2: Catch on promise chain
fetch('/api/data')
    .then(r => r.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// Pattern 3: Reusable error handler
async function handleAsync(promise) {
    try {
        const data = await promise;
        return [null, data];  // [error, data]
    } catch (error) {
        return [error, null];
    }
}

// Usage
const [error, data] = await handleAsync(fetch('/api/data'));
if (error) {
    console.error('Error:', error);
} else {
    console.log('Data:', data);
}
```

---

## 🐛 Debugging & Troubleshooting

### Console Methods
```javascript
// Basic logging
console.log('Hello');                    // General output
console.log('Multiple', 'values', 123);
console.log({ name: 'John', age: 30 }); // Objects
console.log(['array', 'values']);

// String substitution
console.log('User %s is %d years old', 'John', 30);

// Styled console output
console.log('%cStyled Text', 'color: blue; font-size: 20px; font-weight: bold');

// Different log levels
console.debug('Debug info');     // Debug (may be hidden)
console.info('Information');     // Info
console.warn('Warning!');        // Warning (yellow)
console.error('Error!');         // Error (red)

// Grouping
console.group('User Details');
console.log('Name: John');
console.log('Age: 30');
console.groupEnd();

// Collapsed group
console.groupCollapsed('Details');
console.log('Hidden by default');
console.groupEnd();

// Tables (great for arrays of objects)
const users = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 }
];
console.table(users);

// Count calls
console.count('Counter');  // Counter: 1
console.count('Counter');  // Counter: 2
console.count('Counter');  // Counter: 3
console.countReset('Counter');

// Timing
console.time('Operation');
// ... some code ...
console.timeEnd('Operation');  // Operation: 123.456ms

// Assertions (error if false)
const x = 5;
console.assert(x === 5, 'x should be 5');      // Nothing (passes)
console.assert(x === 10, 'x should be 10');    // Error message

// Clear console
console.clear();

// Trace (call stack)
function a() { b(); }
function b() { c(); }
function c() { console.trace(); }
a();  // Shows: c → b → a

// Object inspection
console.dir(document.body);  // Shows all properties
```

### Debugging Techniques
```javascript
// 1. Debugger statement (pauses execution)
function calculate(a, b) {
    debugger;  // Execution pauses here when DevTools open
    return a + b;
}

// 2. Breakpoints (set in browser DevTools)
// - Click line number to add breakpoint
// - Step through code
// - Inspect variables

// 3. Conditional logging
const DEBUG = true;
function log(...args) {
    if (DEBUG) console.log(...args);
}

// 4. Performance monitoring
function measurePerformance(name, fn) {
    console.time(name);
    fn();
    console.timeEnd(name);
}

measurePerformance('Array operation', () => {
    const arr = Array(10000).fill(0).map((_, i) => i * 2);
});

// 5. Error boundaries
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // Log to server, show user-friendly message
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

// 6. Network monitoring
// Open DevTools → Network tab
// Monitor all HTTP requests
// Check timing, status codes, payloads

// 7. Memory leaks
// DevTools → Memory tab
// Take heap snapshots
// Look for detached DOM nodes, growing arrays
```

### Common Errors & Solutions
```javascript
// ========================================
// 1. TypeError: Cannot read property 'X' of undefined
// ========================================

// ❌ Error
const user = null;
console.log(user.name);  // TypeError!

// ✅ Solution 1: Check existence
if (user && user.name) {
    console.log(user.name);
}

// ✅ Solution 2: Optional chaining (?.)
console.log(user?.name);  // undefined (no error)

// ✅ Solution 3: Default value
const name = user?.name || 'Guest';

// ========================================
// 2. ReferenceError: X is not defined
// ========================================

// ❌ Error
console.log(undefinedVariable);  // ReferenceError!

// ✅ Solution: Declare variable
let undefinedVariable = 'value';

// Check if exists
if (typeof undefinedVariable !== 'undefined') {
    console.log(undefinedVariable);
}

// ========================================
// 3. TypeError: X is not a function
// ========================================

// ❌ Error
const obj = { name: 'John' };
obj.greet();  // TypeError: obj.greet is not a function

// ✅ Solution: Check before calling
if (typeof obj.greet === 'function') {
    obj.greet();
}

// ========================================
// 4. SyntaxError: Unexpected token
// ========================================

// ❌ Error
const obj = {
    name: 'John',  // Extra comma (old browsers)
}

// ✅ Solution: Fix syntax
const obj = {
    name: 'John'
};

// ========================================
// 5. Event listener not working
// ========================================

// ❌ Common mistakes
document.querySelector('.btn').addEventListener('click', handleClick);
// - Element doesn't exist yet (script runs before DOM loads)
// - Wrong selector
// - Event name typo

// ✅ Solutions
// 1. Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.btn').addEventListener('click', handleClick);
});

// 2. Check element exists
const btn = document.querySelector('.btn');
if (btn) {
    btn.addEventListener('click', handleClick);
}

// 3. Use delegation
document.body.addEventListener('click', (e) => {
    if (e.target.matches('.btn')) {
        handleClick(e);
    }
});

// ========================================
// 6. This binding issues
// ========================================

// ❌ Error: 'this' is undefined/wrong
const obj = {
    name: 'John',
    greet: function() {
        setTimeout(function() {
            console.log(this.name);  // undefined! 'this' is window/undefined
        }, 1000);
    }
};

// ✅ Solution 1: Arrow function (inherits 'this')
const obj = {
    name: 'John',
    greet: function() {
        setTimeout(() => {
            console.log(this.name);  // "John"
        }, 1000);
    }
};

// ✅ Solution 2: Bind
setTimeout(function() {
    console.log(this.name);
}.bind(obj), 1000);

// ✅ Solution 3: Store reference
const self = this;
setTimeout(function() {
    console.log(self.name);
}, 1000);
```

---

## 🚀 Complete Real-World Examples

### Example 1: Interactive Todo App (Complete)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            width: 100%;
            max-width: 500px;
            padding: 30px;
        }

        h1 {
            color: #333;
            margin-bottom: 20px;
            text-align: center;
        }

        .input-section {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }

        #todoInput {
            flex: 1;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
        }

        #todoInput:focus {
            outline: none;
            border-color: #667eea;
        }

        button {
            padding: 12px 24px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s;
        }

        button:hover {
            background: #5a67d8;
            transform: translateY(-2px);
        }

        .filters {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }

        .filters button {
            flex: 1;
            padding: 8px;
            background: #f5f5f5;
            color: #666;
        }

        .filters button.active {
            background: #667eea;
            color: white;
        }

        #todoList {
            list-style: none;
        }

        .todo-item {
            background: #f9f9f9;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s;
        }

        .todo-item:hover {
            background: #f0f0f0;
            transform: translateX(5px);
        }

        .todo-item.completed .todo-text {
            text-decoration: line-through;
            opacity: 0.6;
        }

        .todo-text {
            flex: 1;
            cursor: pointer;
        }

        .todo-item button {
            padding: 6px 12px;
            font-size: 14px;
        }

        .delete-btn {
            background: #e53e3e;
        }

        .delete-btn:hover {
            background: #c53030;
        }

        .stats {
            margin-top: 20px;
            padding: 15px;
            background: #f9f9f9;
            border-radius: 8px;
            text-align: center;
            color: #666;
        }

        .empty-state {
            text-align: center;
            padding: 40px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📝 My Todo List</h1>
        
        <div class="input-section">
            <input type="text" id="todoInput" placeholder="Add a new task..." maxlength="100">
            <button id="addBtn">Add</button>
        </div>

        <div class="filters">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="active">Active</button>
            <button class="filter-btn" data-filter="completed">Completed</button>
        </div>

        <ul id="todoList"></ul>

        <div class="stats">
            <span id="stats">0 tasks</span>
        </div>
    </div>

    <script>
        class TodoApp {
            constructor() {
                this.todos = this.loadFromStorage();
                this.currentFilter = 'all';
                this.initElements();
                this.attachEventListeners();
                this.render();
            }

            initElements() {
                this.input = document.querySelector('#todoInput');
                this.addBtn = document.querySelector('#addBtn');
                this.todoList = document.querySelector('#todoList');
                this.stats = document.querySelector('#stats');
                this.filterBtns = document.querySelectorAll('.filter-btn');
            }

            attachEventListeners() {
                // Add todo
                this.addBtn.addEventListener('click', () => this.addTodo());
                this.input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.addTodo();
                });

                // Filters
                this.filterBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        this.filterBtns.forEach(b => b.classList.remove('active'));
                        e.target.classList.add('active');
                        this.currentFilter = e.target.dataset.filter;
                        this.render();
                    });
                });

                // Event delegation for todo actions
                this.todoList.addEventListener('click', (e) => {
                    const id = parseInt(e.target.dataset.id);
                    
                    if (e.target.classList.contains('todo-text')) {
                        this.toggleTodo(id);
                    } else if (e.target.classList.contains('delete-btn')) {
                        this.deleteTodo(id);
                    }
                });
            }

            addTodo() {
                const text = this.input.value.trim();
                if (!text) {
                    alert('Please enter a task!');
                    return;
                }

                const todo = {
                    id: Date.now(),
                    text: text,
                    completed: false,
                    createdAt: new Date().toISOString()
                };

                this.todos.push(todo);
                this.input.value = '';
                this.input.focus();
                this.saveToStorage();
                this.render();
            }

            toggleTodo(id) {
                const todo = this.todos.find(t => t.id === id);
                if (todo) {
                    todo.completed = !todo.completed;
                    this.saveToStorage();
                    this.render();
                }
            }

            deleteTodo(id) {
                if (confirm('Delete this task?')) {
                    this.todos = this.todos.filter(t => t.id !== id);
                    this.saveToStorage();
                    this.render();
                }
            }

            getFilteredTodos() {
                switch (this.currentFilter) {
                    case 'active':
                        return this.todos.filter(t => !t.completed);
                    case 'completed':
                        return this.todos.filter(t => t.completed);
                    default:
                        return this.todos;
                }
            }

            render() {
                const filteredTodos = this.getFilteredTodos();
                
                if (filteredTodos.length === 0) {
                    this.todoList.innerHTML = `
                        <div class="empty-state">
                            <p>No tasks to show</p>
                        </div>
                    `;
                } else {
                    this.todoList.innerHTML = filteredTodos.map(todo => `
                        <li class="todo-item ${todo.completed ? 'completed' : ''}">
                            <span class="todo-text" data-id="${todo.id}">${todo.text}</span>
                            <button class="delete-btn" data-id="${todo.id}">Delete</button>
                        </li>
                    `).join('');
                }

                this.updateStats();
            }

            updateStats() {
                const total = this.todos.length;
                const completed = this.todos.filter(t => t.completed).length;
                const active = total - completed;
                
                this.stats.textContent = `${active} active, ${completed} completed, ${total} total`;
            }

            saveToStorage() {
                localStorage.setItem('todos', JSON.stringify(this.todos));
            }

            loadFromStorage() {
                const saved = localStorage.getItem('todos');
                return saved ? JSON.parse(saved) : [];
            }
        }

        // Initialize app
        const app = new TodoApp();
    </script>
</body>
</html>
```

### Example 2: Modal Component (Reusable)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Modal Example</title>
    <style>
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            z-index: 1000;
        }

        .modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .modal {
            background: white;
            border-radius: 10px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            transform: scale(0.8);
            transition: transform 0.3s;
        }

        .modal-overlay.active .modal {
            transform: scale(1);
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }

        .modal-footer {
            margin-top: 20px;
            display: flex;
            gap: 10px;
            justify-content: flex-end;
        }

        button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .btn-primary {
            background: #667eea;
            color: white;
        }
    </style>
</head>
<body>
    <button id="openModal">Open Modal</button>

    <div class="modal-overlay" id="modalOverlay">
        <div class="modal">
            <div class="modal-header">
                <h2 id="modalTitle">Modal Title</h2>
                <button class="modal-close" id="modalClose">&times;</button>
            </div>
            <div class="modal-body" id="modalBody">
                <p>Modal content goes here</p>
            </div>
            <div class="modal-footer">
                <button id="modalCancel">Cancel</button>
                <button class="btn-primary" id="modalConfirm">Confirm</button>
            </div>
        </div>
    </div>

    <script>
        class Modal {
            constructor(id) {
                this.overlay = document.querySelector(`#${id}`);
                this.modal = this.overlay.querySelector('.modal');
                this.closeBtn = this.overlay.querySelector('.modal-close');
                this.title = this.overlay.querySelector('#modalTitle');
                this.body = this.overlay.querySelector('#modalBody');
                
                this.attachEvents();
            }

            attachEvents() {
                // Close on X button
                this.closeBtn.addEventListener('click', () => this.close());
                
                // Close on overlay click
                this.overlay.addEventListener('click', (e) => {
                    if (e.target === this.overlay) {
                        this.close();
                    }
                });
                
                // Close on Escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && this.isOpen()) {
                        this.close();
                    }
                });
            }

            open(options = {}) {
                if (options.title) this.title.textContent = options.title;
                if (options.body) this.body.innerHTML = options.body;
                
                this.overlay.classList.add('active');
                document.body.style.overflow = 'hidden';  // Prevent scroll
            }

            close() {
                this.overlay.classList.remove('active');
                document.body.style.overflow = '';  // Restore scroll
            }

            isOpen() {
                return this.overlay.classList.contains('active');
            }

            confirm(callback) {
                const confirmBtn = this.overlay.querySelector('#modalConfirm');
                confirmBtn.onclick = () => {
                    callback();
                    this.close();
                };
            }
        }

        // Usage
        const modal = new Modal('modalOverlay');

        document.querySelector('#openModal').addEventListener('click', () => {
            modal.open({
                title: 'Confirm Action',
                body: '<p>Are you sure you want to proceed?</p>'
            });
            
            modal.confirm(() => {
                console.log('Confirmed!');
                alert('Action confirmed!');
            });
        });

        document.querySelector('#modalCancel').addEventListener('click', () => {
            modal.close();
        });
    </script>
</body>
</html>
```

### Example 3: Form Validation (Complete)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Form Validation</title>
    <style>
        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }

        input {
            width: 100%;
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }

        input.error {
            border-color: #e53e3e;
        }

        input.success {
            border-color: #48bb78;
        }

        .error-message {
            color: #e53e3e;
            font-size: 14px;
            margin-top: 5px;
        }

        button {
            padding: 12px 24px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
    </style>
</head>
<body>
    <form id="registrationForm">
        <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required>
            <div class="error-message"></div>
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
            <div class="error-message"></div>
        </div>

        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
            <div class="error-message"></div>
        </div>

        <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required>
            <div class="error-message"></div>
        </div>

        <button type="submit">Register</button>
    </form>

    <script>
        class FormValidator {
            constructor(formId) {
                this.form = document.querySelector(`#${formId}`);
                this.rules = {};
                this.init();
            }

            init() {
                this.form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    if (this.validate()) {
                        this.handleSubmit();
                    }
                });

                // Real-time validation
                this.form.querySelectorAll('input').forEach(input => {
                    input.addEventListener('blur', () => this.validateField(input));
                    input.addEventListener('input', () => {
                        if (input.classList.contains('error')) {
                            this.validateField(input);
                        }
                    });
                });
            }

            addRule(fieldName, validator, message) {
                if (!this.rules[fieldName]) {
                    this.rules[fieldName] = [];
                }
                this.rules[fieldName].push({ validator, message });
            }

            validateField(input) {
                const fieldRules = this.rules[input.name];
                if (!fieldRules) return true;

                this.clearError(input);

                for (const rule of fieldRules) {
                    if (!rule.validator(input.value, this.form)) {
                        this.showError(input, rule.message);
                        return false;
                    }
                }

                this.showSuccess(input);
                return true;
            }

            validate() {
                let isValid = true;
                this.form.querySelectorAll('input').forEach(input => {
                    if (!this.validateField(input)) {
                        isValid = false;
                    }
                });
                return isValid;
            }

            showError(input, message) {
                input.classList.add('error');
                input.classList.remove('success');
                const errorDiv = input.nextElementSibling;
                errorDiv.textContent = message;
            }

            showSuccess(input) {
                input.classList.add('success');
                input.classList.remove('error');
                const errorDiv = input.nextElementSibling;
                errorDiv.textContent = '';
            }

            clearError(input) {
                input.classList.remove('error', 'success');
                const errorDiv = input.nextElementSibling;
                errorDiv.textContent = '';
            }

            handleSubmit() {
                const formData = new FormData(this.form);
                const data = Object.fromEntries(formData);
                console.log('Form submitted:', data);
                alert('Registration successful!');
                this.form.reset();
                this.form.querySelectorAll('input').forEach(input => {
                    this.clearError(input);
                });
            }
        }

        // Create validator
        const validator = new FormValidator('registrationForm');

        // Add validation rules
        validator.addRule('username',
            value => value.length >= 3,
            'Username must be at least 3 characters'
        );

        validator.addRule('username',
            value => /^[a-zA-Z0-9_]+$/.test(value),
            'Username can only contain letters, numbers, and underscores'
        );

        validator.addRule('email',
            value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            'Please enter a valid email address'
        );

        validator.addRule('password',
            value => value.length >= 8,
            'Password must be at least 8 characters'
        );

        validator.addRule('password',
            value => /[A-Z]/.test(value),
            'Password must contain at least one uppercase letter'
        );

        validator.addRule('password',
            value => /[0-9]/.test(value),
            'Password must contain at least one number'
        );

        validator.addRule('confirmPassword',
            (value, form) => value === form.querySelector('#password').value,
            'Passwords do not match'
        );
    </script>
</body>
</html>
```

---

## 📚 Key Learning Paths

### Beginner Path
1. Calculator - Basic DOM & events
2. To-Do List - CRUD operations
3. Quote Generator - Random & localStorage
4. Digital Clock - Date & time

### Intermediate Path
5. Quiz App - State management
6. Image Slider - Intervals & touch
7. Theme Switcher - CSS variables
8. Countdown Timer - Complex date math

### Advanced Path
9. Weather App - API integration
10. Expense Tracker - Complex state & localStorage
11. Memory Game - Game logic & algorithms
12. Responsive Navbar - Scroll behavior

---

## 🎯 Practice Tips

1. **Type the code** - Don't copy/paste
2. **Modify projects** - Change colors, features, behavior
3. **Break things** - Learn by debugging
4. **Read documentation** - MDN Web Docs
5. **Build variations** - Create your own versions
6. **Comment your code** - Explain what you're doing
7. **Use console.log()** - Debug and understand flow
8. **Review regularly** - Reinforce concepts

---

## 📖 Resources

- **MDN Web Docs**: https://developer.mozilla.org (Most comprehensive, always up-to-date)
- **JavaScript.info**: https://javascript.info (In-depth tutorials)
- **CSS-Tricks**: https://css-tricks.com (CSS guides and tips)
- **Can I Use**: https://caniuse.com (Browser compatibility checker)
- **W3Schools**: https://w3schools.com (Quick references and examples)
- **DevDocs**: https://devdocs.io (All documentation in one place)
- **Frontend Mentor**: https://frontendmentor.io (Practice projects)

---

## ⚡ Quick Reference Cheat Sheet

### HTML Essentials
```html
<!-- Basic Structure -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <script src="script.js"></script>
</body>
</html>

<!-- Common Elements -->
<h1>Heading</h1>
<p>Paragraph</p>
<a href="url">Link</a>
<img src="image.jpg" alt="Description">
<button>Click</button>
<input type="text" placeholder="Text">
<div>Block container</div>
<span>Inline container</span>

<!-- Forms -->
<form onsubmit="handler(event)">
    <input type="text" id="name" required>
    <input type="email" id="email">
    <input type="password" id="pass">
    <input type="number" min="0" max="100">
    <input type="checkbox" checked>
    <input type="radio" name="group">
    <textarea rows="4"></textarea>
    <select><option>Choose</option></select>
    <button type="submit">Submit</button>
</form>

<!-- Semantic HTML -->
<header>Page header</header>
<nav>Navigation</nav>
<main>Main content</main>
<article>Self-contained content</article>
<section>Thematic grouping</section>
<aside>Side content</aside>
<footer>Page footer</footer>
```

### CSS Essentials
```css
/* Selectors */
element { }              /* Tag */
.class { }               /* Class */
#id { }                  /* ID */
element.class { }        /* Combination */
element > child { }      /* Direct child */
element child { }        /* Descendant */
element:hover { }        /* Pseudo-class */
element::before { }      /* Pseudo-element */

/* Box Model */
* { box-sizing: border-box; }  /* Always use this! */
div {
    width: 200px;
    height: 100px;
    padding: 20px;
    margin: 10px;
    border: 2px solid;
}

/* Flexbox (1D) */
.container {
    display: flex;
    flex-direction: row;        /* row | column */
    justify-content: center;    /* Main axis */
    align-items: center;        /* Cross axis */
    gap: 20px;
}
.item { flex: 1; }             /* Grow to fill */

/* Grid (2D) */
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);  /* 3 columns */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));  /* Responsive */
    gap: 20px;
}

/* Common Patterns */
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

/* Transitions */
.element {
    transition: all 0.3s ease;
}
.element:hover {
    transform: scale(1.1);
    background: blue;
}

/* Animations */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
.element { animation: fadeIn 1s ease; }

/* Responsive */
@media (max-width: 768px) {
    .container { flex-direction: column; }
}
```

### JavaScript Essentials
```javascript
// ========================================
// BASICS
// ========================================

// Variables
let name = "John";        // Reassignable
const age = 30;           // Constant
const person = { name: "John" };  // Object properties mutable

// Data Types
typeof "text"             // "string"
typeof 123                // "number"
typeof true               // "boolean"
typeof undefined          // "undefined"
typeof null               // "object" (historical bug)
typeof []                 // "object"
Array.isArray([])         // true

// Template Literals
const msg = `Hello ${name}, you are ${age} years old`;

// ========================================
// ARRAYS (Most Used Methods)
// ========================================

const arr = [1, 2, 3, 4, 5];

// Add/Remove
arr.push(6)               // Add to end → [1,2,3,4,5,6]
arr.pop()                 // Remove from end → 6
arr.unshift(0)            // Add to start → [0,1,2,3,4,5]
arr.shift()               // Remove from start → 0
arr.splice(2, 1)          // Remove at index 2

// Iterate & Transform
arr.forEach(x => console.log(x))      // Loop (no return)
arr.map(x => x * 2)                   // [2,4,6,8,10]
arr.filter(x => x > 2)                // [3,4,5]
arr.find(x => x > 2)                  // 3 (first match)
arr.reduce((sum, x) => sum + x, 0)   // 15 (sum)

// Search
arr.includes(3)           // true
arr.indexOf(3)            // 2
arr.some(x => x > 3)      // true (at least one)
arr.every(x => x > 0)     // true (all)

// Others
arr.join(', ')            // "1, 2, 3, 4, 5"
arr.slice(1, 3)           // [2, 3] (copy portion)
arr.sort((a, b) => a - b) // [1,2,3,4,5] (ascending)
[...new Set(arr)]         // Remove duplicates

// ========================================
// OBJECTS
// ========================================

const obj = {
    name: "John",
    age: 30,
    greet() { return `Hi, ${this.name}`; }
};

obj.name                  // "John"
obj['name']               // "John"
Object.keys(obj)          // ["name", "age", "greet"]
Object.values(obj)        // ["John", 30, function]
Object.entries(obj)       // [["name","John"], ...]

// Destructuring
const { name, age } = obj;
const [first, second] = arr;

// Spread & Rest
const copy = { ...obj };
const merged = { ...obj1, ...obj2 };
const arrCopy = [...arr];

// ========================================
// DOM MANIPULATION
// ========================================

// Selection
document.getElementById('id')
document.querySelector('.class')
document.querySelectorAll('.class')

// Content
el.textContent = "Text"
el.innerHTML = "<span>HTML</span>"
el.value = "Input value"

// Attributes
el.getAttribute('data-id')
el.setAttribute('data-id', '123')
el.dataset.id = '123'

// Classes
el.classList.add('active')
el.classList.remove('active')
el.classList.toggle('active')
el.classList.contains('active')

// Style
el.style.color = 'red'
el.style.backgroundColor = 'blue'

// Create & Add
const div = document.createElement('div')
div.textContent = "New element"
parent.appendChild(div)
parent.append(div, 'text', otherEl)
el.remove()

// ========================================
// EVENTS
// ========================================

// Add listener
el.addEventListener('click', (e) => {
    console.log('Clicked!', e);
});

// Common events
'click', 'input', 'change', 'submit',
'keydown', 'keyup', 'focus', 'blur',
'mouseenter', 'mouseleave', 'scroll'

// Event object
e.target                  // Element clicked
e.preventDefault()        // Stop default
e.stopPropagation()       // Stop bubbling
e.key                     // Key pressed
e.clientX, e.clientY      // Mouse position

// Event delegation
parent.addEventListener('click', (e) => {
    if (e.target.matches('.btn')) {
        // Handle
    }
});

// ========================================
// ASYNC JAVASCRIPT
// ========================================

// setTimeout & setInterval
setTimeout(() => console.log('After 1s'), 1000);
const id = setInterval(() => console.log('Every 1s'), 1000);
clearInterval(id);

// Promises
fetch('url')
    .then(r => r.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));

// Async/Await (Preferred!)
async function fetchData() {
    try {
        const response = await fetch('url');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

// ========================================
// LOCAL STORAGE
// ========================================

// Store
localStorage.setItem('key', 'value');
localStorage.setItem('user', JSON.stringify(obj));

// Retrieve
const value = localStorage.getItem('key');
const obj = JSON.parse(localStorage.getItem('user'));

// Remove
localStorage.removeItem('key');
localStorage.clear();

// ========================================
// COMMON PATTERNS
// ========================================

// Check if exists (avoid undefined errors)
if (obj?.property) { }
const value = obj?.property ?? 'default';

// Loop object
Object.entries(obj).forEach(([key, value]) => {
    console.log(key, value);
});

// Debounce (wait for pause)
const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
};

// Random number
Math.random()                              // 0 to 0.999
Math.floor(Math.random() * 10)            // 0 to 9
Math.floor(Math.random() * (max - min + 1)) + min  // min to max

// Format date
new Date().toLocaleDateString()           // "1/15/2026"
new Date().toLocaleTimeString()           // "3:45:30 PM"

// Deep copy
const copy = JSON.parse(JSON.stringify(obj));

// ========================================
// DEBUGGING
// ========================================

console.log('value:', value)
console.table(arrayOfObjects)
console.time('label'); /*...*/ console.timeEnd('label');
debugger;  // Pause execution
```

### Common Mistakes to Avoid
```javascript
// ❌ Wrong
let x = 5;
if (x = 10) { }           // Assignment, not comparison!

// ✅ Correct
if (x === 10) { }         // Use === for comparison

// ❌ Wrong
const arr = [10, 2, 30];
arr.sort();               // [10, 2, 30] - string sort!

// ✅ Correct
arr.sort((a, b) => a - b); // [2, 10, 30]

// ❌ Wrong
setTimeout(function() {
    console.log(this);    // 'this' is window/undefined
}, 1000);

// ✅ Correct
setTimeout(() => {
    console.log(this);    // Arrow function preserves 'this'
}, 1000);

// ❌ Wrong
const user = null;
console.log(user.name);   // TypeError!

// ✅ Correct
console.log(user?.name);  // undefined (no error)

// ❌ Wrong
div.innerHTML = userInput; // XSS vulnerability!

// ✅ Correct
div.textContent = userInput; // Safe, escapes HTML

// ❌ Wrong
for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', handler);
}

// ✅ Correct (Event delegation)
parent.addEventListener('click', (e) => {
    if (e.target.matches('.item')) handler(e);
});
```

---

## 🎯 Project Complexity Guide

| Complexity | HTML | CSS | JavaScript | Projects |
|------------|------|-----|------------|----------|
| **Beginner** | Basic tags, forms | Flexbox, colors | DOM basics, events | Calculator, Todo List, Clock |
| **Intermediate** | Semantic HTML, data attributes | Grid, animations | Arrays, objects, localStorage | Quiz App, Image Slider, Theme Switcher |
| **Advanced** | Dynamic HTML generation | Complex layouts, transitions | Async, API calls, state management | Weather App, Expense Tracker, Memory Game |

---

## 💡 Best Practices Summary

**HTML:**
- ✅ Use semantic elements (`<header>`, `<main>`, `<article>`)
- ✅ Always include `alt` text for images
- ✅ Use proper form labels with `for` attribute
- ✅ Keep HTML structure clean and indented
- ❌ Don't use inline styles or event handlers

**CSS:**
- ✅ Use `box-sizing: border-box` globally
- ✅ Mobile-first approach (start with small screens)
- ✅ Use CSS variables for colors and spacing
- ✅ Prefer classes over IDs for styling
- ✅ Use Flexbox for components, Grid for layouts
- ❌ Don't use `!important` (except for utilities)
- ❌ Avoid deeply nested selectors

**JavaScript:**
- ✅ Use `const` by default, `let` when reassigning
- ✅ Use `===` instead of `==`
- ✅ Always handle errors (try-catch, .catch())
- ✅ Use arrow functions for callbacks
- ✅ Use event delegation for dynamic content
- ✅ Cache DOM queries (don't query repeatedly)
- ✅ Use `async/await` for async operations
- ❌ Don't modify arrays while iterating
- ❌ Don't forget to remove event listeners
- ❌ Never use `innerHTML` with user input

**Performance:**
- ✅ Load CSS in `<head>`, JS before `</body>`
- ✅ Minimize DOM manipulations
- ✅ Debounce/throttle high-frequency events
- ✅ Use event delegation
- ✅ Lazy load images
- ❌ Don't query DOM in loops
- ❌ Don't nest event listeners

**Security:**
- ✅ Validate user input
- ✅ Use `textContent` instead of `innerHTML` for user data
- ✅ Sanitize data from APIs
- ❌ Don't store sensitive data in localStorage
- ❌ Don't trust client-side validation alone

---

Happy Learning! 🚀

**Remember:**
1. **Practice** - Build projects, not just read
2. **Debug** - Errors are learning opportunities
3. **Google** - MDN Web Docs is your friend
4. **Experiment** - Break things and fix them
5. **Be Patient** - Mastery takes time

You've got this! 💪

