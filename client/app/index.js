import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/index';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import App from './components/App';

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
	reducer,
	applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
<BrowserRouter>
  <Provider store={ store }>
    <App/>
	</Provider>
</BrowserRouter>, document.getElementById('app'));
