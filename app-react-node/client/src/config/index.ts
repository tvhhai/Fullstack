export const config = {
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api",
    timeout: 5000,
  },
  auth: {
    tokenKey: "auth_token",
    refreshTokenKey: "refresh_token",
  },
};
