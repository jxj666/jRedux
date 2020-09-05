/*
 * @LastEditTime: 2020-09-06 02:26:10
 * @LastEditors: jinxiaojian
 */
export const middlewareEx = (store) => (next) => (action) => {
  try {
    console.log('in middlewareEx')
    next(action)
    console.log('out middlewareEx')
  } catch (error) {
    console.log('error', error)
  }
}