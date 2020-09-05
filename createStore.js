/*
 * @LastEditTime: 2020-09-06 01:21:05
 * @LastEditors: jinxiaojian
 */
// createStore，提供了 changeState(dispatch)，getState，subscribe 三个能力
export const createStore = function (reducer, initState) {
  console.log('in createStore',reducer, initState)
  let state = initState
  let listeners = [];
  /*订阅*/
  function subscribe (listener) {
    listeners.push(listener);
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
  dispatch({ type: Symbol() })
  return {
    subscribe,
    dispatch,
    getState
  }
}

