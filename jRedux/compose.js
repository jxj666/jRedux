/*
 * @LastEditTime: 2021-05-17 11:53:21
 * @LastEditors: jinxiaojian
 */

// 中间件运行处理函数

// export default function compose (...funcs) {
//   if (funcs.length === 1) {
//     return funcs[0]
//   }
//   //[].reduce 数组累加  
//   return funcs.reduce((a, b) => (...args) => a(b(...args)))
// }

export default function compose(...funcs) {
  if (funcs.length ===0) {
      return arg => arg
  }
  if (funcs.length ===1) {
      return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
} 