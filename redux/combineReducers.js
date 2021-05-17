/*
 * @LastEditTime: 2021-05-17 16:19:32
 * @LastEditors: jinxiaojian
 */

// combineReducers部分的源码相对冗杂，其中包括对生产环境/开发环境以及其他系列入参类型的校验

// combineReducers 函数来把多个 reducer 函数合并成一个 reducer 函数
export function combineReducers (reducers) {
  console.log('in combineReducers', reducers)
  /* reducerKeys = ['counter', 'info']*/
  const reducerKeys = Object.keys(reducers)
  /*返回合并后的新的reducer函数*/
  return function combination (state = {}, action) {
    console.log('in combination', state , action)
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
    console.log('out combination', nextState)
    return nextState;
  }
}