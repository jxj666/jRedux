/*
 * @LastEditTime: 2021-05-17 11:56:37
 * @LastEditors: jinxiaojian
 */

// bindActionCreator将值为actionCreator的对象转化成具有相同键值的对象，每一个actionCreator都会被dispatch所包裹调用，因此可以直接使用，简而言之，bindActionCreator可以让开发者在不直接接触dispacth的前提下进行更改state的操作

// 通过闭包，把 dispatch 和 actionCreator 隐藏起来，让其他地方感知不到 redux 的存在。


// 对于单个actionCreator，代码很简单，直接返回一个被dispatch包裹过的action而已，对于多个actionCreators，如果入口参数是一个function，说明只提供了一个actionCreator，直接调用bindActionCreator(actionCreators,dispatch)，对于以对象形式输入的多个actionCreators，对其遍历输出每一个bindActionCreator(actionCreators,dispatch)并封装在具有同名键值的boundActionCreators对象中，这样在我们需要调用action的地方直接boundActionCreators[actionCreate定义名]就可以了

/*核心的代码在这里，通过闭包隐藏了 actionCreator 和 dispatch*/
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments))
  }
}

/* actionCreators 必须是 function 或者 object */
export  function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error()
  }

  const keys = Object.keys(actionCreators)
  const boundActionCreators = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const actionCreator = actionCreators[key]
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  return boundActionCreators
}