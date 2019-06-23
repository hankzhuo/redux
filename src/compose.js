/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

// 第一步：reduce 函数执行，返回 result1 = (...args) => a(b(...args))
// 第二步：result1(store.dispatch) ==> (dispatch) => a(b(dispatch))，a、b为 middleware 参数为 next 的函数
// a(b(dispatch)) 柯里化，b(dispatch) 返回结果作为函数 a 的参数，函数 a 执行返回的结果