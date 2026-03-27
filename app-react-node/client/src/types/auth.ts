import type { User } from "./user.ts";

// Generic backend response wrapper
export interface ApiResponse<T = unknown> {
  status: "success" | "fail" | "error";
  message?: string;
  data?: T;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export type LoginResponse = ApiResponse<{ user: User }>;

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
