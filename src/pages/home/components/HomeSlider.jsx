import styled from "styled-components";

const SliderContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #000;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
`;

const Slider = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  flex-shrink: 0;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }

  & img {
    width: 100%;
    object-fit: cover;
  }
`;

const HomeSlider = () => {
  return (
    <SliderContainer>
      <Slider>
        <img src="/slide1.jpg" alt="playground" />
      </Slider>
      <Slider>
        <img src="/slide2.jpg" alt="e-commerce" />
      </Slider>
    </SliderContainer>
  );
};

export default HomeSlider;
