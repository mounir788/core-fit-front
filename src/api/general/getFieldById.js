import axios from "axios";
import { isUserLoggedIn } from "../../utils/isUserLoggedIn";

export const getFieldById = async (endPoint) => {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_IP}${endPoint}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${isUserLoggedIn()}`,
      },
    }
  );

  // return response
  const data = await response.data;

  return data;
};
