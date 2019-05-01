import Api, { ChatApi } from './Api'
import { getPersonId } from 'utils/auth';

export const UsersApi = {
  getUsers: (searchValue) => Api.get(`/PersonList?name=${searchValue}`),
  getUser: (userId) => Api.get(`Person/${userId}`),
  getUserMessages: (userId, contactId) => ChatApi.get(`/messages?id=${userId}&from=${contactId}`),
  sendMessage: ({ type = 'text', personId = getPersonId(), receiver, content }) => ChatApi.post('/messages', {
    type: 'text',
    sender: personId.toString(),
    receiver,
    content,
  })
}
