/* eslint-disable react/prop-types */
import styled from "styled-components";
import { SyncLoader } from "react-spinners";

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 9.375rem;
  height: 2.625rem;
  padding: 0.625rem 2.5rem;
  border-radius: 0.5rem;
  background: var(--mainColor);
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background: var(--darkBlue);
  }
  ${({ $customeStyle }) => $customeStyle}
  @media (width<=768px) {
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      font-size: 1rem;
    }
  }
`;

const FormAcceptButton = ({
  buttonLabel,
  isLoading,
  type,
  action = () => {
    return;
  },
  ...props
}) => {
  return (
    <ButtonContainer
      type={type || "submit"}
      disabled={isLoading}
      onClick={type && action}
      {...props}
    >
      {!isLoading ? (
        <p>{buttonLabel}</p>
      ) : (
        <SyncLoader color="#ffffff" size={5} />
      )}
    </ButtonContainer>
  );
};

export default FormAcceptButton;
