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
import ImageUploader from "../../../components/ImageUploader";
import CustomSelect from "../../../components/CustomSelect";
import { useUploadFiles } from "../../../hooks/general/useUploadFiles";
import MapInput from "../../../components/MapInput";
import useGetGovernrates from "../../../hooks/auth/useGetGovernrates";
import useGetCities from "../../../hooks/auth/useGetCities";
import { useState } from "react";
import { css } from "styled-components";
import BasicCheckBox from "../../../components/BasicCheckbox";

const PlaygroundForm = ({ isEditForm = false, defaultData = {} }) => {
  const [governrateId, setGovernrateId] = useState(null);

  const { data: governorates } = useGetGovernrates();
  const { data: cities } = useGetCities(governrateId);

  const governratesList = governorates?.data?.governorates?.map((item) => {
    return { value: item.id, label: item.name };
  });

  const citiesList = cities?.data?.cities?.map((item) => {
    return { value: item.id, label: item.name };
  });

  const defaultValues = isEditForm
    ? {
        id: defaultData.id,
        name: defaultData.name,
        description: defaultData.description,
        address: defaultData.address,
        cityId: defaultData.city.id,
        bookingPrice: defaultData.bookingPrice,
        morningShiftStart: defaultData.morningShiftStart,
        morningShiftEnd: defaultData.morningShiftEnd,
        nightShiftStart: defaultData.nightShiftStart,
        nightShiftEnd: defaultData.nightShiftEnd,
        hasExtraPrice: defaultData.hasExtraPrice,
        extraNightPrice: defaultData.extraNightPrice,
        teamMembers: defaultData.teamMembers,
        passwordEnabled: defaultData.passwordEnabled,
        password: null,
        position: { lat: defaultData?.lat, lng: defaultData?.lng },
      }
    : {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues: defaultValues,
  });

  const isPasswordEnabled = watch("passwordEnabled");
  const hasExtraPrice = watch("hasExtraPrice");
  // const morningShiftStart = watch("morningShiftStart");
  // const nightShiftStart = watch("nightShiftStart");

  const { mutate: createPlayground, isPending: isCreating } = useCreateField(
    "/create_playground",
    [["single-playground"], ["playgrounds"]]
  );
  const { mutate: updatePlayground, isPending: isUpdating } = useCreateField(
    "/update_playground",
    [["single-playground"], ["playgrounds"]]
  );

  const { isUploading, uploadImageToServer } = useUploadFiles();

  const handleFormSubmittion = (formData) => {
    formData.lat = formData.position.lat;
    formData.lng = formData.position.lng;
    delete formData.position;

    if (!formData.password) delete formData.password;

    const imagesToUpload = formData.images.map((image) => ({
      name: image.name,
      image: image.file,
    }));
    formData.images = formData.images.map(
      (image) => image.supabaseUrl || image.url
    );

    if (isEditForm) {
      updatePlayground(formData, {
        onSuccess: (res) =>
          uploadImageToServer(
            res.data.id,
            imagesToUpload,
            `/dashboard/playgrounds/${res.data.id}`,
            "playgrounds"
          ),
      });
    } else {
      createPlayground(formData, {
        onSuccess: (res) =>
          uploadImageToServer(
            res.data.id,
            imagesToUpload,
            `/dashboard/playgrounds/${res.data.id}`,
            "playgrounds"
          ),
      });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(handleFormSubmittion)}>
      <FormInputsContainer>
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <ImageUploader
              defaultImages={defaultData?.images || []}
              onChange={(option) => field.onChange(option)}
              folderName={"playgrounds"}
            />
          )}
          rules={{
            required: "This field is required",
          }}
        />
        <BasicInput
          inputLabel={"Name"}
          isInputRequired
          type="text"
          inputPlaceHoleder={"Write Here"}
          registering={register("name", {
            required: "This field is required",
          })}
          error={errors?.name?.message}
        />
        <BasicInput
          inputLabel={"Team Members"}
          isInputRequired
          type="number"
          inputPlaceHoleder={"5"}
          registering={register("teamMembers", {
            required: "This field is required",
            min: {
              value: 5,
              message: "Please enter positive number more than or equal to 5",
            },
            max: {
              value: 11,
              message: "Please enter positive number between 0 and 11",
            },
          })}
          error={errors?.teamMembers?.message}
        />

        <BasicInput
          inputLabel={"Price / hour"}
          isInputRequired
          type="number"
          inputPlaceHoleder={"1000"}
          registering={register("bookingPrice", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Please enter positive number",
            },
          })}
          error={errors?.bookingPrice?.message}
        />

        <Flex $gap={16}>
          <BasicInput
            inputLabel="Extra Night Price"
            disabled={!hasExtraPrice}
            type="number"
            inputPlaceHoleder={"15"}
            registering={register("extraNightPrice", {
              required: hasExtraPrice && "This field is required",
              min: {
                value: 0,
                message: "Please enter positive number",
              },
            })}
            error={errors?.extraNightPrice?.message}
          />
          <Controller
            name="hasExtraPrice"
            control={control}
            render={({ field }) => (
              <BasicCheckBox
                id="hasExtraPrice"
                style={{ margin: "auto" }}
                {...field}
                defaultChecked={defaultData?.hasExtraPrice}
              />
            )}
          />
        </Flex>

        <Controller
          name={"morningShiftStart"}
          control={control}
          render={({ field }) => (
            <BasicInput
              isTimeInput
              isInputRequired
              inputLabel={"Morning Shift Start"}
              onChange={(value) => field.onChange(value)}
              defaultValue={field.value}
              error={errors?.morningShiftStart?.message}
            />
          )}
          rules={{
            required: "This Field is required",
          }}
        />
        <Controller
          name={"morningShiftEnd"}
          control={control}
          render={({ field }) => (
            <BasicInput
              isTimeInput
              isInputRequired
              inputLabel={"Morning Shift End"}
              onChange={(value) => field.onChange(value)}
              defaultValue={field.value}
              error={errors?.morningShiftEnd?.message}
            />
          )}
          rules={{
            required: "This Field is required",
            // validate: (value) =>
            //   value > morningShiftStart || "End time must be after start time",
          }}
        />

        <Controller
          name={"nightShiftStart"}
          control={control}
          render={({ field }) => (
            <BasicInput
              isTimeInput
              isInputRequired
              inputLabel={"Night Shift Start"}
              onChange={(value) => field.onChange(value)}
              defaultValue={field.value}
              error={errors?.nightShiftStart?.message}
            />
          )}
          rules={{
            required: "This Field is required",
          }}
        />
        <Controller
          name={"nightShiftEnd"}
          control={control}
          render={({ field }) => (
            <BasicInput
              isTimeInput
              isInputRequired
              inputLabel={"Night Shift End"}
              onChange={(value) => field.onChange(value)}
              defaultValue={field.value}
              error={errors?.nightShiftEnd?.message}
            />
          )}
          rules={{
            required: "This Field is required",
            // validate: (value) =>
            //   value > nightShiftStart || "End time must be after start time",
          }}
        />

        <Flex
          $align="center"
          $gap={16}
          $customStyle={css`
            grid-column: -1 / 1;
          `}
        >
          <BasicInput
            inputLabel="Password"
            disabled={!isPasswordEnabled}
            type="text"
            inputPlaceHoleder="******"
            registering={register("password", {
              required:
                !isEditForm && isPasswordEnabled && "This field is required",
              pattern: {
                value: /^\d{6}$/,
                message: "Password must be exactly 6 digits",
              },
            })}
            error={errors?.password?.message}
          />
          <Controller
            name="passwordEnabled"
            control={control}
            render={({ field }) => (
              <BasicCheckBox
                id="passwordEnabled"
                {...field}
                defaultChecked={defaultData?.passwordEnabled}
              />
            )}
          />
        </Flex>

        <CustomSelect
          inputLabel={"Governorate"}
          isInputRequired={!isEditForm}
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
              value={
                isEditForm && {
                  value: defaultData.city.id,
                  label: defaultData.name,
                }
              }
              onChange={(option) => {
                field.onChange(option.value);
              }}
            />
          )}
          rules={{
            required: "This field is required",
          }}
        />
        <BasicInput
          inputLabel={"Address"}
          isInputRequired
          type="text"
          inputPlaceHoleder={"Write Here"}
          colsToTake={2}
          registering={register("address", {
            required: "This field is required",
          })}
          error={errors?.address?.message}
        />
        <BasicInput
          inputLabel={"Description"}
          isInputRequired
          isTextArea
          colsToTake={2}
          type="text"
          inputPlaceHoleder={"Write Here"}
          registering={register("description", {
            required: "This field is required",
          })}
          error={errors?.description?.message}
        />
        <Controller
          name="position"
          control={control}
          render={({ field }) => (
            <MapInput
              onChange={(option) => field.onChange(option)}
              defaultPosition={
                isEditForm
                  ? [defaultData?.lat, defaultData?.lng]
                  : [25.276987, 55.296249]
              }
              error={errors?.position?.message}
            />
          )}
          rules={{
            required: "This field is required",
          }}
        />
      </FormInputsContainer>
      <Flex $align="center" $gap={16}>
        <FormAcceptButton
          buttonLabel={"Submit"}
          isLoading={isCreating || isUpdating || isUploading}
        />
        <FormCancelButton buttonLabel={"Cancel"} />
      </Flex>
    </FormContainer>
  );
};

export default PlaygroundForm;
