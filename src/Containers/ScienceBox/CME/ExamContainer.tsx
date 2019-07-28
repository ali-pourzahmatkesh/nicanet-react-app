import React from 'react';
import styled from 'styled-components';
import { BounceLoader } from 'react-spinners';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import { CmeApi } from '../../../Api/CmeApi';
import QuestionItem from './Components/QuestionItem';
import Heading from './Components/Heading';
import Modal from '../../../components/Modal/ModalComponent';
import { PulseLoader } from 'react-spinners';
import examFailedImage from '../../../Assets/examFailed.png';
import examPassedImage from '../../../Assets/examPassed.png';

const Container = styled.div`
  padding: 0 15px;
  @media (min-width: 720px) {
    padding: 0 30px;
  }
`;

const LoadingWrapprer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export const Timer = styled.div<{ disabled?: boolean }>`
  text-align: center;
  width: 100px;
  height: 20px;
  font-size: 16px;
  margin: 1rem auto;
  color: ${props => (props.disabled ? '#ddd' : '#5498a9')};
  font-weight: bold;
  @media (min-width: 720px) {
    margin: 2rem auto 1.5rem;
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
  @media (min-width: 720px) {
    width: 360px;
    margin: 1.2rem auto 0;
  }
`;

const FinishedExamText = styled.div`
  margin: 10rem 20px;
  text-align: left;
  color: #757575;
  @media (min-width: 720px) {
    margin: 3rem 3rem 5rem;
  }
`;

const ResultImage = styled.img`
  width: 100px;
  height: 100px;
  margin: 20px 0 30px;
`;

const TimeOut = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #8b0000;
  height: 20px;
  margin-top: 10px;
`;

const YourExmaScoreTitle = styled.div`
  color: #757575;
  margin-bottom: 17px;
`;

const Score = styled.div<{ Pass?: boolean }>`
  font-wight: bold;
  font-size: 15px;
  color: ${props => (props.Pass ? '#5498a9' : '#d0021b')};
  margin-bottom: 30px;
`;

const ExamResultDesc = styled.div`
  color: #757575;
  margin-bottom: 40px;
  font-size: 13px;
`;

const FailedExamDesc = styled.div`
  color: #000;
  font-size: 12px;
  margin-top: 15px;
`;

interface ExamContainerProps {}

class ExamContainer extends React.Component<
  ExamContainerProps & RouteComponentProps<{ courseId: '' }>,
  any
> {
  state = {
    timeRemaining: 0,
    timer: '',
    isFetching: false,
    questionCount: 0,
    exam: null,
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    isSending: false,
    examId: 0,
    isOpenSubmitModal: false,
    isOpenResultModal: false,
    isTimeOut: false,
    finishedExam: false,
    examResult: {
      Pass: false,
      PersonScore: 0,
      RequireScore: 0,
      NextExamTime: ''
    },
    fadeOut: false
  };

  componentDidMount = async () => {
    await this.getExam();
    this.timerCountDown();
  };

  getExam = async () => {
    const { match } = this.props;
    const { params } = match;
    const { courseId } = params;
    this.setState({ isFetching: true });
    try {
      let response = await CmeApi.getExam(courseId);
      // console.log('response.data', response.data);
      if (response.status === 200) {
        const { Questions } = response.data;
        const answersArray = new Array(response.data.Questions.length)
          .fill(null)
          .map(() => {
            return { ExamQuestionId: '', AnswerId: '' };
          });
        // console.log('answersArray', answersArray);

        this.setState({
          exam: response.data,
          timeRemaining: this.getExamTime(response.data.ExamTime),
          questions: response.data.Questions,
          answers: answersArray,
          examId: response.data.ExamId,
          questionCount:
            Questions && Questions.length && response.data.Questions.length
        });
      }
    } catch (_) {
    } finally {
      this.setState({ isFetching: false });
    }
  };

  timerCountDown() {
    const countdown = setInterval(() => {
      if (this.state.timeRemaining > 0) {
        const remaning = this.state.timeRemaining - 1;
        this.setState({ timeRemaining: remaning });

        let minutes = 0;
        let seconds = 0;
        if (remaning > 60) {
          minutes = Math.floor(remaning / 60);
          seconds = Math.floor(remaning % 60);
        } else {
          seconds = remaning;
        }
        const minutesStr = minutes > 9 ? minutes : `0${minutes}`;
        const secondsStr = seconds > 9 ? seconds : `0${seconds}`;
        this.setState({ timer: `${minutesStr} : ${secondsStr}` });
      } else {
        if (countdown) {
          if (!this.state.finishedExam) {
            this.setState({ isTimeOut: true }, () => {
              this.submitExam(1471);
            });
          }
          clearInterval(countdown);
        }
      }
    }, 1000);
  }

  getExamTime(timeString: string) {
    const timeArray = timeString.split(':');
    const hours = +timeArray[0];
    const minutes = +timeArray[1];
    const seconds = +timeArray[2];
    const sumSeconds = (hours * 3600) + (minutes * 60) + seconds;
    return sumSeconds;
  }

  renderSubmitModal = () => {
    return (
      <Modal
        isOpen={this.state.isOpenSubmitModal}
        onClose={() => this.setState({ isOpenSubmitModal: false })}
        style={{
          left: window.innerWidth < 720 ? 0 : '50%',
          top: window.innerWidth < 720 ? 0 : '50%',
          right: window.innerWidth < 720 ? 0 : 'auto',
          bottom: window.innerWidth < 720 ? 0 : 'auto',
          borderRadius: window.innerWidth < 720 ? 0 : '10px',
          width: window.innerWidth < 720 ? 'auto' : '660px',
          height: window.innerWidth < 720 ? 'auto' : '330px',
          margin: window.innerWidth < 720 ? 'auto' : '-165px 0 0 -330px'
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
        <FinishedExamText>
          You have finished your exam. In order to get your results you need to
          submit your answers, otherwise your answers will not be submitted.
        </FinishedExamText>
        <Button onClick={() => this.submitExam(0)}>
          {this.state.isSending ? (
            <PulseLoader sizeUnit="rem" size={0.5} color="#fff" />
          ) : (
            'Submit Answers'
          )}
        </Button>
      </Modal>
    );
  };

  renderResultModal = () => {
    const {
      Pass,
      PersonScore,
      RequireScore,
      NextExamTime
    } = this.state.examResult;
    const { match } = this.props;
    const { params } = match;
    const { courseId } = params;
    return (
      <Modal
        isOpen={this.state.isOpenResultModal}
        // onClose={(s) => this.setState({ isOpenResultModal: false })}
        style={{
          left: window.innerWidth < 720 ? 0 : '50%',
          top: window.innerWidth < 720 ? 0 : '50%',
          right: window.innerWidth < 720 ? 0 : 'auto',
          bottom: window.innerWidth < 720 ? 0 : 'auto',
          borderRadius: window.innerWidth < 720 ? 0 : '10px',
          width: window.innerWidth < 720 ? 'auto' : '600px',
          height: window.innerWidth < 720 ? 'auto' : '480px',
          margin: window.innerWidth < 720 ? 'auto' : '-240px 0 0 -300px'
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
        <TimeOut>{this.state.isTimeOut ? 'Time’s Up' : ''}</TimeOut>
        <ResultImage src={Pass ? examPassedImage : examFailedImage} />
        <YourExmaScoreTitle>Your Score</YourExmaScoreTitle>
        <Score Pass={Pass}>{`${PersonScore} / ${RequireScore}`}</Score>
        <ExamResultDesc>
          {Pass
            ? 'You have obtained enough points to get your certification'
            : 'You have not obtained enough points to get your certification.'}
        </ExamResultDesc>
        <Button
          onClick={() => this.props.history.push(`/episodes/${courseId}`)}
        >
          Done
        </Button>
        {!Pass && NextExamTime && (
          <FailedExamDesc>{NextExamTime}</FailedExamDesc>
        )}
      </Modal>
    );
  };

  onSelectAnswer(examQuestionId: any, responseId: any) {
    const answersArray = this.state.answers.map((item, index) =>
      index === this.state.currentQuestionIndex
        ? { ExamQuestionId: examQuestionId, AnswerId: responseId }
        : item
    );
    // console.log('answersArray', answersArray);
    this.setState({
      answers: answersArray
    });

    setTimeout(() => {
      this.setState({ fadeOut: true });
    }, 500);

    setTimeout(() => {
      if (this.state.currentQuestionIndex + 1 === this.state.questionCount) {
        this.setState({ isOpenSubmitModal: true });
      }
      this.setState({ fadeOut: false });
      this.goForward();
    }, 1000);
  }

  submitExam = async (statusId: any = 0) => {
    this.setState({ isSending: true });
    const AnswersParams = this.state.answers.filter(item => {
      const { AnswerId } = item;
      return AnswerId !== '';
    });
    try {
      const params = {
        examId: this.state.examId,
        Answers: AnswersParams,
        statusId
      };
      // console.log('params', params);
      const response = await CmeApi.submitExam(params);
      // console.log('response api after exam', response);
      if (response.status === 200) {
        this.setState({ examResult: response.data });
        this.setState({ isOpenResultModal: true });
      }
    } catch (_) {
    } finally {
      this.setState({
        isSending: false,
        isOpenSubmitModal: false,
        finishedExam: true,
        timeRemaining: 0,
        timer: '00 : 00'
      });
    }
  };

  goBack = () => {
    if (this.state.currentQuestionIndex !== 0 && !this.state.finishedExam) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex - 1
      });
    }
  };

  goForward = () => {
    if (
      this.state.currentQuestionIndex + 1 !== this.state.questionCount &&
      !this.state.finishedExam
    ) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex + 1
      });
    }
  };

  render() {
    const {
      questionCount,
      exam,
      currentQuestionIndex,
      isFetching,
      questions
    } = this.state;

    if (isFetching)
      return (
        <Layout noHeader>
          <LoadingWrapprer>
            <BounceLoader sizeUnit="rem" size={3} color="#5498a9" loading />
          </LoadingWrapprer>
        </Layout>
      );

    if (exam === null || questionCount === 0)
      return (
        <Layout noHeader>
          <div />
        </Layout>
      );

    return (
      <Layout noHeader>
        {questionCount > 0 && (
          <Heading
            title={`Question ${currentQuestionIndex + 1} / ${questionCount}`}
            disabled={this.state.finishedExam}
            onGoBack={
              this.state.currentQuestionIndex === 0 ? null : this.goBack
            }
            onGoForward={
              this.state.currentQuestionIndex + 1 === this.state.questionCount
                ? null
                : this.goForward
            }
            onSubmit={() => this.setState({ isOpenSubmitModal: true })}
          />
        )}
        {questionCount > 0 && (
          <Container>
            <Timer disabled={this.state.finishedExam}>{this.state.timer}</Timer>
            <QuestionItem
              question={questions[currentQuestionIndex]}
              onSelectAnswer={(examQuestionId: any, responseId: any) =>
                this.onSelectAnswer(examQuestionId, responseId)
              }
              answers={this.state.answers}
              disabled={this.state.finishedExam}
              fadeOut={this.state.fadeOut}
            />
            {this.renderSubmitModal()}
            {this.renderResultModal()}
          </Container>
        )}
      </Layout>
    );
  }
}

export default ExamContainer;
