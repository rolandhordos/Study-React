// @flow

import React, { Component } from 'react'

type Props = {
  count: number,
  onIncrement: any,
  onDecrement: any
}

export default class Counter extends Component<Props> {
  render() {
    console.log('Counter.render')
    return(
      <div>
        <button onClick={this.props.onIncrement}>
          Increment
        </button>
        {' '}
        <button onClick={this.props.onDecrement}>
          Decrement
        </button>
        <hr />
        <div>
          Clicked: {this.props.count} times
        </div>
      </div>
    )
  }
}
