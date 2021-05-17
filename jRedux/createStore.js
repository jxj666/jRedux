/*
 * @LastEditTime: 2021-05-17 16:19:08
 * @LastEditors: jinxiaojian
 */
// CreateStore作为生成唯一store的函数，是Redux中最核心的API
// createStore，提供了 changeState(dispatch)，getState，subscribe 三个能力

// 首先enhancer在缺省条件下判断如果preloadedState是个函数，则将其视为enhancer，这里enhancer本身是个引入中间件扩展功能的返回函数，enhancer(createStore)(reducer, preloadedState)实际上是输出一个增强了dispatch功能的store

// dispatch主要完成：调用对应reducer->通知所有listener更新状态

export const createStore = function (reducer, preloadedState, enhancer) {
  if (typeof preloadedState === 'function') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }
  if (enhancer) {
    const newCreateStore = enhancer(createStore);
    return newCreateStore(reducer, preloadedState);
  }
  // console.log('in createStore', reducer, preloadedState)
  let state = preloadedState
  let listeners = [];

  dispatch({ type: Symbol() })

  /*订阅*/
  function subscribe (listener) {
    listeners.push(listener);
    return function unsubscribe () {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }
  function dispatch (action) {
    state = reducer(state, action);
    /*当 state 改变的时候，我们要去通知所有的订阅者*/
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }
  function getState () {
    return state
  }
  function replaceReducer (nextReducer) {
    reducer = nextReducer
    /*刷新一遍 state 的值，新来的 reducer 把自己的默认状态放到 state 树上去*/
    dispatch({ type: Symbol() })
  }

  return {
    subscribe,
    dispatch,
    getState,
    replaceReducer,
  }
}

