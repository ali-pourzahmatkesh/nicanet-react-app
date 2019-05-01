import uniqBy from 'lodash.uniqby'
import createReducer from '../../CreateReducer'
import { UPDATE_CONVERSATIONS, CLEAN_CHAT } from 'Redux/Constants/ChatConstants';

const initialState = {
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

function cleanChat() {
  return { ...initialState }
}

const AuthReducer = createReducer(initialState, {
  [UPDATE_CONVERSATIONS]: updateConversations,
  [CLEAN_CHAT]: cleanChat,
})

export default AuthReducer
