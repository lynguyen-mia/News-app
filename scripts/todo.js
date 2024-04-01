"use strict";

let todoArr = [];

// SELECTION ---------------------------------------------------------------
const addBtn = document.getElementById("btn-add");
const inputTask = document.getElementById("input-task");
const todoList = document.getElementById("todo-list");

// TASK CLASS --------------------------------------------------------------
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

// FUNCTIONS ----------------------------------------------------------------
//#region RENDER TASKS IN UI
function renderTasks(username) {
  // Get task list from local storage
  todoArr = getFromStorage("tasks", []);

  // Filter only tasks of current user
  const taskList = todoArr.filter((obj) => obj.owner === username);
  // console.log(taskList);

  // Render tasks in UI
  todoList.innerHTML = "";
  taskList.forEach((o) => {
    const li = document.createElement("li");
    li.innerHTML = `${o.task}<span class="close">×</span>`;
    o.isDone ? li.classList.add("checked") : "";
    todoList.prepend(li);
  });
}
//#endregion

// FIND INDEX OF OBJECT IN AN OBJECT ARRAY
function findIndex(object) {
  const isDoneStatus = object.className ? true : false;
  const index = todoArr.findIndex(
    (o) =>
      o.task === object.textContent.slice(0, -1) && o.isDone === isDoneStatus
  );
  return index;
}

// EVENT HANDLERS -------------------------------------------------------------
// LOAD DATA FROM LOCAL STORAGE WHEN LOADING PAGE
window.addEventListener("load", function () {
  // Get current user
  const objectcurrentUser = getFromStorage("currentUser", []);
  currentUser = objectcurrentUser.map((obj) => parseUser(obj));

  // Render task list
  renderTasks(currentUser[0]?.username);
});

// ADDING TASKS
addBtn.addEventListener("click", function () {
  // Guard clause
  if (!inputTask.value) return alert("Please input a task!");

  const newTask = new Task(inputTask.value, currentUser[0].username, false);
  // Add new task to array & save to storage
  todoArr.push(newTask);
  saveToStorage("tasks", todoArr);
  inputTask.value = "";

  // Render task list
  renderTasks(currentUser[0].username);
});

// TOGGLE & DELETE TASK
todoList.addEventListener("click", function (e) {
  // Toggle between on-going and done
  if (e.target.nodeName === "LI") {
    // Find index of toggled element
    const ind = findIndex(e.target);

    e.target.classList.toggle("checked");

    // Change status of object in array and save to storage
    todoArr.at(ind).isDone = todoArr.at(ind).isDone ? false : true;
    saveToStorage("tasks", todoArr);
  }

  // Delete task
  if (e.target.nodeName === "SPAN") {
    const elementToBeDeleted = e.target.closest("li");

    // Find index of element to be deleted
    const ind = findIndex(elementToBeDeleted);

    elementToBeDeleted.remove();

    // Delete task in array and save to storage
    todoArr.splice(ind, 1);
    saveToStorage("tasks", todoArr);
  }
});
