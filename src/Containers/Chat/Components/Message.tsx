import React from 'react'
import styled from 'styled-components';

const Container: any = styled.div`
  background-color: ${props => (props as any).isFromCurrentUser ? '#a9cbd4' : '#eee'};
  display: inline-block;
  padding: 0.6rem;
  font-size: 0.8rem;
  border-radius: 0.5rem;
  margin: 0.4rem 0;
  display: flex;
  align-self: ${props => (props as any).isFromCurrentUser ? 'flex-end' : 'flex-start'};
`

interface MessageProps {
  message: any
}

function Message(props: MessageProps) {
  const { message } = props

  return (
    <Container isFromCurrentUser={message.isFromCurrentUser}>
      {message.type === 'text' ? message.content : 'Unsupported message type'}
    </Container>
  )
}

export default Message
