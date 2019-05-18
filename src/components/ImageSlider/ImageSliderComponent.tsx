import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import Modal from "../Modal/ModalComponent";
import LeftIcon from 'Assets/Left.svg'
import RightIcon from 'Assets/Right.svg'

const Container = styled.div``;

const PhotoWrapper = styled.div`
  width: 100%;
  height: 300px;
`;

const Photo = styled.div<{ src?: string }>`
  max-width: 100%;
  width: 100%;
  height: 300px;
  margin: 0 auto;
  background: url(${props => props.src}) center center no-repeat;
  background-size: cover;
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
  z-index: 1;
`

const NextArrow = styled(NavIconBase)`
  right: 0;
`
const PrevArrow = styled(NavIconBase)`
  left: 0;
`
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
        onClose={() => this.setState({ isOpen: false })}
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
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
