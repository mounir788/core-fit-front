/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styled, { css } from "styled-components";
// import { motion } from "motion/react";
import { L_med_14s_14h } from "../../styles/fonts";
import { Flex } from "../../styles/generalStyles";

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  border-radius: 0.625rem;
  padding: 0.5rem 0.75rem;
  background: transparent;
  color: var(--gray700);
  overflow: hidden;
  cursor: pointer;

  h2 {
    ${L_med_14s_14h}
    font-weight: 400;
  }

  &.active,
  &:hover {
    background: white;
    h2 {
      font-weight: 500;
    }
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

const Icon = styled.div`
  display: grid;
  place-content: center;
  padding: 10px;
  flex-shrink: 0;
  border-radius: 8px;
  background: white;
  box-shadow: 0px 2px 5px rgba(38, 38, 38, 0.07);

  ${DropdownContainer}.active &,
  ${DropdownContainer}:hover & {
    background: var(--mainColor);
    color: white;
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
    if (pathname.includes(link)) {
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
        className={isActive ? "active" : ""}
        onClick={handleSetPageTitle}
        ref={dropdownRef}
        $height={height}
      >
        <Flex $align="center" $gap={12}>
          <Icon className={isActive ? "active" : ""}>{icon}</Icon>

          <h2>{title}</h2>
        </Flex>
      </DropdownContainer>
    </>
  );
};

export default NavButton;
