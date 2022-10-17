import * as svg from './svg.js';
import * as cc from './client-card.js';
import * as api from './api.js';
import * as table from './table.js';
import {validation} from './mask-and-validate.js';

export const media475px = window.matchMedia('(max-width: 475px)');

  (() => {
    // переменная для контейнера таблицы
    const dataContainer = document.getElementById('clients__data');

    // переменная для медиа запроса 475px
    const media475px = window.matchMedia('(max-width: 475px)');

    let searchTimeout;

    function start() {
      table.registerSortListeners();
      document.getElementById('clients__btn-add-client').setAttribute('disabled', 'disabled');
      api.getClient();
      window.addEventListener('resize', () => {
        media475();
      });
    }

    function media475() {

      if (media475px.matches) {
        document.getElementById('header__label').addEventListener('click', (e) => {
          document.getElementById('header__search').classList.add('header__search--visible');
          let buttonCloseSearch = document.createElement('button');
          buttonCloseSearch.classList.add('header__btn-close-search');
          svg.createSvgDelete(buttonCloseSearch);
          document.getElementById('header').append(buttonCloseSearch);

          buttonCloseSearch.addEventListener('click', (e) => {
            document.getElementById('header__search').classList.remove('header__search--visible');
            buttonCloseSearch.remove();
          });
        });
      }
    }

  // слушатели событий
  document.getElementById('modal__btn-add-contact').addEventListener('click', e => {
    e.preventDefault();
    cc.createNewContact();
    if (document.getElementById('modal__add-new-contact-container').childElementCount === 10) {
      document.getElementById('modal__btn-add-contact').classList.add('element-remove');
      document.getElementById('modal__add-new-contact-container').setAttribute('style', 'padding-bottom: 25px;');
    } else {
      document.getElementById('modal__btn-add-contact').classList.remove('element-remove');
      document.getElementById('modal__add-new-contact-container').setAttribute('style', 'padding-bottom: 0px;');
    }
  });

  document.getElementById('modal__btn-close').addEventListener('click', () => {
    cc.modalWindowClose();
  });

  document.getElementById('modal-del__btn-close').addEventListener('click', () => {
    cc.modalWindowDelClose();
  });

  document.getElementById('modal__btn-cancel').addEventListener('click', () => {
    if (document.getElementById('modal__info-change') != null) {
      let id = document.getElementById('clientIDChange').value;
      cc.modalWindowClose();
      cc.openModalWindowDel(id);
    } else {
      cc.modalWindowClose();
    }
  });

  document.getElementById('modal-del__btn-cancel').addEventListener('click', () => {
    cc.modalWindowDelClose();
  });

  // закрытие модального окна по клику на фон
  document.getElementById('modal').addEventListener('click', function(event) {
    let e = document.getElementById('modal__container');
    if (!e.contains(event.target) && !event.target.classList.contains('modal__btn-delete-contact')) {
      cc.modalWindowClose();
    }
  });

  // закрытие модального окна (удаление) по клику на фон
  document.getElementById('modal-del').addEventListener('click', function(event) {
    let e = document.getElementById('modal-del__container');
    if (!e.contains(event.target)) {
      cc.modalWindowDelClose();
    }
  });

  document.getElementById('clients__btn-add-client').addEventListener('click', () => {
    document.getElementById('modal__btn-cancel').textContent = 'Отмена';
    cc.modalWindowOpen();
  });

  // создание слушателя на кнопке "сохранить"
  validation.onSuccess((event) => {
    let name = document.getElementById('modal__input-name').value.trim()
      let surname = document.getElementById('modal__input-surname').value.trim()
      let lastName = document.getElementById('modal__input-lastName').value.trim()
      let contacts = cc.extractContacts()

      if (document.getElementById('modal__info-change') == null) {
        api.postClient({name, surname, lastName, contacts});
      } else {
        let id = document.getElementById('clientIDChange').value;
        api.patchClient({id, name, surname, lastName, contacts});
      }
      // вызываем функцию содания ряда таблицы со столбцами
      api.getClient();
      // вызываем функцию очищения формы
      cc.clearForms();
  });

  document.querySelector('.modal__btn-del').addEventListener('click', () => {
    let id = document.getElementById('clientID').value;
    let row = document.getElementById(id);
    api.deleteClient(id, row);
  });

  document.getElementById('header__search-input').addEventListener('input', () => {
    clearTimeout(searchTimeout);
    let search = document.getElementById('header__search-input').value;
    searchTimeout = setTimeout(() => { api.getClient(search) }, 300);
  });

  window.addEventListener('hashchange', function () {
    let id = window.location.hash.substring(1, window.location.hash.length);
    api.getClientByID(id);
  });

  start();

})();





