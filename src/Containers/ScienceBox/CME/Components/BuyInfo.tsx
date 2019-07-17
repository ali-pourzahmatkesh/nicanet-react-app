import React from 'react';
import styled from 'styled-components';
import Modal from '../../../../components/Modal/ModalComponent';
import { numberWithCommas } from '../../../../utils/utils';
import playImage from '../../../../Assets/play.png';
import avatarPhoto from '../../../../Assets/avatar.jpg';

const MoreButtonPrice = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const MoreButtonText = styled.div`
  padding: 8px;
  color: #fff;
  flex: 1;
  text-align: center;
  font-size: 12px;
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

const AuthorImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-right: 1rem;
  background: ${props => `url(${props.src}) center center no-repeat`};
  background-size: cover;
`;

const AuthorName = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin: 15px 0 10px;
`;

const AuthorJob = styled.div`
  font-size: 13px;
  margin-bottom: 15px;
`;

const CourseTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const CourseInfoItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  width: 170px;
  margin: 0 auto 20px;
`;

const CourseInfoText = styled.div`
  color: rgb(117, 117, 117);
  padding-left: 5px;
  padding-right: 5px;
`;

const CourseInfoNumber = styled.div`
  font-weight: bold;
  color: #5498a9;
  width: 50px;
`;

const MoreButtonPlayIcon = styled.img``;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 40px;
`;

type BuyInfoProps = {
  course: any;
  onBuyPress: () => void;
  onTriggerModal: (isOpen: boolean) => void;
};

class BuyInfo extends React.Component<BuyInfoProps> {
  state = {
    isOpen: false
  };

  triggerModal(isOpen: boolean) {
    this.props.onTriggerModal(isOpen);
    this.setState({ isOpen });
  }

  renderModal = () => {
    const { course, onBuyPress } = this.props;
    const {
      CourseName: courseName,
      Price: coursePrice,
      Teacher: courseTeacher,
      Episodes: courseEpisodesCount,
      TrainingPoints: courseTrainingPoints,
      TeacherImage: courseTeacherImage,
      TeacherMajor: courseTeacherMajor
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
        <AuthorImage
          src={
            courseTeacherImage
              ? `https://api.pointina.ir${courseTeacherImage}`
              : avatarPhoto
          }
        />
        <AuthorName>{courseTeacher}</AuthorName>
        <AuthorJob>{courseTeacherMajor}</AuthorJob>
        <CourseTitle>{courseName}</CourseTitle>
        <CourseInfoItem>
          <CourseInfoNumber>{courseEpisodesCount}</CourseInfoNumber>
          <CourseInfoText>Episodes</CourseInfoText>
        </CourseInfoItem>
        <CourseInfoItem>
          <CourseInfoNumber>{courseTrainingPoints}</CourseInfoNumber>
          <CourseInfoText>Training Points</CourseInfoText>
        </CourseInfoItem>

        <Price>{numberWithCommas(coursePrice)} IRR</Price>
        <Button onClick={() => onBuyPress()}>Buy this package</Button>
      </Modal>
    );
  };

  render() {
    const { course } = this.props;
    const { Price: coursePrice } = course;
    return (
      <div>
        <MoreButtonPrice onClick={() => this.triggerModal(true)}>
          <MoreButtonPlayIcon src={playImage} alt="" />
          <MoreButtonText>{numberWithCommas(coursePrice)} IRR</MoreButtonText>
        </MoreButtonPrice>
        {this.renderModal()}
      </div>
    );
  }
}

export default BuyInfo;
