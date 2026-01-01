// ========================================
// DOM ELEMENTS
// ========================================

// Tab system
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Quote elements
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const quoteTags = document.getElementById('quoteTags');
const quoteApiSource = document.getElementById('quoteApiSource');
const quoteDisplay = document.getElementById('quoteDisplay');
const quoteLoader = document.getElementById('quoteLoader');
const quoteError = document.getElementById('quoteError');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const quoteApiSelect = document.getElementById('quoteApiSelect');

// Joke elements
const jokeText = document.getElementById('jokeText');
const jokePunchline = document.getElementById('jokePunchline');
const jokeInfo = document.getElementById('jokeInfo');
const jokeApiSource = document.getElementById('jokeApiSource');
const jokeDisplay = document.getElementById('jokeDisplay');
const jokeLoader = document.getElementById('jokeLoader');
const jokeError = document.getElementById('jokeError');
const newJokeBtn = document.getElementById('newJokeBtn');
const jokeApiSelect = document.getElementById('jokeApiSelect');

// Action buttons
const copyQuoteBtn = document.getElementById('copyQuoteBtn');
const copyJokeBtn = document.getElementById('copyJokeBtn');
const tweetQuoteBtn = document.getElementById('tweetQuoteBtn');
const tweetJokeBtn = document.getElementById('tweetJokeBtn');
const favoriteQuoteBtn = document.getElementById('favoriteQuoteBtn');
const speakQuoteBtn = document.getElementById('speakQuoteBtn');
const speakJokeBtn = document.getElementById('speakJokeBtn');

// Favorites
const favoriteQuotesList = document.getElementById('favoriteQuotes');

// Rating
const stars = document.querySelectorAll('.star');

// Stats
const quotesLoadedEl = document.getElementById('quotesLoaded');
const cacheSizeEl = document.getElementById('cacheSize');
const favoriteCountEl = document.getElementById('favoriteCount');

// ========================================
// STATE & DATA
// ========================================

let currentQuote = null;
let currentJoke = null;
let favoriteQuotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];

// Statistics
let stats = JSON.parse(localStorage.getItem('apiStats')) || {
    quotesLoaded: 0,
    jokesLoaded: 0,
    errors: 0,
    cacheHits: 0
};

// Cache
const quoteCache = new Map();
const jokeCache = new Map();

// Settings
const settings = JSON.parse(localStorage.getItem('apiSettings')) || {
    enableCache: true,
    autoFetch: true,
    cacheExpiry: 60, // minutes
    showTags: true,
    showSource: true,
    enableSpeech: false
};

// ========================================
// API ENDPOINTS
// ========================================

const API_ENDPOINTS = {
    quotes: {
        quotable: 'https://api.quotable.io/random',
        zenquotes: 'https://zenquotes.io/api/random'
    },
    jokes: {
        official: 'https://official-joke-api.appspot.com/random_joke',
        jokeapi: 'https://v2.jokeapi.dev/joke/Any?safe-mode',
        dadjokes: 'https://icanhazdadjoke.com/'
    }
};

// Fallback local data
const LOCAL_QUOTES = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" }
];

const LOCAL_JOKES = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Why did the scarecrow win an award? He was outstanding in his field!",
    "What do you call a bear with no teeth? A gummy bear!",
    "Why don't programmers like nature? It has too many bugs!",
    "What do you call a fake noodle? An impasta!"
];

// ========================================
// TAB SYSTEM
// ========================================

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        // Remove active class from all tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab
        btn.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ========================================
// QUOTE FETCHING
// ========================================

async function fetchQuote() {
    const apiSource = quoteApiSelect.value;
    
    // Show loading
    showLoading(quoteLoader, quoteDisplay, quoteError);
    
    try {
        let quote;
        
        if (apiSource === 'local') {
            quote = getLocalQuote();
        } else if (apiSource === 'random') {
            // Try multiple APIs randomly
            const apis = ['quotable', 'zenquotes'];
            const randomApi = apis[Math.floor(Math.random() * apis.length)];
            quote = await fetchFromQuoteAPI(randomApi);
        } else {
            quote = await fetchFromQuoteAPI(apiSource);
        }
        
        currentQuote = quote;
        displayQuote(quote, apiSource);
        
        // Update stats
        stats.quotesLoaded++;
        saveStats();
        updateStatsDisplay();
        
        // Show content
        hideLoading(quoteLoader, quoteDisplay, quoteError);
        
    } catch (error) {
        console.error('Error fetching quote:', error);
        handleQuoteError(error);
    }
}

async function fetchFromQuoteAPI(source) {
    const cacheKey = `quote_${source}_${Date.now()}`;
    
    // Check cache first
    if (settings.enableCache && quoteCache.has(source)) {
        const cached = quoteCache.get(source);
        if (Date.now() - cached.timestamp < settings.cacheExpiry * 60 * 1000) {
            stats.cacheHits++;
            saveStats();
            return cached.data;
        }
    }
    
    const endpoint = API_ENDPOINTS.quotes[source];
    
    const response = await fetch(endpoint, {
        headers: source === 'dadjokes' ? { 'Accept': 'application/json' } : {}
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Parse response based on API
    let quote;
    if (source === 'quotable') {
        quote = {
            text: data.content,
            author: data.author,
            tags: data.tags || []
        };
    } else if (source === 'zenquotes') {
        quote = {
            text: data[0].q,
            author: data[0].a,
            tags: []
        };
    }
    
    // Cache the result
    if (settings.enableCache) {
        quoteCache.set(source, {
            data: quote,
            timestamp: Date.now()
        });
    }
    
    return quote;
}

function getLocalQuote() {
    const randomIndex = Math.floor(Math.random() * LOCAL_QUOTES.length);
    return { ...LOCAL_QUOTES[randomIndex], tags: [] };
}

function displayQuote(quote, source) {
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
    
    // Display tags
    if (settings.showTags && quote.tags && quote.tags.length > 0) {
        quoteTags.innerHTML = quote.tags.map(tag => 
            `<span class="tag">${tag}</span>`
        ).join('');
        quoteTags.style.display = 'flex';
    } else {
        quoteTags.style.display = 'none';
    }
    
    // Update API source badge
    if (settings.showSource) {
        quoteApiSource.textContent = `Source: ${source}`;
        quoteApiSource.style.display = 'block';
    } else {
        quoteApiSource.style.display = 'none';
    }
    
    updateFavoriteButton();
}

function retryQuote() {
    fetchQuote();
}

function handleQuoteError(error) {
    stats.errors++;
    saveStats();
    
    hideLoading(quoteLoader, quoteDisplay, quoteError);
    
    const errorText = quoteError.querySelector('.error-text');
    errorText.textContent = `Failed to fetch quote: ${error.message}`;
    quoteError.style.display = 'flex';
    
    // Try local fallback after 2 seconds
    setTimeout(() => {
        if (quoteError.style.display !== 'none') {
            quoteApiSelect.value = 'local';
            fetchQuote();
        }
    }, 2000);
}

// ========================================
// JOKE FETCHING
// ========================================

async function fetchJoke() {
    const apiSource = jokeApiSelect.value;
    
    // Show loading
    showLoading(jokeLoader, jokeDisplay, jokeError);
    
    try {
        let joke;
        
        if (apiSource === 'local') {
            joke = getLocalJoke();
        } else {
            joke = await fetchFromJokeAPI(apiSource);
        }
        
        currentJoke = joke;
        displayJoke(joke, apiSource);
        
        // Update stats
        stats.jokesLoaded++;
        saveStats();
        updateStatsDisplay();
        
        // Show content
        hideLoading(jokeLoader, jokeDisplay, jokeError);
        
        // Clear rating
        stars.forEach(star => star.classList.remove('active'));
        
    } catch (error) {
        console.error('Error fetching joke:', error);
        handleJokeError(error);
    }
}

async function fetchFromJokeAPI(source) {
    // Check cache
    if (settings.enableCache && jokeCache.has(source)) {
        const cached = jokeCache.get(source);
        if (Date.now() - cached.timestamp < settings.cacheExpiry * 60 * 1000) {
            stats.cacheHits++;
            saveStats();
            return cached.data;
        }
    }
    
    const endpoint = API_ENDPOINTS.jokes[source];
    
    const response = await fetch(endpoint, {
        headers: source === 'dadjokes' ? { 'Accept': 'application/json' } : {}
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Parse response based on API
    let joke;
    if (source === 'official') {
        joke = {
            setup: data.setup,
            punchline: data.punchline,
            type: data.type,
            id: data.id
        };
    } else if (source === 'jokeapi') {
        if (data.type === 'single') {
            joke = {
                setup: data.joke,
                punchline: null,
                type: data.category,
                id: data.id
            };
        } else {
            joke = {
                setup: data.setup,
                punchline: data.delivery,
                type: data.category,
                id: data.id
            };
        }
    } else if (source === 'dadjokes') {
        joke = {
            setup: data.joke,
            punchline: null,
            type: 'dad joke',
            id: data.id
        };
    }
    
    // Cache the result
    if (settings.enableCache) {
        jokeCache.set(source, {
            data: joke,
            timestamp: Date.now()
        });
    }
    
    return joke;
}

function getLocalJoke() {
    const randomIndex = Math.floor(Math.random() * LOCAL_JOKES.length);
    return {
        setup: LOCAL_JOKES[randomIndex],
        punchline: null,
        type: 'local'
    };
}

function displayJoke(joke, source) {
    if (joke.punchline) {
        // Two-part joke
        jokeText.textContent = joke.setup;
        jokePunchline.textContent = joke.punchline;
        jokePunchline.style.display = 'block';
        jokePunchline.style.marginTop = '15px';
    } else {
        // Single joke
        jokeText.textContent = joke.setup;
        jokePunchline.style.display = 'none';
    }
    
    // Display joke info
    if (joke.type) {
        jokeInfo.innerHTML = `<span class="joke-type">Type: ${joke.type}</span>`;
        jokeInfo.style.display = 'block';
    } else {
        jokeInfo.style.display = 'none';
    }
    
    // Update API source badge
    if (settings.showSource) {
        jokeApiSource.textContent = `Source: ${source}`;
        jokeApiSource.style.display = 'block';
    } else {
        jokeApiSource.style.display = 'none';
    }
}

function retryJoke() {
    fetchJoke();
}

function handleJokeError(error) {
    stats.errors++;
    saveStats();
    
    hideLoading(jokeLoader, jokeDisplay, jokeError);
    
    const errorText = jokeError.querySelector('.error-text');
    errorText.textContent = `Failed to fetch joke: ${error.message}`;
    jokeError.style.display = 'flex';
    
    // Try local fallback after 2 seconds
    setTimeout(() => {
        if (jokeError.style.display !== 'none') {
            jokeApiSelect.value = 'local';
            fetchJoke();
        }
    }, 2000);
}

// ========================================
// LOADING STATE MANAGEMENT
// ========================================

function showLoading(loader, display, error) {
    loader.style.display = 'flex';
    display.style.display = 'none';
    error.style.display = 'none';
}

function hideLoading(loader, display, error) {
    loader.style.display = 'none';
    display.style.display = 'block';
    error.style.display = 'none';
}

// ========================================
// COPY FUNCTIONALITY
// ========================================

async function copyQuote() {
    if (!currentQuote) {
        showNotification('Generate a quote first!', 'warning');
        return;
    }
    
    const text = `"${currentQuote.text}" — ${currentQuote.author}`;
    
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Quote copied!', 'success');
        updateButtonState(copyQuoteBtn, '✓');
    } catch (err) {
        showNotification('Failed to copy', 'error');
    }
}

async function copyJoke() {
    if (!currentJoke) {
        showNotification('Generate a joke first!', 'warning');
        return;
    }
    
    const text = currentJoke.punchline 
        ? `${currentJoke.setup}\n${currentJoke.punchline}`
        : currentJoke.setup;
    
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Joke copied!', 'success');
        updateButtonState(copyJokeBtn, '✓');
    } catch (err) {
        showNotification('Failed to copy', 'error');
    }
}

function updateButtonState(button, newText) {
    const originalText = button.textContent;
    button.textContent = newText;
    setTimeout(() => {
        button.textContent = originalText;
    }, 2000);
}

// ========================================
// SHARE TO TWITTER
// ========================================

function tweetQuote() {
    if (!currentQuote) {
        showNotification('Generate a quote first!', 'warning');
        return;
    }
    
    const text = encodeURIComponent(`"${currentQuote.text}" — ${currentQuote.author}`);
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank', 'width=600,height=400');
}

function tweetJoke() {
    if (!currentJoke) {
        showNotification('Generate a joke first!', 'warning');
        return;
    }
    
    const text = currentJoke.punchline 
        ? `${currentJoke.setup} ${currentJoke.punchline}`
        : currentJoke.setup;
    const encodedText = encodeURIComponent(text);
    const url = `https://twitter.com/intent/tweet?text=${encodedText}`;
    window.open(url, '_blank', 'width=600,height=400');
}

// ========================================
// TEXT-TO-SPEECH
// ========================================

function speakQuote() {
    if (!currentQuote) {
        showNotification('Generate a quote first!', 'warning');
        return;
    }
    
    if (!settings.enableSpeech) {
        showNotification('Enable speech in settings first!', 'warning');
        return;
    }
    
    const text = `${currentQuote.text}. By ${currentQuote.author}`;
    speak(text);
}

function speakJoke() {
    if (!currentJoke) {
        showNotification('Generate a joke first!', 'warning');
        return;
    }
    
    if (!settings.enableSpeech) {
        showNotification('Enable speech in settings first!', 'warning');
        return;
    }
    
    const text = currentJoke.punchline 
        ? `${currentJoke.setup}. ${currentJoke.punchline}`
        : currentJoke.setup;
    speak(text);
}

function speak(text) {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        window.speechSynthesis.speak(utterance);
        showNotification('Speaking...', 'info');
    } else {
        showNotification('Speech not supported in this browser', 'error');
    }
}

// ========================================
// FAVORITES
// ========================================

function toggleFavorite() {
    if (!currentQuote) {
        showNotification('Generate a quote first!', 'warning');
        return;
    }
    
    const quoteId = `${currentQuote.text}-${currentQuote.author}`;
    const existingIndex = favoriteQuotes.findIndex(q => 
        `${q.text}-${q.author}` === quoteId
    );
    
    if (existingIndex !== -1) {
        favoriteQuotes.splice(existingIndex, 1);
        showNotification('Removed from favorites', 'info');
    } else {
        favoriteQuotes.push(currentQuote);
        showNotification('Added to favorites!', 'success');
    }
    
    localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteQuotes));
    updateFavoriteButton();
    renderFavorites();
    updateStatsDisplay();
}

function updateFavoriteButton() {
    if (!currentQuote) return;
    
    const quoteId = `${currentQuote.text}-${currentQuote.author}`;
    const isFavorite = favoriteQuotes.some(q => 
        `${q.text}-${q.author}` === quoteId
    );
    
    if (isFavorite) {
        favoriteQuoteBtn.classList.add('favorited');
        favoriteQuoteBtn.style.color = '#ef4444';
    } else {
        favoriteQuoteBtn.classList.remove('favorited');
        favoriteQuoteBtn.style.color = '';
    }
}

function renderFavorites() {
    if (favoriteQuotes.length === 0) {
        favoriteQuotesList.innerHTML = '<p class="empty-favorites">No favorites yet. Click the heart icon to add quotes!</p>';
        return;
    }
    
    favoriteQuotesList.innerHTML = '';
    
    favoriteQuotes.forEach((quote, index) => {
        const item = document.createElement('div');
        item.className = 'favorite-item';
        
        item.innerHTML = `
            <div class="favorite-quote">"${quote.text}"</div>
            <div class="favorite-author">— ${quote.author}</div>
            <button class="favorite-remove" onclick="removeFavorite(${index})">×</button>
        `;
        
        favoriteQuotesList.appendChild(item);
    });
}

function removeFavorite(index) {
    favoriteQuotes.splice(index, 1);
    localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteQuotes));
    renderFavorites();
    updateFavoriteButton();
    updateStatsDisplay();
}

// ========================================
// JOKE RATING
// ========================================

function rateJoke(rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    showNotification(`Rated ${rating} stars!`, 'success');
}

// ========================================
// STATISTICS
// ========================================

function updateStatsDisplay() {
    quotesLoadedEl.textContent = stats.quotesLoaded;
    cacheSizeEl.textContent = quoteCache.size + jokeCache.size;
    favoriteCountEl.textContent = favoriteQuotes.length;
    
    // Settings page stats
    const totalQuotes = document.getElementById('totalQuotesFetched');
    const totalJokes = document.getElementById('totalJokesFetched');
    const totalErrors = document.getElementById('totalErrors');
    const cacheHits = document.getElementById('cacheHits');
    
    if (totalQuotes) totalQuotes.textContent = stats.quotesLoaded;
    if (totalJokes) totalJokes.textContent = stats.jokesLoaded;
    if (totalErrors) totalErrors.textContent = stats.errors;
    if (cacheHits) cacheHits.textContent = stats.cacheHits;
}

function saveStats() {
    localStorage.setItem('apiStats', JSON.stringify(stats));
}

function resetStats() {
    if (confirm('Reset all statistics?')) {
        stats = {
            quotesLoaded: 0,
            jokesLoaded: 0,
            errors: 0,
            cacheHits: 0
        };
        saveStats();
        updateStatsDisplay();
        showNotification('Statistics reset!', 'success');
    }
}

// ========================================
// SETTINGS MANAGEMENT
// ========================================

function loadSettings() {
    document.getElementById('enableCache').checked = settings.enableCache;
    document.getElementById('autoFetch').checked = settings.autoFetch;
    document.getElementById('cacheExpiry').value = settings.cacheExpiry;
    document.getElementById('showTags').checked = settings.showTags;
    document.getElementById('showSource').checked = settings.showSource;
    document.getElementById('enableSpeech').checked = settings.enableSpeech;
}

function saveSettings() {
    settings.enableCache = document.getElementById('enableCache').checked;
    settings.autoFetch = document.getElementById('autoFetch').checked;
    settings.cacheExpiry = parseInt(document.getElementById('cacheExpiry').value);
    settings.showTags = document.getElementById('showTags').checked;
    settings.showSource = document.getElementById('showSource').checked;
    settings.enableSpeech = document.getElementById('enableSpeech').checked;
    
    localStorage.setItem('apiSettings', JSON.stringify(settings));
}

// Auto-save settings when changed
document.querySelectorAll('#settings input').forEach(input => {
    input.addEventListener('change', saveSettings);
});

// ========================================
// DATA MANAGEMENT
// ========================================

function clearCache() {
    if (confirm('Clear all cached data?')) {
        quoteCache.clear();
        jokeCache.clear();
        updateStatsDisplay();
        showNotification('Cache cleared!', 'success');
    }
}

function clearFavorites() {
    if (confirm('Delete all favorite quotes?')) {
        favoriteQuotes = [];
        localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteQuotes));
        renderFavorites();
        updateStatsDisplay();
        showNotification('Favorites cleared!', 'success');
    }
}

function exportData() {
    const exportData = {
        favorites: favoriteQuotes,
        stats: stats,
        settings: settings,
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `quote-app-data-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Data exported!', 'success');
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// EVENT LISTENERS
// ========================================

newQuoteBtn.addEventListener('click', fetchQuote);
newJokeBtn.addEventListener('click', fetchJoke);

copyQuoteBtn.addEventListener('click', copyQuote);
copyJokeBtn.addEventListener('click', copyJoke);

tweetQuoteBtn.addEventListener('click', tweetQuote);
tweetJokeBtn.addEventListener('click', tweetJoke);

favoriteQuoteBtn.addEventListener('click', toggleFavorite);

speakQuoteBtn.addEventListener('click', speakQuote);
speakJokeBtn.addEventListener('click', speakJoke);

quoteApiSelect.addEventListener('change', fetchQuote);
jokeApiSelect.addEventListener('change', fetchJoke);

stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating);
        rateJoke(rating);
    });
});

// ========================================
// INITIALIZATION
// ========================================

function init() {
    loadSettings();
    renderFavorites();
    updateStatsDisplay();
    
    // Auto-fetch if enabled
    if (settings.autoFetch) {
        fetchQuote();
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize app
init();

