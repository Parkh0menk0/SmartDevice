'use strict';

(function () {

  var accordion = document.querySelectorAll('.accordion');
  var i;

  if (accordion) {
    for (i = 0; i < accordion.length; i++) {
      accordion[i].addEventListener('click', function () {
        console.log(accordion[i]);
        accordion[i].classList.toggle('active');
        var panel = accordion[i].nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    }
  } else console.log('ошибка');

})();
