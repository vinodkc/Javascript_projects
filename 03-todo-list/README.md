# To-Do List App

A feature-rich to-do list application with localStorage persistence, editing capabilities, and task filtering.

## 🎯 Learning Objectives

By completing this project, you will:
- Master localStorage for data persistence across browser sessions
- Learn advanced array methods (filter, find, reduce, forEach)
- Understand CRUD operations (Create, Read, Update, Delete)
- Implement inline editing with contentEditable API
- Work with JSON serialization and deserialization
- Create filtering and statistics features

## 📚 What You'll Learn

### Core Concepts
1. **Data Persistence**: Storing and retrieving data from localStorage
2. **Array Manipulation**: Using functional methods for data operations
3. **Object Management**: Creating and updating task objects
4. **Dynamic UI**: Rendering tasks based on current state and filters
5. **User Interactions**: Inline editing, filtering, and bulk operations

### Skills Developed
- localStorage API (`setItem`, `getItem`, `JSON.stringify`, `JSON.parse`)
- Array methods: `filter()`, `find()`, `unshift()`, `reduce()`
- ContentEditable API for inline editing
- Event delegation for dynamically created elements
- Confirmation dialogs for destructive actions
- Unique ID generation using timestamps

## 🔧 Implementation Explanation

### How It Works

**1. Data Structure**
Each task is an object:
```javascript
{
  id: Date.now(),              // Unique timestamp ID
  text: "Task description",    // Task content
  completed: false,            // Completion status
  createdAt: new Date().toISOString()  // Creation timestamp
}
```

**2. State Management**
```javascript
tasks: array of all task objects
currentFilter: 'all' | 'active' | 'completed'
```

**3. CRUD Operations**

**Create**:
- Validates input (non-empty, max 100 chars)
- Creates task object with unique ID
- Adds to beginning of tasks array using `unshift()`
- Saves to localStorage
- Re-renders UI

**Read**:
- Loads tasks from localStorage on page load
- Parses JSON string to array
- Applies current filter to display

**Update**:
- Toggle completion: Finds task by ID, flips `completed` boolean
- Edit text: Makes task contentEditable, captures Enter/Escape keys
- Saves changes to localStorage

**Delete**:
- Shows confirmation dialog
- Filters out task by ID using `filter()`
- Updates localStorage and re-renders

**4. Filtering System**
```javascript
getFilteredTasks():
  - 'all': returns all tasks
  - 'active': filter(task => !task.completed)
  - 'completed': filter(task => task.completed)
```

**5. Statistics Calculation**
```javascript
Total: tasks.length
Active: tasks.filter(t => !t.completed).length
Completed: tasks.filter(t => t.completed).length
```

**6. LocalStorage Flow**
- Every modification calls `saveTasks()`
- `saveTasks()` converts tasks array to JSON string
- `loadTasks()` retrieves string and parses back to array
- Data persists even after browser close/refresh

**7. Inline Editing**
- Sets `contentEditable="true"` on task text
- Focuses element and selects text
- Enter saves, Escape cancels
- Validates and updates task object

**8. Bulk Operations**
- Clear Completed: Filters out completed tasks in one operation
- Updates localStorage and statistics

## Features

- ✅ Add new tasks with Enter key or button click
- ✅ Mark tasks as complete/incomplete with checkboxes
- ✅ Edit tasks inline by clicking the edit button
- ✅ Delete tasks with confirmation
- ✅ Filter tasks (All, Active, Completed)
- ✅ Clear all completed tasks at once
- ✅ Task statistics display (total, active, completed)
- ✅ LocalStorage persistence (tasks survive page refresh)
- ✅ Empty state message when no tasks
- ✅ Smooth animations and transitions
- ✅ Responsive design
- ✅ Character limit (100 chars per task)

## How to Use

1. Open `index.html` in your browser
2. Type a task in the input field and press Enter or click "Add"
3. Click the checkbox to mark a task as complete
4. Click the edit (✏️) button to edit a task inline
   - Press Enter to save or Escape to cancel
5. Click the delete (🗑️) button to remove a task
6. Use filter buttons to view All, Active, or Completed tasks
7. Click "Clear Completed" to remove all completed tasks

## 📖 Further Learning - W3Schools

- [JavaScript Array Methods](https://www.w3schools.com/js/js_array_methods.asp)
- [JavaScript Array Filter](https://www.w3schools.com/jsref/jsref_filter.asp)
- [JavaScript Array Find](https://www.w3schools.com/jsref/jsref_find.asp)
- [JavaScript LocalStorage](https://www.w3schools.com/html/html5_webstorage.asp)
- [JavaScript JSON](https://www.w3schools.com/js/js_json.asp)
- [JavaScript Array Reduce](https://www.w3schools.com/jsref/jsref_reduce.asp)
- [HTML contentEditable](https://www.w3schools.com/tags/att_global_contenteditable.asp)

## Learning Points

### HTML Concepts
- **Input Types**: `type="text"` with `maxlength` attribute
- **Checkbox Inputs**: For marking tasks complete
- **Dynamic Lists**: `<ul>` populated via JavaScript
- **Data Attributes**: Used for filtering (`data-filter`)
- **Button Types**: Different semantic button purposes
- **Semantic HTML**: Using appropriate tags for meaning
- **Placeholder Text**: Guide users with hints

### CSS Concepts
- **CSS Grid Layouts**: 
  - `.stats-grid` - Auto-fit columns
  - Responsive grid with minmax
- **Flexbox**: `.task-item { display: flex; gap: 10px; }`
- **CSS Animations**: `@keyframes slideIn` for new tasks
- **Hover Effects**: Interactive feedback on tasks
- **Pseudo-classes**: `:hover`, `:active`
- **Text Decoration**: `text-decoration: line-through` for completed
- **Opacity**: Visual feedback for completed items
- **Transform**: `transform: translateX(5px)` on hover
- **Accent Color**: `accent-color: #667eea` for checkboxes
- **Grid Auto-fit**: `grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))`
- **Transitions**: Smooth state changes
- **Word Breaking**: `word-wrap: break-word` for long text

### JavaScript Concepts
- **LocalStorage API**:
  - `localStorage.setItem(key, value)` - Store data
  - `localStorage.getItem(key)` - Retrieve data
  - `JSON.stringify(object)` - Convert object to string
  - `JSON.parse(string)` - Convert string to object
- **Array Methods**:
  - `filter()` - Create new array with matching items
  - `find()` - Find first matching item
  - `unshift()` - Add to beginning of array
  - `reduce()` - Calculate totals
  - `forEach()` - Iterate through items
- **Object Structure**:
  ```javascript
  {
    id: Date.now(),
    text: "Task description",
    completed: false,
    createdAt: new Date().toISOString()
  }
  ```
- **Unique IDs**: `Date.now()` for timestamp-based IDs
- **ContentEditable API**:
  - `element.contentEditable = 'true'` - Make editable
  - `window.getSelection()` - Text selection
  - `document.createRange()` - Select text range
- **Event Delegation**: 
  - Attach listeners to dynamically created elements
  - Event bubbling for efficiency
- **DOM Manipulation**:
  - `createElement()` - Create elements
  - `appendChild()` - Add to DOM
  - `innerHTML = ''` - Clear container
- **Confirmation Dialogs**: `confirm()` for user confirmation
- **Ternary Operators**: `condition ? true : false`
- **Template Literals**: Dynamic HTML creation
- **State Management**:
  - `tasks` array - Main data store
  - `currentFilter` - UI state
- **Keyboard Events**: `e.key === 'Enter'` for shortcuts

## Keyboard Shortcuts

- `Enter` in input field: Add new task
- `Enter` while editing: Save changes
- `Escape` while editing: Cancel changes

## Future Enhancements Ideas

- Add due dates to tasks
- Priority levels (high, medium, low)
- Categories or tags
- Search functionality
- Drag and drop to reorder
- Export/import tasks
- Dark mode toggle

