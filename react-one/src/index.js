// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import {createStore} from 'redux'
import reducer, {initialState} from './Redux'

// Initialize the store
const store = createStore(reducer, initialState)

console.log('#Redux is ready')

const doc: Document = document
const root: HTMLElement | null = doc.getElementById('root')
if (root !== null) {
  ReactDOM.render(<App store={store} />, root)
  registerServiceWorker()
}
else {
  console.log('No root element in browser document')
}
