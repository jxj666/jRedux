/*
 * @LastEditTime: 2020-09-05 23:48:53
 * @LastEditors: jinxiaojian
 */
import {createStore} from  '../createStore.js'
import {combineReducers} from '../combineReducers.js'

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

// 记录日志
/*重写了store.dispatch*/
const next = store.dispatch;
store.dispatch = (action) => {
  console.log('this state', store.getState(),'action', action);
  next(action);
  console.log('next state', store.getState());
}
store.dispatch({
  type: 'INCREMENT'
});

