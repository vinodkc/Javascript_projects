/**
 * ==============================================
 * RESPONSIVE NAVBAR - Learning Documentation
 * ==============================================
 * 
 * CONCEPTS COVERED:
 * - Scroll Events: window.scrollY for scroll position
 * - Active Link Highlighting: Based on scroll position
 * - Hamburger Menu: Mobile navigation toggle
 * - Smooth Scrolling: scrollTo with behavior option
 * - Scroll-to-Top Button: Conditional visibility
 * - Element Positioning: offsetTop, clientHeight
 * - Click Outside Detection: Close menu on outside click
 * - contains() Method: Check if element contains target
 * 
 * KEY LEARNING POINTS:
 * 1. Scroll position detection
 * 2. Dynamic active link based on viewport
 * 3. Mobile menu toggle pattern
 * 4. Smooth scroll behavior
 * 5. Click outside to close
 */

// ==============================================
// DOM ELEMENTS
// ==============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTop');
const sections = document.querySelectorAll('.section');

// ==============================================
// SCROLL HANDLING
// ==============================================

/**
 * Handles scroll events for multiple features
 * LEARNING: Single scroll handler for multiple effects
 * 
 * Features:
 * 1. Sticky navbar styling (add shadow/background after scrolling)
 * 2. Scroll-to-top button visibility
 * 3. Active link highlighting
 */
function handleScroll() {
    // LEARNING: window.scrollY is vertical scroll position in pixels
    // 0 = top of page
    
    // ========== STICKY NAVBAR EFFECT ==========
    // Add 'scrolled' class after scrolling down 50px
    // LEARNING: Threshold-based class toggling
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // ========== SCROLL-TO-TOP BUTTON ==========
    // Show button after scrolling 300px
    // LEARNING: Conditional element visibility
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
    
    // ========== ACTIVE LINK HIGHLIGHTING ==========
    updateActiveLink();
}

/**
 * Updates active nav link based on current scroll position
 * LEARNING: Scroll spy pattern - highlight link for visible section
 * 
 * Algorithm:
 * 1. Loop through all sections
 * 2. Check which section is currently in viewport
 * 3. Highlight corresponding nav link
 */
function updateActiveLink() {
    let currentSection = '';
    
    // Find which section is currently in view
    // LEARNING: Element positioning properties
    sections.forEach(section => {
        // LEARNING: offsetTop = distance from top of page to element
        const sectionTop = section.offsetTop;
        
        // LEARNING: clientHeight = visible height of element
        const sectionHeight = section.clientHeight;
        
        // Check if section is in viewport
        // LEARNING: Subtract 100px offset for better UX
        // (highlights link slightly before section reaches top)
        if (window.scrollY >= (sectionTop - 100)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active link styling
    navLinks.forEach(link => {
        // Remove active from all links
        link.classList.remove('active');
        
        // Add active to matching link
        // LEARNING: Match link href with section ID
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ==============================================
// MOBILE MENU TOGGLE
// ==============================================

/**
 * Toggles mobile menu open/closed
 * LEARNING: Hamburger menu pattern
 * 
 * Pattern:
 * - Toggle hamburger icon animation (☰ ↔ ✕)
 * - Toggle menu visibility (slide in/out)
 */
function toggleMenu() {
    // LEARNING: classList.toggle() adds if missing, removes if present
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

/**
 * Closes mobile menu
 * LEARNING: Explicit close for various triggers
 * 
 * Called when:
 * - User clicks a nav link
 * - User clicks outside menu
 */
function closeMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
}

// ==============================================
// SCROLL-TO-TOP
// ==============================================

/**
 * Smoothly scrolls to top of page
 * LEARNING: Smooth scrolling with modern API
 * 
 * Old way: window.scrollTo(0, 0) - instant jump
 * New way: behavior: 'smooth' - animated scroll
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,                    // Target position
        behavior: 'smooth'         // Smooth animation
    });
}

// ==============================================
// EVENT LISTENERS
// ==============================================

/**
 * Hamburger menu toggle button
 * LEARNING: Mobile navigation pattern
 */
navToggle.addEventListener('click', toggleMenu);

/**
 * Nav link click handlers
 * LEARNING: Close mobile menu after navigation
 * 
 * UX improvement: User clicks link → menu closes automatically
 */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

/**
 * Scroll-to-top button
 */
scrollTopBtn.addEventListener('click', scrollToTop);

/**
 * Scroll event listener
 * LEARNING: Passive listeners for better performance
 * (Though not specified here, could add { passive: true })
 */
window.addEventListener('scroll', handleScroll);

/**
 * Click outside to close menu
 * LEARNING: Click outside detection pattern
 * 
 * Pattern:
 * 1. Listen for clicks on document
 * 2. Check if click is inside navbar
 * 3. If outside, close menu
 */
document.addEventListener('click', (e) => {
    // LEARNING: contains() checks if element contains target
    // Returns true if e.target is navbar or inside navbar
    // Returns false if e.target is outside navbar
    if (!navbar.contains(e.target)) {
        closeMenu();
    }
});

// ==============================================
// INITIALIZATION
// ==============================================

/**
 * Initialize active link on page load
 * LEARNING: Set correct state before any scrolling occurs
 */
updateActiveLink();
