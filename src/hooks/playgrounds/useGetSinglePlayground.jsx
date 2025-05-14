import { useQuery } from "@tanstack/react-query";
import { getFieldById } from "../../api/general/getFieldById";
import { useParams } from "react-router";

const useGetSinglePlayground = (id, isEnabled = false) => {
  const { playgroundId } = useParams();

  const finalId = playgroundId || id;

  return useQuery({
    queryKey: ["single-playground", finalId, isEnabled],
    queryFn: () => getFieldById(`/playground?id=${finalId}`),
    enabled: isEnabled,
  });
};

export default useGetSinglePlayground;
