import React, { useState } from 'react';
import './App.css';
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import { Button } from '@gravity-ui/uikit';
import RequestList from './app/components/requestList/requestList';

function App() {
  const [mode, setMode] = useState('view'); // 'view' или 'admin'
  return (
    <>
      <h1>Список заявок</h1>
      <Button className='btnAdmin' onClick={() => setMode(mode === 'view' ? 'admin' : 'view')}>
        Переключить режим
      </Button>
      <RequestList mode={mode} />
    </>
  );
}

export default App;


