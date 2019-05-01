import React from 'react'
import styled from 'styled-components'
import { IoIosClose } from 'react-icons/io'

import Layout from '../Partials/Layout'

const Close = styled.div``

const Comment = styled.div`
  padding: 0 1rem;
  padding-top: 1rem;
  border-radius: 5px;
`

const AuthorImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
`

const CommentText = styled.div``

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 0.5rem;
  }
`

function buildCommentTree(cm) {
  return (
    <Comment>
      <Wrapper>
        <AuthorImage src={`https://api.pointina.ir/${cm.WriterImage}`} />
        <Col>
          <div>Bardia Rastin | {cm.TimeElapsed}</div>
          <CommentText>{cm.CommentText}</CommentText>
        </Col>
      </Wrapper>
      {cm.ReplyComment.map(cm => buildCommentTree(cm))}
    </Comment>
  )
}

function Comments(props) {
  const {
    onClose,
    post,
    post: { Comments }
  } = props

  console.log(post)

  return (
    <Layout>
      <Close>
        <IoIosClose onClick={onClose} size={50} />
      </Close>
      {Comments.map(cm => buildCommentTree(cm))}
    </Layout>
  )
}

export default Comments
