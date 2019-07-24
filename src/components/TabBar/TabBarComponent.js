import React, { Fragment } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import homeIcon from '../../Assets/home.svg';
import userIcon from '../../Assets/user.svg';
import homeIconActive from '../../Assets/homeActive.svg';
import userIconActive from '../../Assets/userActive.svg';
import { HOME_ROUTE } from 'router/RouterConstants';
import academyIcon from '../../Assets/academy.svg';
import academyIconActive from '../../Assets/academyActive.svg';
// import { FaSearch } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #979797;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 1rem;
  border-top: 1px solid #979797;
  height: 70px;
  @media (min-width: 720px) {
    display: none;
  }
`;

const LinksContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 720px;
  padding-top: 0.5rem;
  // max-width: 1200px;
  margin: 0 auto;
`;

// const IconContainer = styled.div`
//   width: 1.7rem;
//   height: 1.7rem;
//   display: flex;
//   align-items: center;
// `;

const Icon = styled.img`
  width: 1.7rem;
`;

const IconTitle = styled.div`
  font-family: Roboto;
  font-size: 0.7rem;
  color: #757575;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

function TabBar(props) {
  const { pathname: route } = props.location;

  return (
    <Fragment>
      <Container>
        <LinksContainer>
          <IconWrapper onClick={() => false && undefined} />
          <IconWrapper onClick={() => props.history.push(HOME_ROUTE)}>
            {route.startsWith('/home') ||
            route.startsWith('/post') ||
            route.startsWith('/add-adr') ||
            route.startsWith('/add-case') ||
            route.startsWith('/show-case') ? (
              <Icon src={homeIconActive} />
            ) : (
              <Icon src={homeIcon} />
            )}
            <IconTitle>Home</IconTitle>
          </IconWrapper>
          {/* <IconWrapper onClick={() => props.history.push('/search')}>
            <IconContainer>
              <FaSearch
                color={route.endsWith('/search') ? '#5498A9' : '#757575'}
                size={22}
              />
            </IconContainer>

            <IconTitle>Search</IconTitle>
          </IconWrapper> */}
          <IconWrapper onClick={() => props.history.push('/sciencebox')}>
            <Icon
              src={
                route === '/sciencebox' ||
                route.startsWith('/course') ||
                route.startsWith('/episodes') ||
                route.startsWith('/episode') ||
                route.startsWith('/exam')
                  ? academyIconActive
                  : academyIcon
              }
            />
            <IconTitle>Academy</IconTitle>
          </IconWrapper>
          {/* <IconWrapper onClick={() => props.history.push(CHAT_ROUTE)}>
            <Icon src={route.startsWith('/chat') ? chatIconActive : chatIcon} />
            <IconTitle>Chat</IconTitle>
          </IconWrapper> */}
          <IconWrapper onClick={() => props.history.push('/profile')}>
            <Icon
              src={route.endsWith('/profile') ? userIconActive : userIcon}
            />
            <IconTitle>Profile</IconTitle>
          </IconWrapper>
          <IconWrapper onClick={() => false && undefined} />
        </LinksContainer>
      </Container>
    </Fragment>
  );
}

export default withRouter(TabBar);
