import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BounceLoader } from 'react-spinners';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import { CmeApi } from '../../../Api/CmeApi';
import avatarPhoto from '../../../Assets/avatar.jpg';
import EpisodItem from './Components/EpisodItem';
import ExamCard from './Components/ ExamCard';

const Container = styled.div`
  padding: 20px 20px 0;
  @media (min-width: 720px) {
    padding: 30px 30px 0;
  }
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

const CourseInfo = styled.div`
  padding-horizontal: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
  border-bottom: 1px solid #ddd;
  @media (min-width: 720px) {
    margin-bottom: 10px;
  }
`;

const CourseTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CourseDesc = styled.div`
  color: #757575;
  font-size: 12px;
  margin: 20px 0 15px;
`;

const CourseInfoCol = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
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

const Episods = styled.div``;

interface EpisodesContainerProps {}

function EpisodesContainer(
  props: EpisodesContainerProps & RouteComponentProps<{ courseId: '' }>
) {
  const { match } = props;
  const { params } = match;
  const { courseId } = params;

  const [course, setCourse] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const effect = async () => {
      setIsFetching(true);
      try {
        let response = await CmeApi.getCourse(courseId);
        if (response.status === 200) {
          setCourse(response.data);
          setEpisodes(response.data.EpisodesContent);
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
      <Layout title="Episodes">
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      </Layout>
    );

  if (course === null)
    return (
      <Layout title="Episodes">
        <div />
      </Layout>
    );

  const {
    CourseName: courseName,
    Teacher: courseTeacher,
    Episodes: courseEpisodesCount,
    TrainingPoints: courseTrainingPoints,
    TeacherImage: courseTeacherImage,
    Note: courseNote,
    TeacherMajor: courseTeacherMajor
  } = course;

  const onViewEpisodePress = (episod: any) =>
    props.history.push(`/episode/${episod.CourseId}`);

  return (
    <Layout title="Episodes" noPadding hasZindex>
      <Container>
        <CourseTitle>{courseName}</CourseTitle>
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

        <CourseInfo>
          <CourseDesc>{courseNote}</CourseDesc>
          <CourseInfoCol>
            <CourseInfoNumber>{courseEpisodesCount}</CourseInfoNumber>
            <CourseInfoText hasMargin>Episodes</CourseInfoText>
            <CourseInfoNumber>{courseTrainingPoints}</CourseInfoNumber>
            <CourseInfoText>Training Points</CourseInfoText>
          </CourseInfoCol>
        </CourseInfo>
        {/* {episodes.length > 0 && (
          <Episods>
            {episodes.map((episod, index) => (
              <EpisodItem
                key={index.toString()}
                episod={episod}
                isLarge={index === 0}
                onPress={() => onViewEpisodePress(episod)}
              />
            ))}
          </Episods>
        )} */}

        {/* {courseExam && (
            <ExamCard
              disabled
              title={courseExam.CourseItemName}
              questionCount={courseExam.QuestionCount}
            />
          )} */}
        <ExamCard type="disabled" title="Exam Title" questionCount={50} />
      </Container>
    </Layout>
  );
}

export default EpisodesContainer;
