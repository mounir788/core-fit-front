/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import BasicInput from "../../../components/BasicInput";
import MainButton from "../../../components/MainButton";
import { AuthForm, Flex } from "../../../styles/generalStyles";
import useLogin from "../../../hooks/auth/useLogin";
import { passwordValidation } from "../../../validation/someContantValidations";
import Logo from "../../../components/Logo";

const RemberMeCheckboxLabel = styled.label`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
  user-select: none;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.66rem;
  color: var(--gray700);
`;

const TextLink = styled(Link)`
  font-size: 0.875rem;
  font-weight: ${({ $weight }) => $weight || 400};
  line-height: 1.66rem;
  text-align: left;
  color: var(--mainColor);
  text-decoration: underline;
`;

const ErrorMessageText = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.66rem;
  text-align: right;
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

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { isError, mutate, isPending, error } = useLogin();

  const login = (formData) => {
    mutate({ email: formData.email, password: formData.password });
  };

  return (
    <AuthForm onSubmit={handleSubmit(login)}>
      <Flex $direction="column" $align="center" $gap={16}>
        <Logo />
        <BasicInput
          inputLabel={"Email"}
          inputPlaceHoleder={"Enter your email address"}
          isInputRequired
          registering={register("email", {
            required: "This field is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter valid email",
            },
          })}
          type={"email"}
          error={errors?.email?.message}
          style={{ background: "var(--gray100)" }}
        />
        <Flex $direction="column" $width="100%">
          <BasicInput
            inputLabel={"Password"}
            inputPlaceHoleder={"Enter your password"}
            isInputRequired
            isPasswordInput
            registering={register("password", {
              required: "This field is required",
              validate: passwordValidation,
            })}
            error={errors?.password?.message}
            style={{ background: "var(--gray100)" }}
          />
          <Flex $justify="space-between" $align="center">
            <RemberMeCheckboxLabel>
              <input type="checkbox" {...register("rememberMe")} />
              <p>{"Remember me"}</p>
            </RemberMeCheckboxLabel>
            <TextLink to={"/login/resetPassword"}>
              Forget your password?
            </TextLink>
          </Flex>
        </Flex>

        {isError && <ErrorMessage error={error} />}
        <MainButton
          title={"Login"}
          variant="filled"
          type="submit"
          isLoading={isPending}
          isDisabled={isPending}
          customStyle={css`
            width: 100%;
          `}
        />

        <p>
          Don't have an account?{" "}
          <TextLink to={"/register"} $weight="600">
            Create account
          </TextLink>
        </p>
      </Flex>
    </AuthForm>
  );
};

export default LoginForm;
