/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";
import {
  Error,
  InputContainer,
  InputFontStyle,
  InputLabel,
  LabelContainer,
  RequiredAstrecContainer,
} from "../styles/generalStyles";

import { FaEye, FaStar } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import ResponsiveTimePickers from "./TimePicker";
import BasicDatePicker from "./DatePicker";
import { L_reg_14s_14h, L_reg_16s_16h } from "../styles/fonts";

const TheInput = styled.input`
  ${InputFontStyle};
  width: 100%;
  padding: 0.825rem 1rem;

  border-radius: 0.5rem;
  background: transparent;
  min-height: 48px;

  border: ${({ $hasError }) =>
    $hasError
      ? "1px solid var(--buttonRed) !important"
      : "1px solid var(--gray300)"};

  border-radius: ${({ $clearLeftBorderRadius }) =>
    $clearLeftBorderRadius && "0 .5rem .5rem 0"};

  outline: none;

  &:focus {
    border: 1px solid var(--mainColor);
  }
  ${L_reg_16s_16h}

  color:var(--gray700);

  &::placeholder {
    color: var(--gray400);
  }

  font-weight: ${(props) => {
    return props.$isfontbold ? "600" : "400";
  }};
  padding-right: ${(props) => {
    return props.$isPasswordInput ? "3rem" : "0.938rem";
  }};

  ${(props) => props.$customstyle}

  @media only screen and (max-width: 883px) {
    ${L_reg_14s_14h}/* height: 40px; */
  }
`;

const TheTextArea = styled.textarea`
  ${InputFontStyle};
  width: 100%;
  height: ${({ $height }) => ($height ? $height : "6.313rem")};
  padding: 0.625rem 0.938rem;
  resize: none;
  min-height: 48px;
  border-radius: 8px;
  border: ${({ $hasError }) =>
    $hasError
      ? "1px solid var(--buttonRed) !important"
      : "1px solid var(--gray300)"};

  outline: none;
  background: transparent;

  &:focus {
    border: 1px solid #000000;
  }
  ${L_reg_16s_16h}

  color:var(--gray700);

  &::placeholder {
    color: var(--gray400);
  }

  @media only screen and (max-width: 883px) {
    padding: 10px;
    ${L_reg_14s_14h}
  }
`;

const PasswordInputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const EyeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 1rem;
  cursor: pointer;
  color: var(--gray400);
`;

const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #ffffff; */
  position: absolute;
  /* right: 50%; */
  top: 50%;
  transform: translate(50%, -50%);
  cursor: pointer;
`;

const InnerInputContainer = styled.div`
  position: relative;
`;

const BasicInput = ({
  inputLabel,
  inputPlaceHoleder,
  isInputRequired = false,
  isTextArea = false,
  registering,
  isfontbold = false,
  isPasswordInput = false,
  colsToTake,
  textAreaHeight,
  error,
  flex,
  hasStarIcon = false,
  isTimeInput = false,
  isDateInput = false,
  hideLabel = false,
  clearLeftBorderRadius = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const switchInputType = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputContainer $cols={colsToTake} $flex={flex}>
      {inputLabel && (
        <LabelContainer>
          {inputLabel && (
            <InputLabel
              $isfontbold={isfontbold ? "true" : null}
              $hideLabel={hideLabel ? "true" : null}
            >
              {inputLabel}
            </InputLabel>
          )}
          {isInputRequired && (
            <RequiredAstrecContainer>*</RequiredAstrecContainer>
          )}
        </LabelContainer>
      )}
      {isPasswordInput ? (
        <PasswordInputContainer>
          <TheInput
            // required={isInputRequired}
            $hasError={error ? "true" : null}
            $clearLeftBorderRadius={clearLeftBorderRadius ? "true" : null}
            placeholder={inputPlaceHoleder}
            $isfontbold={isfontbold}
            $isPasswordInput={isPasswordInput}
            type={!showPassword ? "password" : "text"}
            {...registering}
            {...props}
          />

          <EyeContainer onClick={switchInputType}>
            {!showPassword ? (
              <FaEye color="var(--mainColor)" />
            ) : (
              <FaEyeSlash color="var(--mainColor)" />
            )}
          </EyeContainer>
        </PasswordInputContainer>
      ) : isTimeInput ? (
        <ResponsiveTimePickers {...props} />
      ) : isDateInput ? (
        <BasicDatePicker {...props} />
      ) : !isTextArea ? (
        <InnerInputContainer>
          <TheInput
            // required={isInputRequired}
            $hasError={error ? "true" : null}
            $clearLeftBorderRadius={clearLeftBorderRadius ? "true" : null}
            placeholder={inputPlaceHoleder}
            $isfontbold={isfontbold}
            $customstyle={
              hasStarIcon &&
              css`
                padding-left: 2rem !important;
              `
            }
            {...registering}
            {...props}
          />
          {hasStarIcon && (
            <StarContainer>
              <FaStar
                style={{
                  color: "var(--starYellow)",
                }}
              />
            </StarContainer>
          )}
        </InnerInputContainer>
      ) : (
        <TheTextArea
          // required={isInputRequired}
          $hasError={error ? "true" : null}
          placeholder={inputPlaceHoleder}
          $isfontbold={isfontbold}
          $cols={20}
          $height={textAreaHeight}
          {...registering}
          {...props}
        />
      )}
      {error && <Error>{error}</Error>}
    </InputContainer>
  );
};

export default BasicInput;
