/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import BasicInput from "../../../components/BasicInput";
import MainButton from "../../../components/MainButton";
import { AuthForm, Flex } from "../../../styles/generalStyles";
import Logo from "../../../components/Logo";
import useCanRegister from "../../../hooks/auth/useCanRegister";
import ErrorMessage from "./ErrorMessage";

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

const CanRegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { isError, mutate, isPending, error } = useCanRegister();

  const canRegister = (formData) => {
    mutate(formData, {
      onSuccess: () => {
        navigate(
          `/register/new-user?email=${formData.email}&phone=${formData.phone}`
        );
      },
    });
  };

  return (
    <AuthForm onSubmit={handleSubmit(canRegister)}>
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
            inputLabel={"Phone"}
            inputPlaceHoleder={"Enter your phone number"}
            isInputRequired
            type="phone"
            registering={register("phone", {
              required: "This field is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Not valid number",
              },
              minLength: {
                value: 11,
                message: "Please enter 11 digits",
              },
              maxLength: {
                value: 11,
                message: "Please enter 11 digits",
              },
            })}
            error={errors?.phone?.message}
            style={{ background: "var(--gray100)" }}
          />
        </Flex>

        {isError && <ErrorMessage error={error} />}
        <MainButton
          title={"Next"}
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
          Already have an account?
          <TextLink to={"/login"} $weight="600">
            Login
          </TextLink>
        </p>
      </Flex>
    </AuthForm>
  );
};

export default CanRegisterForm;
