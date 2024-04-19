import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// API:
// GET /requests: Получение списка всех заявок.
// POST /requests: Создание новой заявки.
// GET /requests/{number}: Получение информации о конкретной заявке по номеру.
// PUT /requests/{number}: Обновление информации о заявке по номеру.
// DELETE /requests/{number}: Удаление заявки по номеру.