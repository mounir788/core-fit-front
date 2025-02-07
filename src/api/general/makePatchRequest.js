import axios from "axios";
import { isUserLoggedIn } from "../../utils/isUserLoggedIn";

export const makePatchRequest = async (fieldData, endpoint) => {
  // const options = {};

  const response = await axios.patch(
    `${import.meta.env.VITE_SERVER_IP}${endpoint}`,
    fieldData,
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
