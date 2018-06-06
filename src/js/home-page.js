var debounce = require('lodash.debounce');

(() => {
  const downArrow = document.querySelector('.down-arrow');

  var arrowVisible = true;

  document.addEventListener('scroll', debounce(() => {
    if (arrowVisible) {
      if (window.pageYOffset >= 20) {
        downArrow.classList.add('hide');
        arrowVisible = false;
      }
    } else {
      if (window.pageYOffset < 20) {
        downArrow.classList.remove('hide');
        arrowVisible = true;
      }
    }
  }), 100);
})();
