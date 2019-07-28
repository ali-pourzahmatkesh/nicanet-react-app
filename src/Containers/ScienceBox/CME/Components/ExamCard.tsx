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

const Wrapper = styled.div<{ clickable?: boolean }>`
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

const ExamText = styled.div<{ examColor?: string }>`
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

const ExamTitleText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #000;
  margin: 80px 0 25px;
  text-align: center;
  @media (min-width: 720px) {
    margin: 30px 0 25px;
  }
`;

const Button = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  padding: 0.8rem 0;
  background-color: #263551;
  color: #fff;
  border-radius: 0.5rem;
  margin: 2rem;
  cursor: pointer;
  font-size: 13px;
  margin: 60px auto 0;
  @media (min-width: 720px) {
    width: 360px;
  }
`;

const ExamMajor = styled.div`
  color: #000;
  margin-bottom: 60px;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 30px 0;
`;

const Label = styled.div`
  color: #757575;
  font-size: 15px;
`;

const Value = styled.div`
  color: #5498a9;
  font-size: 15px;
  font-wight: bold;
`;

const Description = styled.div`
  color: #757575;
  font-size: 13px;
  text-align: left;
  margin-top: 40px;
`;

type ExamCardProps = {
  type: string;
  title: string;
  questionCount: string;
  AllowExam: boolean;
  course: any;
  onSatrtExam: () => void;
  onTriggerModal: (isOpen: boolean) => void;
};

class ExamCard extends React.Component<ExamCardProps> {
  state = {
    isOpen: false
  };

  triggerModal(isOpen: boolean) {
    if (this.props.AllowExam) {
      this.props.onTriggerModal(isOpen);
      this.setState({ isOpen });
    }
  }

  renderModal = () => {
    const { course, onSatrtExam } = this.props;
    const {
      ExamTitle: examTitle,
      QuestionCount: questionCount,
      ExamDetails: examDetails,
      ExamTime: examTime
    } = course;
    return (
      <Modal
        isOpen={this.state.isOpen}
        onClose={() => this.triggerModal(false)}
        style={{
          left: window.innerWidth < 720 ? 0 : 40,
          top: window.innerWidth < 720 ? 0 : 40,
          right: window.innerWidth < 720 ? 0 : 40,
          bottom: window.innerWidth < 720 ? 0 : 40,
          borderRadius: 0
        }}
        ChildrenWrapperStyle={{
          textAlign: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          paddingTop: '2rem',
          paddingBottom: '2rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          zIndex: 9
        }}
      >
        <ExamTitleText>{examTitle}</ExamTitleText>
        {/* <ExamMajor>Nephrology / Urology</ExamMajor> */}
        <Row>
          <Label>Number of Questions</Label>
          <Value>{questionCount}</Value>
        </Row>
        <Row>
          <Label>Exam Duration</Label>
          <Value>{examTime}</Value>
        </Row>
        <Description>{examDetails}</Description>
        <Button onClick={() => onSatrtExam()}>StartExam</Button>
      </Modal>
    );
  };

  render() {
    const { type, title, questionCount, AllowExam } = this.props;

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
        examDescription = '';
        break;
      case 'passed':
        examIcon = examPassedImage;
        examTitle = 'You have passed this exam successfully.';
        examColor = '#7ed321';
        examCaption = 'Exam Passed';
        examDescription = '';
        break;
      default:
        examIcon = examImage;
    }
    return (
      <Container>
        {examDescription && (
          <ExamDescription>{examDescription}</ExamDescription>
        )}
        <Wrapper onClick={() => this.triggerModal(true)} clickable={AllowExam}>
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
        {this.renderModal()}
      </Container>
    );
  }
}

export default ExamCard;
