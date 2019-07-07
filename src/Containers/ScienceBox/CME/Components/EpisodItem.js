import React from 'react';
import styled from 'styled-components';
import playImage from '../../../../Assets/play.png';

const Container = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
  &:last-child {
    border-bottom: 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: ${props => (props.isLarge ? 'column' : 'row')};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  background-color: #fff;
  border-radius: 10px;
  padding: ${props => (props.isLarge ? '0' : '15px')};
  @media (min-width: 720px) {
    box-shadow: none;
    padding: ${props => (props.isLarge ? '0' : '0')};
    border-radius: 0;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: ${props => (props.isLarge ? '100%' : '120px')};
  @media (min-width: 720px) {
    width: ${props => (props.isLarge ? '100%' : '240px')};
  }
`;

const ImageBackground = styled.img`
  width: 100%;
  display: block;
  height: ${props => (props.isLarge ? 'auto' : '80px')};
  @media (min-width: 720px) {
    height: ${props => (props.isLarge ? 'auto' : 'auto')};
  }
`;

const DetailsWrapper = styled.div`
  flex: 1;
  padding: ${props => (props.isLarge ? '10px 20px' : '0 0 0 10px')};
  @media (min-width: 720px) {
    padding: ${props => (props.isLarge ? '0' : '0 0 0 20px')};
  }
`;

const Title = styled.div`
  color: #000;
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 10px;
  @media (min-width: 720px) {
    margin: ${props => (props.isLarge ? '20px 0 15px' : '0 0 15px')};
  }
`;

const Description = styled.div`
  color: #757575;
  font-size: 11px;
  margin-bottom: 15px;
  @media (min-width: 720px) {
    font-size: 12px;
  }
`;

const TimeAgo = styled.div`
  color: #757575;
  font-size: 10px;
`;

const WatchedLabel = styled.div`
  background-color: rgba(126, 211, 33, 0.7);
  width: 60px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: -30px;
`;

const WatchedText = styled.div`
  color: rgb(33, 33, 33);
  font-size: 10px;
  font-weight: bold;
`;

const MoreButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${props => (props.isLarge ? '48px' : '32px')};
  height: ${props => (props.isLarge ? '48px' : '32px')};
  border-radius: ${props => (props.isLarge ? '24px' : '16px')};
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: ${props => (props.isLarge ? '-24px' : '-16px')};
`;

const MoreButtonPlayIcon = styled.img`
  width: ${props => (props.isLarge ? '24px' : '16px')};
  height: ${props => (props.isLarge ? '24px' : '16px')};
`;

function EpisodItem(props) {
  const { onPress, episod, isLarge } = props;
  if (!episod) return null;

  const {
    CourseItemName: courseItemName,
    CourseItemDescription: courseItemDescription,
    CourseItemUrl: courseItemUrl
  } = episod;

  const isWatched = true;
  // const isWatched = false;

  return (
    <Container onClick={onPress} isLarge={isLarge}>
      <Content isLarge={isLarge}>
        <ImageWrapper isLarge={isLarge}>
          <ImageBackground
            isLarge={isLarge}
            src={
              'https://api.pointina.ir/Course/CourseImage/6730ba7b-1db8-477f-8358-54cc2f037718.jpg'
            }
          />
          {isWatched && (
            <WatchedLabel>
              <WatchedText>Watched</WatchedText>
            </WatchedLabel>
          )}
          {!isWatched && (
            <MoreButton isLarge={isLarge}>
              <MoreButtonPlayIcon src={playImage} />
            </MoreButton>
          )}
        </ImageWrapper>
        <DetailsWrapper isLarge={isLarge}>
          <Title isLarge={isLarge}>{courseItemName}</Title>
          <Description>{courseItemDescription}</Description>
          <TimeAgo>Today, 12:43 AM</TimeAgo>
        </DetailsWrapper>
      </Content>
    </Container>
  );
}

EpisodItem.defaultProps = {
  onPress: () => undefined
};

export default EpisodItem;
