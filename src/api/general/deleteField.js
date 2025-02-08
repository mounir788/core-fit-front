import axios from "axios";
import { isUserLoggedIn } from "../../utils/isUserLoggedIn";

export const deleteField = async (endPoint) => {
  // const options = {};
  //

  const response = await axios.delete(
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
  //
  return data;
};
