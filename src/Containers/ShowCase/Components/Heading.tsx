import React from "react";
import styled from "styled-components";

import LeftIcon from "Assets/Left.svg";
import RightIcon from "Assets/Right.svg";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0 2rem;
  border-bottom: 1px solid #bdbdbd;
`;

const Title = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 2rem;
  font-weight: bold;
  color: #000;
  flex:1;
  text-align: center;
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
      {onGoBack && (
        <BackIcon onClick={onGoBack} src={LeftIcon} />
      )}
      <Title>{title}</Title>
      {onGoForward && <ForwardIcon onClick={onGoForward} src={RightIcon} />}
    </Container>
  );
};

export default Heading;
