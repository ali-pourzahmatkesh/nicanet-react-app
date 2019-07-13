import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { BounceLoader } from 'react-spinners';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import { CmeApi } from '../../../Api/CmeApi';

const Container = styled.div`
  @media (min-width: 720px) {
    margin-top: 0;
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

interface ExamContainerProps {}

function ExamContainer(
  props: ExamContainerProps & RouteComponentProps<{ courseId: '' }>
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

  // const {
  //   CourseName: courseName,
  //   Teacher: courseTeacher,
  //   EpisodeCount: courseEpisodesCount,
  //   TrainingPoints: courseTrainingPoints,
  //   CourseImageUrl: courseImageUrl,
  //   TeacherImage: courseTeacherImage,
  //   Note: courseNote,
  //   TeacherMajor: courseTeacherMajor,
  //   Bought: bought,
  //   CourseComments: courseComments,
  //   PersonVoted,
  //   PersonVote,
  //   CommentCount,
  //   CourseId,
  //   TrailerUrl
  // } = course;
  return (
    <Layout title="Question 2 / 5">
      <Container>aaa</Container>
    </Layout>
  );
}

export default ExamContainer;
