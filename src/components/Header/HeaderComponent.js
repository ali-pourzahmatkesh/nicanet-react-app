import React, { Fragment } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import logo from '../../Assets/logo.svg';
import homeIcon from '../../Assets/home.svg';
import userIcon from '../../Assets/user.svg';
import homeIconActive from '../../Assets/homeActive.svg';
import userIconActive from '../../Assets/userActive.svg';
import academyIcon from '../../Assets/academy.svg';
import academyIconActive from '../../Assets/academyActive.svg';
import { HOME_ROUTE } from 'router/RouterConstants';
import LeftIcon from 'Assets/Left.svg';
// import { FaSearch } from 'react-icons/fa';

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
  height: 44px;
  display: ${props => (props.hasTitle ? 'none' : 'block')};
  @media (min-width: 720px) {
    margin: 0;
    display: block;
    height: auto;
    padding-left: 1rem;
    width: 80px;
  }
`;

const Title = styled.div`
  margin: 0 auto;
  line-height: 44px;
  text-align: center;
  @media (min-width: 720px) {
    display: none;
  }
`;

const Container = styled.div`
  background-color: #fff;
  position: fixed;
  top: 0;
  height: 50px;
  width: 100%;
  left: 0;
  display: ${props => (props.theme.noHeader ? 'none' : 'flex')};
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  z-index: ${props => (props.theme.hasZindex ? '1' : 'auto')};
  @media (min-width: 560px) {
    width: ${props => (props.theme.isWide ? '100%' : '560px')};
    left: ${props => (props.theme.isWide ? '0' : '50%')};
    margin-left: ${props => (props.theme.isWide ? '0' : '-280px')};
  }
  @media (min-width: 720px) {
    position: static;
    border-bottom: 1px solid #bdbdbd;
    box-shadow: none;
    height: 100px;
    display: flex;
    width: 100%;
    left: 0;
    margin-left: 0;
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0.2rem 0;
  position: relative;
  width: 100%;
  @media (min-width: 720px) {
    width: 720px;
    display: flex;
    align-items: center;
    padding: 0;
    overflow: hidden;
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
  left: 0.5rem;
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
  const hasZindex = props.hasZindex || false;
  const isWide = props.isWide || false;

  return (
    <Fragment>
      <Container theme={{ hasZindex, noHeader, isWide }}>
        <Wrapper>
          <GoBack>
            <BackIcon onClick={() => props.history.goBack()} src={LeftIcon} />
          </GoBack>
          <LogoWrapper hasTitle={props.title ? true : false}>
            <Logo src={logo} onClick={() => props.history.push(HOME_ROUTE)} />
          </LogoWrapper>
          {props.title && <Title>{props.title}</Title>}
          <MiddleEelements>
            <SearchBox />
            <LinksContainer>
              <IconWrapper
                onClick={() => props.history.push(HOME_ROUTE)}
                hasMargin
              >
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
              <IconWrapper
                onClick={() => props.history.push('/sciencebox')}
                hasMargin
              >
                <IconContainer>
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
                </IconContainer>

                <IconTitle>Science Box</IconTitle>
              </IconWrapper>
              {/* <IconWrapper onClick={() => props.history.push('/search')} hasMargin>
                <IconContainer>
                  <FaSearch
                    color={route.endsWith('/search') ? '#5498A9' : '#757575'}
                    size={22}
                  />
                </IconContainer>

                <IconTitle>Search</IconTitle>
              </IconWrapper> */}
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
