import { api } from "../api/axios";
import type { LoginPayload, LoginResponse, User } from "../types/auth";

class AuthService {
  async login(credentials: LoginPayload): Promise<User> {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials);
    
    if (data.status !== "success" || !data.data) {
      throw new Error(data.message || "Login failed");
    }
    
    return data.data.user;
  }

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data } = await api.get<LoginResponse>("/auth/me");
      
      if (data.status !== "success" || !data.data) {
        throw new Error(data.message || "Failed to get user");
      }
      
      return data.data.user;
    } catch (error) {
      // Return null if not authenticated
      if (error instanceof Error && error.message.includes("401")) {
        return null;
      }
      throw error;
    }
  }
}

export const authService = new AuthService();
