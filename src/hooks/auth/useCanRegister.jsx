import { useMutation } from "@tanstack/react-query";
import canRegister from "../../api/auth/canRegister";

const useCanRegister = () => {
  return useMutation({
    mutationFn: (credintial) => canRegister(credintial),

    onError: (error) => {
      console.error("Can register error:", error);
    },
  });
};

export default useCanRegister;
