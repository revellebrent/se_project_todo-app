class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
  }

  open() {
    this._popupElement.classList.add("popup_visible");
  }
  close() {
    this._popupElement.classList.remove("popup_visible");
  }

  setEventListeners() {
    this._popupCloseBtn.addEventListener("click", () => {
      this.close(); // Close the popup when the close button is clicked
    });
  }
}

export default Popup;
