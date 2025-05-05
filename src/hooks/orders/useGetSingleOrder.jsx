import { useQuery } from "@tanstack/react-query";
import { getFieldById } from "../../api/general/getFieldById";
import { useParams } from "react-router";

const useGetSingleOrder = (id) => {
  const { orderId } = useParams();

  const finalId = orderId || id;

  return useQuery({
    queryKey: ["single-order", finalId],
    queryFn: () => getFieldById(`/order?orderId=${finalId}`),
    // enabled: isEnabled,
  });
};

export default useGetSingleOrder;
