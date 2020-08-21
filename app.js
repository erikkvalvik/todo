// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// functions
function createButtons(todoDiv) {
  // Completed Button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"> </i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);

  // Trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);
}

function removeLocalTodos(todo) {
  // check--do ialready have things in there?
  const todos = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : [];

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);

  localStorage.setItem('todos', JSON.stringify(todos));
}

function saveLocalTodos(todo) {
  // check--do ialready have things in there?
  const todos = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : [];

  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Todo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  // add todo to localstorage
  saveLocalTodos(todoInput.value);

  // create Buttons and add them to the div
  createButtons(todoDiv);

  // Append to list
  todoList.appendChild(todoDiv);

  // Clear todo INPUT value
  todoInput.value = '';
}

function deleteCheck(e) {
  const item = e.target;
  // delete todo

  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    // animation
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', () => {
      todo.remove();
    });
  }

  // checkmark
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function getStyle(e, todo) {
  switch (e.target.value) {
    case 'all':
      return 'flex';
    case 'completed':
      if (todo.classList.contains('completed')) return 'flex';
      return 'none';
    case 'uncompleted':
      if (!todo.classList.contains('completed')) return 'flex';
      return 'none';
    default:
      return 'none';
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((element) => {
    const todo = element;
    todo.style.display = getStyle(e, todo);
  });
}

function getTodos() {
  // check--do ialready have things in there?
  const todos = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : [];

  todos.forEach((todo) => {
    // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // create Buttons and add them to the div
    createButtons(todoDiv);

    // Append div to list
    todoList.appendChild(todoDiv);
  });
}

// event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
