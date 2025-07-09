import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getAllFields } from "../../api/general/getAllfields";

const useGetAllTransactions = () => {
  const [searchParams] = useSearchParams();

  const params = Object.fromEntries(searchParams.entries());
  delete params.subCategoryId;
  const stringifiedParams = JSON.stringify(params);

  return useQuery({
    queryKey: ["transactions", stringifiedParams],
    queryFn: () => getAllFields(`/wallet/transactions`, params),
  });
};

export default useGetAllTransactions;
