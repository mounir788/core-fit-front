import { useQuery } from "@tanstack/react-query";
import { getAllFields } from "../../api/general/getAllfields";

const useGetWalletBalance = () => {
  return useQuery({
    queryKey: ["wallet-balance"],
    queryFn: () => getAllFields(`/wallet`, null, false),
  });
};

export default useGetWalletBalance;
