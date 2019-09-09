'use strict';

(function () {
  var modalTel = document.querySelector('#modal-tel');

  /**
   * Функция добавляет маску ввода номера телефона.
   * @function
   * @param {Object} event объект события;
   */
  function mask(event) {
    var MATRIX = '+7 (___) ___ ____';
    var i = 0;
    var def = MATRIX.replace(/\D/g, '');
    var val = modalTel.value.replace(/\D/g, '');
    if (def.length >= val.length) {
      val = def;
    }
    this.value = MATRIX.replace(/./g, function (a) {
      if (/[_\d]/.test(a) && i < val.length) {
        return val.charAt(i++);
      } else {
        return i >= val.length ? '' : a;
      }
    });
    if (event.type === 'blur') {
      if (this.value.length === 2) {
        this.value = '';
      }
    } else {
      setCursorPosition(this.value.length, this);
    }
  }

  /**
   * Функция устанавливает позицию курсора.
   * @function
   * @param {number} pos Индекс первого выделенного символа;
   * @param {number} elem Индекс символа после последнего выделенного символа;
   */
  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  if (modalTel) {
    modalTel.addEventListener('input', mask, false);
  }
})();
