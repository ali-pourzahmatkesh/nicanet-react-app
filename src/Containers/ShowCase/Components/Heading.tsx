import React from "react";
import styled from "styled-components";

import LeftIcon from "Assets/Left.svg";
import RightIcon from "Assets/Right.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 1rem;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
`;

const NavIconBase = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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
  LeftIconSvg: string;
  onGoBack?: () => void;
  onGoForward?: () => void;
};

const Heading: React.FC<HeadingProps> = props => {
  const { title, onGoForward, onGoBack, LeftIconSvg } = props;

  return (
    <Container>
      {onGoForward && <ForwardIcon onClick={onGoForward} src={RightIcon} />}
      {onGoBack && (
        <BackIcon onClick={onGoBack} src={LeftIconSvg || LeftIcon} />
      )}
      <Title>{title}</Title>
    </Container>
  );
};

export default Heading;
