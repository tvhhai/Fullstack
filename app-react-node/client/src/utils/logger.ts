export const logger = {
  info: (message: string, data?: unknown) => {
    if (import.meta.env.DEV) {
      console.log(`[INFO] ${message}`, data);
    }
  },
  error: (message: string, error?: Error | unknown) => {
    console.error(`[ERROR] ${message}`, error);
  },
};
