import React from 'react';
import styled from 'styled-components';

import LeftIcon from 'Assets/Left.svg';
import RightIcon from 'Assets/Right.svg';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin: -1rem -1rem 0;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  @media (min-width: 720px) {
    margin: 0;
    padding: 1rem 0 2rem;
    border-bottom: 1px solid #bdbdbd;
    box-shadow: none;
  }
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #000;
  flex: 1;
  text-align: center;
  @media (min-width: 720px) {
    font-size: 2rem;
  }
`;

const NavIconBase = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
`;

const ForwardIcon = styled(NavIconBase)`
  right: 1rem;
`;

const BackIcon = styled(NavIconBase)`
  left: 1rem;
`;

type HeadingProps = {
  title: string;
  onGoBack?: () => void;
  onGoForward?: () => void;
};

const Heading: React.FC<HeadingProps> = props => {
  const { title, onGoForward, onGoBack } = props;

  return (
    <Container>
      {onGoBack && <BackIcon onClick={onGoBack} src={LeftIcon} />}
      <Title>{title}</Title>
      {onGoForward && <ForwardIcon onClick={onGoForward} src={RightIcon} />}
    </Container>
  );
};

export default Heading;
