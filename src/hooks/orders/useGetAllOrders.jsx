import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { getAllFields } from "../../api/general/getAllfields";

const useGetAllOrders = () => {
  const { storeId } = useParams();
  const [searchParams] = useSearchParams();

  const params = Object.fromEntries(searchParams.entries());
  delete params.subCategoryId;
  const stringifiedParams = JSON.stringify(params);

  return useQuery({
    queryKey: ["orders", storeId, stringifiedParams],
    queryFn: () => getAllFields(`/orders?marketId=${storeId}`, params),
  });
};

export default useGetAllOrders;
