import styled from "styled-components";
import Header from "./components/Header";
import HomeSlider from "./components/HomeSlider";
import HeroText from "./components/HeroText";

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const HomePage = () => {
  return (
    <HeroSection>
      <Header />
      <HomeSlider />
      <HeroText />
    </HeroSection>
  );
};

export default HomePage;
