import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import FireBaseContext from './context/firebase'
import {  db , collection , addDoc } from './lib/firebase'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FireBaseContext.Provider value={{db , collection , addDoc}}>
    <App />
    </FireBaseContext.Provider>
  </React.StrictMode>
);

