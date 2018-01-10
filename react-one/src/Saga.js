// @flow

// For any type T, a Generator<T,void,void> is both an Iterable<T> and an Iterator<T>.
// https://flow.org/blog/2015/11/09/Generators/

export function *helloWorldSaga<T>(): Iterable<T> {
  console.log('Hello World')
}
