/*
 * @LastEditTime: 2020-09-06 01:57:52
 * @LastEditors: jinxiaojian
 */
import { createStore } from '../createStore.js'
import { combineReducers } from '../combineReducers.js'

function counterReducer (state = {
  count: 0
}, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state;
  }
}
function InfoReducer (state = {
  name: '',
  description: ''
}, action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.description
      }
    default:
      return state;
  }
}

const reducer = combineReducers({
  counter: counterReducer,
  info: InfoReducer
});


let store = createStore(reducer);
const next = store.dispatch;

const middleware = (store) => (next) => (action) => {
  console.log('in dispatch', JSON.stringify(store.getState()), 'action', JSON.stringify(action));
  next(action);
  console.log('out dispatch', JSON.stringify(store.getState()));
}
const exceptMiddleware = (store) => (next) => (action) => {
  try {
    next(action)
  } catch (error) {
    console.log('error', error)
  }
}


store.dispatch = exceptMiddleware(store)(middleware(store)(next))
store.dispatch({
  type: 'INCREMENT'
});

