let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");
const todoCount = document.getElementById("todoCount");

// Initialize
addButton.addEventListener("click", addTask);
todoInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});
deleteButton.addEventListener("click", deleteAllTasks);
displayTasks();

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({ text: newTask, disabled: false });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}
