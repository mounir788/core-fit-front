import { useQuery } from "@tanstack/react-query";
import { getAllFields } from "../../api/general/getAllfields";

const useGetstatistics = () => {
  const monthNumber = new Date().getMonth() + 1;
  return useQuery({
    queryKey: ["statistics", monthNumber],
    queryFn: () =>
      getAllFields(`/provider_statistics?month=${monthNumber}`, null, false),
  });
};

export default useGetstatistics;
