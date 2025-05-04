import { useQuery } from "@tanstack/react-query";
import { getAllFields } from "../../api/general/getAllfields";

const useGetCities = (id) => {
  return useQuery({
    queryKey: ["cities", id],
    queryFn: () => getAllFields(`/cities?governorate_id=${id}`, null, false),
    enabled: !!id,
  });
};

export default useGetCities;
