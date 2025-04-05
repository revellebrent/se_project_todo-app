class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;

      console.log("Todo completed:", this._data.completed);
      console.log("Todo ID:", this._data.id);
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      console.log("Todo deleted:", this._data.id);
      console.log("Todo ID:", this._data.id);
    });
  }

  _generateCheckedboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
  }

  getView() {
    this._todoElement = this._templateElement.content // this. instead of const makes it able to use outside the function
      .querySelector(".todo") //pass config object to the constructor
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._generateCheckedboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
