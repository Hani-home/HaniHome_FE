import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  config => {
    const isAuthRequest =
      config.url?.includes("api/v1/auth/social/login") ||
      config.url?.includes("api/v1/auth/refresh");

    if (!isAuthRequest) {
      const token = useAuthStore.getState().accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => {
    const authHeader = response.headers["authorization"];
    if (authHeader?.startsWith("Bearer ")) {
      const newToken = authHeader.split(" ")[1];
      useAuthStore.getState().setAccessToken(newToken);
    }
    return response;
  },
  async error => {
    const originalRequest = error.config;

    const resData = error.response?.data;

    const isTokenExpired =
      error.response?.status === 400 &&
      (resData?.serviceCode === "ACCESS_TOKEN_EXPIRED" ||
        resData?.data?.codeName === "ACCESS_TOKEN_EXPIRED");

    if (isTokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axiosInstance.post(
          "/api/v1/auth/refresh",
        );

        const newAuthHeader = refreshResponse.headers["authorization"];
        if (newAuthHeader?.startsWith("Bearer ")) {
          const newToken = newAuthHeader.split(" ")[1];
          useAuthStore.getState().setAccessToken(newToken);

          // 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
