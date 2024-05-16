//==============================================================
// Array container for all todo lists
//==============================================================
// const todos = localStorage.getItem("todos")
//   ? JSON.parse(localStorage.getItem("todos"))
//   : [];

// const todoList = document.getElementById("todoList");
// const inputForm = document.getElementById("inputForm");
// const todoInput = document.getElementById("todoInput");
// const addButton = document.querySelector(".btn");
// const deleteButton = document.getElementById("deleteButton");


// /==============================================================
// Selectors
//==============================================================
const form = document.getElementById("inputForm");
const input = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
//==============================================================
// Array container for all todo lists
//==============================================================
const todos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];
//==============================================================
// Function to add todo
//==============================================================
const addTodo = (e) => {
  e.preventDefault();
  if (input.value === "") {
    alert("Please enter todo in the input field");
    return;
  }
  todos.push({ id: todos.length + 1, goal: input.value });
  localStorage.setItem("todos", JSON.stringify(todos));
  // Reset the input field after the new input is added
  input.value = "";
  // Call the function showTodos()
  showTodos();
};
//======================================================================================
// Show todos on browser. It is included in the addTodo function
//======================================================================================
const showTodos = () => {
  const mytodos = todos
    .map((todo) => {
      return `
      <div class="todo__dev">
         <li class="todo"> ${todo.id}. ${todo.goal} </li>
        <i class="fa-solid fa-square-check cursor-pointer mx-1 text-green-500 hover:text-green-400 completed-todo"></i>
        <i class="fa-solid fa-pen-to-square cursor-pointer  mx-1 text-blue-500 hover:text-blue-800"></i>
        <i class="fa-solid fa-trash-can cursor-pointer  mx-1 text-red-500 hover:text-red-700"></i>
       </div>
       `;
    })
    .join("");
  todoList.innerHTML = mytodos;
};
showTodos();
//=========================================================================================================
// Function to Delete and Check todo
//=========================================================================================================
const deleteTodo = (e) => {
  const item = e.target;
  const filterItem =
    item.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML
      .split(". ")[1]
      .trim();
  const restTodos = todos.filter((todo) => {
    if (todo.goal !== filterItem) {
      return todo;
    }
  });
  localStorage.clear("todos");
  localStorage.setItem("todos", JSON.stringify(restTodos));
  showTodos();
};
// =========================================================================================================
// Completed todo
// =========================================================================================================
const completedTodo = (e) => {
  const item = e.target;
  const todo = document.querySelector(".todo__dev");
  if (item.classList[1] === "fa-square-check") {
    todo.classList.toggle("completed");
  }
  console.log("next sibling", item);
};
//==============================================================
// Event Listeners
//==============================================================
form.addEventListener("submit", addTodo);
todoList.addEventListener("click", deleteTodo);
todoList.addEventListener("click", completedTodo);










// // Initialize
// addButton.addEventListener("click", addTask);
// todoInput.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault(); // Prevents default Enter key behavior
//     addTask();
//   }
// });
// deleteButton.addEventListener("click", deleteAllTasks);
// displayTasks();

// function addTask() {
//   const newTask = todoInput.value.trim();
//   if (newTask !== "") {
//     todo.push({ text: newTask, disabled: false });
//     saveToLocalStorage();
//     todoInput.value = "";
//     displayTasks();
//   }
// }

// function displayTasks() {
//   todoList.innerHTML = "";
//   todo.forEach((item, index) => {
//     const p = document.createElement("p");
//     p.innerHTML = `
//       <div class="todo-container">
//         <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
//       item.disabled ? "checked" : ""
//     }>
//         <p id="todo-${index}" class="${
//       item.disabled ? "disabled" : ""
//     }" onclick="editTask(${index})">${item.text}</p>
//       </div>
//     `;
//     p.querySelector(".todo-checkbox").addEventListener("change", () =>
//       toggleTask(index)
//     );
//     todoList.appendChild(p);
//   });
//   todoCount.textContent = todo.length;
// }

// // function editTask(index) {
// //   const todoItem = document.getElementById(`todo-${index}`);
// //   const existingText = todo[index].text;
// //   const inputElement = document.createElement("input");

// //   inputElement.value = existingText;
// //   todoItem.replaceWith(inputElement);
// //   inputElement.focus();

// //   inputElement.addEventListener("blur", function () {
// //     const updatedText = inputElement.value.trim();
// //     if (updatedText) {
// //       todo[index].text = updatedText;
// //       saveToLocalStorage();
// //     }
// //     displayTasks();
// //   });
// // }

// // function toggleTask(index) {
// //   todo[index].disabled = !todo[index].disabled;
// //   saveToLocalStorage();
// //   displayTasks();
// // }

// // function deleteAllTasks() {
// //   todo = [];
// //   saveToLocalStorage();
// //   displayTasks();
// // }

// function saveToLocalStorage() {
//   localStorage.setItem("todo", JSON.stringify(todo));
// }
