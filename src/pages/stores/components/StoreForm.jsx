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
import { useNavigate, useParams } from "react-router";
import CustomSelect from "../../../components/CustomSelect";
import useGetAllCategories from "../../../hooks/markets/useGetAllCategories";
import ProfileImageInput from "../../../components/ProfileImageInput";
import MapInput from "../../../components/MapInput";

const StoreForm = ({ isEditForm = false, defaultData = {} }) => {
  const { data: categories } = useGetAllCategories();
  const categoriesList = categories?.data?.categories?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));
  const defaultValues = isEditForm
    ? {
        id: defaultData.id,
        image: defaultData?.imageUrl,
        name: defaultData.name,
        description: defaultData.description,
        address: defaultData.address,
        categoryId: defaultData.category.id,
        position: { lat: defaultData?.lat, lng: defaultData?.lng },
      }
    : {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: defaultValues,
  });
  const { mutate: createMarket, isPending: isCreating } = useCreateField(
    "/add_market",
    [["single-market"], ["markets"]],
    "multipart/form-data"
  );
  const { mutate: updateMarket, isPending: isUpdating } = useCreateField(
    "/edit_market",
    [["single-market"], ["markets"]],
    "multipart/form-data"
  );

  const { storeId } = useParams();
  const navigate = useNavigate();

  const handleFormSubmittion = (formData) => {
    // formData.image = formData.image.map((image) => image.file || image.url);
    formData.lat = formData.position.lat;
    formData.lng = formData.position.lng;
    delete formData.position;

    if (typeof formData.image === "string") delete formData.image;

    if (isEditForm) {
      updateMarket(formData, {
        onSuccess: () => navigate(`/dashboard/stores/${storeId}`),
      });
    } else {
      createMarket(formData, {
        onSuccess: (res) => navigate(`/dashboard/stores/${res.data.Market.id}`),
      });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(handleFormSubmittion)}>
      <FormInputsContainer>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <ProfileImageInput
              radius={"8px"}
              name={"image"}
              defaultImage={defaultData?.imageUrl}
              setValue={(option) => field.onChange(option)}
              error={errors?.image?.message}
            />
          )}
          rules={{
            required: "This field is required",
          }}
        />
        <BasicInput
          inputLabel={"Store Name"}
          isInputRequired
          type="text"
          inputPlaceHoleder={"Write Here"}
          registering={register("name", {
            required: "This field is required",
          })}
          error={errors?.name?.message}
        />
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <CustomSelect
              inputLabel={"Category"}
              isInputRequired
              error={errors?.categoryId?.message}
              options={categoriesList}
              defaultValue={
                isEditForm
                  ? {
                      value: defaultData?.category?.id,
                      label: defaultData?.category?.name,
                    }
                  : null
              }
              onChange={(option) => field.onChange(option.value)}
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
          isLoading={isCreating || isUpdating}
        />
        <FormCancelButton buttonLabel={"Cancel"} />
      </Flex>
    </FormContainer>
  );
};

export default StoreForm;
