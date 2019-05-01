import uniqBy from 'lodash.uniqby'
import createReducer from '../../CreateReducer'
import { UPDATE_CONVERSATIONS, CLEAN_CHAT, SET_IS_LOADING_CONVERSATIONS } from 'Redux/Constants/ChatConstants';

const initialState = {
  isLoadingConversations: false,
  conversations: [],
}

function updateConversations(state, action) {
  const oldConversations = state.conversations
  const newConversations = [...oldConversations, ...action.payload]

  return {
    ...state,
    conversations: uniqBy(newConversations, 'PersonId'),
  }
}

function setIsLoadingConversations(state, action) { 
  return {
    ...state,
    isLoadingConversations: action.payload,
  }
}

function cleanChat() {
  return { ...initialState }
}

const AuthReducer = createReducer(initialState, {
  [UPDATE_CONVERSATIONS]: updateConversations,
  [SET_IS_LOADING_CONVERSATIONS]: setIsLoadingConversations,
  [CLEAN_CHAT]: cleanChat,
})

export default AuthReducer
