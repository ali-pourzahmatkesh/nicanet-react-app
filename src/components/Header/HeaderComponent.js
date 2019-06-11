import React, { Fragment } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import logo from '../../Assets/logo.svg';
import homeIcon from '../../Assets/home.svg';
import userIcon from '../../Assets/user.svg';
import homeIconActive from '../../Assets/homeActive.svg';
import userIconActive from '../../Assets/userActive.svg';
import { HOME_ROUTE } from 'router/RouterConstants';

const Logo = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  cursor: pointer;
`;

const Container = styled.div`
  border-bottom: solid 1px #979797;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  z-index: 2;
  display: none;
  @media (min-width: 720px) {
    display: flex;
  }
`;

const Wrapper = styled.div`
  width: 720px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const SearchBox = styled.div`
  width: 100px;
`;

const MiddleEelements = styled.div`
  width: 560px;
`;

const LinksContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  max-width: 720px;
  // max-width: 1200px;
  margin: 0 auto;
  padding-right: 3rem;
`;

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

const Right = styled.div`
  border-left: solid 1px #979797;
  padding: 0.5rem 0 0.5rem 2.5rem;
`;

function Header(props) {
  const { pathname: route } = props.location;

  return (
    <Fragment>
      <Container>
        <Wrapper>
          <Logo src={logo} onClick={() => props.history.push(HOME_ROUTE)} />
          <MiddleEelements>
            <SearchBox />
            <LinksContainer>
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
            </LinksContainer>
          </MiddleEelements>
          <Right>
            <IconWrapper onClick={() => props.history.push('/profile')}>
              <Icon
                src={route.endsWith('/profile') ? userIconActive : userIcon}
              />
              <IconTitle>Profile</IconTitle>
            </IconWrapper>
          </Right>
        </Wrapper>
      </Container>
    </Fragment>
  );
}

export default withRouter(Header);
