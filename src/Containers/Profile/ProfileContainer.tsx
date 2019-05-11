import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components'

import Layout from '../../components/Partials/Layout'
import { connect } from 'react-redux';
import { ContentApi } from 'Api/ContentApi';
import Card from 'components/Card/CardComponent';
import { API_FILES_BASE_URL } from 'constants/ApiConstants';
import PenIconSvg from 'Assets/Pen.svg'

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  border: solid 1px #eeeeee;
`

const UserInfoWrapper = styled.div`
  border-radius: 5px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  padding: 1rem;
  position: relative;
`

const PenIcon = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`

const Title = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  color: #000000;
  margin-bottom: 0.5rem;
`

const Subtitle = styled.div`
  font-family: Roboto;
  font-size: 0.9rem;
  color: #000000;
  margin-bottom: 0.5rem;
`

const PrimaryText = styled.div`
  font-family: Roboto;
  font-size: 0.9rem;
  color: #5498a9;
  margin-bottom: 0.5rem;
`

const Paragraph = styled.div`
  font-family: Roboto;
  font-size: 0.9rem;
  color: #282828;
  margin-bottom: 0.5rem;
`

interface ProfileContainerProps {
  user: any
} 

function ProfileContainer(props: ProfileContainerProps & RouteComponentProps) {
  const { user } = props
  const [content, setContent] = useState([])
  
  useEffect(() => {
    const effect = async () => {
      try {
        const response = await ContentApi.getCurrentPersonContents()    
        setContent(response.data.filter((post: any) => post.CaseId === 0))
      } catch (_) {}
    }
    effect()
  }, [])

  console.log('user', user)

  return (
    <Layout>

      <UserInfoWrapper>
        <Avatar src={`${API_FILES_BASE_URL}/${user.ImageUrl}`} />
        <Title>{user.FullName}</Title>
        <Subtitle>{user.Expertise} hi there 11</Subtitle>
        <PrimaryText>{user.Email}</PrimaryText>
        <Paragraph>{user.Bio} hi there 22</Paragraph>
        <PenIcon src={PenIconSvg} />
      </UserInfoWrapper>

       {content.length > 0 &&
        content.map((content: any) => (
          <Card
            onClick={() => {
              props.history.push(`/post/${content.ContentId}`)
            }}
            key={content.ContentId}
            title={content.Subject}
            subtitle={content.ContentText}
            image={
              content.MultiMedias.length > 0 && content.MultiMedias[0].FileUrl
            }
            author={{
              image: content.WriterImage,
              title: content.WriterFullName,
              publishTime: content.TimeElapsed
            }}
          />
      ))}
    </Layout>
  )
}

const mapStateToProps = (state: any) => {
  return ({
    user: state.auth.user,
  })
}

export default connect(mapStateToProps)(ProfileContainer)
