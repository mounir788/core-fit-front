import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewField } from "../../api/general/createNewField";
import { showErrorToast, showSuccessToast } from "../../utils/toasts";

const useCreateField = (endPoint, invalidationArr = [], contentType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => createNewField(formData, endPoint, contentType),
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

export default useCreateField;
