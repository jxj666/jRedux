/*
 * @LastEditTime: 2020-09-06 02:26:38
 * @LastEditors: jinxiaojian
 */
export const middlewareIn = (store) => (next) => (action) => {
  console.log('in middlewareIn', JSON.stringify(store.getState()), 'action', JSON.stringify(action));
  next(action);
  console.log('out middlewareIn', JSON.stringify(store.getState()));
}

