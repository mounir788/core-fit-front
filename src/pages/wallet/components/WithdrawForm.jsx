import { useForm, Controller } from "react-hook-form";
import FormAcceptButton from "../../../components/FormAcceptButton";
import FormCancelButton from "../../../components/FormCancelButton";
import {
  PopupButtonsContainer,
  PopupFormContainer,
  PopupFormInputsContainer,
  PopupFormTitle,
} from "../../../styles/generalStyles";
import useCreateField from "../../../hooks/general/useCreateField";
import BasicInput from "../../../components/BasicInput";
import CustomSelect from "../../../components/CustomSelect";

const withdrawalOptions = [
  { value: "vodafone", label: "Vodafone Cash" },
  { value: "paypal", label: "PayPal" },
];

const WithdrawForm = ({ onCloseModal, maxAmount }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm();
  const { mutate: withdraw, isPending } = useCreateField(`/wallet/withdraw`, [
    ["wallet-balance"],
    ["transactions"],
  ]);

  const selectedMethod = watch("withdrawalMethod");

  const submitForm = (formData) => {
    withdraw(formData, {
      onSuccess: () => onCloseModal?.(),
    });
  };

  const cancelTheForm = () => {
    onCloseModal?.();
  };
  return (
    <PopupFormContainer onSubmit={handleSubmit(submitForm)}>
      <PopupFormTitle>Withdraw</PopupFormTitle>
      <PopupFormInputsContainer>
        <BasicInput
          inputLabel="Amount"
          type="number"
          inputPlaceHoleder={"150 EGP"}
          isInputRequired
          registering={register("amount", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Please enter positive number greater than 1 EGP",
            },
            max: {
              value: maxAmount,
              message: `Maximum available amount is ${maxAmount}`,
            },
          })}
          error={errors?.amount?.message}
        />
        <Controller
          name="withdrawalMethod"
          control={control}
          rules={{ required: "Please select a withdrawal method" }}
          render={({ field }) => (
            <CustomSelect
              inputLabel="Withdrawal Method"
              options={withdrawalOptions}
              value={
                withdrawalOptions.find((opt) => opt.value === field.value) ||
                null
              }
              onChange={(option) => field.onChange(option?.value)}
              error={errors?.withdrawalMethod?.message}
              isInputRequired
            />
          )}
        />
        {selectedMethod === "paypal" && (
          <BasicInput
            inputLabel="PayPal Email"
            type="email"
            inputPlaceHoleder={"your@email.com"}
            isInputRequired
            colsToTake={2}
            registering={register("paypalEmail", {
              required: "PayPal email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            error={errors?.paypalEmail?.message}
          />
        )}
        {selectedMethod === "vodafone" && (
          <BasicInput
            inputLabel="Vodafone Cash Phone Number"
            type="tel"
            isInputRequired
            inputPlaceHoleder={"01XXXXXXXXX"}
            colsToTake={2}
            registering={register("vodafonePhone", {
              required: "Phone number is required",
              pattern: {
                value: /^01[0-9]{9}$/,
                message: "Enter a valid Egyptian phone number",
              },
            })}
            error={errors?.vodafonePhone?.message}
          />
        )}
      </PopupFormInputsContainer>
      <PopupButtonsContainer>
        <FormCancelButton buttonLabel={"Cancel"} action={cancelTheForm} />
        <FormAcceptButton buttonLabel={"Submit"} isLoading={isPending} />
      </PopupButtonsContainer>
    </PopupFormContainer>
  );
};

export default WithdrawForm;
