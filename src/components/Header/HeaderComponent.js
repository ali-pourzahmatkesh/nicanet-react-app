import React, { Fragment } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import logo from '../../Assets/logo.svg';
import homeIcon from '../../Assets/home.svg';
import userIcon from '../../Assets/user.svg';
import homeIconActive from '../../Assets/homeActive.svg';
import userIconActive from '../../Assets/userActive.svg';
import { HOME_ROUTE } from 'router/RouterConstants';
import LeftIcon from 'Assets/Left.svg';
import { FaSearch } from 'react-icons/fa';

const Logo = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  cursor: pointer;
  max-height: 100%;
  width: auto;
  margin: 0 auto;
`;

const LogoWrapper = styled.div`
  margin: 0 auto;
  height: 50px;
  @media (min-width: 720px) {
    margin: 0;
    height: auto;
    padding-left: 1rem;
    width: 80px;
  }
`;

const Container = styled.div`
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 50%;
  height: 50px;
  z-index: 2;
  width: 560px;
  margin-left: -280px;
  display: ${props => (props.noHeader ? 'none' : 'flex')};
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  @media (min-width: 720px) {
    border-bottom: 1px solid #bdbdbd;
    box-shadow: none;
    height: 100px;
    display: flex;
    width: 100%;
    left: 0;
    right: 0;
    margin-left: 0;
  }
`;

const Wrapper = styled.div`
  width: 560px;
  margin: 0 auto;
  padding: 0.2rem 0;
  position: relative;
  @media (min-width: 720px) {
    width: 720px;
    display: flex;
    align-items: center;
    padding: 0;
  }
`;

const SearchBox = styled.div`
  width: 100px;
`;

const MiddleEelements = styled.div`
  width: 560px;
  display: none;
  @media (min-width: 720px) {
    display: block;
  }
`;

const LinksContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  max-width: 720px;
  margin: 0 auto;
`;

const IconContainer = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  display: flex;
  align-items: center;
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
  margin-right: ${props => (props.hasMargin ? '2rem' : '0')};
`;

const Right = styled.div`
  display: none;
  @media (min-width: 720px) {
    display: block;
    width: 80px;
    border-left: solid 1px #979797;
    padding: 0.5rem 0;
    margin: 0 auto;
  }
`;

const GoBack = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  @media (min-width: 720px) {
    display: none;
  }
`;

const BackIcon = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
`;

function Header(props) {
  const { pathname: route } = props.location;
  const noHeader = props.noHeader || false;

  return (
    <Fragment>
      <Container noHeader={noHeader}>
        <Wrapper>
          <GoBack>
            <BackIcon onClick={() => props.history.goBack()} src={LeftIcon} />
          </GoBack>
          <LogoWrapper>
            <Logo src={logo} onClick={() => props.history.push(HOME_ROUTE)} />
          </LogoWrapper>
          <MiddleEelements>
            <SearchBox />
            <LinksContainer>
              <IconWrapper onClick={() => props.history.push(HOME_ROUTE)} hasMargin>
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
              <IconWrapper onClick={() => props.history.push('/search')} hasMargin>
                <IconContainer>
                  <FaSearch
                    color={route.endsWith('/search') ? '#5498A9' : '#757575'}
                    size={22}
                  />
                </IconContainer>

                <IconTitle>Search</IconTitle>
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
