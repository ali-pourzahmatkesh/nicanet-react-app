import React from 'react';
import styled from 'styled-components';
import examImage from '../../../../Assets/exam.png';
import readyToExamImage from '../../../../Assets/readyToExam.png';
import examFailedImage from '../../../../Assets/examFailed.png';
import examPassedImage from '../../../../Assets/examPassed.png';
import Modal from '../../../../components/Modal/ModalComponent';

const Container = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 25px;
`;

const QuestionText = styled.div`
  color: #757575;
  font-size: 14px;
  text-align: left;
  margin-top: 40px;
`;

const Answer = styled.div<{ isSelected?: boolean }>`
  display: flex;
  flex-direction: row;
  padding: 12px 16px;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 24px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: ${props =>
    props.isSelected ? '0 0 0 2px #263551' : '0 0 0 2px transparent'};
  border: ${props =>
    props.isSelected ? '1px solid #263551' : '1px solid #5498a9'};
`;

const AnswerText = styled.div`
  font-weight: bold;
  font-size: 12px;
  color: rgb(66, 66, 66);
  flex: 1;
  flex-wrap: wrap;
  display: flex;
`;
const Circle = styled.div<{ isSelected?: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  justify-content: center;
  align-items: center;
  background-color: #5498a9;
  border-radius: 16px;
  color: #fff;
  background-color: ${props => (props.isSelected ? '#263551' : '#5498a9')};
`;

type ExamCardProps = {
  question: any;
  answers: any[];
  onSelectAnswer: (examQuestionId: any, responseId: any) => void;
};

class QuestionItem extends React.Component<ExamCardProps> {
  // state = {
  //   selectedResponseId: null
  // };

  onSelectAnswer(examQuestionId: any, responseId: any) {
    this.props.onSelectAnswer(examQuestionId, responseId);
    // this.setState({ selectedResponseId: responseId }, () => {
    //   this.props.onSelectAnswer(examQuestionId, responseId);
    // });
  }

  renderAnswer = (
    answer: any,
    answerIndex: number,
    examQuestionId: any,
    answers: any
  ) => {
    const alphabetArray = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K'
    ];

    const currentQuestion =
      answers.find((item: any) => item.ExamQuestionId === examQuestionId) || {};
    const isSelected = answer.ResponseId === currentQuestion.AnswerId;

    return (
      <Answer
        onClick={() => this.onSelectAnswer(examQuestionId, answer.ResponseId)}
        isSelected={isSelected}
      >
        <Circle isSelected={isSelected}>{alphabetArray[answerIndex]}</Circle>
        <AnswerText>{answer.ResponseDsc}</AnswerText>
      </Answer>
    );
  };

  render() {
    const { question, answers } = this.props;
    return (
      <Container>
        {question && question.QuestionText && (
          <QuestionText>{question.QuestionText}</QuestionText>
        )}
        {question.Response &&
          question.Response.length > 0 &&
          question.Response.map((answer: any, index: any) => {
            // console.log(answer, index);
            return (
              <div key={index.toString()}>
                {this.renderAnswer(
                  answer,
                  +index,
                  question.ExamQuestionId,
                  answers
                )}
              </div>
            );
          })}
      </Container>
    );
  }
}

export default QuestionItem;
