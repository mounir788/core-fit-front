import styled from "styled-components";

const CustomCheckBoxInput = styled.input`
  width: 20px;
  height: 20px;
  accent-color: var(--mainColor);
  margin-top: 20px;
  /* margin-right: 4px; */
  cursor: pointer;
`;

const CheckBoxInput = ({ isRequired, id = "limited", ...props }) => {
  return (
    <CustomCheckBoxInput
      type="checkbox"
      id={id}
      required={isRequired}
      {...props}
    />
  );
};

export default CheckBoxInput;
