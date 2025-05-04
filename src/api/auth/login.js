import axios from "axios";

const loginApi = async (credentials) => {
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_IP}/auth/login`,
    credentials
  );

  // return response
  const data = await response.data;
  return data;
};

export default loginApi;
