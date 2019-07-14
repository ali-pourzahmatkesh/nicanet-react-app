import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { BounceLoader } from 'react-spinners';
import Layout from 'components/Partials/Layout';
import { RouteComponentProps } from 'react-router';
import { CmeApi } from '../../../Api/CmeApi';
import QuestionItem from './Components/QuestionItem';
import Heading from './Components/Heading';
import Modal from '../../../components/Modal/ModalComponent';

const Container = styled.div`
  @media (min-width: 720px) {
    margin-top: 0;
    padding: 30px 30px 0;
  }
`;

const LoadingWrapprer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export const Timer = styled.div`
  margin: 1rem 0;
  text-align: center;
  width: 100px;
  height: 20px;
  margin: 0 auto;
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
    isOpenModal: false
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
      console.log('response.data', response.data);
      if (response.status === 200) {
        const { Questions } = response.data;
        const answersArray = new Array(response.data.Questions.length)
          .fill(null)
          .map(() => {
            return { ExamQuestionId: '', AnswerId: '' };
          });
        console.log('answersArray', answersArray);

        this.setState({
          exam: response.data,
          timeRemaining: 20,
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
          this.submitExam(1471);
          clearInterval(countdown);
        }
      }
    }, 1000);
  }

  renderModal = () => {
    return (
      <Modal
        isOpen={this.state.isOpenModal}
        onClose={() => this.setState({ isOpenModal: false })}
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
        <div>aaa</div>
        <Button onClick={() => this.submitExam(0)}>Buy this package</Button>
      </Modal>
    );
  };

  onSelectAnswer(examQuestionId: any, responseId: any) {
    const answersArray = this.state.answers.map((item, index) =>
      index === this.state.currentQuestionIndex
        ? { ExamQuestionId: examQuestionId, AnswerId: responseId }
        : item
    );
    console.log('answersArray', answersArray);
    this.setState({
      answers: answersArray
    });
  }

  submitExam = async (statusId: any = 0) => {
    this.setState({ isSending: true });
    try {
      const params = {
        examId: this.state.examId,
        Answers: this.state.answers,
        statusId
      };
      console.log('params', params);
      // let response = await CmeApi.submitExam(params);
      // console.log('send exam to api', response.data);
      // if (response.status === 200) {
      // }
    } catch (_) {
    } finally {
      this.setState({ isSending: false });
    }
  };

  goBack = () => {
    if (this.state.currentQuestionIndex !== 0) {
      this.setState({
        currentQuestionIndex: this.state.currentQuestionIndex - 1
      });
    }
  };

  goForward = () => {
    if (this.state.currentQuestionIndex + 1 !== this.state.questionCount) {
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
            onGoBack={
              this.state.currentQuestionIndex === 0 ? null : this.goBack
            }
            onGoForward={
              this.state.currentQuestionIndex + 1 === this.state.questionCount
                ? null
                : this.goForward
            }
            onSubmit={() => this.setState({ isOpenModal: true })}
          />
        )}
        {questionCount > 0 && (
          <Container>
            <Timer>{this.state.timer}</Timer>
            <QuestionItem
              question={questions[currentQuestionIndex]}
              onSelectAnswer={(examQuestionId: any, responseId: any) =>
                this.onSelectAnswer(examQuestionId, responseId)
              }
              answers={this.state.answers}
            />
            {this.renderModal()}
          </Container>
        )}
      </Layout>
    );
  }
}

export default ExamContainer;
