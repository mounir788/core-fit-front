import axios from "axios";
import { isUserLoggedIn } from "../../utils/isUserLoggedIn";

export const createNewField = async (
  fieldData,
  endpoint,
  contentType = "application/json"
) => {
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_IP}${endpoint}`,
    fieldData,
    {
      headers: {
        "Content-Type": contentType,
        Authorization: `Bearer ${isUserLoggedIn()}`,
      },
    }
  );

  // return response
  const data = await response.data;

  return data;
};
