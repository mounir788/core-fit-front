import { useQuery } from "@tanstack/react-query";
import { getAllFields } from "../../api/general/getAllfields";
import { getUserId } from "../../utils/isUserLoggedIn";

const useGetProfileData = () => {
  const id = getUserId();

  return useQuery({
    queryKey: ["profile", id],
    queryFn: () => getAllFields(`/profile?id=${id}`, null, false),
  });
};

export default useGetProfileData;
