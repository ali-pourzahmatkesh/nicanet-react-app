import React from 'react';
import styled from 'styled-components';
import { IoIosShareAlt, IoIosSend } from 'react-icons/io';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  // justify-content: space-between;
  align-items: flex-end;
  padding: 0 1rem;
  justify-content: center;
`;

const Action = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  
  margin: 0 2rem;
`;

const LikeCircle = styled.div`
  background-color: ${props => (props.isLike ? '#5498A9' : '#757575')};
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2.5rem;
  cursor: pointer;
`;

const DisLikeCircle = styled.div`
  background-color: ${props => (props.isDisLike ? '#f5a623' : '#757575')};
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2.5rem;
  cursor: pointer;
`;

const Circle = styled.div`
  background-color: #757575;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2.5rem;
  cursor: pointer;
`;

const Title = styled.div`
  margin-top: 6px;
  font-size: 0.8rem;
  width: 4.5rem;
  text-align: center;
`;

function ContentActions(props) {
  const { onLike, onDisLike, content } = props;
  return (
    <Container>
      <Action onClick={onLike}>
        <LikeCircle isLike={content.PersonVoted && content.PersonVote}>
          <FaThumbsUp color="#fff" size={20} />
        </LikeCircle>
        <Title>
          {content.PersonVoted && content.PersonVote ? 'Voted Up' : 'Vote Up'}
        </Title>
      </Action>
      <Action onClick={onDisLike}>
        <DisLikeCircle isDisLike={content.PersonVoted && !content.PersonVote}>
          <FaThumbsDown color="#fff" size={20} />
        </DisLikeCircle>
        <Title>
          {content.PersonVoted && !content.PersonVote
            ? 'Voted Down'
            : 'Vote Down'}
        </Title>
      </Action>
      {/* <Action>
        <Circle>
          <IoIosShareAlt color="#fff" size={28} />
        </Circle>
        <Title>Share</Title>
      </Action>
      <Action>
        <Circle>
          <IoIosSend color="#fff" size={28} />
        </Circle>
        <Title>Send</Title>
      </Action> */}
    </Container>
  );
}

export default ContentActions;
