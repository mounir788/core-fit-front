import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { getAllFields } from "../../api/general/getAllfields";

const useGetOrders = (status = "current") => {
  const { storeId } = useParams();
  const [searchParams] = useSearchParams();

  const params = Object.fromEntries(searchParams.entries());
  delete params.subCategoryId;
  const stringifiedParams = JSON.stringify(params);

  return useQuery({
    queryKey: [`${status}-orders`, storeId, status, stringifiedParams],
    queryFn: () =>
      getAllFields(`/orders?status=${status}&marketId=${storeId}`, params),
  });
};

export default useGetOrders;
