import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { BounceLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { ContentApi } from '../../Api/ContentApi';
import { RouteComponentProps } from 'react-router';
import Layout from '../../components/Partials/Layout';
import ContentActions from '../../components/ContentActions/ContentActionsComponent';
import ContentStatusBar from '../../components/ContentStatusBar/ContentStatusBarComponent';
import CommentsComponent from '../../components/Comments/CommentsComponent';
import avatarPhoto from '../../Assets/avatar.jpg';
import { urlify } from '../../utils/utils';
import DetectLanguage from '../../components/DetectLanguage/DetectLanguageComponent';
import { NOT_FOUND_ROUTE, HOME_ROUTE } from '../../router/RouterConstants';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

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
  padding: 1rem 1rem 0;
`;

const AuthorImage = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 2rem;
  border: solid 1px #eeeeee;
  margin-right: 1rem;
  background: ${props => `url(${props.src}) center center no-repeat`};
  background-size: cover;
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
  min-height: calc(100vh - 361px);
  @media (min-width: 720px) {
    min-height: calc(100vh - 331px);
  }
`;

const Delete = styled.div`
  display: inline-block;
  color: #f00;
  cursor: pointer;
  font-weight: bold;
  padding: 0.5rem;
`;

const DeleteBtn = styled.div`
  text-align: center;
  margin-top: 2.5rem;
`;

interface PostContainerProps {
  caseId: string;
  user: any;
}

function PostContainer(
  props: PostContainerProps & RouteComponentProps<{ postId: '' }>
) {
  const [post, setPost] = useState(null);
  const [multiMedias, setMultiMedias] = useState<any[]>([]);

  const { user } = props;

  useEffect(() => {
    const effect = async () => {
      try {
        const { postId } = props.match.params;
        const response = await ContentApi.getContent(postId);

        if (response.status === 200) {
          // console.log('response', response.data);
          setPost(response.data);
          setMultiMedias(response.data.MultiMedias);
        }
      } catch (err) {
        console.log('error in get case: ', err);
        props.history.push(NOT_FOUND_ROUTE);
      }
    };

    effect();
  }, [props.history, props.match.params]);

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
    WriterImage,
    TimeElapsed,
    PersonVoted,
    PersonVote,
    WrittenById,
    CommentCount,
    Comments
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

  const onLike = async (isLike: number) => {
    try {
      // 0: first we delete like/dislike
      await removeLikeOrDislike();

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

  const deleteConfirmation = () => {
    confirmAlert({
      title: 'Are you sure?',
      message:
        'Do you really want to delete this post? This Process cantnot be undone.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => onDelete()
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const onDelete = async () => {
    try {
      if (!ContentId) return;
      const response = await ContentApi.deleteContent(ContentId);
      if (response.status !== 204) return;
      toast.success('This post deleted', {
        position: toast.POSITION.TOP_CENTER
      });
      setTimeout(() => {
        props.history.push(HOME_ROUTE);
      }, 4000);
    } catch (err) {
      console.log('error in delete post: ', err);
    }
  };

  return (
    <Layout noPadding>
      <PostWrapper>
        <ContentWrapper>
          {multiMedias && multiMedias.length > 0 && (
            <PostImage
              src={`https://api.pointina.ir${multiMedias[0].FileUrl}`}
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
          </AuthorWrapper>
          {Subject && (
            <DetectLanguage value={Subject}>
              <Title>{Subject}</Title>
            </DetectLanguage>
          )}
          {ContentText && (
            <DetectLanguage value={ContentText}>
              <Subtitle
                dangerouslySetInnerHTML={{ __html: urlify(ContentText) }}
              />
            </DetectLanguage>
          )}
        </ContentWrapper>
        <Interactions>
          <ContentActions
            onLike={() => onLike(1)}
            onDisLike={() => onLike(0)}
            content={post}
          />

          {+user.PersonId === +WrittenById && (
            <DeleteBtn>
              <Delete onClick={deleteConfirmation}>Delete Case</Delete>
            </DeleteBtn>
          )}

          <ContentStatusBar commentCount={CommentCount || 0} content={post} />
          <CommentsComponent
            content={post}
            source="post"
            updateContent={() => updatePost()}
            comments={Comments || []}
            goToProfile={(CommentWrittenId: number) => {
              props.history.push(`/profile/${CommentWrittenId}`);
            }}
          />
        </Interactions>
      </PostWrapper>
    </Layout>
  );
}

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(PostContainer);
