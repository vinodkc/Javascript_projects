# Word & Character Counter

A comprehensive text analyzer that counts words, characters, sentences, and provides detailed statistics about your text.

## 🎯 Learning Objectives

By completing this project, you will:
- Master advanced string manipulation and regex patterns
- Learn to calculate text metrics and reading time
- Understand the File API for downloading content
- Work with the Clipboard API
- Implement real-time text analysis
- Create practical text utility tools

## 📚 What You'll Learn

### Core Concepts
1. **Text Analysis**: Counting words, sentences, paragraphs using regex
2. **Regular Expressions**: Complex patterns for splitting text
3. **File API**: Creating and downloading text files programmatically
4. **Reading Time Calculation**: Estimating based on word count
5. **Character Limits**: Enforcing and validating text length
6. **Real-Time Updates**: Instant statistics as user types

### Skills Developed
- Advanced regex patterns (`/\s+/`, `/[.!?]+/`, `/\n\n+/`)
- String methods (`split()`, `replace()`, `trim()`, `substring()`)
- Blob creation and URL object management
- Array filtering and reducing for calculations
- Average and mathematical computations
- Dynamic limit enforcement
- Text transformation (uppercase, lowercase)

## 🔧 Implementation Explanation

### How It Works

**1. Word Counting**
```javascript
words = text.trim().split(/\s+/).filter(w => w !== '')
```
- Trim whitespace
- Split by any whitespace (spaces, tabs, newlines)
- Filter empty strings

**2. Sentence Counting**
```javascript
sentences = text.split(/[.!?]+/).filter(s => s.trim() !== '')
```
- Split by punctuation marks (., !, ?)
- Filter empty results

**3. Paragraph Counting**
```javascript
paragraphs = text.split(/\n\n+/).filter(p => p.trim() !== '')
```
- Split by double newlines (paragraph breaks)
- Filter empty paragraphs

**4. Characters Without Spaces**
```javascript
noSpaces = text.replace(/\s/g, '')
```
- Remove all whitespace globally

**5. Reading Time Estimation**
```
readingTime = Math.ceil(wordCount / 200)
speakingTime = Math.ceil(wordCount / 130)
```
- Average reading: 200 words/minute
- Average speaking: 130 words/minute

**6. Download Functionality**
```javascript
blob = new Blob([text], { type: 'text/plain' })
url = URL.createObjectURL(blob)
link.download = 'text.txt'
```
- Create Blob from text
- Generate download URL
- Trigger download

## Features

- ✅ **Real-time counting** as you type
- ✅ **Multiple metrics**:
  - Total characters
  - Characters without spaces
  - Word count
  - Sentence count
  - Paragraph count
  - Line count
  - Reading time estimate
  - Speaking time estimate
- ✅ **Character limits** (Twitter, custom limits)
- ✅ **Limit enforcement** with visual warning
- ✅ **Detailed analysis**:
  - Average word length
  - Longest word
  - Speaking time calculation
- ✅ **Text manipulation**:
  - Copy to clipboard
  - Download as .txt file
  - Convert to uppercase
  - Convert to lowercase
  - Clear all text
- ✅ **Responsive design**
- ✅ **Visual statistics cards**

## 📖 Further Learning - W3Schools

- [JavaScript String split()](https://www.w3schools.com/jsref/jsref_split.asp)
- [JavaScript String replace()](https://www.w3schools.com/jsref/jsref_replace.asp)
- [JavaScript Regular Expressions](https://www.w3schools.com/js/js_regexp.asp)
- [JavaScript Array Filter](https://www.w3schools.com/jsref/jsref_filter.asp)
- [JavaScript Math.ceil()](https://www.w3schools.com/jsref/jsref_ceil.asp)
- [JavaScript Blob](https://www.w3schools.com/jsref/obj_blob.asp)
- [HTML Textarea](https://www.w3schools.com/tags/tag_textarea.asp)

## How to Use

1. Open `index.html` in your browser
2. Type or paste text into the textarea
3. View real-time statistics updating
4. Optional: Set a character limit from dropdown
5. Use action buttons to manipulate text:
   - **Clear**: Remove all text
   - **Copy**: Copy text to clipboard
   - **Download**: Save as text file
   - **Uppercase/Lowercase**: Convert case

## Learning Points

### JavaScript Concepts
- **String methods**:
  - `length` - Get string length
  - `trim()` - Remove whitespace
  - `split()` - Split into array
  - `replace()` - Replace characters with regex
  - `substring()` - Extract part of string
  - `toUpperCase()` / `toLowerCase()` - Case conversion
- **Regular expressions**:
  - `/\s+/` - Match whitespace
  - `/\s/g` - Match all spaces
  - `/[.!?]+/` - Match sentence endings
  - `/\n\n+/` - Match paragraph breaks
- **Array methods**:
  - `filter()` - Filter out empty strings
  - `reduce()` - Sum values
- **Mathematical operations**:
  - `Math.ceil()` - Round up
  - Average calculation
- **File API**:
  - `Blob` - Create file blob
  - `URL.createObjectURL()` - Create download URL
  - `URL.revokeObjectURL()` - Clean up URL
- **Clipboard API**: Copy text to clipboard
- **Event handling**: Input events for real-time updates

### Word/Character Counting Logic

```javascript
// Word count
const words = text.trim().split(/\s+/);

// Sentences
const sentences = text.split(/[.!?]+/).filter(s => s.trim() !== '');

// Paragraphs
const paragraphs = text.split(/\n\n+/).filter(p => p.trim() !== '');

// Characters without spaces
const noSpaces = text.replace(/\s/g, '');
```

### Reading Time Calculation
- **Reading speed**: 200 words per minute (average)
- **Speaking speed**: 130 words per minute (slow, clear speech)
- Formula: `Math.ceil(wordCount / wordsPerMinute)`

## Character Limits

Preset limits for common platforms:
- **140**: Original Twitter limit
- **280**: Extended Twitter limit
- **500/1000/2000**: General content limits
- **No Limit**: Unlimited text

## Statistics Explained

- **Characters**: Total character count including spaces
- **Without Spaces**: Characters excluding whitespace
- **Words**: Count of words separated by spaces
- **Sentences**: Count based on punctuation (. ! ?)
- **Paragraphs**: Count of text blocks separated by blank lines
- **Lines**: Count of line breaks
- **Min Read**: Estimated reading time at 200 wpm
- **Speaking Time**: Estimated speaking time at 130 wpm
- **Average Word Length**: Mean length of all words
- **Longest Word**: The word with most characters

## Future Enhancement Ideas

- Word frequency analysis
- Most common words
- Readability score (Flesch-Kincaid)
- Keyword density calculator
- Spell checker
- Grammar checker
- Synonym suggester
- Text formatting options
- Multiple language support
- Export to PDF/DOCX
- Text comparison tool
- Plagiarism checker integration

