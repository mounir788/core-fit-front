import styled, { css } from "styled-components";
import { Flex, MainContainer } from "../../../styles/generalStyles";
import Logo from "../../../components/Logo";
import { useNavigate } from "react-router";
import MainButton from "../../../components/MainButton";
import { useState, useEffect } from "react";

const StyledHeader = styled.header`
  position: fixed;
  /* top: 20px; */
  width: 100%;
  z-index: 99;
  padding-block: 20px;
  transition: background 0.3s, box-shadow 0.3s;
  ${({ $scrolled }) =>
    $scrolled &&
    css`
      background: rgba(255, 255, 255, 0.35);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      /* border-radius: 20px; */
    `}
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

const StyledLink = styled.a`
  color: white;
  transition: color 0.3s;

  &:hover {
    color: var(--mainColor);
  }
`;

const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1000000;
  @media (max-width: 900px) {
    display: flex;
  }
`;

const Bar = styled.span`
  width: 25px;
  height: 3px;
  background: #fff;
  margin: 3px 0;
  border-radius: 2px;
  transition: 0.4s;
`;

const MobileMenu = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: ${({ open }) => (open ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 70px;
    right: 19px;
    width: 250px;
    background: white;
    padding: 2rem 0;
    z-index: 9999999;
    gap: 1.5rem;
    align-items: center;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.13);
  }
`;

const DesktopMenu = styled(NavigationMenu)`
  @media (max-width: 900px) {
    display: none;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "#" },
    { label: "About Us", href: "#about" },
    { label: "Features", href: "#features" },
    { label: "Feedback", href: "#feedback" },
    { label: "Contact Us", href: "#contact" },
  ];

  return (
    <StyledHeader $scrolled={scrolled}>
      <MainContainer>
        <Flex $justify={"space-between"} $align={"center"}>
          <Flex $gap={10} $align={"center"}>
            <LogoContainer>
              <Logo size="25px" />
            </LogoContainer>
            <DesktopMenu>
              {links.map((link) => (
                <StyledLink key={link.label} href={link.href}>
                  {link.label}
                </StyledLink>
              ))}
            </DesktopMenu>
          </Flex>
          <Flex $align={"center"} $gap={10}>
            <MainButton
              title={"Login"}
              variant="fill"
              customStyle={css`
                border-radius: 100px;
                &:hover {
                  color: var(--mainColor);
                }
              `}
              onClick={() => navigate("/login")}
            />
            <Hamburger
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              <Bar />
              <Bar />
              <Bar />
            </Hamburger>
          </Flex>
          <MobileMenu open={menuOpen}>
            {links.map((link) => (
              <StyledLink
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </StyledLink>
            ))}
          </MobileMenu>
        </Flex>
      </MainContainer>
    </StyledHeader>
  );
};

export default Header;
