import Api from './Api'

export const ContentApi = {
  getAllContent: userId => Api.get(`/Content?personId=${userId}`),
  getContent: (userId, contentId) =>
    Api.get(`/Content?id=${contentId}&personId=${userId}&addVisit=true`),
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
