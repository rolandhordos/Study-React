// @flow

import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'
import { types } from './Redux'

// For any type T, a Generator<T,void,void> is both an Iterable<T> and an Iterator<T>.
// https://flow.org/blog/2015/11/09/Generators/

export function *helloWorldSaga<T>(): Iterable<T> {
  yield delay(1000)
  console.log('Hello World')
}

// Increment after 1 second
//
export function *incrementAsync<T>(): Iterable<T> {
  yield delay(1000) // 1 second
  yield put({ type: types.INCREMENT })
}

// Watcher - generate increment async task on action
//
export function *watchIncrementalAsync<T>(): Iterable<T> {
  yield takeEvery(types.INCREMENT_ASYNC, incrementAsync)
}

// Combine multiple sagas in one.  They will be started in parallel.
//
export default function *rootSaga<T>(): Iterator<T> {
  yield all([
    helloWorldSaga(),
    watchIncrementalAsync()
  ])
}
