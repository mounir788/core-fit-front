import axios from "axios";

const register = async (credentials) => {
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_IP}/auth/register`,
    credentials,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  // return response
  const data = await response.data;
  return data;
};

export default register;
