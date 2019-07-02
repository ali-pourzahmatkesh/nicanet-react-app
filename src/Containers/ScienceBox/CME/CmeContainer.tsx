import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BounceLoader } from 'react-spinners';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import { CmeApi } from '../../../Api/CmeApi';
import debounce from 'lodash.debounce';
import ScienceBoxCard from './Components/ScienceBoxCard';
import SearchInput from './Components/SearchInput';

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
`;

const Card = styled.div`
  padding: 0 10px;
  margin-bottom: 28px;
  @media (min-width: 720px) {
    width: 50%;
    margin-bottom: 35px;
  }
  @media (min-width: 960px) {
    width: 33.3333%;
  }
`;

const LoadingWrapprer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const SearchInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0 -1rem 1rem;
  padding: 0.5rem 1rem;

  position: relative;
  top: -30px;
  background: #fff;
  z-index: 10;
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
  @media (min-width: 720px) {
    padding: 0 1rem 1rem;
    position: static;
    top: 0;
    box-shadow: none;
  }
`;

const PageTitle = styled.div`
  display: none;
  @media (min-width: 720px) {
    display: block;
    padding: 0 15%;
    margin-bottom: 1.2rem;
  }
`;

const Title = styled.div`
  padding: 20px 0;
  text-align: center;
  border-bottom: 1px solid #ddd;
  font-size: 30px;
  font-weight: bold;
`;

interface CmeContainerProps {}

function CmeContainer(props: CmeContainerProps & RouteComponentProps<{}>) {
  const [courseList, setCourseLists] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSearchingCourse, setIsSearchingCourse] = useState(false);

  useEffect(() => {
    const effect = async () => {
      setIsFetching(true);
      try {
        const response = await CmeApi.getCourseList();
        console.log('response', response);
        if (response.status === 200) {
          const data = response.data.CourseList;
          setCourseLists(data);
        }
      } catch (err) {
        console.log('error in get course list: ', err);
      } finally {
        setIsFetching(false);
      }
    };
    effect();
  }, []);

  const onSearchCourses = async (searchValue: any) => {
    setIsSearchingCourse(true);
    try {
      const response = await CmeApi.getCourseList(searchValue);
      const data = response.data.CourseList;
      setCourseLists(data);
    } catch (_) {
    } finally {
      setIsSearchingCourse(false);
    }
  };

  const onSearchCoursesDebounced = debounce(onSearchCourses, 500);

  return (
    <Layout title="Courses" isWide hasZindex>
      <PageTitle>
        <Title>Science Box</Title>
      </PageTitle>
      <SearchInputContainer>
        <SearchInput
          isLoading={isSearchingCourse}
          onChangeText={onSearchCoursesDebounced}
        />
      </SearchInputContainer>

      {isFetching && (
        <LoadingWrapprer>
          <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
        </LoadingWrapprer>
      )}

      <List>
        {courseList.length > 0 &&
          courseList.map((course, index) => {
            return (
              <Card key={index.toString()}>
                <ScienceBoxCard
                  isLarge={index === 0}
                  course={course}
                  // onPress={() => this.onCoursePress(course)}
                />
              </Card>
            );
          })}
      </List>
    </Layout>
  );
}

export default CmeContainer;
