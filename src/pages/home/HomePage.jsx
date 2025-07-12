import styled from "styled-components";
import Header from "./components/Header";
import HomeSlider from "./components/HomeSlider";
import HeroText from "./components/HeroText";
import AboutUs from "./components/AboutUs";
import Features from "./components/Features";
import DoorLockFeature from "./components/DoorLockFeature";
import Testimonials from "./components/Testimonials";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  @media (max-width: 600px) {
    height: 600px;
  }
`;

const HomePage = () => {
  return (
    <>
      <HeroSection>
        <Header />
        <HomeSlider />
        <HeroText />
      </HeroSection>
      <AboutUs />
      <Features />
      <DoorLockFeature />
      <Testimonials />
      <ContactUs />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default HomePage;
