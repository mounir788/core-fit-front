import styled from "styled-components";
import Header from "./components/Header";
import HomeSlider from "./components/HomeSlider";

const HeroSection = styled.div`
  width: 100%;
  height: 100vh;
`;

const HomePage = () => {
  return (
    <HeroSection>
      <Header />
      <HomeSlider />
    </HeroSection>
  );
};

export default HomePage;
