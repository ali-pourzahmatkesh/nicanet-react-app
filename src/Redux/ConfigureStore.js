import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import createRootReducer from './Reducers/RootReducer'

export const history = createBrowserHistory()

function getPreloadedState() {
  return {
    auth: {
      token: localStorage.getItem('token'),
      user: JSON.parse(localStorage.getItem('user')),
      userId: +localStorage.getItem('user_id')
    },
  }
}

export const store = createStore(
  createRootReducer(history), // root reducer with router state
  getPreloadedState(),
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      thunk
    )
  )
)
