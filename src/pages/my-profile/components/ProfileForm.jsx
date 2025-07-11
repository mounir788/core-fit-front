import { Controller, useForm } from "react-hook-form";
import {
  Flex,
  FormContainer,
  FormInputsContainer,
} from "../../../styles/generalStyles";
import BasicInput from "../../../components/BasicInput";
import FormAcceptButton from "../../../components/FormAcceptButton";
import FormCancelButton from "../../../components/FormCancelButton";
import useCreateField from "../../../hooks/general/useCreateField";
import CustomSelect from "../../../components/CustomSelect";
import useGetGovernrates from "../../../hooks/auth/useGetGovernrates";
import useGetCities from "../../../hooks/auth/useGetCities";
import { useState } from "react";
import ProfileImageInput from "../../../components/ProfileImageInput";
import { genderOptions } from "../../../constants/constants";
import { validateBirthDate } from "../../../validation/someContantValidations";

const ProfileForm = ({ defaultData = {} }) => {
  const { data: governorates } = useGetGovernrates();

  const governratesList = governorates?.data?.governorates?.map((item) => {
    return { value: item.id, label: item.name };
  });
  const [governrateId, setGovernrateId] = useState(
    governratesList?.find((gov) => gov?.label === defaultData.governorate)
      ?.value
  );
  const { data: cities } = useGetCities(governrateId);

  const citiesList = cities?.data?.cities?.map((item) => {
    return { value: item.id, label: item.name };
  });

  const defaultValues = {
    id: defaultData.id,
    username: defaultData.username,
    email: defaultData.email,
    cityId: citiesList?.find((city) => city.label === defaultData.city)?.value,
    governorate: governrateId,
    phone: defaultData.phone,
    gender: defaultData.gender,
    birthDate: defaultData.birthDate,
    imageUrl: defaultData.imageUrl,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: defaultValues,
  });

  const { mutate: updateProfile, isPending: isUpdating } = useCreateField(
    "/auth/edit_profile",
    [["profile", defaultData.id]]
  );

  const handleFormSubmittion = (formData) => {
    updateProfile(formData);
  };

  return (
    <FormContainer onSubmit={handleSubmit(handleFormSubmittion)}>
      <FormInputsContainer>
        <Controller
          name="imageUrl"
          control={control}
          render={({ field }) => (
            <ProfileImageInput
              name={"imageUrl"}
              setValue={(option) => field.onChange(option)}
              defaultImage={defaultData.imageUrl}
              error={errors?.imageUrl?.message}
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
        />
        <BasicInput
          inputLabel={"User Name"}
          inputPlaceHoleder={"username3849"}
          isInputRequired
          registering={register("username", {
            required: "This field is required",
          })}
          error={errors?.username?.message}
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
              value={{
                value: defaultData.gender,
                label: defaultData.gender,
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
              background={"white"}
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
          value={{
            value: defaultValues.governorate,
            label: defaultData.governorate,
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
              value={{
                value: defaultValues.cityId,
                label: defaultData.city,
              }}
            />
          )}
          rules={{
            required: "This field is required",
          }}
        />
      </FormInputsContainer>
      <Flex $align="center" $gap={16}>
        <FormAcceptButton buttonLabel={"Submit"} isLoading={isUpdating} />
        <FormCancelButton buttonLabel={"Cancel"} />
      </Flex>
    </FormContainer>
  );
};

export default ProfileForm;
