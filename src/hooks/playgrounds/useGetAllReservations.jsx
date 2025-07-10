import { useQuery } from "@tanstack/react-query";
import { getAllFields } from "../../api/general/getAllfields";
import { useParams } from "react-router";

const useGetAllReservations = () => {
  const { playgroundId } = useParams();
  return useQuery({
    queryKey: ["reservations", playgroundId],
    queryFn: () =>
      getAllFields(
        `/reservations/playground?playgroundId=${playgroundId}`,
        null,
        false
      ),
  });
};

export default useGetAllReservations;
