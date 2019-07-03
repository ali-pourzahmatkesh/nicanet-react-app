import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { numberWithCommas } from '../../../utils/utils';
import playImage from '../../../Assets/play.png';
import { toast } from 'react-toastify';
import { BounceLoader } from 'react-spinners';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import { CmeApi } from '../../../Api/CmeApi';
import avatarPhoto from '../../../Assets/avatar.jpg';
import { IoIosVideocam } from 'react-icons/io';
import ContentActions from '../../../components/ContentActions/ContentActionsComponent';
import ContentStatusBar from '../../../components/ContentStatusBar/ContentStatusBarComponent';
import CommentsComponent from '../../../components/Comments/CommentsComponent';

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

const ImageWrapper = styled.div`
  position: relative;
  margin: 0 0 10px 0;
  z-index: 0;
`;

const ImageBackground = styled.img`
  width: 100%;
  display: block;
`;

const MoreButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px;
  width: 136px;
  margin-left: -68px;
`;

const MoreButtonText = styled.div`
  color: #fff;
  flex: 1;
  text-align: center;
  font-size: 12px;
`;

const MoreButtonPlayIcon = styled.img``;
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
  font-size: 14;
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
`;

const TrailerText = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
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
  color: rgb(117, 117, 117);
  font-size: 12px;
  margin-bottom: 28px;
`;

const CourseInfoCol = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
`;

const CourseInfoText = styled.div`
  color: rgb(117, 117, 117);
  font-size: 10px;
  padding-left: 5px;
  padding-right: 5px;
`;

const CourseInfoNumber = styled.div`
  font-weight: bold;
  color: #5498a9;
  font-size: 10px;
`;

const Interactions = styled.div`
  margin-top: 3.5rem;
`;

interface SienceBoxCourseContainerProps {}

function SienceBoxCourseContainer(
  props: SienceBoxCourseContainerProps & RouteComponentProps<{ courseId: '' }>
) {
  const { match } = props;
  const { params } = match;
  const { courseId } = params;

  const [course, setCourse] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

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

  if (course === null || isFetching)
    return (
      <Layout>
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      </Layout>
    );

  const {
    CourseName: courseName,
    Price: coursePrice,
    Teacher: courseTeacher,
    Episodes: courseEpisodesCount,
    TrainingPoints: courseTrainingPoints,
    CourseIntroductionUrl: courseIntroductionUrl,
    TeacherImage: courseTeacherImage,
    Note: courseNote,
    TeacherMajor: courseTeacherMajor,
    Bought: bought,
    CourseComments: courseComments,
    PersonVoted,
    PersonVote,
    CommentCount
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

  return (
    <Layout title="Videos" hasZindex noPadding>
      <Container>
        <ImageWrapper>
          <ImageBackground
            src={`https://api.pointina.ir${courseIntroductionUrl}`}
          />
          <MoreButton>
            <MoreButtonPlayIcon src={playImage} alt="" />
            {!bought && (
              <MoreButtonText>
                {numberWithCommas(coursePrice)} IRR
              </MoreButtonText>
            )}
          </MoreButton>
        </ImageWrapper>
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

            <TrailerWrapper>
              <IoIosVideocam color={'#5498A9'} size={22} />
              <TrailerText>Watch Trailer</TrailerText>
            </TrailerWrapper>
          </DetailsWrapper>

          <CourseInfo>
            <CourseTitle>{courseName}</CourseTitle>
            <CourseInfoCol>
              <CourseInfoNumber>{courseEpisodesCount}</CourseInfoNumber>
              <CourseInfoText>Episodes</CourseInfoText>
              <CourseInfoNumber>{courseTrainingPoints}</CourseInfoNumber>
              <CourseInfoText>Training Points</CourseInfoText>
            </CourseInfoCol>
            <CourseDesc>{courseNote}</CourseDesc>
            {/* {courseExam && (
            <ExamCard
              disabled
              title={courseExam.CourseItemName}
              questionCount={courseExam.QuestionCount}
            />
          )} */}
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

export default SienceBoxCourseContainer;
