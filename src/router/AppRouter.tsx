import React from 'react'
import { Switch, Route, withRouter, RouteComponentProps, Redirect } from 'react-router-dom'

import LoginContainer from 'Containers/Login/LoginContainer'
import HomeContainer from 'Containers/Home/HomeContainer';
import ChatContainer from 'Containers/Chat/ChatContainer';
import RoomContainer from 'Containers/Chat/RoomContainer';
import AddCaseStepZero from 'Containers/AddCase/AddCaseStepZero';
import { chatMiddleWare } from 'Redux/MiddlesWares/ChatMiddleWare';
import { connect } from 'react-redux';
import AddPostContainer from 'Containers/AddPost/AddPostContainer';

import {
  ROOT_ROUTE,
  LOGIN_ROUTE,
  HOME_ROUTE,
  CHAT_ROUTE,
  CHAT_ROOM_ROUTE,
  ADD_CASE_STEP_ZERO_ROUTE,
  ADD_POST_ROUTE,
} from './RouterConstants'

interface AppRouterProps {
  isloggedin: boolean
}

class AppRouter extends React.Component<any & RouteComponentProps<{}>, any> {
  render () {
    const { location } = this.props
    if (!this.props.isLoggedIn && !location.pathname.startsWith(LOGIN_ROUTE)) {
      return <Redirect to={LOGIN_ROUTE} />
    }

    chatMiddleWare.start()

    return (
      <Switch>
        <Route path={LOGIN_ROUTE} exact component={LoginContainer}  />
        <Route path={HOME_ROUTE} exact component={HomeContainer} />
        <Route path={CHAT_ROUTE} exact component={ChatContainer} />
        <Route path={CHAT_ROOM_ROUTE} exact component={RoomContainer} />
        <Route path={ADD_POST_ROUTE} exact component={AddPostContainer} />
        <Route path={ADD_CASE_STEP_ZERO_ROUTE} exact component={AddCaseStepZero} />
        <Route path={ROOT_ROUTE} component={LoginContainer} />
      </Switch>
    )
  }
}


const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.userId !== null
})


export default connect(mapStateToProps)(withRouter(AppRouter))
