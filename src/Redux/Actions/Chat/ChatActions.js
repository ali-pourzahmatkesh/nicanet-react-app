import { push } from 'connected-react-router'

import {
  SET_IS_LOADING,
  SET_USER_ID,
  CLEAN_AUTH,
} from '../../Constants/AuthConstants'
import { AuthApi } from '../../../Api/AuthApi'
import { HOME_ROUTE } from '../../../router/RouterConstants';

// export function login(data) {
//   return async dispatch => {
//     try {
//       dispatch({ type: SET_IS_LOADING, payload: true })

//       const { data: userId } = await AuthApi.login(data)
//       dispatch({ type: SET_IS_LOADING, payload: false })
//       dispatch({ type: SET_USER_ID, payload: userId })

//       dispatch(push(HOME_ROUTE))
//       localStorage.setItem('user_id', userId)
//     } catch (err) {
//       dispatch({ type: SET_IS_LOADING, payload: false })
//       console.log('failed to login', err)
//     }
//   }
// }

// export function logout() {
//   return dispatch => {
//     localStorage.removeItem('user_id')
//     dispatch({ type: CLEAN_AUTH })
//   }
// }
