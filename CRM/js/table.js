import * as svg from './svg.js';
import * as cc from './client-card.js';

// пустой массив для объектов (клиентов)
export let arrayOfClients = [];

// функция создания рядов таблицы со столбцами (ячейками) и данными в них
export function fillTable(array) {
  const dataContainer = document.getElementById('clients__data');

  clearTable();
  arrayOfClients = array;

  for (let client of array) {

    // создаем ряд
    let tableRow = document.createElement('div');
    tableRow.classList.add('clients__data-row', 'record');
    dataContainer.append(tableRow);
    tableRow.setAttribute('id', `${client.id}`);

    // создаем колонки

    // ячейка "ID"
    let tableColID = document.createElement('div');
    tableColID.classList.add('clients__data-col', 'clientsDataID', 'clients__ID');
    tableRow.append(tableColID);
    tableColID.append(client.id.substr(7, 6));

    // ячейка "Фамилия, Имя, Отчество"
    let tableColFIO = document.createElement('div');
    tableColFIO.classList.add('clients__data-col', 'clientsDataFIO', 'clients__fio');

    let linkFIO = document.createElement('a');
    let url = window.location.href;
    linkFIO.setAttribute('href', url.substring(0, url.indexOf("#")) + '#' + client.id);
    tableRow.append(tableColFIO);
    tableColFIO.append(linkFIO);
    linkFIO.append(client.surname, ' ', client.name, ' ', client.lastName);

    // ячейка "Дата и время создания"
    let tableColTime = document.createElement('div');
    tableColTime.classList.add('clients__data-col', 'clientsDataTime', 'clients__time');
    tableRow.append(tableColTime);

    let clientsDateCreate = client.createdAt.substr(8, 2) + '.' + client.createdAt.substr(5, 2) + '.' + client.createdAt.substr(0, 4);
    tableColTime.append(clientsDateCreate);
    let clientsTimeCreate = client.createdAt.substr(11, 2) + ':' + client.createdAt.substr(14, 2);

    let timeCiontainer = document.createElement('span');
    tableColTime.append(timeCiontainer);
    timeCiontainer.append(clientsTimeCreate);
    timeCiontainer.classList.add('clientsDataTimeContainer');

    // ячейка "Последние изменения"
    let tableColChanges = document.createElement('div');
    tableColChanges.classList.add('clients__data-col', 'clientsDataChanges', 'clients__changes');
    tableRow.append(tableColChanges);

    let clientsDateUpdate = client.updatedAt.substr(8, 2) + '.' + client.updatedAt.substr(5, 2) + '.' + client.updatedAt.substr(0, 4);
    tableColChanges.append(clientsDateUpdate);
    let clientsTimeUpdate = client.updatedAt.substr(11, 2) + ':' + client.updatedAt.substr(14, 2);

    let timeCiontainerUp = document.createElement('span');
    tableColChanges.append(timeCiontainerUp);
    timeCiontainerUp.append(clientsTimeUpdate);
    timeCiontainerUp.classList.add('clientsDataTimeContainer');

    // ячейка "Контакты"
    let tableColContacts = document.createElement('div');
    tableColContacts.classList.add('clients__data-col', 'clientsDataContacts', 'clients__contacts');
    tableRow.append(tableColContacts);

    createContactsButtons(client, tableColContacts);

    if (client.contacts.length > 4) {
      createOffsetButton(client.contacts.length, tableColContacts);
    }

    // ячейка "Действия"
    let tableColActions = document.createElement('div');
    tableColActions.classList.add('clients__data-col', 'clientsDataActions', 'clients__actions');
    tableRow.append(tableColActions);

    createControlButtons(tableColActions, client);
  }
}

export function createContactsButtons(client, tableColContacts) {
  for (let i = 0; i < client.contacts.length; i++) {
    let content;
    let contentType;
    let idContent = `tippy-button-${client.id}-${i}`;

    if (client.contacts[i].type === 'Phone') {
      contentType = 'Телефон';
      let btnPhone = document.createElement('button');
      tableColContacts.append(btnPhone);
      btnPhone.append(svg.createSvgPhone());
      btnPhone.classList.add('data-tippy-button', 'data-tippy-button-phone');
      btnPhone.setAttribute('id', idContent);
      let phone = client.contacts[i].value;
      content = phone;

    } else if (client.contacts[i].type === 'Facebook') {
      contentType = 'Facebook';
      let btnFB = document.createElement('button');
      btnFB.setAttribute('id', idContent);
      tableColContacts.append(btnFB);
      btnFB.append(svg.createSvgFB());
      btnFB.classList.add('data-tippy-button', 'data-tippy-button-other');
      let fb = client.contacts[i].value;
      content = fb;

    } else if (client.contacts[i].type === 'VK') {
      contentType = 'Вконтакте';
      let btnVK = document.createElement('button');
      tableColContacts.append(btnVK);
      btnVK.append(svg.createSvgVK());
      btnVK.classList.add('data-tippy-button', 'data-tippy-button-other');
      btnVK.setAttribute('id', idContent);
      let vk = client.contacts[i].value;
      content = vk;

    } else if (client.contacts[i].type === 'Email') {
      contentType = 'Почта';
      let btnEmail = document.createElement('button');
      tableColContacts.append(btnEmail);
      btnEmail.append(svg.createSvgEmail());
      btnEmail.classList.add('data-tippy-button', 'data-tippy-button-other');
      btnEmail.setAttribute('id', idContent);
      let mail = client.contacts[i].value;
      content = mail;

    } else {
      contentType = client.contacts[i].type;
      contentType = 'Другое';
      let btnOther = document.createElement('button');
      tableColContacts.append(btnOther);
      btnOther.append(svg.createSvgOther());
      btnOther.classList.add('data-tippy-button', 'data-tippy-button-other');
      btnOther.setAttribute('id', idContent);
      let othertype = client.contacts[i].value;
      content = othertype;
    }

    // создание тултипа
    tippy(`#${idContent}`, {
      content: `${contentType}: <span style="color: var(--light-violet-color);font-weight: 400;font-size: 12px;line-height: 16px;">${content}</span>`,
      allowHTML: true,
      placement: 'top',
      delay: 100,
      animation: 'scale',
      minWidth: 265,
      arrow: true,
    });
  }
}

export function createOffsetButton(number, tableColContacts) {
  let offsetButton = offsetNumberContactsIcon(number - 4);
    tableColContacts.append(offsetButton);
    tableColContacts.querySelectorAll('.data-tippy-button').forEach(function (e) {
      e.classList.add('hidden-chaild');
    });
    offsetButton.addEventListener('click', (e) => {
      tableColContacts.querySelectorAll('.data-tippy-button').forEach(function (e) {
        e.classList.remove('hidden-chaild');
      });
      offsetButton.remove();
    });
}

export function createControlButtons(col, client) {
  // кнопка "Изменить"
  let buttonСhangeContainer = document.createElement('div');
  buttonСhangeContainer.classList.add('clients__data-btn-change-container')
  col.append(buttonСhangeContainer);

  svg.createSvgChange(buttonСhangeContainer);
  let buttonСhange = document.createElement('button');
  buttonСhange.classList.add('clients__data-btn-change', 'clients__data-btn');
  buttonСhange.setAttribute('id', `${client.id}`)
  buttonСhangeContainer.append(buttonСhange);
  buttonСhange.textContent = 'Изменить';

  // изменить данные клиента (вызов модального окна)
  buttonСhange.addEventListener('click', (e) => {
    e.preventDefault();
    cc.openModalChangeWindow(client);
  });

  // кнопка "Удалить"
  let buttonDeleteContainer = document.createElement('div');
  buttonDeleteContainer.classList.add('clients__data-btn-del-container')
  col.append(buttonDeleteContainer);
  svg.createSvgDelete(buttonDeleteContainer);
  let buttonDelete = document.createElement('button');
  buttonDelete.classList.add('clients__data-btn-del', 'clients__data-btn')
  buttonDeleteContainer.append(buttonDelete);
  buttonDelete.textContent = 'Удалить';

  buttonDelete.addEventListener('click', () => {
    cc.openModalWindowDel(client.id);
  });
}

// функция для очистки таблицы
function clearTable() {
  document.querySelectorAll('.record').forEach(function (record) {
    record.remove();
  })
}

// сортировка
export function registerSortListeners() {
  let hatID = document.getElementById('clientsIdHat');
  hatID.addEventListener('click', () => {
    activeColorRemove();
    document.getElementById('clientsIdHat').classList.add('color-active-col');

    if (document.getElementById('arrow-hat-id').classList.contains('arrow-style--transform')) {
      document.getElementById('arrow-hat-id').classList.remove('arrow-style--transform');
      arrayOfClients.sort((a, b) => b.id > a.id ? 1 : -1);
    } else {
      document.getElementById('arrow-hat-id').classList.add('arrow-style--transform');
      arrayOfClients.sort((a, b) => a.id > b.id ? 1 : -1);
    }
    fillTable(arrayOfClients);
  });

  let hatSurname = document.getElementById('clientsFioHat');
  hatSurname.addEventListener('click', () => {
    console.log(arrayOfClients);
    activeColorRemove();
    document.getElementById('clientsFioHat').classList.add('color-active-col');

    // изменение порядка букв А и Я
    let str = document.getElementById('strABC');
    let text = str.textContent;
    let replaceStr = text.replace('А', 'Z');
    replaceStr = replaceStr.replace('Я', 'X');
    replaceStr = replaceStr.replace('Z', 'Я');
    replaceStr = replaceStr.replace('X', 'А');
    str.textContent = '';
    str.textContent = replaceStr;

    if (document.getElementById('arrow-hat-fio').classList.contains('arrow-style--transform')) {
      document.getElementById('arrow-hat-fio').classList.remove('arrow-style--transform');
      arrayOfClients.sort((a, b) => a.surname > b.surname ? 1 : -1);
    } else {
      document.getElementById('arrow-hat-fio').classList.add('arrow-style--transform');
      arrayOfClients.sort((a, b) => b.surname > a.surname ? 1 : -1);
    }
    fillTable(arrayOfClients);
  });

  let hatTime = document.getElementById('clientsTimeHat');
  hatTime.addEventListener('click', () => {
    activeColorRemove();
    document.getElementById('clientsTimeHat').classList.add('color-active-col');

    if (document.getElementById('arrow-hat-time').classList.contains('arrow-style--transform')) {
      document.getElementById('arrow-hat-time').classList.remove('arrow-style--transform');
      arrayOfClients.sort((a, b) => b.createdAt > a.createdAt ? 1 : -1);
    } else {
      document.getElementById('arrow-hat-time').classList.add('arrow-style--transform');
      arrayOfClients.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1);
    }
    fillTable(arrayOfClients);
  });

  let hatChanges = document.getElementById('clientsChangesHat');
  hatChanges.addEventListener('click', () => {
    activeColorRemove();
    document.getElementById('clientsChangesHat').classList.add('color-active-col');

    if (document.getElementById('arrow-hat-change').classList.contains('arrow-style--transform')) {
      document.getElementById('arrow-hat-change').classList.remove('arrow-style--transform');
      arrayOfClients.sort((a, b) => b.updatedAt > a.updatedAt ? 1 : -1);
    } else {
      document.getElementById('arrow-hat-change').classList.add('arrow-style--transform');
      arrayOfClients.sort((a, b) => a.updatedAt > b.updatedAt ? 1 : -1);
    }
    fillTable(arrayOfClients);
  });
}

function activeColorRemove() {
  document.querySelectorAll('.color-active-col').forEach(function (e) {
    e.classList.remove('color-active-col');
  });
}

function offsetNumberContactsIcon(number) {
  let numberContactsIconContainer = document.createElement('div');
  numberContactsIconContainer.classList.add('data-button-number-container');

  let numberContactsIcon = document.createElement('button');
  numberContactsIcon.classList.add('data-button-number');
  numberContactsIcon.textContent = '+' + number;

  numberContactsIconContainer.append(numberContactsIcon);

  return numberContactsIconContainer;
}
