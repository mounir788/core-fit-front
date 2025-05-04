import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../utils/toasts";
import { updateField } from "../../api/general/updateField";

const useUpdateField = (endPoint, invalidationArr = [], contentType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => updateField(formData, endPoint, contentType),
    onSuccess: () => {
      showSuccessToast();
      if (invalidationArr.length) {
        invalidationArr.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
    },
    onError: (error) => {
      showErrorToast(error);
    },
  });
};

export default useUpdateField;
