import React from 'react';
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
  Redirect
} from 'react-router-dom';

import LoginContainer from 'Containers/Login/LoginContainer';
import HomeContainer from 'Containers/Home/HomeContainer';
import ChatContainer from 'Containers/Chat/ChatContainer';
import RoomContainer from 'Containers/Chat/RoomContainer';
import AddCaseStepZero from 'Containers/AddCase/AddCaseStepZero';
import { chatMiddleWare } from 'Redux/MiddlesWares/ChatMiddleWare';
import { connect } from 'react-redux';
import AddPostContainer from 'Containers/AddPost/AddPostContainer';
import AddCaseStepOne from 'Containers/AddCase/AddCaseStepOne';
import AddCaseStepTwo from 'Containers/AddCase/AddCaseStepTwo';
import AddCaseStepThree from 'Containers/AddCase/AddCaseStepThree';
import AddCaseStepFour from 'Containers/AddCase/AddCaseStepFour';
import AddCaseStepFive from 'Containers/AddCase/AddCaseStepFive';
import AddCaseStepSix from 'Containers/AddCase/AddCaseStepSix';
import ProfileContainer from 'Containers/Profile/ProfileContainer';
import PostContainer from 'Containers/Post/PostContainer';
import AddAdrStepZero from 'Containers/AddAdr/AddAdrStepZero';
import AddAdrStepOne from 'Containers/AddAdr/AddAdrStepOne';
import AddAdrStepTwo from 'Containers/AddAdr/AddAdrStepTwo';
import AddAdrStepThree from 'Containers/AddAdr/AddAdrStepThree';
import AddAdrStepFour from 'Containers/AddAdr/AddAdrStepFour';
import ShowCaseStepOneContainer from 'Containers/ShowCase/ShowCaseStepOneContainer';
import ShowCaseStepTwoContainer from 'Containers/ShowCase/ShowCaseStepTwoContainer';
import ShowCaseStepThreeContainer from 'Containers/ShowCase/ShowCaseStepThreeContainer';
import ShowCaseStepFourContainer from 'Containers/ShowCase/ShowCaseStepFourContainer';
import AddAdrStepFive from 'Containers/AddAdr/AddAdrStepFive';
import EditProfile from 'Containers/EditProfile/EditProfileContainer';
import SearchContainer from 'Containers/Search/SearchContainer';
import NotFoundContainer from 'Containers/NotFound/NotFoundContainer';
import CmeContainer from 'Containers/ScienceBox/CME/CmeContainer';
import CourseContainer from 'Containers/ScienceBox/CME/Course';

import {
  ROOT_ROUTE,
  LOGIN_ROUTE,
  HOME_ROUTE,
  CHAT_ROUTE,
  CHAT_ROOM_ROUTE,
  ADD_CASE_STEP_ZERO_ROUTE,
  ADD_POST_ROUTE,
  ADD_CASE_STEP_ONE_ROUTE,
  ADD_CASE_STEP_TWO_ROUTE,
  ADD_CASE_STEP_THREE_ROUTE,
  ADD_CASE_STEP_FOUR_ROUTE,
  ADD_CASE_STEP_FIVE_ROUTE,
  ADD_CASE_STEP_SIX_ROUTE,
  PROFILE_ROUTE,
  SHOW_POST_ROUTE,
  ADD_ADR_STEP_ZERO_ROUTE,
  ADD_ADR_STEP_ONE_ROUTE,
  ADD_ADR_STEP_TWO_ROUTE,
  ADD_ADR_STEP_THREE_ROUTE,
  ADD_ADR_STEP_FOUR_ROUTE,
  ADD_ADR_STEP_FIVE_ROUTE,
  SHOW_CASE_STEP_ONE_ROUTE,
  SHOW_CASE_STEP_TWO_ROUTE,
  SHOW_CASE_STEP_THREE_ROUTE,
  SHOW_CASE_STEP_FOUR_ROUTE,
  EDIT_PROFILE_ROUTE,
  SEARCH_ROUTE,
  NOT_FOUND_ROUTE,
  SCIENCE_BOX_ROUTE,
  COURSE_ROUTE
} from './RouterConstants';

interface AppRouterProps {
  isLoggedIn: boolean;
}

class AppRouter extends React.Component<
  AppRouterProps & RouteComponentProps<{}>,
  any
> {
  render() {
    const { location } = this.props;

    console.log('this.props.isLoggedIn', this.props.isLoggedIn);

    if (!this.props.isLoggedIn && location.pathname !== LOGIN_ROUTE) {
      return <Redirect to={LOGIN_ROUTE} />;
    } else if (
      this.props.isLoggedIn &&
      location.pathname !== LOGIN_ROUTE &&
      location.pathname !== HOME_ROUTE &&
      location.pathname !== NOT_FOUND_ROUTE &&
      !location.pathname.startsWith('/add-case-step-zero') &&
      location.pathname !== ADD_POST_ROUTE &&
      !location.pathname.startsWith('/add-case-step-one') &&
      !location.pathname.startsWith('/add-case-step-two') &&
      !location.pathname.startsWith('/add-case-step-three') &&
      !location.pathname.startsWith('/add-case-step-four') &&
      !location.pathname.startsWith('/add-case-step-five') &&
      !location.pathname.startsWith('/add-case-step-six') &&
      !location.pathname.startsWith('/profile') &&
      !location.pathname.startsWith('/post') &&
      location.pathname !== ADD_ADR_STEP_ZERO_ROUTE &&
      location.pathname !== ADD_ADR_STEP_ONE_ROUTE &&
      location.pathname !== ADD_ADR_STEP_TWO_ROUTE &&
      location.pathname !== ADD_ADR_STEP_THREE_ROUTE &&
      location.pathname !== ADD_ADR_STEP_FOUR_ROUTE &&
      location.pathname !== ADD_ADR_STEP_FIVE_ROUTE &&
      !location.pathname.startsWith('/show-case-step-one') &&
      !location.pathname.startsWith('/show-case-step-two') &&
      !location.pathname.startsWith('/show-case-step-three') &&
      !location.pathname.startsWith('/show-case-step-four') &&
      location.pathname !== EDIT_PROFILE_ROUTE &&
      location.pathname !== SEARCH_ROUTE &&
      location.pathname !== SCIENCE_BOX_ROUTE &&
      !location.pathname.startsWith('/course')
    ) {
      return <Redirect to={NOT_FOUND_ROUTE} />;
    }

    chatMiddleWare.start();

    return (
      <Switch>
        <Route path={LOGIN_ROUTE} exact component={LoginContainer} />
        <Route path={HOME_ROUTE} component={HomeContainer} />
        <Route path={SEARCH_ROUTE} exact component={SearchContainer} />
        <Route path={PROFILE_ROUTE} exact component={ProfileContainer} />
        <Route path={CHAT_ROUTE} exact component={ChatContainer} />
        <Route path={CHAT_ROOM_ROUTE} exact component={RoomContainer} />
        <Route path={ADD_POST_ROUTE} exact component={AddPostContainer} />
        <Route path={SHOW_POST_ROUTE} exact component={PostContainer} />
        <Route path={ADD_ADR_STEP_ONE_ROUTE} exact component={AddAdrStepOne} />
        <Route path={ADD_ADR_STEP_TWO_ROUTE} exact component={AddAdrStepTwo} />
        <Route
          path={ADD_ADR_STEP_THREE_ROUTE}
          exact
          component={AddAdrStepThree}
        />
        <Route
          path={ADD_ADR_STEP_FOUR_ROUTE}
          exact
          component={AddAdrStepFour}
        />
        <Route
          path={ADD_ADR_STEP_FIVE_ROUTE}
          exact
          component={AddAdrStepFive}
        />
        <Route
          path={ADD_CASE_STEP_ZERO_ROUTE}
          exact
          component={AddCaseStepZero}
        />
        <Route
          path={ADD_CASE_STEP_ONE_ROUTE}
          exact
          component={AddCaseStepOne}
        />
        <Route
          path={ADD_CASE_STEP_TWO_ROUTE}
          exact
          component={AddCaseStepTwo}
        />
        <Route
          path={ADD_CASE_STEP_THREE_ROUTE}
          exact
          component={AddCaseStepThree}
        />
        <Route
          path={ADD_CASE_STEP_FOUR_ROUTE}
          exact
          component={AddCaseStepFour}
        />
        <Route
          path={ADD_CASE_STEP_FIVE_ROUTE}
          exact
          component={AddCaseStepFive}
        />
        <Route
          path={ADD_CASE_STEP_SIX_ROUTE}
          exact
          component={AddCaseStepSix}
        />
        <Route
          path={ADD_ADR_STEP_ZERO_ROUTE}
          exact
          component={AddAdrStepZero}
        />
        <Route
          path={SHOW_CASE_STEP_ONE_ROUTE}
          exact
          component={ShowCaseStepOneContainer}
        />
        <Route
          path={SHOW_CASE_STEP_TWO_ROUTE}
          exact
          component={ShowCaseStepTwoContainer}
        />
        <Route
          path={SHOW_CASE_STEP_THREE_ROUTE}
          exact
          component={ShowCaseStepThreeContainer}
        />
        <Route
          path={SHOW_CASE_STEP_FOUR_ROUTE}
          exact
          component={ShowCaseStepFourContainer}
        />
        <Route path={EDIT_PROFILE_ROUTE} exact component={EditProfile} />
        <Route path={SEARCH_ROUTE} exact component={SearchContainer} />
        <Route path={SCIENCE_BOX_ROUTE} exact component={CmeContainer} />
        <Route path={COURSE_ROUTE} exact component={CourseContainer} />
        <Route path={NOT_FOUND_ROUTE} component={NotFoundContainer} />
      </Switch>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.user !== null
});

export default connect(mapStateToProps)(withRouter(AppRouter));
