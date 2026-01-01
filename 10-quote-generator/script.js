const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const jokeText = document.getElementById('jokeText');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const newJokeBtn = document.getElementById('newJokeBtn');
const copyQuoteBtn = document.getElementById('copyQuoteBtn');
const copyJokeBtn = document.getElementById('copyJokeBtn');
const tweetQuoteBtn = document.getElementById('tweetQuoteBtn');
const tweetJokeBtn = document.getElementById('tweetJokeBtn');
const favoriteQuoteBtn = document.getElementById('favoriteQuoteBtn');
const quoteCategorySelect = document.getElementById('quoteCategory');
const favoriteQuotesList = document.getElementById('favoriteQuotes');
const stars = document.querySelectorAll('.star');

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

let currentQuote = null;
let favoriteQuotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];

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

function getRandomQuote() {
    const category = quoteCategorySelect.value;
    let filteredQuotes = quotes;
    
    if (category !== 'all') {
        filteredQuotes = quotes.filter(q => q.category === category);
    }
    
    if (filteredQuotes.length === 0) {
        filteredQuotes = quotes;
    }
    
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    currentQuote = filteredQuotes[randomIndex];
    
    quoteText.textContent = currentQuote.text;
    quoteAuthor.textContent = `- ${currentQuote.author}`;
    
    updateFavoriteButton();
}

function getRandomJoke() {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    jokeText.textContent = jokes[randomIndex];
    
    stars.forEach(star => star.classList.remove('active'));
}

function copyQuote() {
    if (!currentQuote) {
        alert('Generate a quote first!');
        return;
    }
    
    const text = `"${currentQuote.text}" - ${currentQuote.author}`;
    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyQuoteBtn.textContent;
        copyQuoteBtn.textContent = '✓';
        setTimeout(() => {
            copyQuoteBtn.textContent = originalText;
        }, 2000);
    });
}

function copyJoke() {
    const text = jokeText.textContent;
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

function tweetQuote() {
    if (!currentQuote) {
        alert('Generate a quote first!');
        return;
    }
    
    const text = encodeURIComponent(`"${currentQuote.text}" - ${currentQuote.author}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
}

function tweetJoke() {
    const text = jokeText.textContent;
    if (text === 'Ready to laugh? Click the button below!') {
        alert('Generate a joke first!');
        return;
    }
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
}

function toggleFavorite() {
    if (!currentQuote) {
        alert('Generate a quote first!');
        return;
    }
    
    const quoteId = `${currentQuote.text}-${currentQuote.author}`;
    const existingIndex = favoriteQuotes.findIndex(q => `${q.text}-${q.author}` === quoteId);
    
    if (existingIndex !== -1) {
        favoriteQuotes.splice(existingIndex, 1);
    } else {
        favoriteQuotes.push(currentQuote);
    }
    
    localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteQuotes));
    updateFavoriteButton();
    renderFavorites();
}

function updateFavoriteButton() {
    if (!currentQuote) return;
    
    const quoteId = `${currentQuote.text}-${currentQuote.author}`;
    const isFavorite = favoriteQuotes.some(q => `${q.text}-${q.author}` === quoteId);
    
    if (isFavorite) {
        favoriteQuoteBtn.classList.add('favorited');
    } else {
        favoriteQuoteBtn.classList.remove('favorited');
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
        
        const quoteDiv = document.createElement('div');
        quoteDiv.className = 'favorite-quote';
        quoteDiv.textContent = `"${quote.text}"`;
        
        const authorDiv = document.createElement('div');
        authorDiv.className = 'favorite-author';
        authorDiv.textContent = `- ${quote.author}`;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'favorite-remove';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', () => removeFavorite(index));
        
        item.appendChild(quoteDiv);
        item.appendChild(authorDiv);
        item.appendChild(removeBtn);
        
        favoriteQuotesList.appendChild(item);
    });
}

function removeFavorite(index) {
    favoriteQuotes.splice(index, 1);
    localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteQuotes));
    renderFavorites();
    updateFavoriteButton();
}

function rateJoke(rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

newQuoteBtn.addEventListener('click', getRandomQuote);
newJokeBtn.addEventListener('click', getRandomJoke);
copyQuoteBtn.addEventListener('click', copyQuote);
copyJokeBtn.addEventListener('click', copyJoke);
tweetQuoteBtn.addEventListener('click', tweetQuote);
tweetJokeBtn.addEventListener('click', tweetJoke);
favoriteQuoteBtn.addEventListener('click', toggleFavorite);
quoteCategorySelect.addEventListener('change', getRandomQuote);

stars.forEach(star => {
    star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating);
        rateJoke(rating);
    });
});

renderFavorites();
getRandomQuote();

