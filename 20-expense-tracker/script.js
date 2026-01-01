// ========================================
// CONFIGURATION
// ========================================

const STORAGE_KEY = 'expenseTrackerData';
const incomeCategories = ['salary', 'freelance', 'investment', 'other-income'];

// ========================================
// DOM ELEMENTS
// ========================================

// Balance Display
const totalBalance = document.getElementById('totalBalance');
const totalIncome = document.getElementById('totalIncome');
const totalExpense = document.getElementById('totalExpense');

// Form
const transactionForm = document.getElementById('transactionForm');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const dateInput = document.getElementById('date');
const notesInput = document.getElementById('notes');
const cancelBtn = document.getElementById('cancelBtn');

// Filters
const filterType = document.getElementById('filterType');
const filterCategory = document.getElementById('filterCategory');
const searchInput = document.getElementById('searchInput');

// Transactions List
const transactionsList = document.getElementById('transactionsList');

// Statistics
const statTotalTransactions = document.getElementById('statTotalTransactions');
const statThisMonth = document.getElementById('statThisMonth');
const statAvgIncome = document.getElementById('statAvgIncome');
const statAvgExpense = document.getElementById('statAvgExpense');

// Actions
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');
const clearAllBtn = document.getElementById('clearAllBtn');

// Edit Modal
const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const editDescription = document.getElementById('editDescription');
const editAmount = document.getElementById('editAmount');
const editCategory = document.getElementById('editCategory');
const editDate = document.getElementById('editDate');
const editNotes = document.getElementById('editNotes');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

// ========================================
// STATE
// ========================================

let transactions = [];
let editingId = null;

// ========================================
// INITIALIZATION
// ========================================

function init() {
    loadTransactions();
    attachEventListeners();
    setDefaultDate();
    updateUI();
}

function attachEventListeners() {
    transactionForm.addEventListener('submit', addTransaction);
    cancelBtn.addEventListener('click', resetForm);
    filterType.addEventListener('change', updateUI);
    filterCategory.addEventListener('change', updateUI);
    searchInput.addEventListener('input', updateUI);
    exportBtn.addEventListener('click', exportData);
    importBtn.addEventListener('click', () => importFile.click());
    importFile.addEventListener('change', importData);
    clearAllBtn.addEventListener('click', clearAllData);
    editForm.addEventListener('submit', saveEdit);
    closeModalBtn.addEventListener('click', closeModal);
    cancelEditBtn.addEventListener('click', closeModal);
}

function setDefaultDate() {
    dateInput.valueAsDate = new Date();
}

// ========================================
// LOCAL STORAGE
// ========================================

function saveTransactions() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function loadTransactions() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        transactions = JSON.parse(saved);
    }
}

// ========================================
// CRUD OPERATIONS
// ========================================

function addTransaction(e) {
    e.preventDefault();
    
    const transaction = {
        id: Date.now().toString(),
        description: descriptionInput.value.trim(),
        amount: parseFloat(amountInput.value),
        category: categorySelect.value,
        date: dateInput.value,
        notes: notesInput.value.trim(),
        type: incomeCategories.includes(categorySelect.value) ? 'income' : 'expense',
        createdAt: new Date().toISOString()
    };
    
    transactions.unshift(transaction);
    saveTransactions();
    resetForm();
    updateUI();
    
    showNotification('Transaction added successfully!', 'success');
}

function deleteTransaction(id) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        transactions = transactions.filter(t => t.id !== id);
        saveTransactions();
        updateUI();
        showNotification('Transaction deleted!', 'info');
    }
}

function editTransaction(id) {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;
    
    editingId = id;
    editDescription.value = transaction.description;
    editAmount.value = transaction.amount;
    editCategory.value = transaction.category;
    editDate.value = transaction.date;
    editNotes.value = transaction.notes || '';
    
    showModal();
}

function saveEdit(e) {
    e.preventDefault();
    
    const transaction = transactions.find(t => t.id === editingId);
    if (!transaction) return;
    
    transaction.description = editDescription.value.trim();
    transaction.amount = parseFloat(editAmount.value);
    transaction.category = editCategory.value;
    transaction.date = editDate.value;
    transaction.notes = editNotes.value.trim();
    transaction.type = incomeCategories.includes(editCategory.value) ? 'income' : 'expense';
    
    saveTransactions();
    closeModal();
    updateUI();
    showNotification('Transaction updated!', 'success');
}

// ========================================
// UI UPDATE
// ========================================

function updateUI() {
    updateBalance();
    displayTransactions();
    updateStatistics();
}

function updateBalance() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expense;
    
    totalBalance.textContent = formatCurrency(balance);
    totalIncome.textContent = formatCurrency(income);
    totalExpense.textContent = formatCurrency(expense);
    
    // Color code balance
    if (balance >= 0) {
        totalBalance.style.color = '#10b981';
    } else {
        totalBalance.style.color = '#ef4444';
    }
}

function displayTransactions() {
    const filtered = getFilteredTransactions();
    
    if (filtered.length === 0) {
        transactionsList.innerHTML = `
            <div class="no-transactions">
                <span class="no-transactions-icon">📝</span>
                <p>No transactions found</p>
                <p class="no-transactions-sub">Try adjusting your filters</p>
            </div>
        `;
        return;
    }
    
    transactionsList.innerHTML = filtered.map(transaction => `
        <div class="transaction-item ${transaction.type}">
            <div class="transaction-icon">${getCategoryIcon(transaction.category)}</div>
            <div class="transaction-details">
                <p class="transaction-description">${transaction.description}</p>
                <p class="transaction-date">${formatDate(transaction.date)}</p>
                ${transaction.notes ? `<p class="transaction-notes">${transaction.notes}</p>` : ''}
            </div>
            <div class="transaction-amount ${transaction.type}">
                ${transaction.type === 'income' ? '+' : '-'}${formatCurrency(transaction.amount)}
            </div>
            <div class="transaction-actions">
                <button class="btn-icon-small" onclick="editTransaction('${transaction.id}')" title="Edit">
                    ✏️
                </button>
                <button class="btn-icon-small" onclick="deleteTransaction('${transaction.id}')" title="Delete">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');
}

function getFilteredTransactions() {
    let filtered = [...transactions];
    
    // Filter by type
    if (filterType.value !== 'all') {
        filtered = filtered.filter(t => t.type === filterType.value);
    }
    
    // Filter by category
    if (filterCategory.value !== 'all') {
        filtered = filtered.filter(t => t.category === filterCategory.value);
    }
    
    // Search
    const search = searchInput.value.toLowerCase();
    if (search) {
        filtered = filtered.filter(t => 
            t.description.toLowerCase().includes(search) ||
            (t.notes && t.notes.toLowerCase().includes(search))
        );
    }
    
    return filtered;
}

function updateStatistics() {
    statTotalTransactions.textContent = transactions.length;
    
    // This month's balance
    const now = new Date();
    const thisMonth = transactions.filter(t => {
        const transDate = new Date(t.date);
        return transDate.getMonth() === now.getMonth() && 
               transDate.getFullYear() === now.getFullYear();
    });
    
    const monthIncome = thisMonth.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const monthExpense = thisMonth.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    statThisMonth.textContent = formatCurrency(monthIncome - monthExpense);
    
    // Average income
    const incomes = transactions.filter(t => t.type === 'income');
    const avgIncome = incomes.length > 0 ? incomes.reduce((sum, t) => sum + t.amount, 0) / incomes.length : 0;
    statAvgIncome.textContent = formatCurrency(avgIncome);
    
    // Average expense
    const expenses = transactions.filter(t => t.type === 'expense');
    const avgExpense = expenses.length > 0 ? expenses.reduce((sum, t) => sum + t.amount, 0) / expenses.length : 0;
    statAvgExpense.textContent = formatCurrency(avgExpense);
}

// ========================================
// HELPERS
// ========================================

function getCategoryIcon(category) {
    const icons = {
        salary: '💼',
        freelance: '💻',
        investment: '📊',
        'other-income': '➕',
        food: '🍔',
        transport: '🚗',
        shopping: '🛍️',
        entertainment: '🎬',
        bills: '📄',
        health: '🏥',
        education: '📚',
        'other-expense': '➖'
    };
    return icons[category] || '💰';
}

function formatCurrency(amount) {
    return `$${Math.abs(amount).toFixed(2)}`;
}

function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function resetForm() {
    transactionForm.reset();
    setDefaultDate();
}

function showModal() {
    editModal.style.display = 'flex';
    setTimeout(() => editModal.classList.add('show'), 10);
}

function closeModal() {
    editModal.classList.remove('show');
    setTimeout(() => {
        editModal.style.display = 'none';
        editingId = null;
    }, 300);
}

function showNotification(message, type) {
    // Simple alert for now - could be enhanced with custom notifications
    const prefix = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    console.log(`${prefix} ${message}`);
}

// ========================================
// DATA MANAGEMENT
// ========================================

function exportData() {
    const data = {
        transactions,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expense-tracker-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Data exported successfully!', 'success');
}

function importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);
            
            if (confirm('This will replace all existing data. Continue?')) {
                transactions = data.transactions || [];
                saveTransactions();
                updateUI();
                showNotification('Data imported successfully!', 'success');
            }
        } catch (error) {
            alert('Invalid file format!');
        }
    };
    reader.readAsText(file);
    
    // Reset file input
    importFile.value = '';
}

function clearAllData() {
    if (confirm('Are you sure you want to delete ALL transactions? This cannot be undone!')) {
        if (confirm('Really? This will permanently delete all your data!')) {
            transactions = [];
            saveTransactions();
            updateUI();
            showNotification('All data cleared!', 'info');
        }
    }
}

// ========================================
// INITIALIZE
// ========================================

init();

console.log('Expense Tracker loaded! 💰');
console.log(`Total transactions: ${transactions.length}`);
