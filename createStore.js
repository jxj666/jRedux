/*
 * @LastEditTime: 2020-10-16 19:53:48
 * @LastEditors: jinxiaojian
 */
// createStore，提供了 changeState(dispatch)，getState，subscribe 三个能力
export const createStore = function (reducer, initState, rewriteCreateStoreFunc) {
  if (typeof initState === 'function') {
    rewriteCreateStoreFunc = initState;
    initState = undefined;
  }
  if (rewriteCreateStoreFunc) {
    const newCreateStore = rewriteCreateStoreFunc(createStore);
    return newCreateStore(reducer, initState);
  }
  console.log('in createStore', reducer, initState)
  let state = initState
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

