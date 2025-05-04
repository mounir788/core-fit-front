import styled, { css } from "styled-components";
import { L_med_16s_16h, L_reg_12s_12h, L_reg_16s_16h } from "./fonts";

export const Flex = styled.div`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  align-items: ${({ $align }) => $align};
  padding: ${({ $padding }) => $padding};
  justify-content: ${({ $justify }) => $justify};
  gap: ${({ $gap }) => $gap}px;
  flex-wrap: ${({ $wrap }) => $wrap};
  flex: ${({ $flex }) => $flex};
  width: ${({ $width }) => $width};

  ${({ $customStyle }) => $customStyle}
`;

export const ToastIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  display: grid;
  place-content: center;
  flex-shrink: 0;
  margin-bottom: auto;
`;

export const AuthFormContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  /* place-content: center; */
  overflow: auto;
  padding-block: 30px;
`;
export const AuthForm = styled.form`
  padding: 50px;
  border-radius: 20px;
  border: 1px solid var(--gray700);
  width: 35%;
  margin: auto;

  @media (width <= 1048px) {
    width: 50%;
  }
  @media (width <= 768px) {
    width: 90%;
  }
  @media (width <= 460px) {
    padding: 50px 20px;
  }

  ${({ $customStyle }) => $customStyle}
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormInputsContainer = styled.div`
  width: 100%;
  height: auto;
  /* gap: 1.25rem; */
  gap: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;

  &.ar {
    direction: rtl;
  }

  @media (width<=768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const InputFontStyle = css`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.3;
`;

export const RequiredAstrecContainer = styled.p`
  ${L_med_16s_16h}
  color: var(--astrecRed);
`;

export const InputContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.313rem;
  grid-column: ${({ $cols }) =>
    `span ${$cols ? $cols : 1} / span ${$cols ? $cols : 1}`};
  flex: ${({ $flex }) => $flex};
`;

export const LabelContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  padding-right: 5px;
  gap: 5px;
  margin-bottom: 4px;
`;

export const InputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  /* ${InputFontStyle}; */
  ${L_med_16s_16h}
  color: var(--gray500);
  /* font-size: 1rem; */
  font-weight: ${({ isfontbold }) => (isfontbold ? "600" : "500")};
  opacity: ${({ $hideLabel }) => ($hideLabel ? 0 : 1)};
  /* line-height: 1; */
  white-space: nowrap;

  @media only screen and (max-width: 883px) {
    font-size: 12px;
  }
`;

export const Error = styled.p`
  ${L_reg_12s_12h}
  color: var(--buttonRed);
  /* margin-top: 8px; */
`;

export const Box = styled.div`
  direction: ltr;
  & .MuiStack-root {
    width: 100%;
    padding-top: 0;

    & .MuiFormControl-root {
      min-width: auto;
      width: 100%;

      & .MuiButtonBase-root,
      & .MuiIconButton-root {
        min-width: auto;
        padding: 8px;
      }
    }
  }
`;

export const MainContainer = styled.div`
  max-width: 1420px;
  width: 100%;
  padding-inline: 1rem;
  margin: auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ $cols }) => $cols};
  grid-template-rows: ${({ $rowCols }) => $rowCols};
  gap: ${({ $gap }) => $gap || "1rem"};

  ${({ $customeStyle }) => $customeStyle}
`;

export const ActionMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;
  gap: 16px;

  position: ${({ $position }) => $position || "absolute"};
  top: ${({ $top }) => $top || 35}px;
  ${({ $left, $position }) =>
    $position === "absolute"
      ? css`
          right: 16px;
        `
      : css`
          left: ${$left}px;
        `};
  width: 189px;
  /* height: 112px; */

  background: white;

  box-shadow: 0px 39px 15px rgba(140, 140, 140, 0.01),
    0px 22px 13px rgba(140, 140, 140, 0.04),
    0px 10px 10px rgba(140, 140, 140, 0.06),
    0px 2px 5px rgba(140, 140, 140, 0.07);
  border-radius: 8px;

  z-index: 9999;

  direction: ltr !important;

  ${({ $ar }) =>
    $ar &&
    css`
      right: auto;
      left: ${({ $left }) => $left || 46}px;
    `}
`;

export const ButtonContainer = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  gap: 8px;

  width: 100%;
  /* height: 44px; */

  border-radius: 8px;
  cursor: pointer;

  ${L_reg_16s_16h}
  color:var(--gray700);

  ${(props) =>
    props.$disabled &&
    css`
      background: var(--gray200);
      pointer-events: none;
      color: var(--gray500);
    `}
`;

export const EditButtonContainer = styled(ButtonContainer)`
  &:hover {
    background: var(--gray100);
  }
`;

export const DeleteButtonContainer = styled(ButtonContainer)`
  &:hover {
    background: var(--buttonRed);
    color: white;
  }
`;

export const StyledModal = styled.div`
  background: rgb(0, 0, 0, 20%);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99999;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PopupMessageContainer = styled.div`
  width: 100%;
  max-width: 500px;
  height: auto;

  padding: 1rem;
  gap: 0.725rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  background: #ffffff;
  box-shadow: 0px 6px 13px 0px #0000001a, 0px 24px 24px 0px #00000017,
    0px 54px 33px 0px #0000000d, 0px 97px 39px 0px #00000003,
    0px 151px 42px 0px #00000000;
  direction: ltr;
  @media (width<= 768px) {
    max-width: fit-content;
  }
`;

export const PopupMessageTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 1;

  color: var(--gray700);
`;
export const PopupMessageText = styled.div`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.2;

  color: var(--gray500);
`;

export const PopupButtonsContainer = styled.div`
  display: flex;
  gap: 0.625rem;
  margin-top: 1.225rem;
  /* justify-content: flex-end; */
`;

export const BoxContainer = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
`;

export const IndicatorBoxContainer = styled.div`
  position: relative;
  min-width: ${({ $minWidth }) => $minWidth || "200px"};
  height: 200px;
  padding: 1.5rem;
  border-radius: 1rem;
  background: ${({ $background }) => $background || "transparent"};
  border: 1px solid ${({ $borderColor }) => $borderColor || "var(--gray10)"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background: var(--lightGreen);
  }

  & img {
    width: 48px;
    height: 48px;
    object-fit: cover;
  }

  & p {
    font-weight: 600;
    font-size: 14px;
    color: var(--dark);
  }

  & span {
    font-size: 14px;
  }

  ${({ $hasNewOrders }) =>
    $hasNewOrders &&
    css`
      &::before {
        content: "";
        position: absolute;
        top: 9px;
        left: 9px;
        width: 40px;
        height: 40px;

        background: var(--mainColor);
        opacity: 0.4;
        border-radius: 50%;
        z-index: 1;

        transition: scale cubic-bezier(0.17, 0.67, 0.83, 0.67);
        animation: 1s infinite alternate flash;

        @keyframes flash {
          from {
            transform: scale(0);
          }

          to {
            transform: scale(1);
          }
        }
      }
    `}

  ${({ $customeStyle }) => $customeStyle}
`;

export const ShrinkedTextWithHover = styled.div`
  display: flex;
  gap: 5px;
  /* max-width: 250px; */

  & p {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--gray600);
  }

  ${({ $hasHover }) =>
    $hasHover &&
    css`
      & > div {
        position: absolute;
        width: 400px;
        top: -100%;
        left: 50%;
        padding: 1rem;
        border-radius: 0.5rem;
        background: white;
        box-shadow: 0px 2px 5px 0px #8c8c8c12;
        display: none;
        z-index: 2;
        line-height: 1.4;
      }

      &:hover > div {
        display: grid;
      }
    `}

  & span {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1;
    color: var(--gray400);
  }
`;

export const PopupFormContainer = styled.form`
  width: 100%;
  padding: 1rem;
  max-width: 50.5rem;
  height: auto;
  background: #ffffff;

  border-radius: 0.5rem;
  box-shadow: 0px 1px 2px 0px #0000000d, 1px 4px 4px 0px #0000000a,
    2px 10px 6px 0px #00000008, 4px 17px 7px 0px #00000003,
    7px 27px 8px 0px #00000000;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  @media only screen and (max-width: 768px) {
    min-width: 390px;
  }
  ${({ $customeStyle }) => $customeStyle}
`;

export const PopupFormTitle = styled.div`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.2;
  text-align: left;
  color: var(--gray700);
  display: flex;
  align-items: center;
  padding-block: 10px 20px;
  border-bottom: 1px solid var(--gray200);
  ${({ $customeStyle }) => $customeStyle}
`;

export const PopupFormInputsContainer = styled.div`
  width: 100%;
  height: auto;
  /* padding: 1.5rem 1.875rem; */
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;

  &.ar {
    direction: rtl;
  }

  @media (width <= 991px) {
    grid-template-columns: 1fr;
  }
  ${({ $customeStyle }) => $customeStyle}
`;

export const MainTitle = styled.h1`
  font-size: 22px;
  font-weight: 500;
  line-height: 1.2;
  color: var(--dark);
  padding-bottom: 10px;
  border-bottom: 1px solid var(--gray300);
`;

export const Category = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 1.25;
  text-align: start;

  color: var(--second);
`;

export const Price = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 1.2;
  color: var(--dark);
  flex-shrink: 0;
`;

export const Currency = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 1.25;
  color: var(--dark);
`;

export const Offer = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 1.25;
  text-decoration: line-through;
  color: #777777;
  flex-shrink: 0;
`;

export const Discount = styled.div`
  padding: 5px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.2;
  color: white;
  background: var(--darkRed);

  & span {
    font-weight: 400;
  }
`;
