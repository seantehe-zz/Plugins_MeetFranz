const path = require('path');

module.exports = (Franz, options) => {
  let updates = 0;
  const modal = document.createElement('div');

  function showModal (text) {
    show(modal);
    modal.querySelector('p').innerHTML = text;
    updates += 1;
  }

  function hideModal () {
    hide(modal);
    modal.querySelector('p').innerHTML = '';
    updates -= 1;
  }

  // alertas en Franz
  const oldAlert = window.alert;
  window.alert = function () {

    showModal.apply(oldAlert, arguments);
  };

  function show (element) {
    element.style.display = 'inherit';
  }

  function hide (element) {
    element.style.display = 'none';
  }

  const getMessages = () => {
    Franz.setBadge(0, updates);
  };

  modal.id = 'franz-modal';
  modal.innerHTML = '<div class="modal-content"><span class="close">&times;</span><p></p></div>';
  modal.querySelector('.close').addEventListener('click', hideModal);
  document.body.appendChild(modal);

  document.addEventListener('keydown', function(e) { if (e.keyCode === 27) { hideModal(); } })

  // Agrega css
  Franz.injectCSS(path.join(__dirname, 'css', 'modal.css'));

  //se verifica nuevos mensajes
  Franz.loop(getMessages);
};
