import Api from './Api';
import { API_PAGINATION_TAKE } from '../constants/ApiConstants';

export const CmeApi = {
  getCourseList: (page = 0) => {
    const url = `/CourseList?take=${API_PAGINATION_TAKE}&skip=${API_PAGINATION_TAKE *
      page}`;
    return Api.get(url);
  },
  getSearchedCourseList: (searchValue = '') => {
    const url = `/CourseList?SearchText=${searchValue}`;
    return Api.get(url);
  }
};
