import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewField } from "../../api/general/createNewField";
import { showErrorToast, showSuccessToast } from "../../utils/toasts";

const useCreateField = (endPoint, onSuccess, onError) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => createNewField(formData, endPoint),
    onSuccess: () => {
      onSuccess?.();
      showSuccessToast();
      queryClient.refetchQueries();
    },
    onError: (error) => {
      onError?.();
      showErrorToast(error);
    },
  });
};

export default useCreateField;
