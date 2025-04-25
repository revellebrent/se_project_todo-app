import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text"); // Initialize the TodoCounter with the selector for the counter text element

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    // Central Standard Time - adjusted -6 hours
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    const id = uuidv4(); // Generate a new UUID for the todo (done)
    const values = { name, date, id };
    const todoElement = generateTodo(values); // Create a new todo element (done)
    section.addItem(todoElement); // Add the new todo to the section (done)
    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});
addTodoPopup.setEventListeners(); // Set event listeners for the popup

function handleCheckboxChange(completed) {
  todoCounter.updateCompleted(completed);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheckboxChange); // Pass the handleCheckboxChange function to the Todo class
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open(); // Open the popup when the button is clicked
});

// addTodoCloseBtn.addEventListener("click", () => {
//   addTodoPopup.close(); // Close the popup when the close button is clicked
// });

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   // Central Standard Time - adjusted -6 hours
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

//   const id = uuidv4(); // Generate a new UUID for the todo (done)
//   const values = { name, date, id };
//   const todoElement = generateTodo(values); // Create a new todo element (done)
//   section.addItem(todoElement); // Add the new todo to the section (done)
//   newTodoValidator.resetValidation();
//   addTodoPopup.close(); // Close the popup (done)
// });

const section = new Section({
  items: initialTodos,
  renderer: generateTodo,
  containerSelector: ".todos__list",
});

section.renderItems(); // Render the initial todos

// const renderTodo = (item) => {
//   const todo = generateTodo(item);
//   todosList.append(todo);
// };

// initialTodos.forEach((item) => {
//   renderTodo(item);
// }); // get rid of these lines when you implement the section class

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation(); // Enable validation for the form
