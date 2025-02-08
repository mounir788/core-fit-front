import styled, { css } from "styled-components";
import { Flex, MainContainer } from "../../../styles/generalStyles";
import Logo from "../../../components/Logo";
import { Link, useNavigate } from "react-router";
import MainButton from "../../../components/MainButton";

const StyledHeader = styled.header`
  position: fixed;
  top: 20px;
  width: 100%;
  z-index: 999999;
`;

const LogoContainer = styled.div`
  width: fit-content;
  padding: 10px;
  border-radius: 50%;
  background: #ffffffc5;
  backdrop-filter: blur(15px);
  flex-shrink: 0;
`;

const NavigationMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 10px 40px;
  border-radius: 100px;
  background: #4b515a99;
  backdrop-filter: blur(15px);
`;

const StyledLink = styled(Link)`
  color: white;
  transition: color 0.3s;

  &:hover {
    color: var(--mainColor);
  }
`;

const Header = () => {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <MainContainer>
        <Flex $justify={"space-between"}>
          <Flex $gap={10}>
            <LogoContainer>
              <Logo size="25px" />
            </LogoContainer>

            <NavigationMenu>
              <StyledLink>Home</StyledLink>

              <StyledLink>About Us</StyledLink>

              <StyledLink>Contact Us</StyledLink>
            </NavigationMenu>
          </Flex>
          <MainButton
            title={"Login"}
            variant="fill"
            customStyle={css`
              border-radius: 100px;
            `}
            onClick={() => navigate("/login")}
          />
        </Flex>
      </MainContainer>
    </StyledHeader>
  );
};

export default Header;
