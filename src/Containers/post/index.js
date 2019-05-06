import React, { useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { ContentApi } from '../../Api/ContentApi'
import { withAuthSync } from '../../utils/auth'
import Layout from '../../components/Partials/Layout'
import PostActions from '../../components/PostActions/PostActionsComponent'
import PostStatusBar from '../../components/PostStatusBar/PostStatusBarComponent'
import Comments from '../../components/Comments/CommentsComponent'

const PostImage = styled.img`
  border: solid 3px solid #eee;
  width: 100%;
  height: auto;
  margin: 0 auto;
`

const PostWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  text-align: center;
  padding-bottom: 5rem;
`

const AuthorWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  padding-top: 0.5rem;
  justify-content: space-between;
  padding: 0 1rem;
`

const AuthorImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 4rem;
  margin-right: 1rem;
`

const AuthorInfo = styled.div`
  width: auto;
  height: auto;
  float: left;
`

const AuthorTitle = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  clear: both;
  color: #000000;
`

const PublishTime = styled.div`
  font-family: Roboto;
  font-size: 0.8rem;
  float: left;
  color: #757575;
  text-align: left;
  clear: both;
`

const SubscribeBtn = styled.div`
  font-family: Roboto;
  font-size: 0.8rem;
  background-color: #5498a9;
  color: #fff;
  float: right;
  text-align: center;
  width: 80px;
  height: 20px;
  padding: 2px;
  border-radius: 0.3rem;
`

const Title = styled.div`
  font-family: Roboto;
  font-size: 1.2rem;
  color: #000000;
  text-align: left;
  padding: 0 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const Subtitle = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  color: #757575;
  text-align: left;
  padding: 0 1rem;
  line-height: 2rem;
`

const AuthorLeftCol = styled.div`
  display: flex;
  align-items: center;
`

const Interactions = styled.div`
  margin-top: 1rem;
`

function Post(props) {
  const [post, setPost] = useState(props.post)
  const [showComments, setShowComments] = useState(false)

  const { userId } = props
  const {
    ContentId,
    Subject,
    ContentText,
    WriterFullName,
    MultiMedias,
    WriterImage,
    TimeElapsed,
    PersonVoted,
    PersonVote
  } = post

  const updatePost = async () => {
    try {
      const response = await ContentApi.getContent(userId, ContentId)

      setPost(response.data)
    } catch (err) {}
  }

  const removeLikeOrDislike = async () => {
    try {
      await ContentApi.removeLikeOrDislike(ContentId, 0, +userId)
    } catch (err) {}
  }

  const onLike = async isLike => {
    try {
      // 0: first we delete like/dislike
      await removeLikeOrDislike(isLike)

      if (
        PersonVoted === true &&
        ((isLike && PersonVote === true) || (!isLike && PersonVote === false))
      ) {
        return
      }

      // 1: then we like or dislike
      await ContentApi.likeContent(ContentId, 0, +userId, isLike)

      toast.success(`Post ${isLike ? 'liked' : 'disliked'}`, {
        position: toast.POSITION.TOP_CENTER
      })
    } catch (err) {
      toast.error(`Failed to ${isLike ? 'like' : 'dislike'}`, {
        position: toast.POSITION.TOP_CENTER
      })
    } finally {
      updatePost()
    }
  }

  if (showComments) {
    return <Comments onClose={() => setShowComments(false)} post={post} />
  }

  return (
    <Layout>
      <PostWrapper>
        {MultiMedias && MultiMedias.length > 0 && (
          <PostImage
            src={`https://api.pointina.ir/${MultiMedias[0].FileUrl}`}
          />
        )}
        <AuthorWrapper>
          <AuthorLeftCol>
            {WriterImage && (
              <AuthorImage src={`https://api.pointina.ir/${WriterImage}`} />
            )}
            <AuthorInfo>
              {WriterFullName && <AuthorTitle>{WriterFullName}</AuthorTitle>}
              {TimeElapsed && <PublishTime>{TimeElapsed}</PublishTime>}
            </AuthorInfo>
          </AuthorLeftCol>
          {/* <SubscribeBtn>Subscribe</SubscribeBtn> */}
        </AuthorWrapper>
        {Subject && <Title>{Subject}</Title>}
        {ContentText && <Subtitle>{ContentText}</Subtitle>}
        <Interactions>
          <PostActions onLike={() => onLike(1)} onDisLike={() => onLike(0)} />
          <PostStatusBar
            onOpenComments={() => setShowComments(true)}
            post={post}
          />
        </Interactions>
      </PostWrapper>
    </Layout>
  )
}

Post.getInitialProps = async ({ query }, userId) => {
  const { postId } = query
  const response = await ContentApi.getContent(userId, postId)

  if (response.status !== 200) {
    return { post: null }
  }

  return {
    post: response.data
  }
}

export default withAuthSync(Post)
