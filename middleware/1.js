/*
 * @LastEditTime: 2020-09-06 02:21:13
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

const middlewareIn = (store) => (next) => (action) => {
  console.log('in middlewareIn', JSON.stringify(store.getState()), 'action', JSON.stringify(action));
  next(action);
  console.log('out middlewareIn', JSON.stringify(store.getState()));
}
const middlewareEx = (store) => (next) => (action) => {
  try {
    console.log('in middlewareEx')
    next(action)
    console.log('out middlewareEx')
  } catch (error) {
    console.log('error', error)
  }
}

const middlewareExS=middlewareEx(store)
const middlewareInS=middlewareIn(store)
const timeMiddleware = (store) => (next) => (action) => {
  console.log('in timeMiddleware');
  next(action);
  console.log('out timeMiddleware')
}
const time = timeMiddleware(store);
store.dispatch = middlewareExS(time(middlewareInS(next)));
store.dispatch({
  type: 'INCREMENT'
});

