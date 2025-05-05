import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("authToken");
    queryClient.invalidateQueries();
    navigate("/login");
  };

  return { logout };
};

export default useLogout;
