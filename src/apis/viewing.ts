import { axiosInstance } from "@/apis/axios";

import {
  MyViewingDates,
  ViewingItem,
  ViewingTime,
  ViewingViewType,
} from "@/types/viewing";

export const getMyViewingList = async <T>(
  view: ViewingViewType,
): Promise<T> => {
  const res = await axiosInstance.get<{
    serviceCode: string;
    message: string;
    data: T;
    success: boolean;
  }>(`/api/v1/viewings/my-viewings?view=${view}`);

  return res.data.data;
};

export const getViewingList = async (): Promise<ViewingItem[]> => {
  const res = await axiosInstance.get("/api/v1/viewings/my-viewings/dates");
  return res.data;
};

export const getViewingAvailableDates = async (
  propertyId: number,
): Promise<Record<string, ViewingTime[]>> => {
  const res = await axiosInstance.get(
    `/api/v1/properties/${propertyId}/viewing-available-dates`,
  );
  return res.data.data;
};

export const getMyViewingDates = async (
  status: "REQUESTED" | "CANCELLED" | "COMPLETED",
) => {
  const res = await axiosInstance.get<{ data: MyViewingDates }>(
    "/api/v1/viewings/my-viewings/dates",
    {
      params: { status },
    },
  );
  return res.data;
};

export const createViewing = async (body: {
  propertyId: number;
  preferredTimes: string[];
}) => {
  const res = await axiosInstance.post("/api/v1/viewings", body);
  return res.data;
};

export const cancelViewing = async (
  viewingId: number,
  payload: { optionItemId: number; reason: string },
) => {
  return axiosInstance.put(`/api/v1/viewings/${viewingId}/cancel`, {
    viewingId,
    allOptionItemIds: [payload.optionItemId],
    reason: payload.reason,
  });
};

export const getViewingCancelReason = async (viewingId: number) => {
  const res = await axiosInstance.get(`/api/v1/viewings/${viewingId}/cancel`);

  return res.data.data as {
    viewingId: number;
    cancelReasonOptionItemIds: number[];
    reason: string;
  };
};
