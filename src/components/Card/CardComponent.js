import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border-radius: 5px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  margin-bottom: 1rem;
`

const Image = styled.img`
  width: 100%;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`

const Title = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  color: #000000;
`

const Subtitle = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  color: #757575;
`

const Main = styled.div`
  padding: 1rem;
  padding-top: 0;
`

const AuthorWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  padding-top: 1rem;
`

const AuthorImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 4rem;
  margin-right: 1rem;
`

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const AuthorTitle = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  color: #000000;
`

const AuthorSubtitle = styled.div`
  font-family: Roboto;
  font-size: 0.8rem;
  color: #000000;
`

const PublishTime = styled.div`
  font-family: Roboto;
  font-size: 0.8rem;
  color: #757575;
`

function Card(props) {
  const {
    image,
    author,
    author: {
      image: authorImage,
      title: authorTitle,
      subtitle: authorSubtitle,
      publishTime
    },
    title,
    subtitle,
    onClick
  } = props

  return (
    <Container onClick={onClick}>
      {image && <Image src={`https://api.pointina.ir/${image}`} />}
      <Main>
        {Object.keys(author).length > 0 && (
          <AuthorWrapper>
            {authorImage && (
              <AuthorImage src={`https://api.pointina.ir/${authorImage}`} />
            )}
            <AuthorInfo>
              {authorTitle && <AuthorTitle>{authorTitle}</AuthorTitle>}
              {authorSubtitle && (
                <AuthorSubtitle>{authorSubtitle}</AuthorSubtitle>
              )}
              {publishTime && <PublishTime>{publishTime}</PublishTime>}
            </AuthorInfo>
          </AuthorWrapper>
        )}
        {title && <Title>{title}</Title>}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </Main>
    </Container>
  )
}

Card.defaultProps = {
  author: {}
}

export default Card
