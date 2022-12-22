import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import FireBaseContext from './context/firebase'
import {  db ,firebase } from './lib/firebase'
import 'react-loading-skeleton/dist/skeleton.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FireBaseContext.Provider value={{db , firebase}}>
    <App />
    </FireBaseContext.Provider>
  </React.StrictMode>
);

