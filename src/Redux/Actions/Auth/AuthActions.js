import { push } from 'connected-react-router'

import {
  SET_IS_LOADING,
  SET_USER,
  CLEAN_AUTH,
} from '../../Constants/AuthConstants'
import { AuthApi } from '../../../Api/AuthApi'
import { HOME_ROUTE } from '../../../router/RouterConstants';
import { setToken } from 'Api/Api';

export function login(loginData) {
  return async dispatch => {
    try {
      dispatch({ type: SET_IS_LOADING, payload: true })
      const { data } = await AuthApi.login(loginData)
      
      localStorage.setItem('user', JSON.stringify(data.Person))
      setToken(data.Token)

      dispatch({ type: SET_IS_LOADING, payload: false })
      dispatch({ type: SET_USER, payload: data.Person })
      dispatch(push(HOME_ROUTE))
    } catch (err) {
      dispatch({ type: SET_IS_LOADING, payload: false })
      console.log('failed to login', err)
    }
  }
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('user')
    dispatch({ type: CLEAN_AUTH })
  }
}
