import { Navigate, useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

function AuthenticatorRoute({ children }) {
  const token = sessionStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const isAuthenticated = decodedToken?.sub;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  if (isAuthenticated) return children;
  if (!isAuthenticated) return <Navigate to={"/login"} replace />;
}

export default AuthenticatorRoute;
