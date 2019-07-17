import React from 'react';
import styled from 'styled-components';
import avatarPhoto from '../../../../Assets/avatar.jpg';

const Container = styled.div``;

const QuestionText = styled.div`
  color: #757575;
  font-size: 14px;
  text-align: left;
  margin-bottom: 70px;
`;

const Answer = styled.div<{ theme?: any }>`
  display: flex;
  flex-direction: row;
  padding: 12px 16px;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 24px;
  border-radius: 10px;
  cursor: ${props => (props.theme.disabled ? 'default' : 'pointer')};
  box-shadow: ${props =>
    props.theme.isSelected ? '0 0 0 2px #263551' : '0 0 0 2px transparent'};
  border: ${props =>
    props.theme.disabled
      ? '1px solid #ddd'
      : props.theme.isSelected
      ? '1px solid #263551'
      : '1px solid #5498a9'};
  @media (min-width: 720px) {
    width: 396px;
    margin: 0 auto 24px;
  }
`;

const AnswerText = styled.div<{ disabled?: boolean }>`
  font-weight: bold;
  font-size: 12px;
  color: ${props => (props.disabled ? '#ddd' : 'rgb(66, 66, 66)')};
  flex: 1;
  flex-wrap: wrap;
  display: flex;
`;
const Circle = styled.div<{ theme?: any }>`
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
  background-color: ${props =>
    props.theme.disabled
      ? '#ddd'
      : props.theme.isSelected
      ? '#263551'
      : '#5498a9'};
`;

const AnswerImage = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto 20px;
`;

type ExamCardProps = {
  question: any;
  answers: any[];
  onSelectAnswer: (examQuestionId: any, responseId: any) => void;
  disabled: boolean;
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
    const { disabled } = this.props;

    const currentQuestion =
      answers.find((item: any) => item.ExamQuestionId === examQuestionId) || {};
    const isSelected = answer.ResponseId === currentQuestion.AnswerId;

    return (
      <Answer
        onClick={() =>
          !disabled && this.onSelectAnswer(examQuestionId, answer.ResponseId)
        }
        theme={{ isSelected, disabled }}
      >
        <Circle theme={{ isSelected, disabled }}>
          {alphabetArray[answerIndex]}
        </Circle>
        <AnswerText disabled={disabled}>{answer.ResponseDsc}</AnswerText>
      </Answer>
    );
  };

  render() {
    const { question, answers } = this.props;
    const hasImage = true;
    return (
      <Container>
        {hasImage && <AnswerImage src={avatarPhoto} />}
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
