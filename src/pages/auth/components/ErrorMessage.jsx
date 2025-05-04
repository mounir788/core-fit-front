import styled from "styled-components";

const ErrorMessageText = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.66rem;
  text-align: center;
  color: red;
`;

const ErrorMessage = ({ error }) => {
  const getErrorMessage = () => {
    if (error?.request?.status === 0) {
      return "No internet connection. Please check your connection and try again.";
    }

    switch (error?.request?.status) {
      case 400:
        return "Invalid data entered. Please check and try again.";
      case 401:
        return "Incorrect username or password. Please try again.";
      case 403:
        return "You do not have the necessary permissions to access this page.";
      case 404:
        return "The page you are trying to access does not exist.";
      // case 500:
      //   return "A server error occurred. Please try again later.";
      case 500:
        return "Invalid data entered. Please check and try again.";
      case 502:
        return "The data entered is incorrect. Please verify your input.";
      default:
        return `An unexpected error occurred. Please try again later (code: ${error?.request?.status}).`;
    }
  };

  return <ErrorMessageText>{getErrorMessage()}</ErrorMessageText>;
};

export default ErrorMessage;
