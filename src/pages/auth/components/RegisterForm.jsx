/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useSearchParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import BasicInput from "../../../components/BasicInput";
import MainButton from "../../../components/MainButton";
import {
  AuthForm,
  Flex,
  FormInputsContainer,
} from "../../../styles/generalStyles";
import {
  passwordValidation,
  validateBirthDate,
} from "../../../validation/someContantValidations";
import Logo from "../../../components/Logo";
import useRegister from "../../../hooks/auth/useRegister";
import ErrorMessage from "./ErrorMessage";
import CustomSelect from "../../../components/CustomSelect";
import { genderOptions } from "../../../constants/constants";
import useGetGovernrates from "../../../hooks/auth/useGetGovernrates";
import useGetCities from "../../../hooks/auth/useGetCities";
import { useState } from "react";
import ProfileImageInput from "../../../components/ProfileImageInput";

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

const RegisterForm = () => {
  const [governrateId, setGovernrateId] = useState(null);
  const [searchParams] = useSearchParams();
  const { data: governorates } = useGetGovernrates();
  const { data: cities } = useGetCities(governrateId);

  const governratesList = governorates?.data?.governorates?.map((item) => {
    return { value: item.id, label: item.name };
  });

  const citiesList = cities?.data?.cities?.map((item) => {
    return { value: item.id, label: item.name };
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues: {
      email: searchParams.get("email"),
      phone: searchParams.get("phone"),
      username: null,
      password: null,
      gender: null,
      type: "PROVIDER",
      birthDate: "",
      image: null,
      otp: null,
      cityId: null,
    },
  });

  const { isError, mutate, isPending, error } = useRegister();

  const handleRegister = (formData) => {
    mutate(formData);
  };

  return (
    <AuthForm
      onSubmit={handleSubmit(handleRegister)}
      $customStyle={css`
        @media (width >= 768px) {
          min-width: 650px;
        }
      `}
    >
      <Flex $direction="column" $align="center" $gap={16}>
        <Logo />
        <FormInputsContainer>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <ProfileImageInput
                name={"image"}
                setValue={(option) => field.onChange(option)}
                error={errors?.image?.message}
              />
            )}
            rules={{
              required: "This field is required",
            }}
          />
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
          <BasicInput
            inputLabel={"User Name"}
            inputPlaceHoleder={"username3849"}
            isInputRequired
            registering={register("username", {
              required: "This field is required",
            })}
            error={errors?.username?.message}
            style={{ background: "var(--gray100)" }}
          />
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
          <BasicInput
            inputLabel={"OTP"}
            inputPlaceHoleder={"12345"}
            isInputRequired
            registering={register("otp", {
              required: "This field is required",
            })}
            error={errors?.otp?.message}
            style={{ background: "var(--gray100)" }}
          />
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
          <BasicInput
            inputLabel={"Confirm Password"}
            isInputRequired
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
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <CustomSelect
                inputLabel={"Gender"}
                isInputRequired
                inputPlaceHoleder={"Gender"}
                error={errors?.gender?.message}
                options={genderOptions}
                onChange={(option) => {
                  field.onChange(option.value);
                }}
              />
            )}
            rules={{
              required: "This field is required",
            }}
          />
          <Controller
            name={"birthDate"}
            control={control}
            render={({ field }) => (
              <BasicInput
                isDateInput
                defaultValue={field.value}
                inputLabel={"Birth Date"}
                onChange={(value) => field.onChange(value)}
                error={errors?.birthDate?.message}
              />
            )}
            rules={{
              required: "This field is required",
              validate: validateBirthDate,
            }}
          />
          <CustomSelect
            inputLabel={"Governorate"}
            isInputRequired
            inputPlaceHoleder={"Governorate"}
            options={governratesList}
            onChange={(option) => {
              setGovernrateId(option.value);
            }}
          />
          <Controller
            name="cityId"
            control={control}
            render={({ field }) => (
              <CustomSelect
                inputLabel={"City"}
                isInputRequired
                inputPlaceHoleder={"City"}
                error={errors?.cityId?.message}
                options={citiesList}
                onChange={(option) => {
                  field.onChange(option.value);
                }}
              />
            )}
            rules={{
              required: "This field is required",
            }}
          />
        </FormInputsContainer>

        {isError && <ErrorMessage error={error} />}
        <MainButton
          title={"Submit"}
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

export default RegisterForm;
