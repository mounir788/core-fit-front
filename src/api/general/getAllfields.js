import axios from "axios";
import { isUserLoggedIn } from "../../utils/isUserLoggedIn";

export const getAllFields = async (endpoint, params, haveParams = true) => {
  // const options = {};

  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_IP}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${isUserLoggedIn()}`,
      },
      params: haveParams
        ? {
            ...params,
            page: params.page ? params.page - 1 : 1,
            size: params.size ? params.size : 10,
          }
        : undefined,
    }
  );

  // return response
  const data = await response.data;

  return data;
};
