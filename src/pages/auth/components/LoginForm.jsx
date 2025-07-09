/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import BasicInput from "../../../components/BasicInput";
import MainButton from "../../../components/MainButton";
import { AuthForm, Flex } from "../../../styles/generalStyles";
import useLogin from "../../../hooks/auth/useLogin";
// import { passwordValidation } from "../../../validation/someContantValidations";
import Logo from "../../../components/Logo";
import ErrorMessage from "./ErrorMessage";

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
  line-height: 1.8;
  color: var(--gray700);

  & input {
    accent-color: var(--mainColor);
  }

  @media (width <= 460px) {
    font-size: 0.75rem;
  }
`;

const TextLink = styled(Link)`
  font-size: 0.875rem;
  font-weight: ${({ $weight }) => $weight || 400};
  line-height: 1.8;
  text-align: left;
  color: var(--mainColor);
  text-decoration: underline;

  @media (width <= 460px) {
    font-size: 0.75rem;
  }
`;

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { isError, mutate, isPending, error } = useLogin();

  const login = (formData) => {
    mutate({
      email: formData.email,
      password: formData.password,
      type: "PROVIDER",
    });
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
              // validate: passwordValidation,
            })}
            error={errors?.password?.message}
            style={{ background: "var(--gray100)" }}
          />
          <Flex $justify="flex-end" $align="center">
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
            &:hover {
              border: 1px solid var(--mainColor);
            }
          `}
        />

        <p>
          Don't have an account?
          <TextLink to={"/register"} $weight="600">
            Create account
          </TextLink>
        </p>
      </Flex>
    </AuthForm>
  );
};

export default LoginForm;
