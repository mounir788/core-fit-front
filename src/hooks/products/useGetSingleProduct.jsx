import { useQuery } from "@tanstack/react-query";
import { getFieldById } from "../../api/general/getFieldById";
import { useParams } from "react-router";

const useGetSingleProduct = (id, isEnabled = false) => {
  const { productId } = useParams();

  const finalId = productId || id;

  return useQuery({
    queryKey: ["single-product", finalId, isEnabled],
    queryFn: () => getFieldById(`/products/find_by_id?id=${finalId}`),
    enabled: isEnabled,
  });
};

export default useGetSingleProduct;
