/*
 * @LastEditTime: 2020-10-21 19:13:44
 * @LastEditors: jinxiaojian
 */
import { createStore } from '../../createStore.js'
import { combineReducers } from '../../combineReducers.js'
import { middlewareEx } from '../../middleware/ex.js'
import { middlewareIn } from '../../middleware/in.js'
import { middlewareTime } from '../../middleware/time.js'

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



const middlewareExS = middlewareEx(store)
const middlewareInS = middlewareIn(store)
const middlewareTimeS = middlewareTime(store);

store.dispatch = middlewareExS(middlewareTimeS(middlewareInS(next)));
store.dispatch({
  type: 'INCREMENT'
});

