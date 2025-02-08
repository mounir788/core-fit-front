import { Link } from "react-router";
import styled from "styled-components";

const StyledLogo = styled(Link)`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  display: block;

  & img {
    width: 100%;
    height: 100%;
  }
`;

const Logo = ({ size = "100px", link = "/" }) => {
  return (
    <StyledLogo $size={size} to={link}>
      <img src="/logo.svg" alt="core fit" />
    </StyledLogo>
  );
};

export default Logo;
