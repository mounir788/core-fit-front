import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "./Image";
import styled from "styled-components";

const Container = styled.div`
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
  }

  & .mySwiper2 {
    /* height: 80%; */
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
`;

const GallerySlider = ({ images = [""] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Container>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images?.map((image) => (
          <SwiperSlide key={image}>
            <Image src={image || ""} alt={"Product"} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
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
    </Container>
  );
};

export default GallerySlider;
