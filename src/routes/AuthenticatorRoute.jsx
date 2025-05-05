import { Navigate, useLocation } from "react-router";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

function AuthenticatorRoute({ children }) {
  const token = Cookies.get("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const isAuthenticated = !!decodedToken?.sub;

  const location = useLocation();

  if (!isAuthenticated) {
    // Save the current location to sessionStorage
    sessionStorage.setItem(
      "redirectAfterLogin",
      location.pathname + location.search
    );
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AuthenticatorRoute;
