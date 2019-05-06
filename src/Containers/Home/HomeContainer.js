import React from 'react'
import styled from 'styled-components'

import { ContentApi } from '../../Api/ContentApi'
import Layout from '../../components/Partials/Layout'
import Card from '../../components/Card/CardComponent'
import logo from '../../Assets/logo.svg'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import Navbar from 'components/Navbar/Navbar';

const Logo = styled.img`
  margin: 0 auto;
  display: block;
`

function HomeContainer(props) {
  const { userId } = props
  const [content, setContent] = useState([])

  useEffect(() => {
    const effect = async () => {
      const response = await ContentApi.getAllContent(userId)
    
      if (response.status !== 200) {
        setContent ([])
      }
      setContent(response.data.filter(c => c.CaseId === 0))
    }
    effect()
  }, [userId])

  const goToPage = (route) => {
    props.history.push(route)
  }

  return (
    <Layout>
      <Logo src={logo} />
      <Navbar onSelectRoute={goToPage} />
      {content.length > 0 &&
        content.map(content => (
          <Card
            onClick={() => {
              // Router.pushRoute('post', { postId: content.ContentId })
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

const mapStateToProps = (state) => {
  return ({
    userId: state.auth.userId,
  })
}

export default connect(mapStateToProps)(HomeContainer)