import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../utils/toasts";
import { updateField } from "../../api/general/updateField";

const useUpdateField = (endPoint, onSuccess, onError) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => updateField(formData, endPoint),
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

export default useUpdateField;
