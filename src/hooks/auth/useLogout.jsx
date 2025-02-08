import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("authToken");
    queryClient.invalidateQueries();
    navigate("/login");
  };

  return { logout };
};

export default useLogout;
