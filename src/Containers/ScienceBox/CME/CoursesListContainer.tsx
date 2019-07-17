import React, { useState } from 'react';
import styled from 'styled-components';
import { BounceLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroller';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import { CmeApi } from '../../../Api/CmeApi';
import debounce from 'lodash.debounce';
import ScienceBoxCard from './Components/ScienceBoxCard';
import SearchInput from './Components/SearchInput';
import { API_PAGINATION_TAKE } from '../../../constants/ApiConstants';

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
  width: 100%;
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

const ScrollParent = styled.div``;

const Empty = styled.div`
  text-align: center;
  padding: 20px 0;
`;

interface CoursesListContainerProps {}

function CoursesListContainer(
  props: CoursesListContainerProps & RouteComponentProps<{}>
) {
  const [courseList, setCourseList] = useState([]);
  const [isSearchingCourse, setIsSearchingCourse] = useState(false);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const getCourceList = async () => {
    try {
      const response = await CmeApi.getCourseList(pageNumber);
      console.log('response', response.data);
      await setHasMoreItems(false);
      if (response.status === 200) {
        const AllCount = response.data.AllCount;
        setCourseList(courseList.concat(response.data.CourseList));
        if ((pageNumber + 1) * API_PAGINATION_TAKE < AllCount) {
          await setHasMoreItems(true);
          await setPageNumber(pageNumber + 1);
        }
      }
    } catch (err) {
      setHasMoreItems(false);
      console.log('error in get course list: ', err);
    } finally {
      await setHasMoreItems(false);
    }
  };

  const onSearchCourses = async (searchValue: any) => {
    setIsSearchingCourse(true);
    setSearchValue(searchValue);
    try {
      const response = await CmeApi.getSearchedCourseList(searchValue);
      if (response.status === 200) {
        setCourseList(response.data.CourseList);
      }
    } catch (err) {
      console.log('error in get searched course list: ', err);
    } finally {
      setIsSearchingCourse(false);
    }
  };

  const onCoursePress = (course: any) =>
    course.Bought
      ? props.history.push(`episodes/${course.CourseId}`)
      : props.history.push(`course/${course.CourseId}`);

  const onSearchCoursesDebounced = debounce(onSearchCourses, 1000);
  const loader = (
    <LoadingWrapprer key={0}>
      <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
    </LoadingWrapprer>
  );
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

      {searchValue && courseList.length === 0 && (
        <Empty>No results found.</Empty>
      )}

      <ScrollParent>
        <InfiniteScroll
          pageStart={0}
          loadMore={getCourceList}
          hasMore={hasMoreItems}
          loader={loader}
        >
          <List>
            {courseList.length > 0 &&
              courseList.map((course, index) => {
                return (
                  <Card key={index.toString()}>
                    <ScienceBoxCard
                      isLarge={index === 0}
                      course={course}
                      onPress={() => onCoursePress(course)}
                    />
                  </Card>
                );
              })}
          </List>
        </InfiniteScroll>
      </ScrollParent>
    </Layout>
  );
}

export default CoursesListContainer;
