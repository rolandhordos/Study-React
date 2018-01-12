// @flow

import type { Saga, PutEffect } from 'redux-saga'
import { delay } from 'redux-saga'
import { put, takeEvery, all } from 'redux-saga/effects'
import { types } from './Redux'

export function *helloWorldSaga(): Generator<
  Promise<void>, // yielding
  number, // returning on completion
  void // next arg type
>
{
  const wait: number = 1000
  yield delay(wait)
  console.log('Hello World')
  return wait
}

// Increment after 1 second
//
export function *incrementAsync(): Generator<
  Promise<void> | PutEffect<any, any>,  // yielding
  void, // returning on completion
  void  // next arg type
  >
{
  yield delay(1000) // 1 second
  yield put({ type: types.INCREMENT })
}

export function *watchIncrementalAsync(): Saga<void> {   // void return type
  yield takeEvery(types.INCREMENT_ASYNC, incrementAsync)
}

// Combine multiple sagas in one.  They will be started in parallel.
//
export default function *rootSaga(): Saga<void> { // void return type
  yield all([
    helloWorldSaga(),
    watchIncrementalAsync()
  ])
}
