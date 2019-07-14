import React from 'react';
import styled from 'styled-components';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { FiCornerDownRight } from 'react-icons/fi';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin: -1rem -1rem 0;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  position: relative;
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

const NavIconBase = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
  position: absolute;
`;

const ForwardIcon = styled(NavIconBase)`
  right: 1rem;
`;

const BackIcon = styled(NavIconBase)`
  left: 1rem;
`;

const SubmitExamIcon = styled(NavIconBase)`
  right: 4rem;
`;

function Heading(props) {
  const { title, onGoForward, onGoBack, onSubmit } = props;

  return (
    <Container>
      {onGoBack && (
        <BackIcon onClick={onGoBack}>
          <IoIosArrowBack color={'#5498a9'} size={26} />
        </BackIcon>
      )}
      <Title>{title}</Title>
      {onSubmit && (
        <SubmitExamIcon onClick={onSubmit}>
          <FiCornerDownRight color={'#5498a9'} size={26} />
        </SubmitExamIcon>
      )}
      {onGoForward && (
        <ForwardIcon onClick={onGoForward}>
          <IoIosArrowForward color={'#5498a9'} size={26} />
        </ForwardIcon>
      )}
    </Container>
  );
}

export default Heading;
