import React from 'react';
import styled from 'styled-components';

const Avatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 2rem;
  border: solid 1px #eeeeee;
  margin-right: 1rem;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  color: #424242;
`;

const LastMessage = styled.div`
  font-size: 1rem;
  color: #757575;
`;

interface ChatListItemProps {
  name: string;
  avatarSource: string;
  lastMessaage?: string;
  onClick: () => void;
}

function ChatListItem(props: ChatListItemProps) {
  const { name, avatarSource, lastMessaage, onClick } = props;
  return (
    <Container onClick={onClick}>
      <Avatar src={avatarSource} />
      <Col>
        <Name>{name}</Name>
        {lastMessaage && <LastMessage>{lastMessaage}</LastMessage>}
      </Col>
    </Container>
  );
}

export default ChatListItem;
