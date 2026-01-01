/**
 * ==============================================
 * QUOTE GENERATOR - Learning Documentation
 * ==============================================
 * 
 * CONCEPTS COVERED:
 * - Array filtering: filter() method
 * - Random selection: Math.random() with arrays
 * - LocalStorage: Persistent favorites
 * - Array methods: findIndex(), splice(), push(), some()
 * - URL encoding: encodeURIComponent()
 * - window.open(): Opening new browser tabs
 * - Star rating system: Visual feedback
 * - Tab interface: Multiple content sections
 * - Social sharing: Twitter Web Intent API
 * 
 * KEY LEARNING POINTS:
 * 1. Random item selection from filtered arrays
 * 2. Persistent data with localStorage
 * 3. Finding and removing array items
 * 4. Social media integration
 * 5. Category-based filtering
 */

// ==============================================
// DOM ELEMENTS
// ==============================================

// Tab system
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Quote elements
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const copyQuoteBtn = document.getElementById('copyQuoteBtn');
const tweetQuoteBtn = document.getElementById('tweetQuoteBtn');
const favoriteQuoteBtn = document.getElementById('favoriteQuoteBtn');
const quoteCategorySelect = document.getElementById('quoteCategory');
const favoriteQuotesList = document.getElementById('favoriteQuotes');

// Joke elements
const jokeText = document.getElementById('jokeText');
const newJokeBtn = document.getElementById('newJokeBtn');
const copyJokeBtn = document.getElementById('copyJokeBtn');
const tweetJokeBtn = document.getElementById('tweetJokeBtn');
const stars = document.querySelectorAll('.star');

// ==============================================
// DATA ARRAYS
// ==============================================

/**
 * Quotes array with categories
 * LEARNING: Array of objects with multiple properties
 */
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "motivation" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "life" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "motivation" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", category: "wisdom" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "success" },
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde", category: "life" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "motivation" },
    { text: "In the end, we only regret the chances we didn't take.", author: "Lewis Carroll", category: "life" },
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau", category: "success" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "motivation" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", category: "wisdom" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs", category: "life" },
    { text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington", category: "wisdom" },
    { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison", category: "success" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "motivation" }
];

/**
 * Jokes array (simple strings)
 * LEARNING: Simple array of strings
 */
const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Why did the scarecrow win an award? He was outstanding in his field!",
    "Why don't eggs tell jokes? They'd crack each other up!",
    "What do you call a bear with no teeth? A gummy bear!",
    "Why did the bicycle fall over? Because it was two tired!",
    "What do you call a fake noodle? An impasta!",
    "Why did the coffee file a police report? It got mugged!",
    "What's the best thing about Switzerland? I don't know, but the flag is a big plus!",
    "Why do programmers prefer dark mode? Because light attracts bugs!",
    "What did one wall say to the other? I'll meet you at the corner!",
    "Why don't skeletons fight each other? They don't have the guts!",
    "What do you call a dinosaur that crashes his car? Tyrannosaurus Wrecks!",
    "Why did the math book look so sad? Because it had too many problems!",
    "What do you call a can opener that doesn't work? A can't opener!",
    "Why did the cookie go to the doctor? Because it felt crumbly!"
];

// ==============================================
// STATE VARIABLES
// ==============================================

/**
 * currentQuote: Stores currently displayed quote
 * LEARNING: Needed for favorite/copy/tweet operations
 */
let currentQuote = null;

/**
 * favoriteQuotes: Array of saved favorite quotes
 * LEARNING: Load from localStorage or initialize as empty array
 * || operator provides default value if localStorage is empty
 */
let favoriteQuotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];

// ==============================================
// TAB SYSTEM
// ==============================================

/**
 * Tab switching between Quotes, Jokes, and Favorites
 */
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        tabContents.forEach(content => {
            if (content.id === targetTab) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    });
});

// ==============================================
// QUOTE FUNCTIONS
// ==============================================

/**
 * Gets random quote, filtered by category if selected
 * LEARNING: Array filtering and random selection
 * 
 * Steps:
 * 1. Get selected category
 * 2. Filter quotes by category (if not 'all')
 * 3. Pick random quote from filtered array
 * 4. Display quote
 * 5. Update favorite button state
 */
function getRandomQuote() {
    const category = quoteCategorySelect.value;
    let filteredQuotes = quotes;
    
    // Filter by category if not 'all'
    if (category !== 'all') {
        // LEARNING: filter() creates new array with matching items
        // Arrow function checks if quote's category matches selected category
        filteredQuotes = quotes.filter(q => q.category === category);
    }
    
    // Fallback to all quotes if no matches
    if (filteredQuotes.length === 0) {
        filteredQuotes = quotes;
    }
    
    // Pick random quote
    // LEARNING: Random array index selection
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    currentQuote = filteredQuotes[randomIndex];
    
    // Display quote
    quoteText.textContent = currentQuote.text;
    quoteAuthor.textContent = `- ${currentQuote.author}`;
    
    // Update favorite button (show filled heart if favorited)
    updateFavoriteButton();
}

// ==============================================
// JOKE FUNCTIONS
// ==============================================

/**
 * Gets random joke from array
 * LEARNING: Simple random selection
 */
function getRandomJoke() {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    jokeText.textContent = jokes[randomIndex];
    
    // Reset star rating
    stars.forEach(star => star.classList.remove('active'));
}

// ==============================================
// COPY FUNCTIONS
// ==============================================

/**
 * Copies quote to clipboard
 * LEARNING: Clipboard API with formatted text
 */
function copyQuote() {
    if (!currentQuote) {
        alert('Generate a quote first!');
        return;
    }
    
    // Format quote with author
    const text = `"${currentQuote.text}" - ${currentQuote.author}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
        // Visual feedback
        const originalText = copyQuoteBtn.textContent;
        copyQuoteBtn.textContent = '✓';
        
        setTimeout(() => {
            copyQuoteBtn.textContent = originalText;
        }, 2000);
    });
}

/**
 * Copies joke to clipboard
 */
function copyJoke() {
    const text = jokeText.textContent;
    
    // Validation
    if (text === 'Ready to laugh? Click the button below!') {
        alert('Generate a joke first!');
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyJokeBtn.textContent;
        copyJokeBtn.textContent = '✓';
        
        setTimeout(() => {
            copyJokeBtn.textContent = originalText;
        }, 2000);
    });
}

// ==============================================
// TWITTER SHARING
// ==============================================

/**
 * Opens Twitter with pre-filled tweet for quote
 * LEARNING: Twitter Web Intent API and URL encoding
 * 
 * Twitter Web Intent: https://twitter.com/intent/tweet?text=ENCODED_TEXT
 */
function tweetQuote() {
    if (!currentQuote) {
        alert('Generate a quote first!');
        return;
    }
    
    // Format quote text
    // LEARNING: encodeURIComponent() makes text URL-safe
    // Converts special characters: space → %20, " → %22, etc.
    const text = encodeURIComponent(`"${currentQuote.text}" - ${currentQuote.author}`);
    
    // Open Twitter in new tab
    // LEARNING: window.open(url, target) opens URL in new window/tab
    // '_blank' means new tab
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
}

/**
 * Opens Twitter with pre-filled tweet for joke
 */
function tweetJoke() {
    const text = jokeText.textContent;
    
    if (text === 'Ready to laugh? Click the button below!') {
        alert('Generate a joke first!');
        return;
    }
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
}

// ==============================================
// FAVORITES SYSTEM
// ==============================================

/**
 * Toggles quote in favorites list
 * LEARNING: Array searching, adding, and removing
 * 
 * Steps:
 * 1. Create unique ID for quote
 * 2. Check if already favorited
 * 3. If favorited: remove it
 * 4. If not favorited: add it
 * 5. Save to localStorage
 * 6. Update UI
 */
function toggleFavorite() {
    if (!currentQuote) {
        alert('Generate a quote first!');
        return;
    }
    
    // Create unique identifier for quote
    // LEARNING: Combine text and author as unique key
    const quoteId = `${currentQuote.text}-${currentQuote.author}`;
    
    // Find if quote is already in favorites
    // LEARNING: findIndex() returns index of first match, or -1 if not found
    const existingIndex = favoriteQuotes.findIndex(q => `${q.text}-${q.author}` === quoteId);
    
    if (existingIndex !== -1) {
        // Quote is favorited: remove it
        // LEARNING: splice(index, count) removes items from array
        favoriteQuotes.splice(existingIndex, 1);
    } else {
        // Quote not favorited: add it
        favoriteQuotes.push(currentQuote);
    }
    
    // Save to localStorage
    // LEARNING: Must convert objects to JSON string for storage
    localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteQuotes));
    
    // Update UI
    updateFavoriteButton();
    renderFavorites();
}

/**
 * Updates favorite button appearance
 * LEARNING: Checking if item exists in array
 */
function updateFavoriteButton() {
    if (!currentQuote) return;
    
    const quoteId = `${currentQuote.text}-${currentQuote.author}`;
    
    // Check if current quote is in favorites
    // LEARNING: some() returns true if any item matches condition
    const isFavorite = favoriteQuotes.some(q => `${q.text}-${q.author}` === quoteId);
    
    // Update button appearance
    if (isFavorite) {
        favoriteQuoteBtn.classList.add('favorited');  // Show filled heart
    } else {
        favoriteQuoteBtn.classList.remove('favorited');  // Show empty heart
    }
}

/**
 * Displays all favorite quotes
 * LEARNING: Dynamic list generation from array
 */
function renderFavorites() {
    // Empty state
    if (favoriteQuotes.length === 0) {
        favoriteQuotesList.innerHTML = '<p class="empty-favorites">No favorites yet. Click the heart icon to add quotes!</p>';
        return;
    }
    
    // Clear list
    favoriteQuotesList.innerHTML = '';
    
    // Create element for each favorite
    // LEARNING: forEach with index for remove functionality
    favoriteQuotes.forEach((quote, index) => {
        // Create container
        const item = document.createElement('div');
        item.className = 'favorite-item';
        
        // Quote text
        const quoteDiv = document.createElement('div');
        quoteDiv.className = 'favorite-quote';
        quoteDiv.textContent = `"${quote.text}"`;
        
        // Author
        const authorDiv = document.createElement('div');
        authorDiv.className = 'favorite-author';
        authorDiv.textContent = `- ${quote.author}`;
        
        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'favorite-remove';
        removeBtn.textContent = '×';
        
        // LEARNING: Closure captures index for removal
        removeBtn.addEventListener('click', () => removeFavorite(index));
        
        // Assemble item
        item.appendChild(quoteDiv);
        item.appendChild(authorDiv);
        item.appendChild(removeBtn);
        
        // Add to list
        favoriteQuotesList.appendChild(item);
    });
}

/**
 * Removes favorite by index
 * LEARNING: Array modification and persistence
 * 
 * @param {number} index - Index of favorite to remove
 */
function removeFavorite(index) {
    // Remove from array
    favoriteQuotes.splice(index, 1);
    
    // Save to localStorage
    localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteQuotes));
    
    // Update UI
    renderFavorites();
    updateFavoriteButton();
}

// ==============================================
// RATING SYSTEM
// ==============================================

/**
 * Updates star rating display
 * LEARNING: Visual feedback with multiple elements
 * 
 * @param {number} rating - Number of stars (1-5)
 */
function rateJoke(rating) {
    stars.forEach((star, index) => {
        // Light up stars up to rating
        // LEARNING: Compare index with rating
        // Example: rating = 3 → light up stars 0, 1, 2
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// ==============================================
// EVENT LISTENERS
// ==============================================

/**
 * Button handlers
 */
newQuoteBtn.addEventListener('click', getRandomQuote);
newJokeBtn.addEventListener('click', getRandomJoke);
copyQuoteBtn.addEventListener('click', copyQuote);
copyJokeBtn.addEventListener('click', copyJoke);
tweetQuoteBtn.addEventListener('click', tweetQuote);
tweetJokeBtn.addEventListener('click', tweetJoke);
favoriteQuoteBtn.addEventListener('click', toggleFavorite);

/**
 * Category change: get new quote from selected category
 */
quoteCategorySelect.addEventListener('change', getRandomQuote);

/**
 * Star rating handlers
 * LEARNING: Extracting data from data-* attributes
 */
stars.forEach(star => {
    star.addEventListener('click', () => {
        // Get rating from data attribute
        const rating = parseInt(star.dataset.rating);
        rateJoke(rating);
    });
});

// ==============================================
// INITIALIZATION
// ==============================================

/**
 * Initialize on page load
 */
renderFavorites();  // Display saved favorites
getRandomQuote();   // Show initial quote
