import { TypeAnimation } from "react-type-animation";
import { Flex, MainContainer } from "../../../styles/generalStyles";
import styled, { css } from "styled-components";
import MainButton from "../../../components/MainButton";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";

const Box = styled.div`
  position: absolute;
  bottom: 150px;
  width: 100%;
  z-index: 99;

  /* & h1 {
    max-width: 250px;
  } */
`;

const Text = styled.p`
  font-size: 1rem;
  line-height: 1.3;
  color: white;
  max-width: 500px;
`;

const Icon = styled.span`
  display: grid;
  place-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: auto;
  background: var(--mainColor);
  color: white;
`;

const HeroText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const texts = [
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam dolorum autem rem sed distinctio necessitatibus ipsam aperiam deserunt mollitia provident! Corrupti magni.",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam dolorum autem rem sed distinctio necessitatibus ipsam aperiam.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <Box>
      <MainContainer>
        <Flex $direction="column" $gap={16}>
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Add Your Playground To The Map",
              9000, // wait 1s before replacing "Mice" with "Hamsters"
              "Your Online Store Awaits",
              9000,
            ]}
            wrapper="h1"
            speed={10}
            style={{
              fontSize: "3rem",
              display: "inline-block",
              color: "white",
              //   position: "absolute",
              //   bottom: 0,
              //   zIndex: 999,
            }}
            repeat={Infinity}
          />
          <Text>{texts[currentIndex]}</Text>
          <Flex $gap={16}>
            <MainButton
              title={"Create account"}
              variant="filled"
              customStyle={css`
                background: white;
                color: var(--gray700);
                border-radius: 100px;
                padding-inline: 25px 7px;
                gap: 20px;
                margin-top: 10px;

                &:hover {
                  background: var(--mainColor);
                  color: white;
                }
              `}
              endIcon={
                <Icon>
                  <IoChevronForwardOutline size={20} />
                </Icon>
              }
              onClick={() => navigate("/register")}
            />
          </Flex>
        </Flex>
      </MainContainer>
    </Box>
  );
};

export default HeroText;
