import { useQuery } from "@tanstack/react-query";
import { getAllFields } from "../../api/general/getAllfields";

const useGetGovernrates = () => {
  return useQuery({
    queryKey: ["governorates"],
    queryFn: () => getAllFields("/governorates", null, false),
  });
};

export default useGetGovernrates;
