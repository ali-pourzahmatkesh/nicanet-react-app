import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'

import AuthReducer from './Auth/AuthReducer'
import ChatReducer from './Chat/ChatReducer'

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth: AuthReducer,
    chat: ChatReducer,
  })
