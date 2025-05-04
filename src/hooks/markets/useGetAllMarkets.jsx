import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getAllFields } from "../../api/general/getAllfields";

const useGetAllMarkets = () => {
  const [searchParams] = useSearchParams();

  const params = Object.fromEntries(searchParams.entries());
  delete params.subCategoryId;
  const stringifiedParams = JSON.stringify(params);

  return useQuery({
    queryKey: ["markets", stringifiedParams],
    queryFn: () => getAllFields("/markets", params),
  });
};

export default useGetAllMarkets;
