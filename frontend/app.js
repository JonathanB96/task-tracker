const API_URL = "http://localhost:5000/api/tasks";

const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");

// Fetch & display tasks
async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();

  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <span style="text-decoration: ${task.status === "completed" ? "line-through" : "none"}">
        ${task.title}
      </span>
      <div>
        <button class="btn btn-sm btn-warning me-2">Edit</button>
        <button class="btn btn-sm btn-success me-2">✓</button>
        <button class="btn btn-sm btn-danger">✕</button>
      </div>
    `;

    // Edit
    li.querySelector(".btn-warning").onclick = () =>
      editTask(task._id, task.title);

    // Update status
    li.querySelector(".btn-success").onclick = () =>
      updateTask(task._id);

    // Delete
    li.querySelector(".btn-danger").onclick = () =>
      deleteTask(task._id);

    taskList.appendChild(li);
  });
}


// Create task
addTaskBtn.onclick = async () => {
  const title = taskInput.value.trim();
  if (!title) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  taskInput.value = "";
  fetchTasks();
};

// Update task
async function updateTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "completed" })
  });

  fetchTasks();
}

async function editTask(id, currentTitle) {
  const newTitle = prompt("Edit task title:", currentTitle);
  if (!newTitle || newTitle.trim() === currentTitle) return;

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle.trim() })
  });

  fetchTasks();
}


// Delete task
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  fetchTasks();
}

// Load tasks on page load
fetchTasks();
