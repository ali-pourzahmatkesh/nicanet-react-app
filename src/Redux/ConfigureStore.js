import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './Reducers/RootReducer';

export const history = createBrowserHistory();

function getPreloadedState() {
  console.log('in getPreloadedState');
  console.log('localStorage.getItem(token)', localStorage.getItem('token'));
  console.log('localStorage.getItem(user)', localStorage.getItem('user'));
  return {
    auth: {
      token: localStorage.getItem('token'),
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null
    }
  };
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
);
