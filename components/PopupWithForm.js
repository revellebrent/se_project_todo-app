import Popup from "./Popup.js";
// PopupWithForm class extends Popup class

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
  }
}
export default PopupWithForm;
