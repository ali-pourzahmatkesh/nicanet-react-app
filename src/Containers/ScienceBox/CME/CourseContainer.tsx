import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { BounceLoader } from 'react-spinners';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import { CmeApi } from '../../../Api/CmeApi';
import avatarPhoto from '../../../Assets/avatar.jpg';
import ContentActions from '../../../components/ContentActions/ContentActionsComponent';
import ContentStatusBar from '../../../components/ContentStatusBar/ContentStatusBarComponent';
import CommentsComponent from '../../../components/Comments/CommentsComponent';
import BuyInfo from './Components/BuyInfo';
import movieIcon from '../../../Assets/movie.svg';
import VideoPlayer from '../../../components/VideoPlayer/VideoPlayerComponent';

const Container = styled.div`
  margin-top: -10px;
  @media (min-width: 720px) {
    margin-top: 0;
    padding: 30px 30px 0;
  }
`;

const CourseInfoWrapper = styled.div`
  padding: 10px 20px 0;
`;

const MoreButton = styled.div`
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  width: 136px;
  margin-left: -68px;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex: 1;
  padding-horizontal: 16px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const LoadingWrapprer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const AuthorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const AuthorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 24px;
  margin-right: 1rem;
  background: ${props => `url(${props.src}) center center no-repeat`};
  background-size: cover;
`;

const AuthorName = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const AuthorJob = styled.div`
  font-size: 10px;
  margin-bottom: 4px;
`;

const TimeReleased = styled.div`
  color: rgb(117, 117, 117);
  font-size: 10px;
`;

const TrailerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100px;
  cursor: pointer;
`;

const TrailerText = styled.div`
  font-size: 12px;
  font-weight: bold;
  margin-left: 5px;
  margin-top: 3px;
`;

const CourseInfo = styled.div`
  padding-horizontal: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CourseTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const CourseDesc = styled.div`
  color: #757575;
  font-size: 12px;
  margin-bottom: 28px;
`;

const CourseInfoCol = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  margin: 0.6rem 0;
`;

const CourseInfoText = styled.div<{ hasMargin?: boolean }>`
  color: rgb(117, 117, 117);
  font-size: 10px;
  padding-left: 5px;
  padding-right: 5px;
  margin-right: ${props => (props.hasMargin ? '12px' : '0')};
  @media (min-width: 720px) {
    font-size: 13px;
  }
`;

const CourseInfoNumber = styled.div`
  font-weight: bold;
  color: #5498a9;
  font-size: 10px;
  @media (min-width: 720px) {
    font-size: 13px;
  }
`;

const Interactions = styled.div`
  margin-top: 3.5rem;
`;

const MoreButtonTexts = styled.div`
  color: #fff;
  text-align: center;
  padding: 8px;
  cursor: pointer;
`;

const Purchased = styled.div`
  font-size: 0.6rem;
  margin-bottom: 5px;
`;

const ViewEpisodes = styled.div`
  font-size: 0.7rem;
  font-weight: bold;
`;

const Icon = styled.img`
  width: 20px;
`;

const ImageWrapper = styled.div<{ isShow?: boolean }>`
  position: relative;
  margin: 0 0 10px 0;
  z-index: ${props => (props.isShow ? 1 : 0)};
  opacity: ${props => (props.isShow ? 1 : 0)};
  transition: opacity 0.3 ease-in-out;
`;

const ImageBackground = styled.img`
  width: 100%;
  display: block;
`;

const VideoPlayerWrapper = styled.div<{ isShow?: boolean }>`
  opacity: ${props => (props.isShow ? 1 : 0)};
  transition: opacity 0.3 ease-in-out;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: ${props => (props.isShow ? 1 : 0)};
`;

const Media = styled.div`
  position: relative;
`;

interface CourseContainerProps {}

function CourseContainer(
  props: CourseContainerProps & RouteComponentProps<{ courseId: '' }>
) {
  const { match } = props;
  const { params } = match;
  const { courseId } = params;

  const [course, setCourse] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [playTrailer, setPlayTrailer] = useState(false);
  const [openBuyInfoModal, setOpenBuyInfoModal] = useState(false);

  useEffect(() => {
    const effect = async () => {
      setIsFetching(true);
      try {
        let response = await CmeApi.getCourse(courseId);
        if (response.status === 200) {
          setCourse(response.data);
          console.log('response.data', response.data);
        }
      } catch (_) {
      } finally {
        setIsFetching(false);
      }
    };
    effect();
  }, [courseId]);

  if (isFetching)
    return (
      <Layout title="Videos">
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      </Layout>
    );

  if (course === null)
    return (
      <Layout title="Videos">
        <div />
      </Layout>
    );

  const {
    CourseName: courseName,
    Teacher: courseTeacher,
    EpisodeCount: courseEpisodesCount,
    TrainingPoints: courseTrainingPoints,
    CourseImageUrl: courseImageUrl,
    TeacherImage: courseTeacherImage,
    Note: courseNote,
    TeacherMajor: courseTeacherMajor,
    Bought: bought,
    CourseComments: courseComments,
    PersonVoted,
    PersonVote,
    CommentCount,
    CourseId,
    TrailerUrl
  } = course;

  const updateCourse = async () => {
    try {
      const response = await CmeApi.getCourse(courseId);

      if (response.status === 200) {
        setCourse(response.data);
      }
    } catch (err) {}
  };

  const removeLikeOrDislike = async () => {
    try {
      await CmeApi.removeLikeOrDislike(courseId, 0);
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
      await CmeApi.likeContent(courseId, 0, isLike);

      toast.success(`Course ${isLike ? 'liked' : 'disliked'}`, {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (err) {
      toast.error(`Failed to ${isLike ? 'like' : 'dislike'}`, {
        position: toast.POSITION.TOP_CENTER
      });
    } finally {
      updateCourse();
    }
  };

  const onBuyPress = () => {
    console.log('go to bank');
  };

  const onViewEpisodesPress = (course: any) =>
    props.history.push(`/episodes/${course.CourseId}`);

  return (
    <Layout title="Videos" noPadding>
      <Container>
        <Media>
          <ImageWrapper isShow={!playTrailer && !openBuyInfoModal}>
            <ImageBackground src={`https://api.pointina.ir${courseImageUrl}`} />
            <MoreButton>
              {bought ? (
                <MoreButtonTexts onClick={() => onViewEpisodesPress(course)}>
                  <Purchased>Purchased</Purchased>
                  <ViewEpisodes>View Episodes</ViewEpisodes>
                </MoreButtonTexts>
              ) : (
                <BuyInfo
                  course={course}
                  onBuyPress={onBuyPress}
                  onTriggerModal={(isOpenBuyInfoModal: boolean) => {
                    setOpenBuyInfoModal(isOpenBuyInfoModal);
                  }}
                />
              )}
            </MoreButton>
          </ImageWrapper>
          <VideoPlayerWrapper isShow={playTrailer && !openBuyInfoModal}>
            <VideoPlayer
              poster={`https://api.pointina.ir${courseImageUrl}`}
              source={`https://api.pointina.ir${TrailerUrl}`}
              play={playTrailer}
              videoWidth="100%"
              videoHeight="100%"
              onEnded={() => {
                setPlayTrailer(false);
              }}
            />
          </VideoPlayerWrapper>
        </Media>

        <CourseInfoWrapper>
          <DetailsWrapper>
            <AuthorWrapper>
              <AuthorImage
                src={
                  courseTeacherImage
                    ? `https://api.pointina.ir${courseTeacherImage}`
                    : avatarPhoto
                }
              />
              <div>
                <AuthorName>{courseTeacher}</AuthorName>
                <AuthorJob>{courseTeacherMajor}</AuthorJob>
                <TimeReleased>Today, 2hrs ago</TimeReleased>
              </div>
            </AuthorWrapper>

            <TrailerWrapper onClick={() => setPlayTrailer(true)}>
              <Icon src={movieIcon} />
              <TrailerText>Watch Trailer</TrailerText>
            </TrailerWrapper>
          </DetailsWrapper>

          <CourseInfo>
            <CourseTitle>{courseName}</CourseTitle>
            <CourseInfoCol>
              <CourseInfoNumber>{courseEpisodesCount}</CourseInfoNumber>
              <CourseInfoText hasMargin>Episodes</CourseInfoText>
              <CourseInfoNumber>{courseTrainingPoints}</CourseInfoNumber>
              <CourseInfoText>Training Points</CourseInfoText>
            </CourseInfoCol>
            <CourseDesc>{courseNote}</CourseDesc>
          </CourseInfo>
        </CourseInfoWrapper>
      </Container>
      <Interactions>
        <ContentActions
          onLike={() => onLike(1)}
          onDisLike={() => onLike(0)}
          content={course}
        />
        <ContentStatusBar commentCount={CommentCount || 0} content={course} />
        <CommentsComponent
          content={course}
          source="course"
          updateContent={() => updateCourse()}
          comments={courseComments || []}
          goToProfile={(CommentWrittenId: number) => {
            props.history.push(`/profile/${CommentWrittenId}`);
          }}
          disabled={!bought}
        />
      </Interactions>
    </Layout>
  );
}

export default CourseContainer;
