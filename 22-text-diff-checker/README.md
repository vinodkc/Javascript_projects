# 🔍 Text Diff Checker

A powerful text comparison tool inspired by [Diffchecker.com](https://www.diffchecker.com/) that highlights differences between two text inputs with advanced algorithms and beautiful visualization.

## 🎯 Learning Objectives

By completing this project, you will:
- Master the Longest Common Subsequence (LCS) algorithm
- Learn advanced string comparison techniques
- Understand diff algorithms (line and character level)
- Implement file upload and reading with FileReader
- Work with HTML export functionality
- Create synchronized scrolling between elements

## 📚 What You'll Learn

### Core Concepts
1. **LCS Algorithm**: Find longest common subsequence
2. **Diff Calculation**: Detect additions, deletions, modifications
3. **Character-Level Diff**: Exact changes within lines
4. **FileReader API**: Read uploaded text files
5. **HTML Export**: Save comparison results
6. **Synchronized Scrolling**: Link scroll of two elements

### Skills Developed
- Dynamic programming (LCS algorithm)
- String comparison algorithms
- File handling with FileReader
- HTML generation and export
- Scroll event synchronization
- Similarity percentage calculation
- Line-by-line and character-by-character comparison

## 🔧 Implementation Explanation

### How It Works

**1. Longest Common Subsequence (LCS)**
```javascript
function lcs(text1, text2) {
  const m = text1.length, n = text2.length
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0))
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i-1] === text2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1])
      }
    }
  }
  return dp[m][n]
}
```

**2. Line-by-Line Diff**
```javascript
lines1 = text1.split('\n')
lines2 = text2.split('\n')

for each line:
  if not in other text: mark as added/removed
  if different: mark as modified
  if same: mark as unchanged
```

**3. Character-Level Diff**
```javascript
For modified lines, compare character by character
Highlight exact differences within the line
```

**4. Similarity Calculation**
```javascript
commonLength = lcs(text1, text2)
totalLength = text1.length + text2.length
similarity = (2 * commonLength / totalLength) * 100
```

**5. File Upload**
```javascript
reader = new FileReader()
reader.onload = (e) => {
  textarea.value = e.target.result
}
reader.readAsText(file)
```

**6. Synchronized Scrolling**
```javascript
leftPane.addEventListener('scroll', () => {
  rightPane.scrollTop = leftPane.scrollTop
})
```

## 📖 Further Learning - W3Schools

- [JavaScript String split()](https://www.w3schools.com/jsref/jsref_split.asp)
- [JavaScript Array Methods](https://www.w3schools.com/js/js_array_methods.asp)
- [JavaScript FileReader](https://www.w3schools.com/jsref/api_filereader.asp)
- [HTML File Upload](https://www.w3schools.com/tags/att_input_type_file.asp)
- [JavaScript Scroll Events](https://www.w3schools.com/jsref/event_onscroll.asp)
- [JavaScript Template Literals](https://www.w3schools.com/js/js_string_templates.asp)

## ✨ Features

### 🎯 Core Functionality
- **Side-by-Side Comparison**: View both texts in parallel with synchronized scrolling
- **Inline Unified View**: See differences in a single unified view
- **Line-by-Line Diff**: Highlights added, removed, and modified lines
- **Character-Level Diff**: Shows exact character changes within modified lines
- **Smart Statistics**: Real-time calculation of changes and similarity percentage

### 🔧 Advanced Options
- **Ignore Case**: Case-insensitive comparison
- **Ignore Whitespace**: Normalize whitespace for cleaner diffs
- **File Upload**: Load text files directly from your computer
- **Clipboard Support**: Paste from clipboard with one click
- **Export Results**: Save comparison as HTML file
- **Copy Diff**: Copy formatted diff to clipboard

### 💾 File Support
Supports common text file formats:
- Plain text (.txt)
- JavaScript (.js)
- HTML (.html)
- CSS (.css)
- JSON (.json)
- Markdown (.md)

## 🎓 Concepts Covered

### HTML Concepts

#### 1. **File Input**
```html
<input type="file" id="fileInput1" accept=".txt,.js,.html,.css,.json,.md">
```
- `type="file"`: Creates file upload input
- `accept`: Limits file types (MIME types or extensions)
- Hidden with CSS, triggered by custom button for better UX

#### 2. **Textarea Element**
```html
<textarea id="text1" class="text-input" placeholder="Enter text..."></textarea>
```
- Multi-line text input for large content
- `resize: none`: Prevents manual resizing (controlled by CSS)
- `rows`/`cols` attributes (we use CSS height instead)

#### 3. **Semantic Structure**
- `<header>`: Page header with logo and title
- `<section>`: Different content sections
- `<footer>`: Footer with attribution
- Proper heading hierarchy (h1, h2, h3)

#### 4. **Data Attributes** (Implicit use)
Could be extended with:
```html
<div class="diff-line" data-line-type="added" data-line-number="42">
```

### CSS Concepts

#### 1. **CSS Grid Layout**

**Input Section Grid:**
```css
.input-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}
```
- `repeat(2, 1fr)`: Two equal-width columns
- `gap`: Space between grid items
- Responsive: Changes to 1 column on mobile

**Features Grid:**
```css
.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}
```
- `auto-fit`: Automatically fits columns
- `minmax(250px, 1fr)`: Min 250px, max equal distribution
- Fully responsive without media queries

#### 2. **Flexbox**

**Toolbar Layout:**
```css
.toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
}
```
- `space-between`: Pushes items to edges
- `flex-wrap`: Wraps on small screens
- `gap`: Modern way to add spacing

**Diff Line Structure:**
```css
.diff-line {
    display: flex;
}

.line-num {
    flex-shrink: 0;  /* Don't shrink */
    width: 50px;
}

.line-content {
    flex: 1;  /* Take remaining space */
}
```

#### 3. **Color-Coded Highlighting**

```css
.diff-line.added { background: #d1fae5; }    /* Light green */
.diff-line.removed { background: #fee2e2; }  /* Light red */
.diff-line.modified { background: #fef3c7; } /* Light yellow */
.diff-line.unchanged { background: white; }

/* Character-level highlighting */
.char-added {
    background: #10b981;  /* Bright green */
    color: white;
}

.char-removed {
    background: #ef4444;  /* Bright red */
    text-decoration: line-through;
}
```

Color Psychology:
- **Green**: Additions (positive, growth)
- **Red**: Deletions (warning, removal)
- **Yellow**: Modifications (caution, change)
- **Gray**: Unchanged (neutral)

#### 4. **Gradient Backgrounds**
```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```
- `135deg`: Diagonal direction
- Modern, visually appealing design

#### 5. **Box Shadow for Depth**
```css
.input-panel {
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.btn-primary:hover {
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}
```
- Creates depth perception
- Hover effects for interactivity

#### 6. **Custom Scrollbar**
```css
.diff-content::-webkit-scrollbar {
    width: 10px;
}

.diff-content::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
}
```
- Webkit-specific styling
- Consistent with design theme

#### 7. **Responsive Design**

Mobile-First Approach:
```css
@media (max-width: 1024px) {
    .input-section {
        grid-template-columns: 1fr;  /* Single column */
    }
}

@media (max-width: 640px) {
    .header h1 {
        font-size: 1.5rem;  /* Smaller text */
    }
}
```

#### 8. **Print Styles**
```css
@media print {
    .header, .toolbar, .footer {
        display: none;  /* Hide UI elements */
    }
}
```

### JavaScript Concepts

#### 1. **File Reading API**

```javascript
function handleFileUpload(event, targetTextarea) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
        targetTextarea.value = e.target.result;
        updateCounts();
    };
    
    reader.onerror = () => {
        showNotification('Error reading file!', 'error');
    };
    
    reader.readAsText(file);
}
```

**Key Points:**
- `FileReader` API: Reads file contents
- `readAsText()`: Reads file as text string
- `onload` event: Fires when reading completes
- `e.target.result`: Contains file content
- Asynchronous operation (non-blocking)

#### 2. **Clipboard API**

**Reading from Clipboard:**
```javascript
async function pasteFromClipboard(targetTextarea) {
    try {
        const text = await navigator.clipboard.readText();
        targetTextarea.value = text;
        showNotification('Text pasted!', 'success');
    } catch (err) {
        showNotification('Failed to paste', 'error');
    }
}
```

**Writing to Clipboard:**
```javascript
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Copied!', 'success');
    } catch (err) {
        showNotification('Failed to copy', 'error');
    }
}
```

**Key Points:**
- Requires HTTPS or localhost
- Async/await for cleaner code
- Permissions may be required
- Try/catch for error handling

#### 3. **Diff Algorithm (Longest Common Subsequence)**

**The Core Algorithm:**
```javascript
function computeDiff(text1, text2) {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    
    const n = lines1.length;
    const m = lines2.length;
    
    // Dynamic Programming table
    const dp = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));
    
    // Build LCS table
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (lines1[i - 1] === lines2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Backtrack to find differences
    // ... (see full implementation)
}
```

**How It Works:**

1. **Split into Lines**: Compare line-by-line
2. **Build DP Table**: Find longest common subsequence
3. **Backtrack**: Identify additions, deletions, modifications

**DP Table Example:**
```
Text1: ["A", "B", "C"]
Text2: ["A", "X", "C"]

    ''  A  X  C
''   0  0  0  0
A    0  1  1  1
B    0  1  1  1
C    0  1  1  2

LCS length = 2 (A and C are common)
```

**Backtracking Logic:**
```javascript
while (i > 0 || j > 0) {
    if (lines1[i-1] === lines2[j-1]) {
        // Lines match - unchanged
        result.unshift({ type: 'unchanged', ... });
        i--; j--;
    } else if (dp[i][j-1] >= dp[i-1][j]) {
        // Added line in text2
        result.unshift({ type: 'added', ... });
        j--;
    } else {
        // Removed line from text1
        result.unshift({ type: 'removed', ... });
        i--;
    }
}
```

#### 4. **Character-Level Diff**

For modified lines, we perform character-level comparison:

```javascript
function computeCharDiff(str1, str2) {
    // Same LCS algorithm, but for characters
    const n = str1.length;
    const m = str2.length;
    const dp = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));
    
    // Build table
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Backtrack to get character differences
    // Returns: { chars1: [...], chars2: [...] }
}
```

**Rendering Character Diffs:**
```javascript
function renderCharDiff(chars) {
    return chars.map(item => {
        if (item.type === 'same') {
            return escapeHtml(item.char);
        } else if (item.type === 'added') {
            return `<span class="char-added">${escapeHtml(item.char)}</span>`;
        } else if (item.type === 'removed') {
            return `<span class="char-removed">${escapeHtml(item.char)}</span>`;
        }
    }).join('');
}
```

#### 5. **Merge Adjacent Changes**

Adjacent additions and deletions are merged as "modifications":

```javascript
function mergeModifications(diff) {
    const merged = [];
    let i = 0;
    
    while (i < diff.length) {
        const current = diff[i];
        
        // Check for removed + added = modified
        if (current.type === 'removed' && 
            i + 1 < diff.length && 
            diff[i + 1].type === 'added') {
            
            merged.push({
                type: 'modified',
                line1: current.line1,
                line2: diff[i + 1].line2,
                charDiff: computeCharDiff(current.line1, diff[i + 1].line2)
            });
            i += 2;
        } else {
            merged.push(current);
            i++;
        }
    }
    
    return merged;
}
```

#### 6. **Text Normalization**

```javascript
function normalizeText(text) {
    let normalized = text;
    
    if (ignoreCase.checked) {
        normalized = normalized.toLowerCase();
    }
    
    if (ignoreWhitespace.checked) {
        normalized = normalized
            .split('\n')
            .map(line => line.trim().replace(/\s+/g, ' '))
            .join('\n');
    }
    
    return normalized;
}
```

**Normalization Options:**
- **Ignore Case**: Convert to lowercase before comparing
- **Ignore Whitespace**: Trim and collapse spaces

#### 7. **DOM Manipulation**

**Creating Diff Lines Dynamically:**
```javascript
diff.forEach((item) => {
    const line = document.createElement('div');
    line.className = 'diff-line';
    
    if (item.type === 'added') {
        line.className += ' added';
        line.innerHTML = `
            <span class="line-num">${lineNum}</span>
            <span class="line-content">${escapeHtml(item.line)}</span>
        `;
    }
    
    diffContainer.appendChild(line);
});
```

#### 8. **Statistics Calculation**

```javascript
function calculateStats(diff) {
    const stats = {
        added: 0,
        removed: 0,
        modified: 0,
        unchanged: 0
    };
    
    diff.forEach(item => {
        stats[item.type]++;
    });
    
    // Similarity percentage
    const total = stats.added + stats.removed + stats.modified + stats.unchanged;
    const similarity = total > 0 ? Math.round((stats.unchanged / total) * 100) : 0;
    
    stats.similarity = similarity;
    return stats;
}
```

**Similarity Formula:**
```
Similarity = (Unchanged Lines / Total Lines) × 100
```

#### 9. **Export Functionality**

**Creating Blob and Download:**
```javascript
function exportResults() {
    const html = generateExportHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `text-diff-${Date.now()}.html`;
    a.click();
    
    URL.revokeObjectURL(url);  // Clean up
}
```

**Key Points:**
- `Blob`: Binary Large Object for file data
- `URL.createObjectURL()`: Creates downloadable URL
- `URL.revokeObjectURL()`: Prevents memory leaks
- Programmatic `<a>` click triggers download

#### 10. **Notification System**

```javascript
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const container = document.getElementById('notifications');
    container.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
```

**Features:**
- Fixed position (top-right)
- Stacking notifications
- Auto-dismiss with animation
- Different types (success, error, warning, info)

#### 11. **Keyboard Shortcuts**

```javascript
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to compare
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        compareBtn.click();
    }
    
    // Ctrl/Cmd + K to clear
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        clearBtn.click();
    }
});
```

**Key Detection:**
- `e.ctrlKey`: Ctrl key (Windows/Linux)
- `e.metaKey`: Cmd key (Mac)
- `e.key`: The actual key pressed
- `e.preventDefault()`: Stop default browser action

#### 12. **HTML Escaping**

**Security: Prevent XSS attacks**
```javascript
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

**Why?**
- User input may contain `<script>` tags
- Setting `textContent` treats everything as text
- Reading `innerHTML` gets escaped HTML

**Example:**
```javascript
escapeHtml('<script>alert("XSS")</script>')
// Returns: '&lt;script&gt;alert("XSS")&lt;/script&gt;'
```

## 🧮 Algorithm Deep Dive

### Longest Common Subsequence (LCS)

**What is LCS?**
The longest subsequence common to both sequences. Unlike substring, subsequence doesn't need to be contiguous.

**Example:**
```
String 1: "ABCDGH"
String 2: "AEDFHR"

LCS: "ADH" (length 3)
```

**Why Use LCS for Diff?**
- Common lines are unchanged
- Lines only in Text1 are removed
- Lines only in Text2 are added
- Optimal alignment of texts

**Time Complexity:**
- Building DP table: O(n × m)
- Backtracking: O(n + m)
- Overall: **O(n × m)** where n and m are line/char counts

**Space Complexity:**
- DP table: **O(n × m)**
- Can be optimized to O(min(n, m)) if only length needed

### Myers Diff Algorithm (Advanced)

The industry-standard diff algorithm (used by Git):

**Key Differences from Our Implementation:**
1. **Edit Graph**: Visualizes all possible edits
2. **Greedy Approach**: Finds shortest edit script
3. **O(ND) Complexity**: More efficient for similar texts

**Our Simplified Version:**
- Uses dynamic programming (easier to understand)
- Good for learning and small/medium texts
- Real-world tools use Myers for better performance

## 📊 Complexity Analysis

### Operations

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Line split | O(n) | O(n) |
| LCS computation | O(n × m) | O(n × m) |
| Backtracking | O(n + m) | O(n + m) |
| Char diff (per line) | O(p × q) | O(p × q) |
| Rendering | O(n) | O(n) |

### Example Performance

**Typical Usage:**
- 100 lines, average 50 chars per line
- Line comparison: 100 × 100 = 10,000 operations
- Char comparison for modified lines: ~50 × 50 = 2,500 ops each
- Total: Very fast (<50ms on modern hardware)

**Large Files:**
- 10,000 lines: 100 million operations
- May take 1-2 seconds
- Could be optimized with:
  - Line hashing
  - Early termination
  - Windowed comparison

## 🎯 Learning Outcomes

After studying this project, you'll understand:

### Algorithms
✅ **Longest Common Subsequence (LCS)**
✅ **Dynamic Programming**
✅ **Backtracking**
✅ **String comparison algorithms**

### JavaScript APIs
✅ **FileReader API** for file handling
✅ **Clipboard API** for copy/paste
✅ **Blob and URL APIs** for downloads
✅ **DOM manipulation** for dynamic content

### UI/UX Patterns
✅ **Side-by-side comparison** layout
✅ **Syntax highlighting** for diffs
✅ **Responsive design** for all devices
✅ **Notification system**
✅ **Export functionality**

### Code Quality
✅ **Error handling** with try/catch
✅ **HTML escaping** for security
✅ **Modular functions** for maintainability
✅ **Comments** for documentation

## 🚀 Usage

### Basic Comparison

1. **Enter Text**: Type or paste text in both panels
2. **Click Compare**: Press "Find Difference" button
3. **View Results**: See highlighted differences

### File Upload

1. Click 📁 button in panel header
2. Select a text file
3. File content loads automatically

### Options

- **Ignore Case**: Makes comparison case-insensitive
- **Ignore Whitespace**: Normalizes spaces and indentation
- **Inline View**: Toggle between side-by-side and unified view

### Export

- **Export Results**: Downloads comparison as HTML file
- **Copy Diff**: Copies formatted diff to clipboard
- **Print**: Use browser print (Ctrl+P) for clean output

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Enter` | Compare texts |
| `Ctrl+K` | Clear all |
| `Ctrl+V` | Paste in focused textarea |

## 🔧 Code Organization

```
script.js (800+ lines)
├── DOM Elements (50 lines)
├── Event Listeners (100 lines)
├── File Handling (80 lines)
├── Diff Algorithm (200 lines)
│   ├── Line comparison (LCS)
│   ├── Character comparison
│   └── Merge modifications
├── Rendering (150 lines)
│   ├── Side-by-side view
│   ├── Inline view
│   └── Character highlighting
├── Statistics (50 lines)
├── Export (100 lines)
└── Utilities (70 lines)
```

## 🎨 Design Patterns Used

### 1. **Separation of Concerns**
- HTML: Structure
- CSS: Presentation
- JavaScript: Behavior

### 2. **Single Responsibility**
Each function does one thing:
- `computeDiff()`: Only computes diff
- `renderDiff()`: Only renders
- `calculateStats()`: Only calculates stats

### 3. **DRY (Don't Repeat Yourself)**
```javascript
// Reusable notification function
showNotification(message, type);

// Reusable file upload handler
handleFileUpload(event, targetTextarea);
```

### 4. **Progressive Enhancement**
- Works without JavaScript (textareas still functional)
- Graceful degradation for older browsers
- Clipboard API with fallback message

## 🐛 Edge Cases Handled

✅ **Empty texts**: Shows appropriate message
✅ **Very long lines**: Wraps properly with CSS
✅ **Special characters**: HTML-escaped for security
✅ **Large files**: Scrollable containers
✅ **Mobile devices**: Responsive layout
✅ **No clipboard permissions**: Error message with fallback
✅ **Unsupported file types**: File input restricts types

## 🔒 Security Considerations

### XSS Prevention
```javascript
// ALWAYS escape user input before rendering
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

### File Upload Safety
- Only client-side reading (no server upload)
- Files never leave user's browser
- Restricted file types via `accept` attribute

## 💡 Possible Enhancements

### Features
1. **Syntax highlighting** for code files
2. **Word-level diff** (in addition to char-level)
3. **Save/load comparisons** (localStorage)
4. **Diff history** with undo/redo
5. **Three-way merge** for resolving conflicts
6. **Binary file comparison** (hex view)
7. **Folder comparison**

### Performance
1. **Virtual scrolling** for huge files
2. **Web Workers** for async diff computation
3. **Line hashing** for faster comparison
4. **Memoization** for repeated comparisons

### UI/UX
1. **Dark mode** toggle
2. **Custom themes**
3. **Diff sharing** via URL
4. **Collaborative editing**

## 📚 Further Reading

### Algorithms
- [Myers Diff Algorithm](http://www.xmailserver.org/diff2.pdf) (Original paper)
- [Understanding Diff](https://neil.fraser.name/writing/diff/)
- [Dynamic Programming](https://www.geeksforgeeks.org/dynamic-programming/)

### APIs
- [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
- [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- [Blob API](https://developer.mozilla.org/en-US/docs/Web/API/Blob)

### Tools
- [Git Diff](https://git-scm.com/docs/git-diff)
- [jsdiff library](https://github.com/kpdecker/jsdiff)
- [diff-match-patch](https://github.com/google/diff-match-patch)

## 🎓 Practice Exercises

1. **Add Word-Level Diff**: Implement word-by-word comparison
2. **Add Syntax Highlighting**: Use a library like Prism.js
3. **Add Undo/Redo**: Implement history stack
4. **Optimize for Large Files**: Add virtual scrolling
5. **Add URL Sharing**: Compress and encode in URL

## 🏆 Challenge: Improve the Algorithm

Try implementing the **Myers Diff Algorithm** for better performance:

```javascript
// Pseudo-code for Myers algorithm
function myersDiff(text1, text2) {
    // 1. Build edit graph
    // 2. Find shortest edit path
    // 3. Extract edit script
    // 4. Return diff
}
```

Hint: It's based on finding the shortest edit script using a greedy approach!

---

**Built with ❤️ for learning advanced JavaScript, algorithms, and web development**

*Inspired by [Diffchecker.com](https://www.diffchecker.com/)*

