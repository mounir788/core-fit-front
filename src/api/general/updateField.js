import axios from "axios";
import { isUserLoggedIn } from "../../utils/isUserLoggedIn";

export const updateField = async (
  fieldData,
  endpoint,
  contentType = "application/json"
) => {
  const response = await axios.put(
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
