import React from 'react';
import styled from 'styled-components';
import examImage from '../../../../Assets/exam.png';
import readyToExamImage from '../../../../Assets/readyToExam.png';
import examFailedImage from '../../../../Assets/examFailed.png';
import examPassedImage from '../../../../Assets/examPassed.png';

const Container = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 25px;
`;

const Wrapper = styled.div`
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 10px;
  padding: 15px 24px;
  align-items: center;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  cursor: ${props => (props.clickable ? 'pointer' : 'default')};
`;

const ExamImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 20px;
`;

const ExamText = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
  color: ${props => props.examColor};
`;

const ExamTitle = styled.div`
  color: ${props => props.color};
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const ExamQuestionCountWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ExamQuestionCountText = styled.div`
  color: ${props => props.color};
  font-size: 12px;
  margin-right: 8px;
`;

const ExamQuestionCount = styled.div`
  color: ${props => props.color};
  font-size: 14px;
  font-weight: bold;
`;

const ExamDescription = styled.div`
  color: #757575;
  font-size: 13px;
  margin-bottom: 25px;
`;

function EpisodItem(props) {
  const { type, onPress, title, questionCount, AllowExam } = props;

  let examIcon = examImage;
  let examTitle = title;
  let examColor = '#bdbdbd';
  let examCaption = 'Examination';
  let examDescription = 'The Exam starts after watching all of the videos';

  switch (type) {
    case 'readyToExam':
      examIcon = readyToExamImage;
      examTitle = title;
      examColor = '#5498a9';
      examDescription = 'Now you can start the Exam';
      break;
    case 'failed':
      examIcon = examFailedImage;
      examTitle = title;
      examColor = '#d0021b';
      examCaption = 'Exam Failed';
      examDescription = null;
      break;
    case 'passed':
      examIcon = examPassedImage;
      examTitle = 'You have passed this exam successfully.';
      examColor = '#7ed321';
      examCaption = 'Exam Passed';
      examDescription = null;
      break;
    default:
      examIcon = examImage;
  }

  return (
    <Container>
      {examDescription && <ExamDescription>{examDescription}</ExamDescription>}
      <Wrapper onClick={AllowExam ? onPress : undefined} clickable={AllowExam}>
        <ExamImage src={examIcon} />
        <div>
          <ExamText examColor={examColor}>{examCaption}</ExamText>
          <ExamTitle color={type === 'disabled' ? '#bdbdbd' : '#424242'}>
            {examTitle}
          </ExamTitle>
          <ExamQuestionCountWrapper>
            <ExamQuestionCountText
              color={type === 'disabled' ? '#bdbdbd' : '#424242'}
            >
              Questions Number:
            </ExamQuestionCountText>
            <ExamQuestionCount
              color={type === 'disabled' ? '#bdbdbd' : '#5498a9'}
            >
              {questionCount}
            </ExamQuestionCount>
          </ExamQuestionCountWrapper>
        </div>
      </Wrapper>
    </Container>
  );
}

EpisodItem.defaultProps = {
  onPress: () => undefined
};

export default EpisodItem;
