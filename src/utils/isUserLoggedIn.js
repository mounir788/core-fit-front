import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const isUserLoggedIn = () => {
  const token = Cookies.get("authToken");
  if (token) {
    return token;
  } else {
    return "";
  }
};

export const getUserId = () => {
  const token = Cookies.get("authToken");

  const id = token ? jwtDecode(token)?.sub : null;

  return id;
};
