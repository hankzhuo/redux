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
// b(dispatch) 返回结果作为函数 a 的参数，函数 a 执行返回的结果为 dispatch
// dispatch = f1(f2(f3(store.dispatch)))

var arr = [
	function fn1(args){
		console.log('fn1 args', args)
		return 1
	}, 
	function fn2(args) {
		console.log('fn2 args', args)
	return 2
	},
	function fn3(args) {
		console.log('fn3', args)
	return 3
	},
]

var fn = arr.reduce((a, b) => (args) => a(b(args)))
fn // (args) => a(b(args))
fn(4)
// 执行顺序：
// Return value: (args) => a(b(args))，用到了闭包，a 指向 fn1 函数，b 指向 fn2 函数
// a: ƒ fn1(args)
// b: ƒ fn2(args)

// a: (args) => a(b(args)) // 第一次返回值 (args) => a(b(args)) 赋值给 a
// b: ƒ fn3(args)

// Return value: (args) => a(b(args)) // 这里的 b 是指向 fn3，a 指向上一个返回值
// a: (args) => a(b(args)) 
// b: ƒ fn3(args)

// 返回值 (args) => a(b(args))