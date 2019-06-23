import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux/src/index'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'

const logger = store => next => action => {
  console.log('dispatch', action)
  next(action)
  console.log('finish', action)
}

const logger2 = store => next2 => action2 => {
  console.log('dispatch2', action2)
  next2(action2)
  console.log('finish2', action2)
}

// dispatch distapch2  finish2 finish

const store = createStore(rootReducer, applyMiddleware(logger, logger2))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
