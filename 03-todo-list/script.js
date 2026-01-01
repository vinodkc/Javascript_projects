/**
 * ==============================================
 * TODO LIST APPLICATION - Learning Documentation
 * ==============================================
 * 
 * CONCEPTS COVERED:
 * - LocalStorage API: Store data persistently in browser
 * - JSON: stringify() and parse() for data serialization
 * - Array Methods: filter(), find(), forEach(), unshift()
 * - Object Creation: JavaScript object literals
 * - ContentEditable: In-place text editing
 * - Selection API: Text selection and cursor positioning
 * - Dataset Attributes: data-* attributes for storing element data
 * - Template Literals: String interpolation
 * - Arrow Functions: Concise function syntax
 * 
 * KEY LEARNING POINTS:
 * 1. Persistent data storage with localStorage
 * 2. Array manipulation with filter() and find()
 * 3. Dynamic DOM creation and event delegation
 * 4. contentEditable for inline editing
 * 5. Object-based data structures
 */

// ==============================================
// DOM ELEMENTS
// ==============================================
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const totalTasks = document.getElementById('totalTasks');
const clearCompleted = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');

// ==============================================
// STATE VARIABLES
// ==============================================

/**
 * tasks: Array of task objects
 * LEARNING: Each task is an object with properties:
 * {
 *   id: unique identifier (timestamp)
 *   text: task description
 *   completed: boolean status
 *   createdAt: ISO timestamp string
 * }
 */
let tasks = [];

/**
 * currentFilter: Tracks which filter view is active
 * LEARNING: State variable for UI filtering ('all', 'active', 'completed')
 */
let currentFilter = 'all';

// ==============================================
// LOCALSTORAGE FUNCTIONS
// ==============================================

/**
 * Loads tasks from localStorage
 * LEARNING: localStorage persists data across browser sessions
 * 
 * Key concepts:
 * - localStorage.getItem() retrieves string value
 * - JSON.parse() converts JSON string to JavaScript object/array
 * - Data persists even after closing browser
 */
function loadTasks() {
    // Retrieve tasks from localStorage
    // LEARNING: localStorage stores data as strings
    const savedTasks = localStorage.getItem('tasks');
    
    if (savedTasks) {
        // Convert JSON string back to JavaScript array
        // LEARNING: JSON.parse() deserializes JSON string
        tasks = JSON.parse(savedTasks);
    }
    
    // Display loaded tasks
    renderTasks();
}

/**
 * Saves tasks to localStorage
 * LEARNING: Synchronizing in-memory data with persistent storage
 * 
 * Key concepts:
 * - JSON.stringify() converts JavaScript objects to JSON string
 * - localStorage.setItem() stores data with a key
 */
function saveTasks() {
    // Convert tasks array to JSON string and save
    // LEARNING: JSON.stringify() serializes objects for storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ==============================================
// TASK CRUD OPERATIONS
// ==============================================

/**
 * Adds a new task to the list
 * LEARNING: Object creation, array manipulation, and validation
 * 
 * Flow:
 * 1. Validate input (not empty)
 * 2. Create task object with unique ID
 * 3. Add to beginning of array
 * 4. Save and render
 */
function addTask() {
    // Get trimmed input value
    // LEARNING: trim() removes whitespace from both ends
    const taskText = taskInput.value.trim();
    
    // Validation: ensure task is not empty
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Create new task object
    // LEARNING: Object literal with multiple properties
    const newTask = {
        id: Date.now(),                      // Unique ID using current timestamp
        text: taskText,                       // Task description
        completed: false,                     // Initially not completed
        createdAt: new Date().toISOString()   // ISO 8601 timestamp
    };
    
    // Add to beginning of array
    // LEARNING: unshift() adds element to start (vs push() adds to end)
    tasks.unshift(newTask);
    
    // Save to localStorage
    saveTasks();
    
    // Update UI
    renderTasks();
    
    // Clear input field and refocus
    taskInput.value = '';
    taskInput.focus();  // LEARNING: focus() puts cursor in input
}

/**
 * Toggles task completion status
 * LEARNING: Array find() method to locate object by property
 * 
 * @param {number} id - Task ID to toggle
 */
function toggleTask(id) {
    // Find task by ID
    // LEARNING: find() returns first element matching condition
    // Arrow function (t => t.id === id) is shorthand for function(t) { return t.id === id; }
    const task = tasks.find(t => t.id === id);
    
    if (task) {
        // Toggle completed status
        // LEARNING: ! operator negates boolean
        task.completed = !task.completed;
        
        saveTasks();
        renderTasks();
    }
}

/**
 * Deletes a task from the list
 * LEARNING: Array filter() creates new array excluding deleted item
 * 
 * @param {number} id - Task ID to delete
 */
function deleteTask(id) {
    // Confirm before deletion
    if (confirm('Are you sure you want to delete this task?')) {
        // Filter out the task with matching ID
        // LEARNING: filter() creates new array with elements that pass test
        // !== means "not equal" (keeps all tasks except the one to delete)
        tasks = tasks.filter(t => t.id !== id);
        
        saveTasks();
        renderTasks();
    }
}

/**
 * Enables inline editing of a task
 * LEARNING: contentEditable property and Selection API
 * 
 * @param {number} id - Task ID to edit
 * 
 * Behavior:
 * - Click edit → text becomes editable
 * - Click checkmark → save changes
 * - Press Enter → save changes
 * - Press Escape → cancel changes
 */
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    // Find task elements in DOM
    // LEARNING: Attribute selector [data-id="${id}"] finds element by data attribute
    const taskElement = document.querySelector(`[data-id="${id}"]`);
    const taskTextElement = taskElement.querySelector('.task-text');
    const editBtn = taskElement.querySelector('.btn-edit');
    
    // Check if currently in edit mode
    if (taskTextElement.contentEditable === 'true') {
        // SAVE MODE: User finished editing
        
        const newText = taskTextElement.textContent.trim();
        
        // Validate: task cannot be empty
        if (newText === '') {
            alert('Task cannot be empty!');
            taskTextElement.textContent = task.text;  // Restore original text
            return;
        }
        
        // Save new text
        task.text = newText;
        
        // Exit edit mode
        taskTextElement.contentEditable = 'false';
        taskTextElement.classList.remove('editing');
        editBtn.textContent = '✏️';
        
        saveTasks();
    } else {
        // EDIT MODE: Enable editing
        
        // Make text editable
        // LEARNING: contentEditable='true' makes element editable like an input
        taskTextElement.contentEditable = 'true';
        taskTextElement.classList.add('editing');
        taskTextElement.focus();
        editBtn.textContent = '✔️';
        
        // Select all text for easy replacement
        // LEARNING: Selection API for text selection
        const range = document.createRange();           // Create range object
        const selection = window.getSelection();        // Get selection object
        range.selectNodeContents(taskTextElement);      // Select all text
        selection.removeAllRanges();                    // Clear existing selection
        selection.addRange(range);                      // Apply new selection
    }
}

/**
 * Clears all completed tasks
 * LEARNING: filter() to remove multiple items
 */
function clearCompletedTasks() {
    // Count completed tasks
    const completedCount = tasks.filter(t => t.completed).length;
    
    // Check if there are any completed tasks
    if (completedCount === 0) {
        alert('No completed tasks to clear!');
        return;
    }
    
    // Confirm before clearing
    if (confirm(`Delete ${completedCount} completed task(s)?`)) {
        // Keep only non-completed tasks
        // LEARNING: !t.completed means "not completed" (active tasks)
        tasks = tasks.filter(t => !t.completed);
        
        saveTasks();
        renderTasks();
    }
}

// ==============================================
// FILTERING FUNCTIONS
// ==============================================

/**
 * Returns filtered array based on currentFilter
 * LEARNING: switch statement for multiple conditions
 * 
 * @returns {Array} Filtered tasks array
 */
function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            // Show only incomplete tasks
            return tasks.filter(t => !t.completed);
        case 'completed':
            // Show only completed tasks
            return tasks.filter(t => t.completed);
        default:
            // Show all tasks
            return tasks;
    }
}

// ==============================================
// UI RENDERING FUNCTIONS
// ==============================================

/**
 * Renders task list in the DOM
 * LEARNING: Dynamic DOM creation with createElement and appendChild
 * 
 * Flow:
 * 1. Clear existing list
 * 2. Get filtered tasks
 * 3. Show/hide empty state
 * 4. Create DOM elements for each task
 * 5. Attach event listeners
 */
function renderTasks() {
    // Clear current list
    taskList.innerHTML = '';
    
    // Get filtered tasks based on current filter
    const filteredTasks = getFilteredTasks();
    
    // Show empty state if no tasks
    if (filteredTasks.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
    
    // Create DOM element for each task
    // LEARNING: forEach() executes function for each array element
    filteredTasks.forEach(task => {
        // Create list item container
        const li = document.createElement('li');
        
        // Set class with conditional 'completed' class
        // LEARNING: Template literal with ternary operator
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        // Store task ID in data attribute
        // LEARNING: data-* attributes store custom data on elements
        li.setAttribute('data-id', task.id);
        
        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        
        // Add toggle event listener
        // LEARNING: Arrow function () => captures variables from outer scope
        checkbox.addEventListener('change', () => toggleTask(task.id));
        
        // Create task text element
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;
        
        // Add keyboard shortcuts for editing
        taskText.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();  // Prevent line break
                editTask(task.id);
            }
            if (e.key === 'Escape') {
                // Cancel editing
                taskText.textContent = task.text;  // Restore original
                taskText.contentEditable = 'false';
                taskText.classList.remove('editing');
            }
        });
        
        // Create actions container
        const actions = document.createElement('div');
        actions.className = 'task-actions';
        
        // Create edit button
        const editBtn = document.createElement('button');
        editBtn.className = 'btn-icon btn-edit';
        editBtn.textContent = '✏️';
        editBtn.addEventListener('click', () => editTask(task.id));
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-icon btn-delete';
        deleteBtn.textContent = '🗑️';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        // Assemble actions
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        
        // Assemble task item
        // LEARNING: Building DOM tree with appendChild
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(actions);
        
        // Add to task list
        taskList.appendChild(li);
    });
    
    // Update statistics
    updateStats();
}

/**
 * Updates task statistics display
 * LEARNING: String interpolation with conditional pluralization
 */
function updateStats() {
    const total = tasks.length;
    const active = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;
    
    // Display stats with proper pluralization
    // LEARNING: Ternary operator (condition ? ifTrue : ifFalse)
    totalTasks.textContent = `${total} task${total !== 1 ? 's' : ''} (${active} active, ${completed} completed)`;
}

// ==============================================
// EVENT LISTENERS
// ==============================================

/**
 * Add button click handler
 */
addBtn.addEventListener('click', addTask);

/**
 * Enter key in input field adds task
 * LEARNING: keypress event for keyboard shortcuts
 */
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

/**
 * Clear completed button handler
 */
clearCompleted.addEventListener('click', clearCompletedTasks);

/**
 * Filter button handlers
 * LEARNING: forEach on NodeList to attach multiple listeners
 */
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove 'active' class from all filter buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add 'active' class to clicked button
        btn.classList.add('active');
        
        // Update filter and re-render
        // LEARNING: dataset property accesses data-* attributes
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// ==============================================
// INITIALIZATION
// ==============================================

/**
 * Load tasks from localStorage on page load
 * LEARNING: Script execution order - this runs when script loads
 */
loadTasks();
