import { Controller, useForm } from "react-hook-form";
import {
  Flex,
  FormContainer,
  FormInputsContainer,
} from "../../../../styles/generalStyles";
import BasicInput from "../../../../components/BasicInput";
import FormAcceptButton from "../../../../components/FormAcceptButton";
import FormCancelButton from "../../../../components/FormCancelButton";
import useCreateField from "../../../../hooks/general/useCreateField";
import { useNavigate, useParams } from "react-router";
import ImageUploader from "../../../../components/ImageUploader";
import CustomSelect from "../../../../components/CustomSelect";
import useGetAllCategories from "../../../../hooks/products/useGetAllCategories";

const ProductForm = ({ isEditForm = false, defaultData = {} }) => {
  const { data: categories } = useGetAllCategories();
  const categoriesList = categories?.data?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));
  const defaultValues = isEditForm
    ? {
        id: defaultData.id,
        name: defaultData.name,
        description: defaultData.description,
        price: defaultData.price,
        offer: defaultData.offer,
        subCategoryId: defaultData.subCategory.id,
        images: defaultData.images,
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
  const { mutate: createProduct, isPending: isCreating } = useCreateField(
    "/products/add_product",
    [["single-product"], ["products"]],
    "multipart/form-data"
  );
  const { mutate: updateProduct, isPending: isUpdating } = useCreateField(
    "/products/edit_product",
    [["single-product"], ["products"]],
    "multipart/form-data"
  );

  const { storeId } = useParams();
  const navigate = useNavigate();

  const handleFormSubmittion = (formData) => {
    formData.images = formData.images.map((image) => image.file || image.url);

    if (isEditForm) {
      updateProduct(
        { ...formData, marketId: storeId },
        {
          onSuccess: () =>
            navigate(`/dashboard/stores/${storeId}/products/${defaultData.id}`),
        }
      );
    } else {
      createProduct(
        { ...formData, marketId: storeId },
        {
          onSuccess: (res) =>
            navigate(`/dashboard/stores/${storeId}/products/${res.data.id}`),
        }
      );
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
            />
          )}
          rules={{
            required: "This field is required",
          }}
        />
        <BasicInput
          inputLabel={"Product Name"}
          isInputRequired
          type="text"
          inputPlaceHoleder={"Write Here"}
          registering={register("name", {
            required: "This field is required",
          })}
          error={errors?.name?.message}
        />
        <Controller
          name="subCategoryId"
          control={control}
          render={({ field }) => (
            <CustomSelect
              inputLabel={"Category"}
              isInputRequired
              error={errors?.subCategoryId?.message}
              options={categoriesList}
              defaultValue={
                isEditForm
                  ? {
                      value: defaultData?.subCategory?.id,
                      label: defaultData?.subCategory?.name,
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
          inputLabel={"Price"}
          isInputRequired
          type="number"
          inputPlaceHoleder={"1000"}
          registering={register("price", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Please enter positive number",
            },
          })}
          error={errors?.price?.message}
        />
        <BasicInput
          inputLabel={"Offer"}
          isInputRequired
          type="number"
          inputPlaceHoleder={"50%"}
          registering={register("offer", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Please enter positive number",
            },
            max: {
              value: 100,
              message: "Please enter positive number between 0 and 100",
            },
          })}
          error={errors?.offer?.message}
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

export default ProductForm;
