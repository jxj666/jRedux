/*
 * @LastEditTime: 2020-09-06 02:25:50
 * @LastEditors: jinxiaojian
 */
export const middlewareTime = (store) => (next) => (action) => {
  console.log('in middlewareTime');
  next(action);
  console.log('out middlewareTime')
}