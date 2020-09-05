/*
 * @LastEditTime: 2020-09-05 23:50:40
 * @LastEditors: jinxiaojian
 */

// combineReducers 函数来把多个 reducer 函数合并成一个 reducer 函数
export function combineReducers (reducers) {
  /* reducerKeys = ['counter', 'info']*/
  const reducerKeys = Object.keys(reducers)
  /*返回合并后的新的reducer函数*/
  return function combination (state = {}, action) {
    /*生成的新的state*/
    const nextState = {}
    /*遍历执行所有的reducers，整合成为一个新的state*/
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i]
      const stateCell = state[key]
      /*执行 分 reducer，获得新的state*/
      const newStateCell = reducers[key](stateCell, action)
      nextState[key] = newStateCell
    }
    return nextState;
  }
}