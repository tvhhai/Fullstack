import axios from "axios";
import { config } from "../config";
import { startLoading, stopLoading } from "../store/loadingSlice";
import type { Store } from "@reduxjs/toolkit";

export const api = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  withCredentials: true,
});

export function setupInterceptors(store: Store) {
  api.interceptors.request.use(
    (requestConfig) => {
      store.dispatch(startLoading());
      return requestConfig;
    },
    (error) => {
      store.dispatch(stopLoading());
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    async (response) => {
      // Skip delay for auth endpoints to improve LCP
      if (!response.config.url?.includes('/auth/')) {
        await new Promise((r) => setTimeout(r, 500)); // DEV: fake delay
      }
      store.dispatch(stopLoading());
      return response;
    },
    async (error) => {
      // Skip delay for auth endpoints to improve LCP
      if (!error.config?.url?.includes('/auth/')) {
        await new Promise((r) => setTimeout(r, 500)); // DEV: fake delay
      }
      store.dispatch(stopLoading());
      const message =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";

      // Normalize error so .unwrap() in thunks gets a readable message
      return Promise.reject(new Error(message));
    },
  );
}
