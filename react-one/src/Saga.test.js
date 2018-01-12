// @flow
//
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { delay } from 'redux-saga'
import reducer, { types } from './Redux'
import { helloWorldSaga, incrementAsync, watchIncrementalAsync } from './Saga'


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Hello World', () => {

  it('Provides an asynchronous generator', () => {

    const saga = helloWorldSaga()
    const yielded = saga.next()
    // Though imperfect we'll trust this test if the yield including the promise that the delay function returns, matches.
    expect(yielded).toMatchSnapshot()
    // This brings us to a halt before the console.log payload executes.

    // Next advance to run the payload (console.log)
    const complete = saga.next()

    // We want to know that the saga's generator will be entirely complete now.  We ignore verification of the console.
    expect(complete.done).toBeTruthy()
    expect(complete.value).toBe(1000)
    // in other words:
    expect(complete).toEqual({done: true, value: 1000})
  })
})

describe('App Sagas', () => {

  test('Increment Async Generator', () => {
    const saga = incrementAsync()

    const yield1 = saga.next()
    expect(yield1).toMatchSnapshot()

    const yield2 = saga.next()
    expect(yield2).toMatchSnapshot()

    const complete = saga.next()
    expect(complete.done).toBeTruthy()
    expect(complete.value).toBeUndefined()
    expect(complete).toEqual({done: true, value: undefined})
  })

  it('Uses Redux middleware to increment asynchronously', async () => {
    const saga = createSagaMiddleware()
    const store = createStore(reducer, applyMiddleware(saga))
    saga.run(watchIncrementalAsync)

    // At this point redux is now listening for the INCREMENT_ASYNC event
    const initialCount = store.getState().count
    expect(initialCount).toBe(0)

    // Now fire an event, we'll have to wait 1 second before the count actually increments
    store.dispatch({ type: types.INCREMENT_ASYNC })
    const afterDispatchCount = store.getState().count
    expect(afterDispatchCount).toBe(0)

    await sleep(1000)

    // By now the middleware has fired the INCREMENT event internally and modified the redux state.
    const state = store.getState()
    expect(state.count).toBe(1)
    expect(state).toMatchSnapshot()
  })
})
