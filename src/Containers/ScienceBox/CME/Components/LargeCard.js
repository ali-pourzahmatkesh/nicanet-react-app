import React from 'react';
import styled from 'styled-components';
import { numberWithCommas } from '../../../../utils/utils';
import playImage from '../../../../Assets/play.png';

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const ImageWrapper = styled.div`
  margin-bottom: 10px;
  position: relative;
`;

const ImageBackground = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px 10px 0 0;
`;

const MoreButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 50%;
  top: 50%;
  width: 120px;
  margin-left: -57px;
  transform: translateY(-50%);
`;

const MoreButtonText = styled.div`
  color: #fff;
  font-size: 12px;
  flex: 1;
  text-align: center;
`;

const DetailsWrapper = styled.div`
  padding: 0 12px 12px;
`;

const Title = styled.div`
  color: rgb(66, 66, 66);
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subtitle = styled.div`
  color: rgb(66, 66, 66);
  margin-bottom: 10px;
  font-size: 12px;
`;

const DetailsFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DetailsFooterCol = styled.div`
  display: flex;
  flex-direction: row;
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
`;

function LargeCard(props) {
  const { onPress, course } = props;
  if (!course) return null;

  const {
    CourseName: courseName,
    Price: coursePrice,
    Teacher: courseTeacher,
    Episodes: courseEpisodesCount,
    TrainingPoints: courseTrainingPoints,
    CourseIntroductionUrl: courseIntroductionUrl,
    Bought: bought
  } = course;

  return (
    <Container onClick={onPress}>
      <ImageWrapper>
        <ImageBackground
          src={`https://api.pointina.ir${courseIntroductionUrl}`}
        />
        <MoreButton>
          <img src={playImage} alt="" />
          {!bought && (
            <MoreButtonText>{numberWithCommas(coursePrice)} IRR</MoreButtonText>
          )}
        </MoreButton>
      </ImageWrapper>
      <DetailsWrapper>
        <Title>{courseName}</Title>
        <Subtitle>{courseTeacher}</Subtitle>
        <DetailsFooter>
          <DetailsFooterCol>
            <DetailsFooterNumber>{courseEpisodesCount}</DetailsFooterNumber>
            <DetailsFooterText>Episodes</DetailsFooterText>
            <DetailsFooterNumber>{courseTrainingPoints}</DetailsFooterNumber>
            <DetailsFooterText>Training Points</DetailsFooterText>
          </DetailsFooterCol>
          <DetailsFooterCol>
            <DetailsFooterText>Today, 12:43 AM</DetailsFooterText>
          </DetailsFooterCol>
        </DetailsFooter>
      </DetailsWrapper>
    </Container>
  );
}

LargeCard.defaultProps = {
  onPress: () => undefined
};

export default LargeCard;
