import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "./Image";
import styled, { css } from "styled-components";
import { FiMaximize2 } from "react-icons/fi";

const Container = styled.div`
  position: relative;
  height: fit-content;

  & .swiper {
    width: 100%;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
  }

  & .swiper-slide {
    background-size: cover;
    background-position: center;
    background: var(--gray200);
    position: relative;
  }

  & .mySwiper2 {
    width: 100%;
  }

  & .mySwiper {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
  }

  & .mySwiper .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }

  & .mySwiper .swiper-slide-thumb-active {
    opacity: 1;
  }

  & .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  & .swiper-slide:hover .fullscreen-icon {
    opacity: 1;
  }
  & .swiper-button-next,
  & .swiper-button-prev {
    color: #fff;
  }
`;

const FullscreenOverlay = styled.div`
  ${({ isOpen }) =>
    isOpen &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      & .swiper {
        width: 80%;
        height: 70%;

        @media (width <= 768px) {
          width: 95%;
        }
      }

      & .fullscreenThumbs {
        height: 15%;
        margin-top: 20px;
        box-sizing: border-box;
        padding: 10px 0;
      }

      & .fullscreenThumbs .swiper-slide {
        width: 100px;
        height: 100%;
        opacity: 0.4;
      }

      & .fullscreenThumbs .swiper-slide-thumb-active {
        opacity: 1;
      }

      & .swiper-slide img {
        object-fit: contain;
      }

      & .swiper-button-next,
      & .swiper-button-prev {
        color: #fff;
      }
    `}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 30px;
  z-index: 10000;
  background: transparent;
  color: #fff;
  border: none;
  font-size: 2rem;
  cursor: pointer;
`;

const FullscreenIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
  z-index: 30;
`;

const GallerySlider = ({ images = [""] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenThumbs, setFullscreenThumbs] = useState(null);

  return (
    <Container>
      {/* Main slider */}
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {images?.map((image, index) => (
          <SwiperSlide key={image}>
            <Image src={image || ""} alt={"Product"} />
            <FullscreenIcon
              className="fullscreen-icon"
              onClick={() => setFullscreen(true)}
            >
              <FiMaximize2 size={20} />
            </FullscreenIcon>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        onSwiper={setThumbsSwiper}
        onBeforeDestroy={() => setThumbsSwiper(null)}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images?.map((image) => (
          <SwiperSlide key={image}>
            <Image src={image || ""} alt={"Product"} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Fullscreen Overlay with thumbs */}
      <FullscreenOverlay isOpen={fullscreen}>
        {fullscreen && (
          <>
            <CloseButton onClick={() => setFullscreen(false)}>
              &times;
            </CloseButton>

            <Swiper
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={
                fullscreenThumbs ? { swiper: fullscreenThumbs } : undefined
              }
              initialSlide={activeIndex}
              modules={[FreeMode, Navigation, Thumbs]}
              className="fullscreenMain"
            >
              {images?.map((image) => (
                <SwiperSlide key={image} style={{ background: "transparent" }}>
                  <Image src={image || ""} alt={"Product"} />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setFullscreenThumbs}
              onBeforeDestroy={() => setFullscreenThumbs(null)}
              loop={true}
              spaceBetween={10}
              slidesPerView={6}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="fullscreenThumbs"
            >
              {images?.map((image) => (
                <SwiperSlide key={image}>
                  <Image src={image || ""} alt={"Product"} />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </FullscreenOverlay>
    </Container>
  );
};

export default GallerySlider;
