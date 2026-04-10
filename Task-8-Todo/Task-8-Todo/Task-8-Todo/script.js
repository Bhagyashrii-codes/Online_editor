// Debug message
console.log("JavaScript connected successfully!");


// SELECT ELEMENTS

const button =
document.getElementById("changeTextBtn");

const text =
document.getElementById("text");

const heading =
document.getElementById("heading");

const colorBtn =
document.getElementById("changeColorBtn");

const darkBtn =
document.getElementById("toggleModeBtn");



// EVENT 1 → Change Text

button.addEventListener(
"click",
function () {

    text.textContent =
    "Text changed using JavaScript!";

    text.style.color = "yellow";

    console.log("Text Changed");

}
);



// EVENT 2 → Toggle Heading Color

colorBtn.addEventListener(
"click",
function () {

    heading.classList.toggle("highlight");

    console.log("Heading Color Toggled");

}
);



// EVENT 3 → Toggle Dark Mode

darkBtn.addEventListener(
"click",
function () {

    document.body.classList.toggle("dark-mode");

    console.log("Dark Mode Toggled");

}
);
// ================== TODO APP ==================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = [];

// Add Task
addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Task cannot be empty!");
        return;
    }

    const task = {
        text: text,
        completed: false
    };

    tasks.push(task);
    renderTasks();

    taskInput.value = "";
}

// Render Tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        // Mark Complete
        li.addEventListener("click", () => {
            task.completed = !task.completed;
            renderTasks();
        });

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            renderTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
// Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
    const saved = localStorage.getItem("tasks");
    if (saved) {
        tasks = JSON.parse(saved);
        renderTasks();
    }
}

// Call inside add/delete/complete
saveTasks();

// Run on page load
loadTasks();
