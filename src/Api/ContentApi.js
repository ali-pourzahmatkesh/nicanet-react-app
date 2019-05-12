import Api from './Api'

export const ContentApi = {
  getPerson: (personId) => Api.get(`/Person/${personId}`),
  getCurrentPersonContents: () => Api.get('/PersonalContent'),
  getPersonPosts: (personId) => Api.get(`/PersonalContent/${personId}`),
  getAllContent: userId => Api.get(`/Content?personId=${userId}`),
  getContent: (contentId) =>
    Api.get(`/Content?id=${contentId}&addVisit=true`),
  likeContent: (ContentId, CommentId, PersonId, IsLike) =>
    Api.post('/Like', {
      ContentId,
      CommentId,
      PersonId,
      IsLike
    }),
  removeLikeOrDislike: (ContentId, CommentId, PersonId) =>
    Api.delete('/Like', {
      data: { ContentId, CommentId, PersonId }
    })
}
