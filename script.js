// Array to hold the tasks
let tasks = [];

// Function to add a new task
function addTask() {
  // Getting the task input and priority input from the form
  const taskInput = document.getElementById('taskInput').value;
  const priorityInput = document.getElementById('priorityInput').value;

  // If task input is empty, alert the user if true
  if (!taskInput) {
    alert('Please enter a task!');
    return;
  }

  // Adding the new task to the tasks array with name, priority, and completion status
  tasks.push({ name: taskInput, priority: priorityInput, completed: false });

  // Clearing the task input field after adding the task
  document.getElementById('taskInput').value = '';
  
  // Updating task list to show the newly added task
  updateTaskList();
}

// Updating displayed task list
function updateTaskList() {

// Get the container element where the tasks will be displayed
  const tasksContainer = document.getElementById('tasksContainer');
  
// Clear the container before displaying updated tasks
  tasksContainer.innerHTML = '';
  
// Loop through each task and create a task item element
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('list-group-item', 'mb-2');
    
// Setting the task item content, buttons for completion and deletion
    taskItem.innerHTML = `
      <span>${task.name} (${task.priority})</span>
      <div>
        <button class="btn btn-success btn-sm" onclick="toggleComplete(${index})">Complete</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    
// Marking completed task with a line-through
    if (task.completed) {
      taskItem.classList.add('completed');
      taskItem.style.textDecoration = 'line-through';
    }
    
// Appending the task items to the tasks container
    tasksContainer.appendChild(taskItem);
  });

// Updating total number of tasks and completed tasks in the list
  document.getElementById('totalTasks').innerText = tasks.length;
  document.getElementById('completedTasks').innerText = tasks.filter(task => task.completed).length;
}

// Function to toggle the completion status of a task
function toggleComplete(index) {
  // Toggling the completed status of the task
  tasks[index].completed = !tasks[index].completed;
  
  // Updating the task list to show the change
  updateTaskList();
}

// Function to delete a task
function deleteTask(index) {
  // Removing the task from the tasks array
  tasks.splice(index, 1);
  
  // Updating the task list to show the change
  updateTaskList();
}

// Function to sort tasks by a given criteria (alphabetical or priority)
function sortTasks(criteria) {
  // Sorting tasks alphabetically by name
  if (criteria === 'alphabetical') {
    tasks.sort((a, b) => a.name.localeCompare(b.name));
  } 
 // Sorting tasks by their priority levels
  else if (criteria === 'priority') {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

// Updating task list after sorting
  updateTaskList();
}
  