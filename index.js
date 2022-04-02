"use strict";
// All elements selected
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

//All event listeners
function eventListeners() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  todoList.addEventListener("click", deleteTodo);
  todoList.addEventListener("click", doneTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}

// Alert Function-------------------------------------------------------------
function showAlert(type, message) {
  const alert = document.createElement("div");

  alert.className = `alert alert-${type}`;

  alert.textContent = message;
  firstCardBody.appendChild(alert);

  setTimeout(function () {
    alert.remove();
  }, 1500);
}

//Add a new Todo----------------------------------------------------------------

function addTodo(e) {
  const newTodo = todoInput.value.trim();

  if (newTodo === "") {
    showAlert("danger", "Please enter a toDo");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "ToDo added successfully");
  }

  e.preventDefault();
}

function addTodoToUI(newTodo) {
  //create a item
  const listItem = document.createElement("li");
  listItem.className = "list-group-item d-flex justify-content-between";

  // create a link
  const linkDelete = document.createElement("a");
  linkDelete.href = "#";
  linkDelete.className = "delete-item ";
  linkDelete.innerHTML = "<i class = 'fa fa-remove'></i>";

  const linkDone = document.createElement("a");
  linkDone.href = "#";
  linkDone.className = "done-item ms-auto me-4";
  linkDone.innerHTML = "<i class='fa-solid fa-check'></i>";

  // //add a text node to li
  listItem.appendChild(document.createTextNode(newTodo));

  //add a to li

  listItem.appendChild(linkDone);
  listItem.appendChild(linkDelete);

  //add listItem in Todo List
  todoList.appendChild(listItem);

  //clear input
  todoInput.value = "";
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();

  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("done", JSON.stringify(false));
}

// delete an item--------------------------------------------------------
function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "ToDo deleted successfully");
  }
  e.preventDefault();
}

function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
// done item -------------------------------------------------------------------------
function doneTodo(e) {
  if (e.target.className === "fa-solid fa-check") {
    e.target.parentElement.parentElement.setAttribute(
      "style",
      "text-decoration:line-through; color:green"
    );
    doneTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "You have completed this task");
  }
  e.preventDefault();
}

function doneTodoFromStorage(donetodo) {
  let todos = getTodosFromStorage();

  localStorage.setItem("todos", JSON.stringify(todos));
}
// delete all items-------------------------------------------------------------------
function clearAllTodos(e) {
  if (confirm("Are you sure you want to delete all?")) {
    while (todoList.firstElementChild != null) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
  e.preventDefault();
}

// Filter items-----------------------------------------------------------------------
function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");
  console.log(listItems);
  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    console.log(text);
    if (text.indexOf(filterValue) === -1) {
      //not find
      listItem.setAttribute("style", "display:none !important");
    } else {
      listItem.setAttribute("style", "display:block");
    }
  });
}

function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}
