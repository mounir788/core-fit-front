import axios from "axios";

const canRegister = async (credentials) => {
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_IP}/auth/can_register`,
    credentials
  );

  // return response
  const data = await response.data;
  return data;
};

export default canRegister;
