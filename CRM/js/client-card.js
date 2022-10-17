import * as svg from './svg.js';
import {media475px} from './script.js';
import {mask, unmask, addValidation, validation} from './mask-and-validate.js';

export function createNewContact(type = 'Phone', value = '') {

  let newContactContainer = document.getElementById('modal__add-new-contact-container');

  if (newContactContainer.childElementCount < 10) {

    let newContact = document.createElement('div');
    newContact.classList.add('modal__new-contact-content');
    newContactContainer.append(newContact);

    // создание селекта для выбора типа контактов
    let selectContainer = document.createElement('div');
    selectContainer.classList.add('modal__select-container');
    newContact.append(selectContainer);

    let select = document.createElement('select');
    select.classList.add('modal__contacts-select');
    select.setAttribute('name', 'select');
    selectContainer.append(select);

    let optionPhone = document.createElement('option');
    optionPhone.classList.add('modal__option');
    optionPhone.setAttribute('value', 'Phone');
    optionPhone.textContent = 'Телефон';
    select.append(optionPhone);

    let optionEmail = document.createElement('option');
    optionEmail.classList.add('modal__option');
    optionEmail.setAttribute('value', 'Email');
    optionEmail.textContent = 'Email';
    select.append(optionEmail);

    let optionFB = document.createElement('option');
    optionFB.classList.add('modal__option');
    optionFB.setAttribute('value', 'Facebook');
    optionFB.textContent = 'Facebook';
    select.append(optionFB);

    let optionVK = document.createElement('option');
    optionVK.classList.add('modal__option');
    optionVK.setAttribute('value', 'VK');
    optionVK.textContent = 'VK';
    select.append(optionVK);

    let optionOther = document.createElement('option');
    optionOther.classList.add('modal__option');
    optionOther.setAttribute('value', 'Other');
    optionOther.textContent = 'Другое';
    select.append(optionOther);

    let choices = selectCustom(select);
    newContact.querySelector('.choices').append(svg.createSvgVioletBird());
    newContact.querySelector('.choices').addEventListener('click', () => {
      newContact.querySelector('.modal__contact-select-bird').classList.toggle('modal__contact-select-bird--transform');
    });

    let inputContact = document.createElement('input');
    inputContact.value = value;
    inputContact.classList.add('modal__input-contact', 'element-disabled');
    inputContact.setAttribute('id', `input-new-contact-${newContactContainer.childElementCount}`);
    if (media475px.matches) {
      inputContact.setAttribute('placeholder', 'Введите данные');
    } else {
      inputContact.setAttribute('placeholder', 'Введите данные контакта');
    }

    select.addEventListener('change', (e) => {
      validation.removeField(`#${inputContact.id}`);
      if (e.detail.value != 'Phone') {
        inputContact.setAttribute('type', 'text');
        unmask(inputContact);
      } else {
        mask(inputContact);
      }
      addValidation(e.detail.value, inputContact.id);
    });

    newContact.append(inputContact);

    if (type === 'Phone') {
      mask(inputContact);
    }
    addValidation(type, inputContact.id);

    inputContact.addEventListener('input', () => {
      // кнопка "Удалить" на контакте видна
      if (inputContact.value != '') {
        btnDeleteContactVisible(inputContact, newContact, btnDeleteContact);
      } else {
        btnDeleteContactHidden(inputContact, newContact, btnDeleteContact);
      }
    });

    let btnDeleteContact = document.createElement('button');
    btnDeleteContact.classList.add('modal__btn-delete-contact', 'tippy-delete');
    svg.createSvgDelete(btnDeleteContact);
    newContact.append(btnDeleteContact);

    btnDeleteContact.addEventListener('click', () => {
      validation.removeField(`#${inputContact.id}`);
      newContact.remove();
      if (newContactContainer.childElementCount === 0) {
        document.getElementById('modal__container').classList.remove('modal__container--mb');
        document.getElementById('modal__btn-add-contact').classList.remove('modal__btn-add-contact--mb');
      }
      if (newContactContainer.childElementCount !== 10) {
        document.getElementById('modal__btn-add-contact').classList.remove('element-remove');
        document.getElementById('modal__add-new-contact-container').setAttribute('style', 'padding-bottom: 0px;');
      }
    });

    tippy('.tippy-delete', {
      content: 'Удалить контакт',
      placement: 'top',
      delay: 100,
      animation: 'scale',
      minWidth: 265,
      arrow: true,
    });

    document.getElementById('modal__btn-add-contact').removeAttribute('disabled', 'disabled');
    document.getElementById('modal__container').classList.add('modal__container--mb');
    document.getElementById('modal__btn-add-contact').classList.add('modal__btn-add-contact--mb');

    return { select, choices, inputContact, newContact, newContactContainer, btnDeleteContact };
  }
}

export function btnDeleteContactVisible(inputContact, newContact, btnDeleteContact) {
  btnDeleteContact.classList.add('modal__btn-delete-contact--visible');
  newContact.classList.add('modal__new-contact-content--change-start');
  inputContact.classList.add('modal__input-contact--padding');
}

export function btnDeleteContactHidden(inputContact, newContact, btnDeleteContact) {
  btnDeleteContact.classList.remove('modal__btn-delete-contact--visible');
  newContact.classList.remove('modal__new-contact-content--change-start');
  inputContact.classList.remove('modal__input-contact--padding');
}

// кастомизация селекта
export function selectCustom(e) {
  return new Choices(e, {
    searchEnabled: false,
    itemSelectText: '',
    allowHTML: true,
    resetScrollPosition: true
  });
};

export function openModalChangeWindow(client, block = false) {
  document.getElementById('modal').classList.add('modal__block--active');
  document.getElementById('modal__container').classList.add('modal__container--active');

  if (block === true) {
    document.getElementById('modal__title').textContent = 'Карточка клиента';
  } else {
    document.getElementById('modal__title').textContent = 'Изменить данные';
  }
  let infoAboutClienID = document.createElement('span');
  infoAboutClienID.classList.add('modal__info-change');
  infoAboutClienID.setAttribute('id', 'modal__info-change');
  infoAboutClienID.textContent = 'ID: ' + `${client.id.substr(7, 6)}`;
  document.getElementById('modal__title').append(infoAboutClienID);

  document.getElementById('modal__btn-cancel').textContent = 'Удалить клиента';

  let idInputChange = document.createElement('input');
  idInputChange.setAttribute('type', 'hidden');
  document.getElementById('modal__info-change').append(idInputChange);
  idInputChange.setAttribute('id', 'clientIDChange');
  document.getElementById('clientIDChange').value = client.id;

  document.getElementById('modal__input-name').value = client.name;
  document.getElementById('modal__input-lastName').value = client.lastName;
  document.getElementById('modal__input-surname').value = client.surname;

  for (let i = 0; i < client.contacts.length; i++) {
    let contactForm = createNewContact(client.contacts[i].type, client.contacts[i].value);
    contactForm.choices.setChoiceByValue(client.contacts[i].type);
    if (block === true)
      contactForm.choices.disable();
    // кнопка "Удалить" на контакте видна
    if (block === false)
      btnDeleteContactVisible(contactForm.inputContact, contactForm.newContact, contactForm.btnDeleteContact);
  }

  // если block === true то блокировать все инпуты на модальной форме (карточки клиента)
  if (block === true) {
    document.querySelectorAll('.element-disabled').forEach(function (e) {
      e.setAttribute('disabled', 'disabled');
    });
    document.querySelectorAll('.remove-for-client-card').forEach(function (e) {
      e.classList.add('element-remove');
    });
    document.querySelectorAll('.modal__input').forEach(function (e) {
      e.classList.add('modal__input-hover-remove');
    });

  } else {
    document.querySelectorAll('.element-disabled').forEach(function (e) {
      e.removeAttribute('disabled', 'disabled');
    });
    document.querySelectorAll('.remove-for-client-card').forEach(function (e) {
      e.classList.remove('element-remove');
    });
    document.querySelectorAll('.modal__input').forEach(function (e) {
      e.classList.remove('modal__input-hover-remove');
    });
  }
}

export function openModalWindowDel(id) {
  document.getElementById('modal-del').classList.add('modal__block--active');
  document.getElementById('modal-del__container').classList.add('modal__container--active');
  document.getElementById('clientID').value = id;
}

// получение массива объектов контактов
export function extractContacts() {
  let arrayOfContacts = [];
  document.querySelectorAll('.modal__new-contact-content').forEach(function (e) {
    arrayOfContacts.push({
      type: e.querySelector('.choices__item--selectable').getAttribute('data-value'),
      value: e.querySelector('.modal__input-contact').value.trim(),
    });
  });
  return arrayOfContacts;
}

export function modalWindowClose() {
  console.log("modalWindowClose");
  clearForms();
  document.getElementById('modal').classList.remove('modal__block--active');
  document.getElementById('modal__container').classList.remove('modal__container--active');
}

export function modalWindowDelClose() {
  console.log("modalWindowDelClose");
  clearForms();
  document.getElementById('modal-del').classList.remove('modal__block--active');
  document.getElementById('modal-del__container').classList.remove('modal__container--active');
};

export function modalWindowOpen() {
  clearForms();
  document.getElementById('modal__title').textContent = 'Новый клиент';
  document.getElementById('modal__title').children.remove;
  document.getElementById('modal').classList.add('modal__block--active');
  document.getElementById('modal__container').classList.add('modal__container--active');
}

// обнуляем значение в поле
export function clearForms() {
  document.querySelectorAll('.modal__input').forEach(function (e) {
    e.value = '';
  });
  document.querySelectorAll('.modal__new-contact-content').forEach(function (e) {
    e.remove();
  });
  document.querySelectorAll('.element-disabled').forEach(function (e) {
    e.removeAttribute('disabled');
  });
  document.querySelectorAll('.remove-for-client-card').forEach(function (e) {
    e.classList.remove('element-remove');
  });
  document.querySelectorAll('.modal__input').forEach(function (e) {
    e.classList.remove('modal__input-hover-remove');
  });
  document.getElementById('modal__btn-add-contact').classList.remove('modal__btn-add-contact--mb');
  document.getElementById('modal__validation-container').children.remove;
}
