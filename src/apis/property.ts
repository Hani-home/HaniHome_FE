import { Property } from "@/types/property";

import { axiosInstance } from "./axios";

export const fetchPropertyList = async (): Promise<Property[]> => {
  const res = await axiosInstance.get("/api/v1/properties");
  console.log(res.data.data);

  return res.data.data;
};

export const fetchPropertyDetailList = async (
  propertyId: string,
): Promise<Property> => {
  const res = await axiosInstance.get(`/api/v1/properties/${propertyId}`);
  return res.data.data;
};
