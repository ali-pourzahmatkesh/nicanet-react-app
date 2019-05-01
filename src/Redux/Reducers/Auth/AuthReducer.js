import createReducer from '../../CreateReducer'
import {
  SET_USER,
  CLEAN_AUTH,
  SET_TOKEN,
  SET_IS_LOADING,
  SET_USER_ID,
} from '../../Constants/AuthConstants'

const initialState = {
  user: null,
  token: null,
  userId: null,
  isLoading: false,
}

function setUser(state, action) {
  return {
    ...state,
    user: action.payload,
  }
}

function setToken(state, action) {
  return {
    ...state,
    token: action.payload,
  }
}

function setUserId(state, action) {
  return {
    ...state,
    userId: action.payload,
  }
}

function setIsLoading(state, action) {
  return {
    ...state,
    isLoading: action.payload,
  }
}

function cleanAuth() {
  return { ...initialState }
}

const AuthReducer = createReducer(initialState, {
  [SET_USER]: setUser,
  [SET_TOKEN]: setToken,
  [SET_IS_LOADING]: setIsLoading,
  [SET_USER_ID]: setUserId,
  [CLEAN_AUTH]: cleanAuth,
})

export default AuthReducer
