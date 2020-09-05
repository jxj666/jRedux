/*
 * @LastEditTime: 2020-09-06 01:21:32
 * @LastEditors: jinxiaojian
 */
// 我们需要拆分，一个 state，一个 reducer 写一块
//  拆分state

import {createStore} from '../createStore.js'
import {combineReducers} from '../combineReducers.js'

//将state跟action合并

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
console.log('state1',store.getState());

store.subscribe(() => {
  let state = store.getState();
  console.log('state2',state);
});
/*自增*/
store.dispatch({
  type: 'INCREMENT'
});

/*修改 name*/
store.dispatch({
  type: 'SET_NAME',
  name: '前端九部2号'
});