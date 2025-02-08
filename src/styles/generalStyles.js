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
