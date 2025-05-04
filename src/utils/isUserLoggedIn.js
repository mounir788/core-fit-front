import { jwtDecode } from "jwt-decode";

export const isUserLoggedIn = () => {
  const token = sessionStorage.getItem("authToken");
  if (token) {
    return token;
  } else {
    return "";
  }
};

export const getUserId = () => {
  const token = sessionStorage.getItem("authToken");

  const id = token ? jwtDecode(token)?.sub : null;

  return id;
};
