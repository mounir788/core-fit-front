/* eslint-disable react/prop-types */
import Select from "react-select";
import {
  Error,
  InputContainer,
  InputFontStyle,
  InputLabel,
  LabelContainer,
} from "../styles/generalStyles";
import styled from "styled-components";

const RequiredAstrecContainer = styled.p`
  ${InputFontStyle};
  color: var(--buttonRed);
`;

const customStyles = (error) => ({
  control: (provided, state) => ({
    ...provided,
    padding: "4px",
    border: error
      ? "1px solid var(--buttonRed)" // Red border for error
      : state.isFocused
      ? "1px solid var(--mainColor)" // Black border when focused
      : "1px solid var(--gray300)", // Default gray border
    boxShadow: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    outline: "none",
    // backgroundColor: "var(--gray100)",

    "&:hover": {
      borderColor: error ? "var(--buttonRed)" : "var(--mainColor)", // Hover color respects the error state
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "var(--gray200)" : "white",
    color: state.isSelected ? "var(--gray700)" : "var(--gray700)",
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: "10px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--gray400)",
  }),
});

const CustomSelect = ({
  isInputRequired = false,
  isMulti = false,
  inputLabel,
  options,
  value,
  defaultValue,
  onChange,
  error,
  isDisabled,
  colsToTake,
  flex,
  ...props
}) => {
  return (
    <InputContainer cols={colsToTake} $flex={flex}>
      {inputLabel && (
        <LabelContainer>
          <InputLabel>{inputLabel}</InputLabel>
          {isInputRequired && (
            <RequiredAstrecContainer>*</RequiredAstrecContainer>
          )}
        </LabelContainer>
      )}
      <Select
        className="custom-double-select"
        styles={customStyles(error)} // Pass the error prop to the customStyles
        isMulti={isMulti}
        options={options}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        closeMenuOnSelect={!isMulti}
        hideSelectedOptions={false}
        isDisabled={isDisabled}
        placeholder={"Select"}
        {...props}
      />
      {error && <Error>{error}</Error>}
    </InputContainer>
  );
};

export default CustomSelect;
