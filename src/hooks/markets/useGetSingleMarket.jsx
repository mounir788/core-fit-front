import { useQuery } from "@tanstack/react-query";
import { getFieldById } from "../../api/general/getFieldById";
import { useParams } from "react-router";

const useGetSingleMarket = (id, isEnabled = false) => {
  const { storeId } = useParams();

  const finalId = storeId || id;

  return useQuery({
    queryKey: ["single-market", finalId, isEnabled],
    queryFn: () => getFieldById(`/find_market?id=${finalId}`),
    enabled: isEnabled,
  });
};

export default useGetSingleMarket;
