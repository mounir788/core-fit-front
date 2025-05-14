import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getAllFields } from "../../api/general/getAllfields";

const useGetAllPlaygrounds = () => {
  const [searchParams] = useSearchParams();

  const params = Object.fromEntries(searchParams.entries());
  delete params.subCategoryId;
  const stringifiedParams = JSON.stringify(params);

  return useQuery({
    queryKey: ["playgrounds", stringifiedParams],
    queryFn: () => getAllFields("/playgrounds", params),
  });
};

export default useGetAllPlaygrounds;
