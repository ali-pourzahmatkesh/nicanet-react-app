import React from 'react'
import styled from 'styled-components'
import { IoIosShareAlt, IoIosSend } from 'react-icons/io'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 1rem;
`

const Action = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Circle = styled.div`
  background-color: #757575;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2.5rem;
`

const Title = styled.div`
  margin-top: 6px;
  font-size: 0.8rem;
`

function PostActions(props) {
  const { onLike, onDisLike } = props

  return (
    <Container>
      <Action onClick={onLike}>
        <Circle>
          <FaThumbsUp color="#fff" size={20} />
        </Circle>
        <Title>Vote Up</Title>
      </Action>
      <Action onClick={onDisLike}>
        <Circle>
          <FaThumbsDown color="#fff" size={20} />
        </Circle>
        <Title>Vote Down</Title>
      </Action>
      <Action>
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
      </Action>
    </Container>
  )
}

export default PostActions
