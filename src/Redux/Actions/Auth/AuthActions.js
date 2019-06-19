import { push } from 'connected-react-router';

import {
  SET_IS_LOADING,
  SET_USER,
  CLEAN_AUTH
} from '../../Constants/AuthConstants';
import { AuthApi } from '../../../Api/AuthApi';
import { HOME_ROUTE, LOGIN_ROUTE } from '../../../router/RouterConstants';
import { setToken, removeToken } from 'Api/Api';

export function login(loginData) {
  return async dispatch => {
    try {
      dispatch({ type: SET_IS_LOADING, payload: true });
      const { data } = await AuthApi.login(loginData);

      localStorage.setItem('user', JSON.stringify(data.Person));
      setToken(data.Token, true);

      dispatch({ type: SET_IS_LOADING, payload: false });
      dispatch({ type: SET_USER, payload: data.Person });
      dispatch(push(HOME_ROUTE));
    } catch (err) {
      dispatch({ type: SET_IS_LOADING, payload: false });
      console.safeError('failed to login', err);
    }
  };
}

export function setUserInfo(data) {
  console.log('in action', data);
  return async dispatch => {
    try {
      await localStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      console.safeError('failed to set user', err);
    }
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('user');
    removeToken();
    dispatch({ type: CLEAN_AUTH });
    dispatch(push(LOGIN_ROUTE));
  };
}
