import Api from './Api';

export const CmeApi = {
  getCourseList: (searchValue = '') => {
    const url = searchValue
      ? `/CourseList?SearchText=${searchValue}`
      : '/CourseList';
    return Api.get(url);
  }
};
