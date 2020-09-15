import React from 'react';

import AppProvider from './hooks/index';
import Routes from './routes';

import './App.css';

const App = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;