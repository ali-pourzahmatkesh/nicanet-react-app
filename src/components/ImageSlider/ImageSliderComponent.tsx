import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";

const Container = styled.div`
  // display: flex;
  // justify-content: space-between;
`;

const Item = styled.div`
  width: 100px;
  height: 100px;
  background-color: blue;
  color: #fff;
`;

interface RadioOption {
  name: string;
  value: any;
}

type ImageSliderProps = {
  images: [];
};

class ImageSlider extends React.Component<ImageSliderProps> {
  render() {
    const { images } = this.props;
    const settings = {
      // dots: true,
      // infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const myArray = [1, 2, 3];

    return (
      <Container>
        <Slider {...settings}>
          {myArray.map(item => (
            <div key={item.toString()}>
              <h3>{item}</h3>
            </div>
          ))}
        </Slider>
      </Container>
    );
  }
}

export default ImageSlider;
