import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthState, LoginPayload } from "../types/auth";
import { authService } from "../services/authService";
import { STORAGE_KEYS, CACHE_TTL } from "../constants";

function getCachedUser() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.AUTH_CACHE);
    if (!raw) return null;
    const { user, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_TTL.AUTH) {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH_CACHE);
      return null;
    }
    return user;
  } catch {
    return null;
  }
}

function setCachedUser(user: unknown) {
  sessionStorage.setItem(
    STORAGE_KEYS.AUTH_CACHE,
    JSON.stringify({ user, timestamp: Date.now() }),
  );
}

function clearCachedUser() {
  sessionStorage.removeItem(STORAGE_KEYS.AUTH_CACHE);
}

const cachedUser = getCachedUser();

const initialState: AuthState = {
  user: cachedUser,
  loading: !cachedUser,
  error: null,
};

// Async thunks
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    const cached = getCachedUser();
    if (cached) return cached;

    try {
      const user = await authService.getCurrentUser();
      if (user) {
        setCachedUser(user);
        return user;
      }
      return rejectWithValue("Not authenticated");
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Authentication failed");
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const user = await authService.login(payload);
      setCachedUser(user);
      return user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Login failed");
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      clearCachedUser();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Logout failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        if (!state.user) state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.loading = false;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
