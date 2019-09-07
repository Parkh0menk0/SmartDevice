'use strict';

;(function () {

  var tel = document.querySelector('#tel');

  /**
   * Функция добавляет маску ввода номера телефона.
   * @function
   * @param {Object} evt объект события;
   */
  function mask(event) {
    var matrix = "+7 (___) ___ ____",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
    if (event.type == "blur") {
      if (this.value.length == 2) this.value = ""
    } else setCursorPosition(this.value.length, this)
  };

  /**
   * Функция устанавливает позицию курсора.
   * @function
   * @param {number} pos Индекс первого выделенного символа;
   * @param {number} elem Индекс символа после последнего выделенного символа;
   */
  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
    else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd("character", pos);
      range.moveStart("character", pos);
      range.select()
    }
  }

  if (tel) {
    tel.addEventListener("input", mask, false);
  }

})();
