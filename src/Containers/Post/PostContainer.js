import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { BounceLoader } from 'react-spinners';

import { ContentApi } from '../../Api/ContentApi';
import Layout from '../../components/Partials/Layout';
import ContentActions from '../../components/ContentActions/ContentActionsComponent';
import ContentStatusBar from '../../components/ContentStatusBar/ContentStatusBarComponent';
import Comments from '../../components/Comments/CommentsComponent';
import avatarPhoto from '../../Assets/avatar.jpg';
import { urlify  } from '../../utils/utils';

const PostImage = styled.img`
  border: solid 3px solid #eee;
  width: 100%;
  height: auto;
  margin: 0 auto;
`;

const PostWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  text-align: center;
`;

const AuthorWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  padding-top: 0.5rem;
  justify-content: space-between;
  padding: 0 1rem;
`;

const AuthorImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 4rem;
  margin-right: 1rem;
`;

const AuthorInfo = styled.div`
  width: auto;
  height: auto;
  float: left;
`;

const AuthorTitle = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  clear: both;
  color: #000000;
`;

const PublishTime = styled.div`
  font-family: Roboto;
  font-size: 0.8rem;
  float: left;
  color: #757575;
  text-align: left;
  clear: both;
`;

const Title = styled.div`
  font-family: Roboto;
  font-size: 1.2rem;
  color: #000000;
  text-align: left;
  padding: 0 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const LoadingWrapprer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const Subtitle = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  color: #757575;
  text-align: left;
  padding: 0 1rem;
  line-height: 2rem;
`;

const AuthorLeftCol = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Interactions = styled.div`
  margin-top: 3.5rem;
`;

const ContentWrapper = styled.div`
  padding-top: 1rem;
  min-height: calc(100vh - 361px);
  @media (min-width: 720px) {
    min-height: calc(100vh - 331px);
  }
`;

function PostContainer(props) {
  const [post, setPost] = useState(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const effect = async () => {
      const { postId } = props.match.params;
      const response = await ContentApi.getContent(postId);

      if (response.status === 200) {
        // console.log('response', response.data);
        setPost(response.data);
      }
    };

    effect();
  }, [props.match.params]);

  if (post === null)
    return (
      <Layout>
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      </Layout>
    );

  const {
    ContentId,
    Subject,
    ContentText,
    WriterFullName,
    MultiMedias,
    WriterImage,
    TimeElapsed,
    PersonVoted,
    PersonVote,
    WrittenById
  } = post;

  const updatePost = async () => {
    try {
      const response = await ContentApi.getContent(ContentId);

      setPost(response.data);
    } catch (err) {}
  };

  const removeLikeOrDislike = async () => {
    try {
      await ContentApi.removeLikeOrDislike(ContentId, 0);
    } catch (err) {}
  };

  const onLike = async isLike => {
    try {
      // 0: first we delete like/dislike
      await removeLikeOrDislike(isLike);

      if (
        PersonVoted === true &&
        ((isLike && PersonVote === true) || (!isLike && PersonVote === false))
      ) {
        return;
      }

      // 1: then we like or dislike
      await ContentApi.likeContent(ContentId, 0, isLike);

      toast.success(`Post ${isLike ? 'liked' : 'disliked'}`, {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (err) {
      toast.error(`Failed to ${isLike ? 'like' : 'dislike'}`, {
        position: toast.POSITION.TOP_CENTER
      });
    } finally {
      updatePost();
    }
  };

  if (showComments) {
    return <Comments onClose={() => setShowComments(false)} content={post} />;
  }

  return (
    <Layout noPadding>
      <PostWrapper>
        <ContentWrapper>
          {MultiMedias && MultiMedias.length > 0 && (
            <PostImage
              src={`https://api.pointina.ir${MultiMedias[0].FileUrl}`}
            />
          )}

          <AuthorWrapper>
            <AuthorLeftCol
              onClick={() => {
                props.history.push(`/profile/${WrittenById}`);
              }}
            >
              <AuthorImage
                src={
                  WriterImage
                    ? `https://api.pointina.ir${WriterImage}`
                    : avatarPhoto
                }
              />
              <AuthorInfo>
                {WriterFullName && <AuthorTitle>{WriterFullName}</AuthorTitle>}
                {TimeElapsed && <PublishTime>{TimeElapsed}</PublishTime>}
              </AuthorInfo>
            </AuthorLeftCol>
            {/* <SubscribeBtn>Subscribe</SubscribeBtn> */}
          </AuthorWrapper>
          {Subject && <Title>{Subject}</Title>}
          {ContentText && <Subtitle dangerouslySetInnerHTML={{ __html: urlify(ContentText) }} />}
        </ContentWrapper>
        <Interactions>
          <ContentActions
            onLike={() => onLike(1)}
            onDisLike={() => onLike(0)}
            content={post}
          />
          <ContentStatusBar
            // onOpenComments={() => setShowComments(true)}
            commentCount={post.CommentCount || 0}
            content={post}
          />
          <Comments
            onClose={() => setShowComments(false)}
            content={post}
            source="post"
            updateContent={() => updatePost()}
            comments={post.Comments || []}
            goToProfile={CommentWrittenId => {
              props.history.push(`/profile/${CommentWrittenId}`);
            }}
          />
        </Interactions>
      </PostWrapper>
    </Layout>
  );
}

export default PostContainer;
