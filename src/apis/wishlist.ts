import { axiosInstance } from "./axios";

export const addWish = async (propertyId: number) => {
  await axiosInstance.post("/api/v1/wish-items", {
    targetType: "PROPERTY",
    targetId: propertyId,
  });
};

export const removeWish = async (propertyId: number) => {
  await axiosInstance.delete(`/api/v1/wish-items`, {
    data: {
      targetType: "PROPERTY",
      targetId: propertyId,
    },
  });
};
