// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from 'redux'
import reducer, { initialState } from './Redux'


it('renders without crashing', () => {
  const store = createStore(reducer, initialState)
  expect(store).toBeDefined()

  const div = document.createElement('div')
  expect(div).toBeDefined()

  const tree = ReactDOM.render(<App store={store} />, div)
})
