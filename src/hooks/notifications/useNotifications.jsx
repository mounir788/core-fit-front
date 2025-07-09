import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { isUserLoggedIn } from "../../utils/isUserLoggedIn";

const fetchNotifications = async ({ pageParam = 1 }) => {
  const res = await axios.get(
    `${import.meta.env.VITE_SERVER_IP}/notifications?page=${pageParam}&size=8`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${isUserLoggedIn()}`,
      },
    }
  );
  const { data } = res.data;
  return {
    ...data,
    currentPage: pageParam,
  };
};

export function useNotifications() {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
  });
}
