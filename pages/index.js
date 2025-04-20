import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: () => {},
});

const openModal = (modal) => {
  modal.classList.add("popup_visible");
  document.addEventListener("keydown", handleEscClose);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleEscClose);
};

const handleEscClose = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_visible");
    if (!openedPopup) return;
    closeModal(openedPopup);
  }
};

const handleOverlayClose = (evt) => {
  if (evt.target.classList.contains("popup_visible")) {
    closeModal(evt.target);
  }
};
addTodoPopupEl.addEventListener("click", handleOverlayClose);

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  const todoElement = todo.getView();
  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopupEl);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopupEl);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Central Standard Time - adjusted -6 hours
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

  const id = uuidv4(); // Generate a new UUID for the todo (done)
  const values = { name, date, id };
  const todoElement = generateTodo(values); // Create a new todo element (done)
  section.addItem(todoElement); // Add the new todo to the section (done)
  newTodoValidator.resetValidation();
  closeModal(addTodoPopupEl);
});

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
