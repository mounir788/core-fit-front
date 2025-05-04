import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getAllFields } from "../../api/general/getAllfields";

const useGetAllCategories = () => {
  const { storeId } = useParams();

  return useQuery({
    queryKey: ["sub-categories", storeId],
    queryFn: () =>
      getAllFields(`/sub_categories`, {
        marketId: storeId,
      }),
  });
};

export default useGetAllCategories;
