import { css } from "styled-components";
import BasicInput from "../../../components/BasicInput";
import Logo from "../../../components/Logo";
import MainButton from "../../../components/MainButton";
import { AuthForm, Flex } from "../../../styles/generalStyles";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import useForgetPassword from "../../../hooks/auth/useForgetPassword";
import { useState } from "react";
import { passwordValidation } from "../../../validation/someContantValidations";
import { useNavigate } from "react-router";

const ForgetPasswordForm = () => {
  const [isResetPassword, setIsResetPassword] = useState();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();

  const { isError, mutate, isPending, error } = useForgetPassword(
    isResetPassword ? "reset_password" : "forget_password"
  );

  const forgetPassword = (formData) => {
    mutate(
      {
        ...formData,
        type: "PROVIDER",
      },
      {
        onSuccess: isResetPassword
          ? () => navigate("/login")
          : () => setIsResetPassword(true),
      }
    );
  };

  return (
    <AuthForm onSubmit={handleSubmit(forgetPassword)}>
      <Flex $direction="column" $align="center" $gap={16}>
        <Logo />
        <BasicInput
          inputLabel={"Email"}
          inputPlaceHoleder={"Enter your email address"}
          //   isInputRequired
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

        {isResetPassword && (
          <>
            <BasicInput
              inputLabel={"OTP"}
              inputPlaceHoleder={"12345"}
              registering={register("otp", {
                required: "This field is required",
              })}
              error={errors?.otp?.message}
              style={{ background: "var(--gray100)" }}
            />
            <BasicInput
              inputLabel={"New Password"}
              inputPlaceHoleder={"Enter New password"}
              isPasswordInput
              autoComplete="off"
              registering={register("password", {
                required: "This field is required",
                validate: passwordValidation,
              })}
              error={errors?.password?.message}
              style={{ background: "var(--gray100)" }}
            />
            <BasicInput
              inputLabel={"Confirm New Password"}
              isPasswordInput
              inputPlaceHoleder={"Re-enter Password"}
              registering={register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                  value === watch("password") || "Password don't match",
              })}
              error={errors?.confirmPassword?.message}
              style={{ background: "var(--gray100)" }}
            />
          </>
        )}

        {isError && <ErrorMessage error={error} />}
        <MainButton
          title={isResetPassword ? "Reset Password" : "Forget Password"}
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
      </Flex>
    </AuthForm>
  );
};

export default ForgetPasswordForm;
