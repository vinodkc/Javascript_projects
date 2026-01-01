/**
 * ==============================================
 * UI COMPONENTS - Learning Documentation
 * ==============================================
 * 
 * CONCEPTS COVERED:
 * - Modal Dialogs: Overlay windows with backdrop
 * - Accordion: Collapsible content panels
 * - Tabs: Content switching interface
 * - Event Delegation: Click on backdrop to close
 * - Escape Key Handler: Close modals with keyboard
 * - Prevent Body Scroll: Disable scrolling when modal open
 * - closest() Method: Finding nearest ancestor
 * - parentElement: Accessing parent node
 * - Form Handling: preventDefault and reset
 * 
 * KEY LEARNING POINTS:
 * 1. Modal pattern with multiple close triggers
 * 2. Accordion collapse/expand logic
 * 3. Tab switching with active states
 * 4. Keyboard accessibility (Escape key)
 * 5. Body scroll management
 */

// ==============================================
// DOM ELEMENTS
// ==============================================

// Modal elements
const modals = document.querySelectorAll('.modal');
const modalOpenButtons = [
    document.getElementById('openModal1'),
    document.getElementById('openModal2'),
    document.getElementById('openModal3')
];
const modalCloseButtons = document.querySelectorAll('.modal-close');
const modalBtns = document.querySelectorAll('.modal-btn');

// Accordion elements
const accordionHeaders = document.querySelectorAll('.accordion-header');

// Tab elements
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

// ==============================================
// MODAL FUNCTIONS
// ==============================================

/**
 * Opens modal by ID
 * LEARNING: Modal pattern with body scroll prevention
 * 
 * @param {string} modalId - ID of modal to open
 * 
 * When modal opens:
 * 1. Add 'active' class to show modal
 * 2. Disable body scrolling (prevent scrolling page behind modal)
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    
    // Disable body scroll
    // LEARNING: overflow: 'hidden' prevents scrolling
    // Improves UX by keeping focus on modal
    document.body.style.overflow = 'hidden';
}

/**
 * Closes specific modal
 * LEARNING: Reversing modal open actions
 * 
 * @param {HTMLElement} modal - Modal element to close
 */
function closeModal(modal) {
    modal.classList.remove('active');
    
    // Re-enable body scroll
    // LEARNING: overflow: 'auto' restores normal scrolling
    document.body.style.overflow = 'auto';
}

/**
 * Closes all modals
 * LEARNING: Utility function for global close (e.g., Escape key)
 */
function closeAllModals() {
    modals.forEach(modal => closeModal(modal));
}

// ==============================================
// MODAL EVENT LISTENERS
// ==============================================

/**
 * Open button handlers
 * LEARNING: Dynamic modal ID construction
 */
modalOpenButtons.forEach((button, index) => {
    // Check button exists (safety check)
    if (button) {
        button.addEventListener('click', () => {
            // Construct modal ID from index
            // LEARNING: index starts at 0, but IDs start at 1
            // index 0 → 'modal1'
            // index 1 → 'modal2'
            openModal(`modal${index + 1}`);
        });
    }
});

/**
 * Close button (X) handlers
 * LEARNING: closest() method to find parent modal
 */
modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Find nearest ancestor with class 'modal'
        // LEARNING: closest() walks up DOM tree
        // Example: button → modal-header → modal-content → modal
        closeModal(button.closest('.modal'));
    });
});

/**
 * Action button handlers (OK, Cancel, etc.)
 * LEARNING: Same close pattern as X button
 */
modalBtns.forEach(button => {
    button.addEventListener('click', () => {
        closeModal(button.closest('.modal'));
    });
});

/**
 * Backdrop click handlers
 * LEARNING: Event delegation - close modal when clicking outside content
 * 
 * Pattern:
 * - Click on modal backdrop (outer container) → close
 * - Click on modal content (inner box) → don't close
 */
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        // Check if click target is the backdrop (modal itself)
        // LEARNING: e.target is the actual clicked element
        // If e.target === modal, user clicked backdrop (not content inside)
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

/**
 * Escape key handler
 * LEARNING: Keyboard accessibility for modals
 * 
 * Best practice: Always allow Escape key to close modals
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// ==============================================
// MODAL FORM HANDLING
// ==============================================

/**
 * Modal form submission
 * LEARNING: Preventing default form submission
 */
const modalForm = document.querySelector('.modal-form');
if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
        // Prevent default form submission (page reload)
        // LEARNING: e.preventDefault() stops default browser behavior
        e.preventDefault();
        
        // Handle form data (demo: just alert)
        alert('Form submitted! (Demo only)');
        
        // Reset form fields
        // LEARNING: form.reset() clears all input values
        modalForm.reset();
        
        // Close modal
        closeModal(modalForm.closest('.modal'));
    });
}

// ==============================================
// ACCORDION COMPONENT
// ==============================================

/**
 * Accordion click handlers
 * LEARNING: Single-open accordion pattern
 * 
 * Behavior:
 * - Click header → Expand panel
 * - Click active header → Collapse panel
 * - Only one panel open at a time
 * 
 * Pattern variations:
 * - Remove "close others" logic to allow multiple panels open
 * - Add icons that rotate on expand/collapse
 */
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        // Get parent accordion item
        // LEARNING: parentElement accesses direct parent
        const accordionItem = header.parentElement;
        
        // Check if this item is currently active
        const isActive = accordionItem.classList.contains('active');
        
        // Close all accordion items
        // LEARNING: Close others first to ensure only one open
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle clicked item
        // LEARNING: If it was active, leave it closed (toggle behavior)
        // If it wasn't active, open it
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});

// ==============================================
// TAB COMPONENT
// ==============================================

/**
 * Tab button click handlers
 * LEARNING: Content switching with active state sync
 * 
 * Pattern:
 * 1. Get target panel from data attribute
 * 2. Update button states (visual feedback)
 * 3. Show target panel, hide others
 * 
 * This is the same pattern used throughout the project for tabs
 */
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get target tab from data attribute
        // LEARNING: data-tab="panel1" → button.dataset.tab = "panel1"
        const targetTab = button.dataset.tab;
        
        // Update button states
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update panel visibility
        tabPanels.forEach(panel => {
            if (panel.id === targetTab) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    });
});
