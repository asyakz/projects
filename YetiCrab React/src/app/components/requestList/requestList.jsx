import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import styles from './requestList.module.css';
import { dateNow } from '../../utils/dateNow';
import { handleAddRequest, handleUpdateRequest, handleRemoveRequest } from '../handlers';
import { initialRequests } from '../initialRequests';
import RequestItem from '../requestItem/requestItem'
import { Button } from '@gravity-ui/uikit';
import '@gravity-ui/uikit/styles/styles.css';
import PropTypes from 'prop-types';

const RequestList = ({ mode }) => {
  
  const [requests, setRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);
  const [status, setStatus] = useState('Новая');

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleEditRequest = (index) => {
    setEditingRequest(requests[index]);
  };

  useEffect(() => {
    const savedRequests = JSON.parse(localStorage.getItem('requests'));
    if (savedRequests) {
      setRequests(initialRequests);
      localStorage.setItem('requests', JSON.stringify(initialRequests));
    } else {
      setRequests(savedRequests);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('requests', JSON.stringify(requests));
  }, [requests]);

  return (
    <>
      {mode === 'admin' ? (
        <>
          <form className={styles.form} onSubmit={() => handleAddRequest(event, setRequests, requests, nanoid, dateNow)}>
            <input type='text' name='name' placeholder='Название фирмы клиента' />
            <input type='text' name='fullName' placeholder='ФИО перевозчика' />
            <input type='tel' name='tel' placeholder='Контактный телефон перевозчика' />
            <input type='text' name='comment' placeholder='Комментарии' />
            <input type='text' name='ATI' placeholder='ATI код сети перевозчика' />
            <Button className={styles.btnAdd} type='submit'>
              + Добавить новую заявку
            </Button>
          </form>
          <ul>
            {requests.map((request, index) => (
              <li className={styles.requestItem} key={index}>
                {editingRequest === request ? (
                  <form
                    key={index}
                    onSubmit={(event) => handleUpdateRequest(index, event, requests, setRequests, setEditingRequest, status)}
                  >
                    <input
                      type='text'
                      name='number'
                      defaultValue={request.number}
                    />
                    <input
                      type='text'
                      name='date'
                      defaultValue={request.date}
                    />
                    <input
                      type='text'
                      name='name'
                      defaultValue={request.name}
                    />
                    <input
                      type='text'
                      name='fullName'
                      defaultValue={request.fullName}
                    />
                    <input
                      type='tel'
                      name='tel'
                      defaultValue={request.tel}
                    />
                    <input
                      type='text'
                      name='comment'
                      defaultValue={request.comment}
                    />
                    <input
                      type='text'
                      name='ATI'
                      defaultValue={request.ATI}
                    />

                    <input
                      type="radio"
                      name="status"
                      value="В работе"
                      checked={status === "В работе"}
                      onChange={handleStatusChange}
                    />
                    <label>В работе</label>

                    <input
                      type="radio"
                      name="status"
                      value="Новая"
                      checked={status === "Новая"}
                      onChange={handleStatusChange}
                    />
                    <label>Новая</label>

                    <input
                      type="radio"
                      name="status"
                      value="Завершено"
                      checked={status === "Завершено"}
                      onChange={handleStatusChange}
                    />
                    <label>Завершено</label>

                    <Button className={styles.btnSave} type='submit' color='normal'>
                      Сохранить изменения
                    </Button>
                  </form>
                ) : (
                  <>
                  <RequestItem request={request} index={index}/>
                    <Button
                      className={styles.btnChange}
                      onClick={() => handleEditRequest(index)}
                    >
                      Изменить
                    </Button>
                    <Button
                      className={styles.btnDelete}
                      onClick={() => handleRemoveRequest(index, setRequests, requests)}
                    >
                      Удалить
                    </Button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <ul>
            {requests.map((request, index) => (
              <RequestItem key={index} request={request} index={index}/>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

RequestList.propTypes = {
  mode: PropTypes.string
}

export default RequestList;
