export class AppConstant {
  public static readonly API = {
    SIGN_IN_API: 'api/auth/sign-in',
    SIGN_UP_API: 'api/auth/sign-up',
    SIGN_OUT_API: 'api/auth/sign-out',
    TOKEN_REFRESH_API: 'api/token/refresh',
  };

  public static readonly PAGE = {
    DASHBOARD_PAGE: 'dashboard',
    TODAY_PAGE: 'todo/today',
    SIGN_IN_PAGE: 'auth/sign-in',
    SIGN_UP_PAGE: 'auth/sign-up',
  };

  public static readonly STATUS = {
    UP: "#2ca02c",
    WARNING: "#ff7f0e",
    DOWN: "#d62728"
  };

  public static readonly COLOR_ACCENT = {
    LOW: {
      title: "status.low",
      color: "#26c6da",
      background: "#e8f7ff"
    },
    MEDIUM: {
      title: "status.medium",
      color: "#1e88e5",
      background: "#ecf6ff"
    },
    HIGH: {
      title: "status.high",
      color: "#ffb22b",
      background: "#fff8ec"
    },
    CRITICAL: {
      title: "status.critical",
      color: "#fc4b6c",
      background: "#f9e7eb"
    }
  };
}
