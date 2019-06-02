import React from 'react';
import styled from 'styled-components';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #eeeeee;
  margin-top: 1rem;
`;

const Left = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0;
`;

const Right = styled.div`
  color: #757575;
`;

const LeftChild = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2.5rem;
  svg {
    margin-right: 0.7rem;
  }
`;

const Text = styled.div`
  color: #757575;
`;

function ContentStatusBar(props) {
  // const { content, onOpenComments } = props;
  const { content, commentCount } = props;
  const { VoteUp, VoteDown } = content;

  return (
    <Container>
      <Left>
        <LeftChild>
          <FaThumbsUp color="#757575" size={16} />
          <Text>{VoteUp && VoteUp.toString()}</Text>
        </LeftChild>
        <LeftChild>
          <FaThumbsDown color="#757575" size={16} />
          <Text>{VoteDown && VoteDown.toString()}</Text>
        </LeftChild>
      </Left>
      {/* <Right onClick={onOpenComments}> */}
      <Right>{commentCount ? commentCount.toString() : '0'} Comments</Right>
    </Container>
  );
}

export default ContentStatusBar;
