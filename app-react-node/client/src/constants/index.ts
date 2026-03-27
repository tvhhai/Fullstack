// Storage Keys
export const STORAGE_KEYS = {
  AUTH_CACHE: "auth_cache",
  TOKEN: "auth_token",
  PREFERENCES: "user_preferences",
} as const;

// Cache TTL
export const CACHE_TTL = {
  AUTH: 5 * 60 * 1000, // 5 minutes
  USER: 10 * 60 * 1000, // 10 minutes
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    ME: "/auth/me",
  },
  COUNTER: {
    BASE: "/counter",
    INCREMENT: "/counter/increment",
  },
  USER: {
    BASE: "/user",
  },
} as const;

// Loading Messages
export const LOADING_MESSAGES = {
  DEFAULT: "Loading...",
  AUTHENTICATING: "Authenticating...",
  SIGNING_IN: "Signing in...",
  SIGNING_OUT: "Signing out...",
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: "Network error. Please check your connection.",
  UNAUTHORIZED: "You are not authorized to access this resource.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNKNOWN: "An unexpected error occurred.",
  LOGIN_FAILED: "Login failed. Please check your credentials.",
} as const;

// Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  COUNTER: "/counter",
  USER: "/user",
} as const;

// Theme
export const THEME = {
  BREAKPOINTS: {
    XS: 0,
    SM: 600,
    MD: 900,
    LG: 1200,
    XL: 1536,
  },
} as const;
