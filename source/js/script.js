'use strict';

var ESC_KEYCODE = 27;

var link = document.querySelector('.btn--request-a-call');

var popup = document.querySelector('.modal');
var overlay = document.querySelector('.modal-overlay');
var close = popup.querySelector('.modal__close');

var form = popup.querySelector('form');
var userName = popup.querySelector('[name=name]');
var tel = popup.querySelector('[name=tel]');

var isStorageSupport = true;
var storage = '';

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

  if (storage) {
    userName.value = storage;
    tel.focus();
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
  storage = localStorage.getItem('name');
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener('click', function (evt) {
  evt.preventDefault();
  openModal();
});

close.addEventListener('click', function (evt) {
  evt.preventDefault();
  closeModal();
});

form.addEventListener('submit', function (evt) {
  if (!userName.value || !tel.value) {
    evt.preventDefault();
  } else {
    if (isStorageSupport) {
      localStorage.setItem('name', userName.value);
    }
  }
});

overlay.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (overlay.classList.contains('modal-show')) {
    closeModal();
  }
});

// var pageHeader = document.querySelector('.page-header');
// var headerToggle = document.querySelector('.page-header__toggle');

// pageHeader.classList.remove('page-header--nojs');

// headerToggle.addEventListener('click', function () {
//   if (pageHeader.classList.contains('page-header--closed')) {
//     pageHeader.classList.remove('page-header--closed');
//     pageHeader.classList.add('page-header--opened');
//   } else {
//     pageHeader.classList.add('page-header--closed');
//     pageHeader.classList.remove('page-header--opened');
//   }
// });
