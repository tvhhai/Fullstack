export class AppConstant {
    public static readonly API = {
        SIGN_IN_API: 'api/auth/sign-in',
        SIGN_OUT_API: 'api/auth/sign-out',
        SIGN_UP_API: 'api/auth/sign-up',
        TOKEN_EXPIRES_IN_API: 'api/token/tokenExpiresIn',
        TOKEN_REFRESH_API: 'api/token/refresh',
    };

    public static readonly PAGE = {
        DASHBOARD_PAGE: 'dashboard',
        SIGN_IN_PAGE: 'auth/sign-in',
        SIGN_UP_PAGE: 'auth/sign-up',
        TODAY_PAGE: 'today',
    };

    public static readonly STATUS = {
        DOWN: '#d62728',
        UP: '#2ca02c',
        WARNING: '#ff7f0e',
    };

    public static readonly COLOR_ACCENT = {
        CRITICAL: {
            background: '#f9e7eb',
            color: '#fc4b6c',
            title: 'status.critical',
        },
        HIGH: {
            background: '#fff8ec',
            color: '#ffb22b',
            title: 'status.high',
        },
        LOW: {
            background: '#e8f7ff',
            color: '#26c6da',
            title: 'status.low',
        },
        MEDIUM: {
            background: '#ecf6ff',
            color: '#1e88e5',
            title: 'status.medium',
        },
    };
}
