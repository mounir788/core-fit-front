import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteField } from "../../api/general/deleteField";
import { showErrorToast, showSuccessToast } from "../../utils/toasts";

const useDelete = (endPoint) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteField(endPoint),
    onSuccess: () => {
      queryClient.refetchQueries();
      showSuccessToast("Deleted Successfully!");
    },
    onError: () =>
      showErrorToast("Something went wrong, please try again later"),
  });
};

export default useDelete;
