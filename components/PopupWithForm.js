import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector }); // Call the parent class constructor
    this._popupForm = this._popupElement.querySelector(".popup__form"); // Select the form element within the popup
    this._handleFormSubmit = handleFormSubmit; // Store the form submit handler
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll(".popup__input");

    const inputValues = {}; // Initialize an empty object to store input values
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value; // Store each input value in the object using its name as the key
    });
    return inputValues; // Return the object containing all input values
  }

  setEventListeners() {
    super.setEventListeners(); // Call the parent class's setEventListeners method
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues(); // Get input values from the form

      this._handleFormSubmit(inputValues); // Call the form submit handler with the event and input values
    });
  }
}
export default PopupWithForm;
