import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { getAllFields } from "../../api/general/getAllfields";

const useGetAllProducts = () => {
  const [searchParams] = useSearchParams();
  const { storeId } = useParams();

  const params = Object.fromEntries(searchParams.entries());
  const stringifiedParams = JSON.stringify(params);

  return useQuery({
    queryKey: ["products", storeId, stringifiedParams],
    queryFn: () => getAllFields(`/products?marketId=${storeId}`, params),
  });
};

export default useGetAllProducts;
