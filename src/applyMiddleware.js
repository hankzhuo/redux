import compose from './compose'

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {  // args 为 (reducer, initialState)
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
        'Other middleware would not be applied to this dispatch.'
      )
    }

    const middlewareAPI = { // 给一个 middleware 的 store
      getState: store.getState,
      dispatch: (...args) => dispatch(...args) // 这里的用意是？为什么不直接用 store.dispatch
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI)) // 匿名参数为 next 的函数
    dispatch = compose(...chain)(store.dispatch) // 经过 compose 函数后返回的结果，是经过 middlewares 包装后的 dispatch 

    return {
      ...store,
      dispatch
    }
  }
}
