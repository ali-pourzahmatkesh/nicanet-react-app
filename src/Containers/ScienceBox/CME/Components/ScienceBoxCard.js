import React from 'react';
import styled from 'styled-components';
import { numberWithCommas } from '../../../../utils/utils';
import playImage from '../../../../Assets/play.png';

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: ${props => (props.isLarge ? 'column' : 'row')};
  padding: ${props => (props.isLarge ? '0' : '10px')};
  cursor: pointer;
  @media (min-width: 420px) {
    padding: ${props => (props.isLarge ? '0' : '18px')};
  }
  @media (min-width: 720px) {
    flex-direction: ${props => (props.isLarge ? 'column' : 'column')};
    padding: ${props => (props.isLarge ? '0' : '0')};
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: ${props => (props.isLarge ? '100%' : '50%')};
  margin: ${props => (props.isLarge ? '0 0 10px 0' : '0 18px 0 0 ')};
  z-index: 0;
  @media (min-width: 420px) {
    width: ${props => (props.isLarge ? '100%' : '30%')};
  }
  @media (min-width: 720px) {
    width: ${props => (props.isLarge ? '100%' : '100%')};
    margin: ${props => (props.isLarge ? '0 0 10px 0' : '0 0 10px 0')};
  }
`;

const ImageBackground = styled.img`
  width: 100%;
  height: ${props => (props.isLarge ? 'auto' : '100%')};
  display: block;
  border-radius: ${props => (props.isLarge ? '10px 10px 0 0' : '0')};
  @media (min-width: 720px) {
    border-radius: ${props =>
      props.isLarge ? '10px 10px 0 0' : '10px 10px 0 0'};
    height: auto;
  }
`;

const MoreButton = styled.div`
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateY(-50%);
  padding: ${props => (props.isLarge ? '8px' : '7px')};
  width: ${props => (props.isLarge ? '136px' : '96px')};
  margin-left: ${props => (props.isLarge ? '-68px' : '-48px')};
  @media (min-width: 720px) {
    padding: ${props => (props.isLarge ? '8px' : '8px')};
    width: ${props => (props.isLarge ? '136px' : '136px')};
    margin-left: ${props => (props.isLarge ? '-68px' : '-68px')};
  }
`;

const MoreButtonPrice = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MoreButtonText = styled.div`
  color: #fff;
  flex: 1;
  text-align: center;
  font-size: ${props => (props.isLarge ? '12px' : '9px')};
  @media (min-width: 720px) {
    font-size: ${props => (props.isLarge ? '12px' : '12px')};
  }
`;

const MoreButtonPlayIcon = styled.img`
  width: ${props => (props.isLarge ? 'auto' : '10px')};
  height: ${props => (props.isLarge ? 'auto' : '10px')};
  @media (min-width: 720px) {
    width: ${props => (props.isLarge ? 'auto' : 'auto')};
    height: ${props => (props.isLarge ? 'auto' : 'auto')};
  }
`;
const DetailsWrapper = styled.div`
  padding: ${props => (props.isLarge ? '0 12px 12px' : '0')};
  @media (min-width: 720px) {
    padding: ${props => (props.isLarge ? '0 12px 12px' : '0 12px 12px')};
  }
`;

const Title = styled.div`
  color: rgb(66, 66, 66);
  font-size: 14px;
  font-weight: bold;
  margin-bottom: ${props => (props.isLarge ? '10px' : '8px')};
  @media (min-width: 720px) {
    margin-bottom: ${props => (props.isLarge ? '10px' : '10px')};
  }
`;

const Subtitle = styled.div`
  color: rgb(66, 66, 66);
  font-size: 12px;
  margin-bottom: ${props => (props.isLarge ? '10px' : '8px')};
  @media (min-width: 720px) {
    margin-bottom: ${props => (props.isLarge ? '10px' : '10px')};
  }
`;

const DetailsFooter = styled.div`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  display: ${props => (props.isLarge ? 'flex' : 'block')};
  flex-direction: ${props => props.isLarge && 'row'};
  @media (min-width: 720px) {
    display: ${props => (props.isLarge ? 'flex' : 'flex')};
  }
`;

const DetailsFooterCol = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: ${props => (props.isLarge ? 'nowrap' : 'wrap')};
  @media (min-width: 420px) {
    margin-top: ${props => (props.isSmall ? '8px' : '0')};
  }
  @media (min-width: 720px) {
    margin-top: ${props => (props.isSmall ? '0' : '0')};
  }
`;

const DetailsFooterItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: ${props => (props.theme.hasMargin ? '12px' : '0')};
  width: ${props => (props.theme.isLarge ? 'auto' : '100%')};
  margin-bottom: ${props => (props.theme.isLarge ? '0' : '8px')};
  @media (min-width: 420px) {
    width: ${props => (props.theme.isLarge ? 'auto' : 'auto')};
    margin-bottom: ${props => (props.theme.isLarge ? '0' : '0')};
  }
`;

const DetailsFooterNumber = styled.div`
  font-weight: bold;
  color: #5498a9;
  font-size: 10px;
`;

const DetailsFooterText = styled.div`
  color: rgb(117, 117, 117);
  font-size: 10px;
  padding: 0 5px;
  padding: ${props => (props.noPadding ? '0' : '0 5px')};
`;

const MoreButtonTexts = styled.div`
  color: #fff;
  text-align: center;
`;

const Purchased = styled.div`
  font-size: 0.6rem;
  margin-bottom: 5px;
`;

const ViewEpisodes = styled.div`
  font-size: 0.7rem;
  font-weight: bold;
`;

function ScienceBoxCard(props) {
  const { onPress, course, isLarge } = props;
  if (!course) return null;

  const {
    CourseName: courseName,
    Price: coursePrice,
    Teacher: courseTeacher,
    EpisodeCount: courseEpisodesCount,
    TrainingPoints: courseTrainingPoints,
    CourseImageUrl: courseImageUrl,
    Bought: bought
  } = course;

  return (
    <Container onClick={onPress} isLarge={isLarge}>
      <ImageWrapper isLarge={isLarge}>
        <ImageBackground src={`https://api.pointina.ir${courseImageUrl}`} />
        <MoreButton isLarge={isLarge}>
          {bought ? (
            <MoreButtonTexts>
              <Purchased>Purchased</Purchased>
              <ViewEpisodes>View Course</ViewEpisodes>
            </MoreButtonTexts>
          ) : (
            <MoreButtonPrice>
              <MoreButtonPlayIcon src={playImage} isLarge={isLarge} alt="" />
              <MoreButtonText isLarge={isLarge}>
                {numberWithCommas(coursePrice)} IRR
              </MoreButtonText>
            </MoreButtonPrice>
          )}
        </MoreButton>
      </ImageWrapper>
      <DetailsWrapper isLarge={isLarge}>
        <Title>{courseName}</Title>
        <Subtitle>{courseTeacher}</Subtitle>
        <DetailsFooter isLarge={isLarge}>
          <DetailsFooterCol isLarge={isLarge}>
            <DetailsFooterItem theme={{ hasMargin: true, isLarge }}>
              <DetailsFooterNumber>{courseEpisodesCount}</DetailsFooterNumber>
              <DetailsFooterText>Episodes</DetailsFooterText>
            </DetailsFooterItem>
            <DetailsFooterItem theme={{ isLarge }}>
              <DetailsFooterNumber>{courseTrainingPoints}</DetailsFooterNumber>
              <DetailsFooterText>Training Points</DetailsFooterText>
            </DetailsFooterItem>
          </DetailsFooterCol>
          <DetailsFooterCol isSmall={!isLarge}>
            <DetailsFooterText noPadding>Today, 12:43 AM</DetailsFooterText>
          </DetailsFooterCol>
        </DetailsFooter>
      </DetailsWrapper>
    </Container>
  );
}

ScienceBoxCard.defaultProps = {
  onPress: () => undefined
};

export default ScienceBoxCard;
