//==============================================================
// Selectors
//==============================================================

const form = document.getElementById('inputForm');
const input = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

//==============================================================
// Array container for all todo lists
//==============================================================

const todos = localStorage.getItem('todos')
  ? JSON.parse(localStorage.getItem('todos'))
  : [];

//==============================================================
// Function to add todo
//==============================================================

const addTodo = (e) => {
  e.preventDefault();
  const currentInput = input.value.trim();

  if (currentInput === '') {
    alert('Please enter todo in the input field');
    return;
  } else if (
    currentInput === todos[0]?.goal ||
    currentInput === todos[1]?.goal ||
    currentInput === todos[2]?.goal ||
    currentInput === todos[3]?.goal ||
    currentInput === todos[4]?.goal
  ) {
    alert('This task already exists. Please try another one!');
    return;
  } else if (todos.length > 4) {
    alert(
      'The maximum number of todolist has been reached. Please complete the current tasks before adding further tasks.'
    );
  } else {
    todos.push({ id: todos.length + 1, goal: input.value });
    localStorage.setItem('todos', JSON.stringify(todos));

    // Reset the input field after the new input is added
    input.value = '';

    // Call the function showTodos()
    showTodos();
  }
};

//=================================================================================================================
// Show todos on browser. It is included in the addTodo function
//=================================================================================================================

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
    .join('');
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
      .split('. ')[1]
      .trim();
  const restTodos = todos.filter((todo) => {
    if (todo.goal !== filterItem) {
      return todo;
    }
  });

  if (item.classList[1] === 'fa-trash-can') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    todo.addEventListener('trasitionend', () => {
      todo.remove();
    });
  }

  localStorage.clear('todos');
  localStorage.setItem('todos', JSON.stringify(restTodos));
  // showTodos();
};

// =========================================================================================================
// Completed todo
// =========================================================================================================

const completedTodo = (e) => {
  const item = e.target;

  if (item.classList[1] === 'fa-square-check') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
};

//==========================================================================================================
// Event Listeners
//==========================================================================================================

form.addEventListener('submit', addTodo);
todoList.addEventListener('click', deleteTodo);
todoList.addEventListener('click', completedTodo);
