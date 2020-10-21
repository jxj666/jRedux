import {bindActionCreators} from '../bindActionCreators.js'
import {combineReducers} from '../combineReducers.js'
import {createStore} from '../createStore.js'


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
function infoReducer (state = {
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
  info: infoReducer
});
const store = createStore(reducer);

/*返回 action 的函数就叫 actionCreator*/
function increment() {
  return {
    type: 'INCREMENT'
  }
}

function setName(name) {
  return {
    type: 'SET_NAME',
    name: name
  }
}



const actions = bindActionCreators({ increment, setName }, store.dispatch);

actions.increment(); /*自增*/
actions.setName('九部威武'); /*修改 info.name*/