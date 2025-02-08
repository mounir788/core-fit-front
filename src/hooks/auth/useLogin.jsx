import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import loginApi from "../../api/auth/login";

const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credintial) => loginApi(credintial),
    onSuccess: (data) => {
      // Handle successful login, save token
      sessionStorage.setItem("authToken", data.token);

      navigate("/");
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
};

export default useLogin;
