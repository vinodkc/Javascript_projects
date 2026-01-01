## Project 20: 💰 Expense Tracker

A comprehensive personal finance manager with income/expense tracking, categories, and data persistence!

## 🎯 Learning Objectives

By completing this project, you will:
- Master CRUD operations (Create, Read, Update, Delete)
- Learn array filtering and reduce for calculations
- Understand balance calculations (income - expenses)
- Implement data import/export with JSON
- Work with form validation
- Create search and filter functionality

## 📚 What You'll Learn

### Core Concepts
1. **CRUD Operations**: Full data management lifecycle
2. **Array Reduce**: Calculate totals from arrays
3. **Filtering**: Multiple filter criteria
4. **Balance Calculation**: Income minus expenses
5. **Import/Export**: JSON file operations
6. **Form Handling**: Validation and submission

### Skills Developed
- Array methods: filter(), reduce(), find(), map()
- JSON.stringify() and JSON.parse()
- File input and FileReader API
- Running balance calculations
- Category-based filtering
- Search functionality with includes()

## 🔧 Implementation Explanation

### How It Works

**1. Balance Calculation**
```javascript
income = transactions.filter(t => t.type === 'income')
                     .reduce((sum, t) => sum + t.amount, 0)
expenses = transactions.filter(t => t.type === 'expense')
                       .reduce((sum, t) => sum + t.amount, 0)
balance = income - expenses
```

**2. Add Transaction (CREATE)**
```javascript
transaction = {
  id: Date.now(),
  type: 'income' or 'expense',
  category: selected category,
  amount: parseFloat(amount),
  description: text,
  date: new Date().toISOString()
}
transactions.push(transaction)
```

**3. Update Transaction (UPDATE)**
```javascript
index = transactions.findIndex(t => t.id === id)
transactions[index] = updatedTransaction
```

**4. Delete Transaction (DELETE)**
```javascript
transactions = transactions.filter(t => t.id !== id)
```

**5. Filter Transactions**
```javascript
filtered = transactions.filter(t => {
  return (typeFilter === 'all' || t.type === typeFilter) &&
         (categoryFilter === 'all' || t.category === categoryFilter) &&
         t.description.toLowerCase().includes(search.toLowerCase())
})
```

**6. Export/Import**
```javascript
// Export
blob = new Blob([JSON.stringify(transactions)], {type: 'application/json'})

// Import
reader = new FileReader()
reader.onload = (e) => {
  transactions = JSON.parse(e.target.result)
}
```

## 📖 Further Learning - W3Schools

- [JavaScript Array filter()](https://www.w3schools.com/jsref/jsref_filter.asp)
- [JavaScript Array reduce()](https://www.w3schools.com/jsref/jsref_reduce.asp)
- [JavaScript Array find()](https://www.w3schools.com/jsref/jsref_find.asp)
- [JavaScript JSON](https://www.w3schools.com/js/js_json.asp)
- [JavaScript FileReader](https://www.w3schools.com/jsref/api_filereader.asp)
- [HTML File Upload](https://www.w3schools.com/tags/att_input_type_file.asp)

### ✨ Features

- **Track Transactions**: Add income and expenses with categories
- **Balance Summary**: Real-time calculation of balance, income, and expenses
- **Categories**: 12 predefined categories (Salary, Food, Transport, etc.)
- **CRUD Operations**: Create, Read, Update, Delete transactions
- **Filters**: Filter by type, category, and search by description
- **Statistics**: View total transactions, monthly balance, and averages
- **Data Persistence**: All data saved in localStorage
- **Import/Export**: Backup and restore data as JSON
- **Responsive Design**: Works on all devices

### 🎮 How to Use

1. **Add Transaction**: Fill the form and click "Add Transaction"
2. **View Transactions**: Scroll to see all your transactions
3. **Edit**: Click the ✏️ icon to modify a transaction
4. **Delete**: Click the 🗑️ icon to remove a transaction
5. **Filter**: Use dropdowns to filter by type/category
6. **Search**: Type in search box to find specific transactions
7. **Export**: Download your data as JSON backup
8. **Import**: Upload previously exported JSON file

### 📚 Key Concepts - CRUD Operations

**CRUD** = Create, Read, Update, Delete

**1. CREATE - Add Transaction**
```javascript
function addTransaction(data) {
    const transaction = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString()
    };
    
    transactions.unshift(transaction);  // Add to beginning
    saveToLocalStorage();
}
```

**2. READ - Load Transactions**
```javascript
function loadTransactions() {
    const saved = localStorage.getItem('transactions');
    transactions = JSON.parse(saved) || [];
}
```

**3. UPDATE - Edit Transaction**
```javascript
function updateTransaction(id, newData) {
    const transaction = transactions.find(t => t.id === id);
    Object.assign(transaction, newData);
    saveToLocalStorage();
}
```

**4. DELETE - Remove Transaction**
```javascript
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveToLocalStorage();
}
```

### 📚 LocalStorage Deep Dive

**Saving Data:**
```javascript
// Convert array to JSON string
const jsonString = JSON.stringify(transactions);

// Save to localStorage
localStorage.setItem('expenseData', jsonString);
```

**Loading Data:**
```javascript
// Get JSON string from localStorage
const jsonString = localStorage.getItem('expenseData');

// Parse back to array
const transactions = JSON.parse(jsonString);
```

**Why JSON.stringify?**
- localStorage only stores strings
- JSON.stringify converts objects/arrays to strings
- JSON.parse converts strings back to objects/arrays

### 📊 Calculations Explained

**Total Balance:**
```javascript
const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

const balance = income - expense;
```

**Monthly Balance:**
```javascript
const now = new Date();
const thisMonth = transactions.filter(t => {
    const transDate = new Date(t.date);
    return transDate.getMonth() === now.getMonth() && 
           transDate.getFullYear() === now.getFullYear();
});
```

**Average Calculation:**
```javascript
const incomes = transactions.filter(t => t.type === 'income');
const avgIncome = incomes.length > 0 
    ? incomes.reduce((sum, t) => sum + t.amount, 0) / incomes.length 
    : 0;
```

### 🔍 Filter & Search Logic

**Filter by Type:**
```javascript
if (filterType === 'income') {
    filtered = transactions.filter(t => t.type === 'income');
}
```

**Filter by Category:**
```javascript
if (filterCategory !== 'all') {
    filtered = filtered.filter(t => t.category === filterCategory);
}
```

**Search in Description:**
```javascript
const search = searchInput.toLowerCase();
filtered = filtered.filter(t => 
    t.description.toLowerCase().includes(search) ||
    t.notes.toLowerCase().includes(search)
);
```

### 💾 Import/Export Functionality

**Export to JSON:**
```javascript
function exportData() {
    const data = { transactions, exportDate: new Date() };
    const blob = new Blob([JSON.stringify(data, null, 2)], 
        { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expense-data.json';
    a.click();
    
    URL.revokeObjectURL(url);
}
```

**Import from JSON:**
```javascript
function importData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        transactions = data.transactions;
        saveToLocalStorage();
    };
    reader.readAsText(file);
}
```

### 🎯 Learning Outcomes

✅ CRUD operations (Create, Read, Update, Delete)
✅ LocalStorage for data persistence
✅ Array methods (filter, reduce, map, find)
✅ Date manipulation
✅ Import/Export with Blob API
✅ FileReader API
✅ Form handling and validation
✅ Modal dialogs
✅ Real-time calculations
✅ Search and filter logic

### 🚀 Possible Enhancements

1. **Charts**: Add pie/bar charts for visual insights
2. **Budget Limits**: Set monthly budget and show warnings
3. **Recurring Transactions**: Auto-add monthly bills
4. **Multiple Accounts**: Track different bank accounts
5. **Tags**: Add custom tags to transactions
6. **CSV Export**: Export to Excel-compatible format
7. **Dark Mode**: Theme toggle
8. **Cloud Sync**: Sync data across devices

### 📊 Data Structure

```javascript
const transaction = {
    id: "1704063600000",           // Unique timestamp ID
    description: "Salary",          // Transaction name
    amount: 3000.00,               // Amount in dollars
    category: "salary",            // Category key
    date: "2024-01-01",            // Date (YYYY-MM-DD)
    notes: "Monthly salary",       // Optional notes
    type: "income",                // 'income' or 'expense'
    createdAt: "2024-01-01T10:30:00Z"  // ISO timestamp
};
```

---

**Built for learning JavaScript data management and localStorage! 💰🚀**

**This is the final project of the 20 Projects series! Congratulations! 🎉**
