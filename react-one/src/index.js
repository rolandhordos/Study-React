// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import { createStore, applyMiddleware } from 'redux'
import reducer from './Redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './Saga'

// initialize middleware
const saga = createSagaMiddleware()

// Initialize the store
const store = createStore(reducer, applyMiddleware(saga))
console.log('#Redux is ready')
console.log('#Saga is ready')

// Start async launch code
saga.run(rootSaga)

// Launch the front end
const doc: Document = document
const root: HTMLElement | null = doc.getElementById('root')
if (root !== null) {
  ReactDOM.render(<App store={store} />, root)
  registerServiceWorker()
}
else {
  console.log('No root element in browser document')
}
