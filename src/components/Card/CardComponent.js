import React from 'react';
import styled from 'styled-components';
import avatarPhoto from '../../Assets/avatar.jpg';
import DetectLanguage from '../DetectLanguage/DetectLanguageComponent';

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 100%;
  display: block;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border-radius: ${props => props.hasBorderRadius && '10px'};
`;

const Title = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  color: #000000;
`;

const Subtitle = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  color: #757575;
`;

const Main = styled.div`
  padding: 1rem;
  padding-top: 0;
`;

const AuthorWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
  padding-top: 1rem;
`;

const AuthorImage = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 4rem;
  margin-right: 1rem;
  background: ${props => `url(${props.src}) center center no-repeat`};
  background-size: cover;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorTitle = styled.div`
  font-family: Roboto;
  font-size: 1rem;
  font-weight: bold;
  color: #000000;
`;

const AuthorSubtitle = styled.div`
  font-family: Roboto;
  font-size: 0.8rem;
  color: #000000;
`;

const PublishTime = styled.div`
  font-family: Roboto;
  font-size: 0.8rem;
  color: #757575;
`;

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
    onClick,
    typeId,
    mainId,
    postSelected
  } = props;

  if (postSelected && postSelected.ContentId === mainId) {
    let cart = document.getElementById('post-cart-' + mainId);
    if (cart) {
      cart.scrollIntoView({ block: 'center' });
      localStorage.removeItem('postSelected');
    }
  }

  return (
    <Container onClick={onClick} id={`post-cart-${mainId}`}>
      {image && (
        <Image
          src={`https://api.pointina.ir${image}`}
          hasBorderRadius={typeId === 118}
        />
      )}
      {typeId !== 118 && (
        <Main>
          {Object.keys(author).length > 0 && (
            <AuthorWrapper>
              <AuthorImage
                src={
                  authorImage
                    ? `https://api.pointina.ir${authorImage}`
                    : avatarPhoto
                }
              />
              <AuthorInfo>
                {authorTitle && <AuthorTitle>{authorTitle}</AuthorTitle>}
                {authorSubtitle && (
                  <AuthorSubtitle>{authorSubtitle}</AuthorSubtitle>
                )}
                {publishTime && <PublishTime>{publishTime}</PublishTime>}
              </AuthorInfo>
            </AuthorWrapper>
          )}
          {typeId === 104 && title && (
            <DetectLanguage value={title}>
              <Title>{title}</Title>
            </DetectLanguage>
          )}
          {typeId === 1425 && title && <Title>{title}</Title>}
          {subtitle && (
            <DetectLanguage value={subtitle}>
              <Subtitle>{subtitle}</Subtitle>
            </DetectLanguage>
          )}
        </Main>
      )}
    </Container>
  );
}

Card.defaultProps = {
  author: {}
};

export default Card;
