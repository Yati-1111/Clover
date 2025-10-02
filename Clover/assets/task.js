// assets/tasks.js

// category is passed from JSP
const taskList = document.getElementById("task-list");
const addTaskBtn = document.getElementById("add-task-btn");
const popup = document.getElementById("achievement-popup");

function loadTasks(category) {
    const tasks = JSON.parse(localStorage.getItem(category) || "[]");
    taskList.innerHTML = "";
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-state"><h3>No tasks yet</h3><p>Click the + button to add your first task</p></div>';
        return;
    }
    
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item animate__animated animate__fadeIn";

        // Task content wrapper
        const taskContent = document.createElement("div");
        taskContent.className = "task-content";

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.done;
        checkbox.onchange = () => toggleTask(index, category);

        // Task text wrapper (text + deadline together)
        const textWrapper = document.createElement("div");
        textWrapper.style.display = "flex";
        textWrapper.style.flexDirection = "column";
        textWrapper.style.gap = "4px";
        textWrapper.style.flex = "1";

        // Task text
        const textSpan = document.createElement("span");
        textSpan.className = "task-text" + (task.done ? " task-completed" : "");
        textSpan.textContent = task.text;
        textSpan.style.color = "#333";
        textSpan.style.fontWeight = "600";
        textSpan.style.fontSize = "17px";

        textWrapper.appendChild(textSpan);

        // Deadline - ALWAYS create and append it
        if (task.deadline && task.deadline.trim() !== "") {
            const deadlineSpan = document.createElement("span");
            deadlineSpan.className = "task-deadline";
            deadlineSpan.textContent = "📅 Due: " + task.deadline;
            deadlineSpan.style.fontSize = "14px";
            deadlineSpan.style.color = "#E4281F";
            deadlineSpan.style.fontWeight = "500";
            deadlineSpan.style.opacity = "0.85";
            textWrapper.appendChild(deadlineSpan);
        }

        // Append checkbox and text wrapper to task content
        taskContent.appendChild(checkbox);
        taskContent.appendChild(textWrapper);

        // Task actions wrapper
        const taskActions = document.createElement("div");
        taskActions.className = "task-actions";

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.className = "task-btn edit-btn";
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTaskModal(index, category);

        // Remove button
        const removeBtn = document.createElement("button");
        removeBtn.className = "task-btn remove-btn";
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => removeTask(index, category);

        taskActions.appendChild(editBtn);
        taskActions.appendChild(removeBtn);

        // Append everything to list item
        li.appendChild(taskContent);
        li.appendChild(taskActions);
        taskList.appendChild(li);
    });
}

function addTask(category) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'task-modal';
    modal.innerHTML = `
        <h3>Add New Task</h3>
        <input type="text" id="task-input" placeholder="Enter task..." style="width: 100%; margin: 10px 0; padding: 12px; border: 1px solid rgba(0,0,0,0.12); border-radius: 8px; font-family: Georgia, serif; font-size: 15px;">
        <label style="display: block; margin-top: 10px; color: #6B2E1F; font-weight: 600; font-size: 14px;">Deadline (optional):</label>
        <input type="date" id="deadline-input" style="width: 100%; margin: 10px 0; padding: 12px; border: 1px solid rgba(0,0,0,0.12); border-radius: 8px; font-family: Georgia, serif; font-size: 15px;">
        <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button id="cancel-btn" style="flex: 1; padding: 12px; background-color: #f0f0f0; color: #333; border: none; border-radius: 8px; font-weight: 600; font-family: Georgia, serif; cursor: pointer;">Cancel</button>
            <button id="save-btn" style="flex: 1; padding: 12px; background-color: #E4281F; color: #FCEEC9; border: none; border-radius: 8px; font-weight: 700; font-family: Georgia, serif; cursor: pointer;">Add Task</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    
    // Focus on task input
    setTimeout(() => document.getElementById('task-input').focus(), 100);
    
    // Close modal function
    function closeModal() {
        overlay.remove();
        modal.remove();
    }
    
    // Cancel button
    document.getElementById('cancel-btn').onclick = closeModal;
    
    // Click overlay to close
    overlay.onclick = closeModal;
    
    // Save button
    document.getElementById('save-btn').onclick = () => {
        const text = document.getElementById('task-input').value.trim();
        const deadline = document.getElementById('deadline-input').value;
        
        if (!text) {
            alert('Please enter a task!');
            return;
        }
        
        const tasks = JSON.parse(localStorage.getItem(category) || "[]");
        tasks.push({ 
            text: text, 
            done: false, 
            deadline: deadline || "" 
        });
        
        localStorage.setItem(category, JSON.stringify(tasks));
        loadTasks(category);
        closeModal();
    };
    
    // Enter key to save
    document.getElementById('task-input').onkeypress = (e) => {
        if (e.key === 'Enter') {
            document.getElementById('save-btn').click();
        }
    };
}

function toggleTask(index, category) {
    const tasks = JSON.parse(localStorage.getItem(category) || "[]");
    tasks[index].done = !tasks[index].done;
    localStorage.setItem(category, JSON.stringify(tasks));
    loadTasks(category);
    
    // Show popup when task is completed
    if (tasks[index].done) {
        showPopup();
    }
}

function editTaskModal(index, category) {
    const tasks = JSON.parse(localStorage.getItem(category) || "[]");
    const task = tasks[index];
    
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'task-modal';
    modal.innerHTML = `
        <h3>Edit Task</h3>
        <input type="text" id="edit-task-input" value="${task.text.replace(/"/g, '&quot;')}" style="width: 100%; margin: 10px 0; padding: 12px; border: 1px solid rgba(0,0,0,0.12); border-radius: 8px; font-family: Georgia, serif; font-size: 15px;">
        <label style="display: block; margin-top: 10px; color: #6B2E1F; font-weight: 600; font-size: 14px;">Deadline (optional):</label>
        <input type="date" id="edit-deadline-input" value="${task.deadline || ''}" style="width: 100%; margin: 10px 0; padding: 12px; border: 1px solid rgba(0,0,0,0.12); border-radius: 8px; font-family: Georgia, serif; font-size: 15px;">
        <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button id="cancel-edit-btn" style="flex: 1; padding: 12px; background-color: #f0f0f0; color: #333; border: none; border-radius: 8px; font-weight: 600; font-family: Georgia, serif; cursor: pointer;">Cancel</button>
            <button id="save-edit-btn" style="flex: 1; padding: 12px; background-color: #E4281F; color: #FCEEC9; border: none; border-radius: 8px; font-weight: 700; font-family: Georgia, serif; cursor: pointer;">Save Changes</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    
    // Focus on task input and select all text
    setTimeout(() => {
        const input = document.getElementById('edit-task-input');
        input.focus();
        input.select();
    }, 100);
    
    // Close modal function
    function closeModal() {
        overlay.remove();
        modal.remove();
    }
    
    // Cancel button
    document.getElementById('cancel-edit-btn').onclick = closeModal;
    
    // Click overlay to close
    overlay.onclick = closeModal;
    
    // Save button
    document.getElementById('save-edit-btn').onclick = () => {
        const text = document.getElementById('edit-task-input').value.trim();
        const deadline = document.getElementById('edit-deadline-input').value;
        
        if (!text) {
            alert('Task cannot be empty!');
            return;
        }
        
        tasks[index].text = text;
        tasks[index].deadline = deadline || "";
        
        localStorage.setItem(category, JSON.stringify(tasks));
        loadTasks(category);
        closeModal();
    };
    
    // Enter key to save
    document.getElementById('edit-task-input').onkeypress = (e) => {
        if (e.key === 'Enter') {
            document.getElementById('save-edit-btn').click();
        }
    };
}

function removeTask(index, category) {
    if (confirm("Remove this task?")) {
        const tasks = JSON.parse(localStorage.getItem(category) || "[]");
        tasks.splice(index, 1);
        localStorage.setItem(category, JSON.stringify(tasks));
        loadTasks(category);
    }
}

function editTask(index, el, category) {
    // This function is no longer needed since we use modal
    // Keeping it here for backwards compatibility
}

function showPopup() {
    popup.classList.add("show");
    setTimeout(() => {
        popup.classList.remove("show");
    }, 2000);
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    // category variable is set in JSP
    if (typeof category !== 'undefined') {
        addTaskBtn.addEventListener("click", () => addTask(category));
        loadTasks(category);
    } else {
        console.error("Category variable not defined!");
    }
});