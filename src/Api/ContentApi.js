import Api from './Api';

export const ContentApi = {
  getPerson: personId => Api.get(`/Person/${personId}`),
  getCurrentPersonContents: () => Api.get('/PersonalContent'),
  getPersonPosts: personId => Api.get(`/PersonalContent/${personId}`),
  getAllContent: userId => Api.get('/Content'),
  getContent: contentId => Api.get(`/Content?id=${contentId}&addVisit=true`),
  getTags: () => Api.get('/Tag'),
  deleteContent: ContentId => Api.put(`/Content/${ContentId}`),
  likeContent: (ContentId, CommentId, IsLike) =>
    Api.post('/Like', {
      ContentId,
      CommentId,
      IsLike
    }),
  removeLikeOrDislike: (ContentId, CommentId) =>
    Api.delete('/Like', {
      data: { ContentId, CommentId }
    }),
  sendComment: (url, data) => Api.post(`/${url}`, data)
};
