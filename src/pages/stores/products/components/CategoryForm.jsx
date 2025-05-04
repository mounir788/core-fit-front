import { useForm } from "react-hook-form";
import useCreateField from "../../../../hooks/general/useCreateField";
import { useDetectChanges } from "../../../../hooks/general/useDetectChanges";
import {
  PopupButtonsContainer,
  PopupFormContainer,
  PopupFormInputsContainer,
  PopupFormTitle,
} from "../../../../styles/generalStyles";
import BasicInput from "../../../../components/BasicInput";
import FormCancelButton from "../../../../components/FormCancelButton";
import FormAcceptButton from "../../../../components/FormAcceptButton";
import { useParams } from "react-router";

const CategoryForm = ({
  isEditForm = false,
  defaultData = {},
  onCloseModal,
}) => {
  const { storeId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultData,
    mode: "all",
  });

  const { mutate: updateCategory, isPending: isUpdating } = useCreateField(
    `/edit_sub_category`,
    [["sub-categories"]]
  );

  const { mutate: createCategory, isPending: isCreating } = useCreateField(
    `/add_sub_category`,
    [["sub-categories"]]
  );

  const { detectChanges } = useDetectChanges();

  const handleFormSubmittion = (formData) => {
    const changedFields = detectChanges(formData, defaultData);

    if (!changedFields) return;

    if (isEditForm) {
      updateCategory(
        { ...changedFields, id: defaultData.id },
        {
          onSuccess: () => onCloseModal?.(),
        }
      );
    } else {
      createCategory(
        { ...formData, marketId: storeId },
        {
          onSuccess: () => onCloseModal?.(),
        }
      );
    }
  };

  const cancelTheForm = () => {
    onCloseModal?.();
  };

  return (
    <PopupFormContainer onSubmit={handleSubmit(handleFormSubmittion)}>
      <PopupFormTitle>
        {isEditForm ? "Update Category" : "Add Category"}
      </PopupFormTitle>
      <PopupFormInputsContainer>
        <BasicInput
          inputLabel={"Category Name"}
          isInputRequired
          type="text"
          colsToTake={2}
          inputPlaceHoleder={"Write Here"}
          registering={register("name", {
            required: "This field is required",
          })}
          error={errors?.name?.message}
        />

        <PopupButtonsContainer>
          <FormAcceptButton
            buttonLabel={"Submit"}
            isLoading={isUpdating || isCreating}
          />
          <FormCancelButton buttonLabel={"Cancel"} action={cancelTheForm} />
        </PopupButtonsContainer>
      </PopupFormInputsContainer>
    </PopupFormContainer>
  );
};

export default CategoryForm;
