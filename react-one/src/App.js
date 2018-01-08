// @flow

import React, { Component } from 'react'
import Counter from './Counter';
import logo from './logo.svg'
import './App.css'
import { types } from './Redux'

// const action = type => store.dispatch({type})

type Props = {
  store: any
}

type State = {
  count: number
}

export default class App extends Component<Props, State> {

  componentWillMount() {
    console.log('componentWillMount')

    const {store} = this.props
    this.setState(store.getState(), () => {
      console.log('App setState callback')
    })

    // subscribe to changes, where we will update our state
    store.subscribe(() => {
      console.log('new subscription')
      const {count} = store.getState()
      console.log('count is ' + count)
      this.setState({ count: count })
    })
  }

  // constructor(props: Props) {
  //   super(props)
  //   props.store.subscribe(this.render)
  // }

  render() {
    console.log('App.render')
    const {count} = this.state
    console.log('render count is ' + count)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React Study</h1>
        </header>

        <p className="App-intro">
          with Redux Saga
        </p>

        <Counter
          count={count}
          onIncrement={() => this.handler(types.INCREMENT)}
          onDecrement={() => this.handler(types.DECREMENT)} >
        </Counter>
      </div>
    )
  }

  handler = (actionType: any) => {
    const store = this.props.store
    const type = actionType
    store.dispatch({type})
  }
}
