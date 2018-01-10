// @flow

export const types = {
  INCREMENT: 'INCREMENT',
  INCREMENT_IF_ODD: 'INCREMENT_IF_ODD',
  DECREMENT: 'DECREMENT',
  INCREMENT_ASYNC: 'INCREMENT_ASYNC',
}

type State = {
  count: number
}

export const initialState = {
  count: 0
}

const reducer = (state: State = initialState, action: any) => {
  console.log('inside reducer, action type is ' + action.type)
  let count = state.count
  switch (action.type) {
    case types.INCREMENT:
      count = count + 1
      break
    case types.INCREMENT_IF_ODD:
      count = (count % 2 !== 0) ? count + 1 : count
      break
    case types.DECREMENT:
      count = count - 1
      break
    default:
      return state
  }

  return { count: count }
}

export default reducer
