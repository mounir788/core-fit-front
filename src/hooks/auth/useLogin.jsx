import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import loginApi from "../../api/auth/login";
import Cookies from "js-cookie";

const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credintial) => loginApi(credintial),
    onSuccess: (data) => {
      // Handle successful login, save token
      Cookies.set("authToken", data.data.token);

      // Get saved path or fallback to /dashboard
      const redirectPath =
        sessionStorage.getItem("redirectAfterLogin") || "/dashboard";
      sessionStorage.removeItem("redirectAfterLogin"); // cleanup

      navigate(redirectPath, { replace: true });
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
};

export default useLogin;
