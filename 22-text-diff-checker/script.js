// ========================================
// DOM ELEMENTS
// ========================================

// Input elements
const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const compareBtn = document.getElementById('compareBtn');
const clearBtn = document.getElementById('clearBtn');
const swapBtn = document.getElementById('swapBtn');

// Options
const ignoreCase = document.getElementById('ignoreCase');
const ignoreWhitespace = document.getElementById('ignoreWhitespace');
const showInlineView = document.getElementById('showInlineView');

// File upload
const uploadFile1 = document.getElementById('uploadFile1');
const uploadFile2 = document.getElementById('uploadFile2');
const fileInput1 = document.getElementById('fileInput1');
const fileInput2 = document.getElementById('fileInput2');

// Paste buttons
const pasteBtn1 = document.getElementById('pasteBtn1');
const pasteBtn2 = document.getElementById('pasteBtn2');

// Clear buttons
const clearText1 = document.getElementById('clearText1');
const clearText2 = document.getElementById('clearText2');

// Character counts
const count1 = document.getElementById('count1');
const count2 = document.getElementById('count2');
const lines1 = document.getElementById('lines1');
const lines2 = document.getElementById('lines2');

// Sections
const inputSection = document.getElementById('inputSection');
const resultsSection = document.getElementById('resultsSection');

// Results
const diff1 = document.getElementById('diff1');
const diff2 = document.getElementById('diff2');
const inlineDiff = document.getElementById('inlineDiff');
const sideBySideView = document.getElementById('sideBySideView');
const inlineView = document.getElementById('inlineView');

// Statistics
const addedCount = document.getElementById('addedCount');
const removedCount = document.getElementById('removedCount');
const modifiedCount = document.getElementById('modifiedCount');
const unchangedCount = document.getElementById('unchangedCount');
const similarityScore = document.getElementById('similarityScore');

// Action buttons
const exportBtn = document.getElementById('exportBtn');
const copyDiffBtn = document.getElementById('copyDiffBtn');
const backToEditBtn = document.getElementById('backToEditBtn');

// ========================================
// STATE
// ========================================

let currentDiff = null;
let currentStats = null;

// ========================================
// CHARACTER COUNTING
// ========================================

function updateCounts() {
    const text1Value = text1.value;
    const text2Value = text2.value;
    
    count1.textContent = text1Value.length;
    count2.textContent = text2Value.length;
    
    lines1.textContent = text1Value ? text1Value.split('\n').length : 0;
    lines2.textContent = text2Value ? text2Value.split('\n').length : 0;
}

text1.addEventListener('input', updateCounts);
text2.addEventListener('input', updateCounts);

// ========================================
// FILE UPLOAD
// ========================================

uploadFile1.addEventListener('click', () => fileInput1.click());
uploadFile2.addEventListener('click', () => fileInput2.click());

fileInput1.addEventListener('change', (e) => handleFileUpload(e, text1));
fileInput2.addEventListener('change', (e) => handleFileUpload(e, text2));

function handleFileUpload(event, targetTextarea) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        targetTextarea.value = e.target.result;
        updateCounts();
        showNotification(`File "${file.name}" loaded successfully!`, 'success');
    };
    reader.onerror = () => {
        showNotification('Error reading file!', 'error');
    };
    reader.readAsText(file);
}

// ========================================
// PASTE FROM CLIPBOARD
// ========================================

pasteBtn1.addEventListener('click', () => pasteFromClipboard(text1));
pasteBtn2.addEventListener('click', () => pasteFromClipboard(text2));

async function pasteFromClipboard(targetTextarea) {
    try {
        const text = await navigator.clipboard.readText();
        targetTextarea.value = text;
        updateCounts();
        showNotification('Text pasted from clipboard!', 'success');
    } catch (err) {
        showNotification('Failed to paste from clipboard. Please paste manually (Ctrl+V)', 'error');
    }
}

// ========================================
// CLEAR BUTTONS
// ========================================

clearText1.addEventListener('click', () => {
    text1.value = '';
    updateCounts();
});

clearText2.addEventListener('click', () => {
    text2.value = '';
    updateCounts();
});

clearBtn.addEventListener('click', () => {
    text1.value = '';
    text2.value = '';
    updateCounts();
    inputSection.style.display = 'grid';
    resultsSection.style.display = 'none';
    showNotification('All text cleared!', 'info');
});

// ========================================
// SWAP TEXTS
// ========================================

swapBtn.addEventListener('click', () => {
    const temp = text1.value;
    text1.value = text2.value;
    text2.value = temp;
    updateCounts();
    showNotification('Texts swapped!', 'info');
});

// ========================================
// TOGGLE VIEW
// ========================================

showInlineView.addEventListener('change', () => {
    if (showInlineView.checked) {
        sideBySideView.style.display = 'none';
        inlineView.style.display = 'block';
    } else {
        sideBySideView.style.display = 'grid';
        inlineView.style.display = 'none';
    }
});

// ========================================
// TEXT NORMALIZATION
// ========================================

function normalizeText(text) {
    let normalized = text;
    
    if (ignoreCase.checked) {
        normalized = normalized.toLowerCase();
    }
    
    if (ignoreWhitespace.checked) {
        // Normalize whitespace: trim lines and reduce multiple spaces
        normalized = normalized
            .split('\n')
            .map(line => line.trim().replace(/\s+/g, ' '))
            .join('\n');
    }
    
    return normalized;
}

// ========================================
// DIFF ALGORITHM (Myers Diff)
// ========================================

function computeDiff(text1, text2) {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    
    const diff = [];
    const n = lines1.length;
    const m = lines2.length;
    
    // Dynamic programming approach (LCS - Longest Common Subsequence)
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
    
    // Backtrack to find diff
    let i = n, j = m;
    const result = [];
    
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && lines1[i - 1] === lines2[j - 1]) {
            result.unshift({
                type: 'unchanged',
                line1: lines1[i - 1],
                line2: lines2[j - 1],
                lineNum1: i - 1,
                lineNum2: j - 1
            });
            i--;
            j--;
        } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            result.unshift({
                type: 'added',
                line2: lines2[j - 1],
                lineNum2: j - 1
            });
            j--;
        } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
            result.unshift({
                type: 'removed',
                line1: lines1[i - 1],
                lineNum1: i - 1
            });
            i--;
        }
    }
    
    // Merge adjacent changes as modified
    return mergeModifications(result);
}

function mergeModifications(diff) {
    const merged = [];
    let i = 0;
    
    while (i < diff.length) {
        const current = diff[i];
        
        // Check if we have adjacent removed and added lines
        if (current.type === 'removed' && 
            i + 1 < diff.length && 
            diff[i + 1].type === 'added') {
            
            // Treat as modification
            merged.push({
                type: 'modified',
                line1: current.line1,
                line2: diff[i + 1].line2,
                lineNum1: current.lineNum1,
                lineNum2: diff[i + 1].lineNum2,
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

// ========================================
// CHARACTER-LEVEL DIFF
// ========================================

function computeCharDiff(str1, str2) {
    const n = str1.length;
    const m = str2.length;
    const dp = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Backtrack
    let i = n, j = m;
    const result1 = [];
    const result2 = [];
    
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && str1[i - 1] === str2[j - 1]) {
            result1.unshift({ type: 'same', char: str1[i - 1] });
            result2.unshift({ type: 'same', char: str2[j - 1] });
            i--;
            j--;
        } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            result2.unshift({ type: 'added', char: str2[j - 1] });
            j--;
        } else if (i > 0) {
            result1.unshift({ type: 'removed', char: str1[i - 1] });
            i--;
        }
    }
    
    return { chars1: result1, chars2: result2 };
}

// ========================================
// RENDER DIFF
// ========================================

function renderDiff(diff) {
    // Clear previous results
    diff1.innerHTML = '';
    diff2.innerHTML = '';
    inlineDiff.innerHTML = '';
    
    let lineNum1 = 1;
    let lineNum2 = 1;
    
    diff.forEach((item, index) => {
        // Side-by-side view
        const line1 = document.createElement('div');
        const line2 = document.createElement('div');
        line1.className = 'diff-line';
        line2.className = 'diff-line';
        
        // Inline view
        const inlineLine = document.createElement('div');
        inlineLine.className = 'diff-line';
        
        if (item.type === 'unchanged') {
            line1.className += ' unchanged';
            line2.className += ' unchanged';
            line1.innerHTML = `<span class="line-num">${lineNum1}</span><span class="line-content">${escapeHtml(item.line1)}</span>`;
            line2.innerHTML = `<span class="line-num">${lineNum2}</span><span class="line-content">${escapeHtml(item.line2)}</span>`;
            
            inlineLine.className += ' unchanged';
            inlineLine.innerHTML = `<span class="line-num">${lineNum1}</span><span class="line-content">${escapeHtml(item.line1)}</span>`;
            
            lineNum1++;
            lineNum2++;
        } else if (item.type === 'added') {
            line1.className += ' empty';
            line2.className += ' added';
            line1.innerHTML = `<span class="line-num"></span><span class="line-content"></span>`;
            line2.innerHTML = `<span class="line-num">${lineNum2}</span><span class="line-content">${escapeHtml(item.line2)}</span>`;
            
            inlineLine.className += ' added';
            inlineLine.innerHTML = `<span class="line-num">+</span><span class="line-content">${escapeHtml(item.line2)}</span>`;
            
            lineNum2++;
        } else if (item.type === 'removed') {
            line1.className += ' removed';
            line2.className += ' empty';
            line1.innerHTML = `<span class="line-num">${lineNum1}</span><span class="line-content">${escapeHtml(item.line1)}</span>`;
            line2.innerHTML = `<span class="line-num"></span><span class="line-content"></span>`;
            
            inlineLine.className += ' removed';
            inlineLine.innerHTML = `<span class="line-num">-</span><span class="line-content">${escapeHtml(item.line1)}</span>`;
            
            lineNum1++;
        } else if (item.type === 'modified') {
            line1.className += ' modified';
            line2.className += ' modified';
            
            // Render with character-level diff
            line1.innerHTML = `<span class="line-num">${lineNum1}</span><span class="line-content">${renderCharDiff(item.charDiff.chars1)}</span>`;
            line2.innerHTML = `<span class="line-num">${lineNum2}</span><span class="line-content">${renderCharDiff(item.charDiff.chars2)}</span>`;
            
            inlineLine.className += ' modified';
            inlineLine.innerHTML = `<span class="line-num">~</span><span class="line-content">
                <div>${renderCharDiff(item.charDiff.chars1)}</div>
                <div>${renderCharDiff(item.charDiff.chars2)}</div>
            </span>`;
            
            lineNum1++;
            lineNum2++;
        }
        
        diff1.appendChild(line1);
        diff2.appendChild(line2);
        inlineDiff.appendChild(inlineLine);
    });
}

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

// ========================================
// CALCULATE STATISTICS
// ========================================

function calculateStats(diff) {
    const stats = {
        added: 0,
        removed: 0,
        modified: 0,
        unchanged: 0
    };
    
    diff.forEach(item => {
        if (item.type === 'unchanged') stats.unchanged++;
        else if (item.type === 'added') stats.added++;
        else if (item.type === 'removed') stats.removed++;
        else if (item.type === 'modified') stats.modified++;
    });
    
    // Calculate similarity percentage
    const total = stats.added + stats.removed + stats.modified + stats.unchanged;
    const similarity = total > 0 ? Math.round((stats.unchanged / total) * 100) : 0;
    
    stats.similarity = similarity;
    return stats;
}

function displayStats(stats) {
    addedCount.textContent = stats.added;
    removedCount.textContent = stats.removed;
    modifiedCount.textContent = stats.modified;
    unchangedCount.textContent = stats.unchanged;
    similarityScore.textContent = `${stats.similarity}%`;
}

// ========================================
// COMPARE TEXTS
// ========================================

compareBtn.addEventListener('click', () => {
    const text1Value = text1.value;
    const text2Value = text2.value;
    
    if (!text1Value && !text2Value) {
        showNotification('Please enter text in both panels!', 'warning');
        return;
    }
    
    if (!text1Value) {
        showNotification('Please enter original text!', 'warning');
        return;
    }
    
    if (!text2Value) {
        showNotification('Please enter changed text!', 'warning');
        return;
    }
    
    // Normalize texts
    const normalized1 = normalizeText(text1Value);
    const normalized2 = normalizeText(text2Value);
    
    // Compute diff
    currentDiff = computeDiff(normalized1, normalized2);
    currentStats = calculateStats(currentDiff);
    
    // Render results
    renderDiff(currentDiff);
    displayStats(currentStats);
    
    // Show results
    inputSection.style.display = 'none';
    resultsSection.style.display = 'block';
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
    
    showNotification('Comparison complete!', 'success');
});

// ========================================
// BACK TO EDIT
// ========================================

backToEditBtn.addEventListener('click', () => {
    inputSection.style.display = 'grid';
    resultsSection.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================================
// EXPORT RESULTS
// ========================================

exportBtn.addEventListener('click', () => {
    if (!currentDiff) return;
    
    const html = generateExportHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `text-diff-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Results exported!', 'success');
});

function generateExportHTML() {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Text Diff Results</title>
    <style>
        body { font-family: monospace; padding: 20px; }
        .stats { margin-bottom: 20px; padding: 10px; background: #f0f0f0; }
        .diff-line { display: flex; }
        .line-num { width: 50px; padding: 2px 10px; background: #f9f9f9; }
        .line-content { padding: 2px 10px; flex: 1; }
        .added { background: #d4edda; }
        .removed { background: #f8d7da; }
        .modified { background: #fff3cd; }
        .char-added { background: #28a745; color: white; }
        .char-removed { background: #dc3545; color: white; text-decoration: line-through; }
    </style>
</head>
<body>
    <h1>Text Diff Results</h1>
    <div class="stats">
        <p><strong>Added:</strong> ${currentStats.added} lines</p>
        <p><strong>Removed:</strong> ${currentStats.removed} lines</p>
        <p><strong>Modified:</strong> ${currentStats.modified} lines</p>
        <p><strong>Unchanged:</strong> ${currentStats.unchanged} lines</p>
        <p><strong>Similarity:</strong> ${currentStats.similarity}%</p>
    </div>
    <div>${diff1.innerHTML}</div>
    <p><em>Generated by Text Diff Checker</em></p>
</body>
</html>`;
}

// ========================================
// COPY DIFF
// ========================================

copyDiffBtn.addEventListener('click', async () => {
    if (!currentDiff) return;
    
    const text = generateDiffText();
    
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Diff copied to clipboard!', 'success');
    } catch (err) {
        showNotification('Failed to copy to clipboard', 'error');
    }
});

function generateDiffText() {
    let text = `TEXT DIFF RESULTS\n${'='.repeat(50)}\n\n`;
    text += `Statistics:\n`;
    text += `- Added: ${currentStats.added} lines\n`;
    text += `- Removed: ${currentStats.removed} lines\n`;
    text += `- Modified: ${currentStats.modified} lines\n`;
    text += `- Unchanged: ${currentStats.unchanged} lines\n`;
    text += `- Similarity: ${currentStats.similarity}%\n\n`;
    text += `${'='.repeat(50)}\n\n`;
    
    currentDiff.forEach(item => {
        if (item.type === 'unchanged') {
            text += `  ${item.line1}\n`;
        } else if (item.type === 'added') {
            text += `+ ${item.line2}\n`;
        } else if (item.type === 'removed') {
            text += `- ${item.line1}\n`;
        } else if (item.type === 'modified') {
            text += `- ${item.line1}\n`;
            text += `+ ${item.line2}\n`;
        }
    });
    
    return text;
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const container = document.getElementById('notifications');
    container.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

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

// ========================================
// INITIALIZATION
// ========================================

// Add example texts (optional)
if (!text1.value && !text2.value) {
    // Could add example texts here for demo purposes
}

// Update initial counts
updateCounts();

console.log('Text Diff Checker loaded successfully! 🎉');
console.log('Keyboard shortcuts:');
console.log('- Ctrl/Cmd + Enter: Compare texts');
console.log('- Ctrl/Cmd + K: Clear all');

