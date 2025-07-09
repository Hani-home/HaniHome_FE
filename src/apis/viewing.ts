import { axiosInstance } from "@/apis/axios";

import { ViewingItem } from "@/types/viewing";

export const getMyViewingList = async (): Promise<ViewingItem[]> => {
  const res = await axiosInstance.get("/api/v1/viewings/my-viewings");
  return res.data;
};

export const getViewingList = async (): Promise<ViewingItem[]> => {
  const res = await axiosInstance.get("/api/v1/viewings/my-viewings/dates");
  return res.data;
};
