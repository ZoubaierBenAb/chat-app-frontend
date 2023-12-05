import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore,} from '@reduxjs/toolkit';
import {persistStore,persistReducer} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import {useDispatch as useAppDispatch, useSelector as useAppSelector} from 'react-redux'
import { rootPersistConfig, rootReducer } from './state/rootReducer';

const store = configureStore({
  reducer : persistReducer(rootPersistConfig,rootReducer),
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck : false ,
    immutableCheck : false
  })
})


const persistor = persistStore(store);

export const {dispatch} = store

export const useSelector = useAppSelector;
const useDispatch = ()=> useAppDispatch()


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
   
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
