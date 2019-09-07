'use strict';

(function () {

  var MATRIX = '+7 (___) ___ ____';

  var tel = document.querySelector('#tel');

  /**
   * Функция добавляет маску ввода номера телефона.
   * @function
   * @param {Object} event объект события;
   */
  function mask(event) {
    var i = 0;
    var def = MATRIX.replace(/\D/g, '');
    var val = tel.value.replace(/\D/g, '');

    if (def.length >= val.length) {
      val = def;
    }
    tel.value = MATRIX.replace(/./g, function (a) {
      if (/[_\d]/.test(a) && i < val.length) {
        return val.charAt(i++);
      } else {
        return i >= val.length ? '' : a;
      }
    });
    if (event.type === 'blur') {
      if (tel.value.length === 2) {
        tel.value = '';
      }
    } else {
      setCursorPosition(tel.value.length, tel);
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

  if (tel) {
    tel.addEventListener('input', mask, false);
  }

})();
