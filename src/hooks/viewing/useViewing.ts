import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  cancelViewing,
  getMyViewingDates,
  getMyViewingList,
  getViewingAvailableDates,
} from "@/apis/viewing";

import { ViewingStatus, ViewingViewType } from "@/types/viewing";

interface UseMyViewingListOptions {
  view?: ViewingViewType;
  enabled?: boolean;
}

export const useMyViewingList = <T>({
  view = "DEFAULT",
  enabled = true,
}: UseMyViewingListOptions = {}) => {
  return useQuery<T>({
    queryKey: ["myViewingList", view],
    queryFn: () => getMyViewingList<T>(view),
    enabled,
  });
};

export const useViewingAvailableDates = (propertyId: number) => {
  return useQuery({
    queryKey: ["viewingAvailableDates", propertyId],
    queryFn: () => getViewingAvailableDates(propertyId),
  });
};

export const useMyViewingDates = (status: ViewingStatus) => {
  return useQuery({
    queryKey: ["myViewingDates", status],
    queryFn: () => getMyViewingDates(status),
    select: res => res.data,
  });
};

export const useCancelViewing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      viewingId,
      optionItemId,
      reason,
    }: {
      viewingId: number;
      optionItemId: number;
      reason: string;
    }) => cancelViewing(viewingId, { optionItemId, reason }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myViewingList"] });
    },
  });
};
