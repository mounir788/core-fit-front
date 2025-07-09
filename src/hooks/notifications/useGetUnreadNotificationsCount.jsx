import { useQuery } from "@tanstack/react-query";
import { getAllFields } from "../../api/general/getAllfields";

const useGetUnreadNotificationsCount = () => {
  return useQuery({
    queryKey: ["unread-notifications-count"],
    queryFn: () => getAllFields(`/notifications/unread-count`, null, false),
  });
};

export default useGetUnreadNotificationsCount;
