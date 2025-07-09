/* eslint-disable no-unused-vars */

import { createNewField } from "../../api/general/createNewField";
import { useMutation } from "@tanstack/react-query";
import { showSuccessToast } from "../../utils/toasts";

const useForgetPassword = (endPoint) => {
  const createMutation = useMutation({
    mutationFn: (bodyData) => createNewField(bodyData, `/auth/${endPoint}`),

    onSuccess: (res) => {
      showSuccessToast(res?.message);
    },
    onError: (error) => {
      console.error("Forget password error:", error);
    },
  });

  return createMutation;
};

export default useForgetPassword;
