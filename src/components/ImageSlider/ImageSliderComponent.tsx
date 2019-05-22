import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import Modal from "../Modal/ModalComponent";
import LeftIcon from "Assets/Left.svg";
import RightIcon from "Assets/Right.svg";

const Container = styled.div``;

const PhotoWrapper = styled.div`
  height: 300px;
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  position: relative;
  ovelflow: hidden;
`;

const Photo = styled.img`
  max-width: 100%;
  margin: 0 auto;
  width: 100%;
  height: auto;
  position: absolute;
  left:0;
  top:50%;
  transform: translateY(-50%);
`;

const MainPhoto = styled.img`
  width: 100%;
  height: auto;
  margin: 0 auto;
`;

const NavIconBase = styled.img`
  width: 2rem;
  height: 2rem;
  width: 2rem;
  height: 2rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const NextArrow = styled(NavIconBase)`
  right: 0;
`;
const PrevArrow = styled(NavIconBase)`
  left: 0;
  z-index: 1;
`;
type ImageSliderProps = {
  images: any[];
  showsButtons: boolean;
};

class ImageSlider extends React.Component<ImageSliderProps> {
  state = {
    isOpen: false,
    imageUri: ""
  };

  renderModal = () => {
    return (
      <Modal
        isOpen={this.state.isOpen}
        title="View Image"
        onClose={() => this.setState({ isOpen: false })}
        ChildrenWrapperStyle={{ padding: 0 }}
      >
        <MainPhoto src={this.state.imageUri} />
      </Modal>
    );
  };

  render() {
    const { images, showsButtons } = this.props;
    const settings = {
      // dots: true,
      arrows: showsButtons || false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
      // adaptiveHeight: true
    };

    return (
      <Container>
        <Slider
          {...settings}
          nextArrow={<NextArrow src={RightIcon} />}
          prevArrow={<PrevArrow src={LeftIcon} />}
        >
          {images.map((photo: any, index) => {
            return (
              <PhotoWrapper
                key={index.toString()}
                onClick={() =>
                  this.setState({
                    isOpen: true,
                    imageUri: `https://api.pointina.ir/${photo.FileURL}`
                  })
                }
              >
                <Photo src={`https://api.pointina.ir/${photo.FileURL}`} />
              </PhotoWrapper>
            );
          })}
        </Slider>
        {this.renderModal()}
      </Container>
    );
  }
}

export default ImageSlider;
