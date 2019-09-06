'use strict';

var ESC_KEYCODE = 27;

var link = document.querySelector('.header__btn--request-a-call');

var popup = document.querySelector('.modal');
var overlay = document.querySelector('.modal-overlay');
var close = popup.querySelector('.modal__close');

var form = popup.querySelector('form');
var userName = popup.querySelector('[name=name]');
var tel = popup.querySelector('[name=tel]');
var message = popup.querySelector('[name=question]');

var isStorageSupport = true;
var storage = {
  name: '',
  tel: '',
  message: ''
};

var accordion = document.querySelectorAll(".accordion");
var i;

/**
 * Функция для закрытия окна формы по нажатии клавиши Esc.
 * @function
 * @param {Object} evt объект события;
 */
function onEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeModal();
  }
}

/**
 * Функция открытия окна формы.
 * @function
 */
function openModal() {
  popup.classList.add('modal-show');
  overlay.classList.add('modal-show');

  if (storage.name) {
    userName.value = storage.name;
    tel.focus();
  } else {
    userName.focus();
  }

  if (storage.tel) {
    tel.value = storage.tel;
    message.focus();
  } else {
    tel.focus();
  }

  if (storage.message) {
    message.value = storage.message;
  } else {
    userName.focus();
  }

  document.addEventListener('keydown', onEscPress);
}

/**
 * Функция закрытия окна формы.
 * @function
 */
function closeModal() {
  form.reset();
  popup.classList.remove('modal-show');
  overlay.classList.remove('modal-show');
  document.removeEventListener('keydown', onEscPress);
}

try {
  storage.name = localStorage.getItem('name');
  storage.tel = localStorage.getItem('tel');
  storage.message = localStorage.getItem('message');
} catch (err) {
  isStorageSupport = false;
}

if (link) {
  link.addEventListener('click', function (evt) {
    evt.preventDefault();
    openModal();
  });
}

if (close) {
  close.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeModal();
  });
}

if (form) {
  form.addEventListener('submit', function (evt) {
    if (!userName.value || !tel.value) {
      evt.preventDefault();
    } else {
      if (isStorageSupport) {
        localStorage.setItem('name', userName.value);
        localStorage.setItem('tel', tel.value);
        localStorage.setItem('message', message.value);
      }
    }
  });
}

if (overlay) {
  overlay.addEventListener('click', function (evt) {
    evt.preventDefault();
    if (overlay.classList.contains('modal-show')) {
      closeModal();
    }
  });
}

if (accordion) {
  for (i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}
