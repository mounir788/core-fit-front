import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteField } from "../../api/general/deleteField";
import { showErrorToast, showSuccessToast } from "../../utils/toasts";

const useDelete = (endPoint, invalidationArr = []) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteField(`${endPoint}?id=${id}`),
    onSuccess: () => {
      showSuccessToast("Deleted Successfully!");
      if (invalidationArr.length) {
        invalidationArr.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
    },
    onError: () =>
      showErrorToast("Something went wrong, please try again later"),
  });
};

export default useDelete;
