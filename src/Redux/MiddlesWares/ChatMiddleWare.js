import io from 'socket.io-client';
import { API_CHAT_URL } from 'constants/ApiConstants';
import { store } from '../ConfigureStore';
import { UPDATE_CONVERSATIONS, SET_IS_LOADING_CONVERSATIONS } from 'Redux/Constants/ChatConstants';
import { UsersApi } from 'Api/UsersApi';
import { getPersonId } from 'utils/auth';

const EventMap = {};

const subscribe = (userId, callback) => {
  EventMap[userId] = callback;
};

const unSubscribe = userId => {
  EventMap[userId] = undefined;
};


function initSocket () {
  try {
    const personId = getPersonId()
  
    const socket = io.connect(API_CHAT_URL, {
      query: { id: personId },
    });

    socket.on('message', async message => {
      if (EventMap[message.sender]) {
        EventMap[message.sender](message);
      }
      const storeState = store.getState()
      const conversations = storeState.chat.conversations
      const conversationExists = conversations.some(c => c.PersonId.toString() === message.sender.toString())
      if (!conversationExists) {
        try {
          const { data: contact } = await UsersApi.getUser(message.sender)
          store.dispatch({ type: UPDATE_CONVERSATIONS, payload: [contact] })
        } catch (_) {}
      }
    });
  } catch (err) {
    console.safeError('error in intializing socket connection', err)
  }
};

async function fetchConversations () {
  try {
    const personId = getPersonId()
    const token = localStorage.getItem('api_token')
    if (!token) throw new Error('token does not exists', token)

    store.dispatch({ type: SET_IS_LOADING_CONVERSATIONS, payload: true })
    const response = await fetch(
      `${API_CHAT_URL}/chats?id=${personId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const conversations = await response.json();
    store.dispatch({ type: SET_IS_LOADING_CONVERSATIONS, payload: false })
    store.dispatch({ type: UPDATE_CONVERSATIONS, payload: conversations })
  } catch (err) {
    console.safeError('error in fetching user conversations', err)
  }
}

export const chatMiddleWare = {
  start: () => {
    initSocket()
    fetchConversations()
  },
  subscribe,
  unSubscribe,
}