/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import styled, { css } from "styled-components";
// import { motion } from "motion/react";
import { L_med_14s_14h } from "../../styles/fonts";
import { Flex } from "../../styles/generalStyles";

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.625em;
  width: 100%;
  border-radius: 0.625rem;
  padding: 1rem 1.25em;
  background: ${({ $isActive }) =>
    $isActive ? "var(--mainColor)" : "transparent"};
  color: ${({ $isActive }) => ($isActive ? "white" : "var(--gray700)")};
  overflow: hidden;
  cursor: pointer;

  ${({ $isActive }) =>
    $isActive &&
    css`
      svg {
        path {
          fill: white;
        }
      }
    `}

  &:hover {
    background: ${({ $isActive }) =>
      $isActive ? "var(--mainColor)" : "var(--gray100)"};
  }

  h2 {
    ${L_med_14s_14h}
    font-weight: 400;
  }

  @media (width<= 768px) {
    display: flex;
    align-items: center;
    gap: 0.625em;
    width: 100%;
    border-radius: 0.625rem;
    justify-content: flex-start;
    /* padding: 15px 20px; */
  }
`;

const NavButton = ({
  icon,
  title,
  link,
  isActive = false,
  setPageTitle,
  closeResponsiveSidebar = () => {
    return;
  },
}) => {
  const [height, setHeight] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSetPageTitle = () => {
    if (pathname.startsWith(link)) {
      setPageTitle(title);
    }
    if (link) {
      navigate(link);

      closeResponsiveSidebar();
    }
  };

  // Handle setting the dropdown expansion based on active links and update pageTitle
  useEffect(() => {
    if (pathname === link) {
      setPageTitle(title);
    }
  }, [pathname, setPageTitle, link, title]);

  useEffect(() => {
    if (dropdownRef.current) {
      setHeight(dropdownRef.current.scrollHeight);
    }
  }, []);

  return (
    <>
      <DropdownContainer
        $isActive={isActive}
        onClick={handleSetPageTitle}
        ref={dropdownRef}
        $height={height}
      >
        <Flex $align="center" $gap={8}>
          {icon}

          <h2>{title}</h2>
        </Flex>
      </DropdownContainer>
    </>
  );
};

export default NavButton;
