import { useQuery } from "@tanstack/react-query";

import { getMyViewingList } from "@/apis/viewing";

export const useMyViewingList = () => {
  return useQuery({
    queryKey: ["myViewingList"],
    queryFn: getMyViewingList,
  });
};
