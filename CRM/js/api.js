import {fillTable} from './table.js';
import {openModalChangeWindow} from './client-card.js';

// функция получения данных GET
async function getClient(search) {
  let response;
  let data;
  if (search == null) {
    response = await fetch('http://localhost:3000/api/clients');
    data = await response.json();
  } else {
    response = await fetch(`http://localhost:3000/api/clients?search=${search}`);
    data = await response.json();
  }
  fillTable(data);
  document.getElementById('clients__btn-add-client').removeAttribute('disabled', 'disabled');
  document.getElementById('clients__loading-svg').classList.add('clients__loading-svg--hidden');
  document.getElementById('clients__data').classList.add('clients__data--loading');
}

async function getClientByID(id) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`);
  let client = await response.json();
  openModalChangeWindow(client, true);
}

// изменить выбранного клиента PATCH
async function patchClient(client) {
  const response = await fetch(`http://localhost:3000/api/clients/${client.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: client.name,
      surname: client.surname,
      lastName: client.lastName,
      contacts: client.contacts
    })
  });
  const data = await response.json();
  clearForms();
  getClient();
}

// создать клиента POST
async function postClient(client) {
  const response = await fetch('http://localhost:3000/api/clients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: client.name,
      surname: client.surname,
      lastName: client.lastName,
      contacts: client.contacts
    })
  });
  const data = await response.json();
  console.log(data);
}

// удалить клиента DELETE
async function deleteClient(id, row) {
  row.remove();
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'DELETE',
  });
  if (response.status === 404) {
    console.log('Не удалось удалить клиента, так как его не существует');
  }
  getClient();
}

export {deleteClient, postClient, patchClient, getClientByID, getClient};


