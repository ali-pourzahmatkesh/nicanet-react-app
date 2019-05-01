import React from 'react'
import styled from 'styled-components'
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 1rem;
  padding: 0.3rem 1rem;
  background-color: #eeeeee;
  margin-top: 1rem;
`

const Left = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 0.6;
`

const Right = styled.div``

const LeftChild = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.7rem;
  }
`

function PostStatusBar(props) {
  const { post, onOpenComments } = props

  return (
    <Container>
      <Left>
        <LeftChild>
          <FaThumbsUp color="#757575" size={18} />
          {post.VoteUp.toString()}
        </LeftChild>
        <LeftChild>
          <FaThumbsDown color="#757575" size={18} />
          {post.VoteDown.toString()}
        </LeftChild>
      </Left>
      <Right onClick={onOpenComments}>
        {post.CommentCount.toString()} Comments
      </Right>
    </Container>
  )
}

export default PostStatusBar
