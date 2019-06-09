import Api, { ChatApi } from './Api';
import { getPersonId } from 'utils/auth';

export const UsersApi = {
  getUsers: searchValue => Api.get(`/PersonList?name=${searchValue}`),
  getUser: userId => Api.get(`Person/${userId}`),
  getCurrentUser: () => Api.get('Person'),
  editUser: data => Api.put('/Person', data),
  subscribe: FollowedId => Api.post('/Subscribe', { FollowedId }),
  unSubscribe: FollowedId =>
    Api.delete('/Subscribe', {
      data: { FollowedId }
    }),
  getUserMessages: (userId, contactId) =>
    ChatApi.get(`/messages?id=${userId}&from=${contactId}`),
  sendMessage: ({
    type = 'text',
    personId = getPersonId(),
    receiver,
    content
  }) =>
    ChatApi.post('/messages', {
      type: 'text',
      sender: personId.toString(),
      receiver,
      content
    }),
  getUniversities: universityName =>
    Api.get(`/University?universityName=${universityName}`),
  addPost: bodyFormData =>
    Api({
      url: '/Content',
      method: 'POST',
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    }),
  uploadUserPhoto: bodyFormData =>
    Api({
      url: '/personimage',
      method: 'PUT',
      data: bodyFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
};
