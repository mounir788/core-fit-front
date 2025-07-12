import { useEffect, useState } from "react";
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
    height: 100%;
    object-fit: cover;
  }
  transition: margin-left 1s cubic-bezier(0.25, 0.1, 0.25, 1);
  margin-left: ${({ $marginLift }) => $marginLift}%;
`;

const HomeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliders = [
    {
      imageSrc: "/slide1.jpg",
      alt: "playground",
    },
    {
      imageSrc: "/slide2.jpg",
      alt: "e-commerce",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliders.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [sliders.length]);

  return (
    <SliderContainer>
      {sliders.map((slide, index) => (
        <Slider
          key={slide.imageSrc}
          $marginLift={index === 0 && currentSlide * -100}
        >
          <img src={slide.imageSrc} alt={slide.alt} />
        </Slider>
      ))}
    </SliderContainer>
  );
};

export default HomeSlider;
