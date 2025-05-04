import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import register from "../../api/auth/register";

const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credintial) => register(credintial),
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      console.error("Register error:", error);
    },
  });
};

export default useRegister;
