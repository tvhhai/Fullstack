import { api } from "./axios";
import type { LoginResponse } from "../types/auth.ts";


export const loginApi = (email: string, password: string) =>
    api.post<LoginResponse>("/auth/login", { email, password });
