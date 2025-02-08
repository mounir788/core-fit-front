/* eslint-disable react/prop-types */

import { SyncLoader } from "react-spinners";
import styled, { css } from "styled-components";

const ButtonBase = styled.button`
  width: auto;
  min-width: 100px;
  height: 44px;
  padding: 0.625rem 1rem 0.625rem 1rem;
  gap: 0.625rem;
  border-radius: 8px;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  justify-content: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  cursor: pointer;
  flex-shrink: 0;
  ${(props) => props.$customStyle}
`;

const OutlinedButton = styled(ButtonBase)`
  border: 1px solid var(--mainColor);

  color: ${({ $textcolorfilled }) =>
    $textcolorfilled ? $textcolorfilled : "var(--mainColor)"};
  ${({ $disableHover }) =>
    !$disableHover &&
    css`
      &:hover {
        background: var(--mainColor);
        color: #ffffff;
      }
    `}
`;

const FilledButton = styled(ButtonBase)`
  background: ${({ $colorfilled }) =>
    $colorfilled === "red" ? "var(--buttonRed)" : "var(--mainColor)"};
  color: ${({ $textcolorfilled }) =>
    $textcolorfilled ? $textcolorfilled : "#ffffff"};

  ${({ $disableHover }) =>
    !$disableHover &&
    css`
      &:hover {
        background: ${({ $colorfilled }) =>
          $colorfilled === "red" ? "var(--darkRed)" : "var(--darkBlue)"};
      }
    `}
`;

const DisabledButton = styled(ButtonBase)`
  background: var(--gray400) !important;
  color: var(--sectionText) !important;

  pointer-events: none;
`;

const ButtonText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;

  ${(props) => props.$textstyle}
  white-space: nowrap;

  @media only screen and (max-width: 1400px) {
    font-size: 12px;
  }
`;

const MainButton = ({
  variant = "outlined",
  startIcon,
  endIcon,
  title,
  colorfilled,
  textcolorfilled,
  disableHover = false,
  type = "button",
  isLoading = false,
  isDisabled = false,
  customStyle = "",
  textstyle = "",
  ...props
}) => {
  const Button = isDisabled
    ? DisabledButton
    : variant === "outlined"
    ? OutlinedButton
    : FilledButton;

  return (
    <Button
      $colorfilled={colorfilled}
      $textcolorfilled={textcolorfilled}
      $disableHover={disableHover}
      $type={type}
      $isLoading={isLoading}
      $disabled={isDisabled}
      $customStyle={customStyle}
      {...props}
    >
      {isLoading ? (
        <SyncLoader color="#ffffff" size={5} />
      ) : (
        <>
          {startIcon && startIcon}
          <ButtonText $textstyle={textstyle}>{title}</ButtonText>
          {endIcon && endIcon}
        </>
      )}
    </Button>
  );
};

export default MainButton;
