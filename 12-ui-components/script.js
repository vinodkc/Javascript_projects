const modals = document.querySelectorAll('.modal');
const modalOpenButtons = [
    document.getElementById('openModal1'),
    document.getElementById('openModal2'),
    document.getElementById('openModal3')
];
const modalCloseButtons = document.querySelectorAll('.modal-close');
const modalBtns = document.querySelectorAll('.modal-btn');
const accordionHeaders = document.querySelectorAll('.accordion-header');
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function closeAllModals() {
    modals.forEach(modal => closeModal(modal));
}

modalOpenButtons.forEach((button, index) => {
    if (button) {
        button.addEventListener('click', () => {
            openModal(`modal${index + 1}`);
        });
    }
});

modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
        closeModal(button.closest('.modal'));
    });
});

modalBtns.forEach(button => {
    button.addEventListener('click', () => {
        closeModal(button.closest('.modal'));
    });
});

modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

const modalForm = document.querySelector('.modal-form');
if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submitted! (Demo only)');
        modalForm.reset();
        closeModal(modalForm.closest('.modal'));
    });
}

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains('active');
        
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });
        
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        tabPanels.forEach(panel => {
            if (panel.id === targetTab) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
    });
});

