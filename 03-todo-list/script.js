const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const totalTasks = document.getElementById('totalTasks');
const clearCompleted = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');

let tasks = [];
let currentFilter = 'all';

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.unshift(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskInput.focus();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    const taskElement = document.querySelector(`[data-id="${id}"]`);
    const taskTextElement = taskElement.querySelector('.task-text');
    const editBtn = taskElement.querySelector('.btn-edit');
    
    if (taskTextElement.contentEditable === 'true') {
        const newText = taskTextElement.textContent.trim();
        if (newText === '') {
            alert('Task cannot be empty!');
            taskTextElement.textContent = task.text;
            return;
        }
        task.text = newText;
        taskTextElement.contentEditable = 'false';
        taskTextElement.classList.remove('editing');
        editBtn.textContent = '✏️';
        saveTasks();
    } else {
        taskTextElement.contentEditable = 'true';
        taskTextElement.classList.add('editing');
        taskTextElement.focus();
        editBtn.textContent = '✔️';
        
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(taskTextElement);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function clearCompletedTasks() {
    const completedCount = tasks.filter(t => t.completed).length;
    
    if (completedCount === 0) {
        alert('No completed tasks to clear!');
        return;
    }
    
    if (confirm(`Delete ${completedCount} completed task(s)?`)) {
        tasks = tasks.filter(t => !t.completed);
        saveTasks();
        renderTasks();
    }
}

function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(t => !t.completed);
        case 'completed':
            return tasks.filter(t => t.completed);
        default:
            return tasks;
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    const filteredTasks = getFilteredTasks();
    
    if (filteredTasks.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
    
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', task.id);
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTask(task.id));
        
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;
        taskText.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                editTask(task.id);
            }
            if (e.key === 'Escape') {
                taskText.textContent = task.text;
                taskText.contentEditable = 'false';
                taskText.classList.remove('editing');
            }
        });
        
        const actions = document.createElement('div');
        actions.className = 'task-actions';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'btn-icon btn-edit';
        editBtn.textContent = '✏️';
        editBtn.addEventListener('click', () => editTask(task.id));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-icon btn-delete';
        deleteBtn.textContent = '🗑️';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(actions);
        
        taskList.appendChild(li);
    });
    
    updateStats();
}

function updateStats() {
    const total = tasks.length;
    const active = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;
    
    totalTasks.textContent = `${total} task${total !== 1 ? 's' : ''} (${active} active, ${completed} completed)`;
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

clearCompleted.addEventListener('click', clearCompletedTasks);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

loadTasks();

