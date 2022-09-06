import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App';


import { Provider } from 'react-redux';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();




const root = createRoot(document.getElementById('root'));
root.render(<Provider store={
  createStoreWithMiddleware(Reducer, devTools)}>
  < App />
</Provider>
);
