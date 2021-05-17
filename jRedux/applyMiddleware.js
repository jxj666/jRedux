/*
 * @LastEditTime: 2021-05-17 11:51:33
 * @LastEditors: jinxiaojian
 */
import compose from './compose'


export const applyMiddleware = function (...middlewares) {
  /*返回一个重写createStore的方法*/
  return function rewriteCreateStoreFunc (oldCreateStore) {
    /*返回重写后新的 createStore*/
    return function newCreateStore (reducer, initState) {
      /*1. 生成store*/
      const store = oldCreateStore(reducer, initState);
      /*给每个 middleware 传下store，相当于 const logger = loggerMiddleware(store);*/
      /* const chain = [exception, time, logger]*/
      // const chain = middlewares.map(middleware => middleware(store));
      // 只允许用 getState 
      const simpleStore = { getState: store.getState };
      const chain = middlewares.map(middleware => middleware(simpleStore));
      // let dispatch = store.dispatch;
      // /* 实现 exception(time((logger(dispatch))))*/
      // chain.reverse().map(middleware => {
      //   dispatch = middleware(dispatch);
      // });
      let dispatch = compose(...chain)(store.dispatch)
      console.log('chain', chain)
      /*2. 重写 dispatch*/
      store.dispatch = dispatch;
      return store;
    }
  }
}

// export default function compose (...funcs) {
//   if (funcs.length === 1) {
//     return funcs[0]
//   }
//   //[].reduce 数组累加  
//   return funcs.reduce((a, b) => (...args) => a(b(...args)))
// }