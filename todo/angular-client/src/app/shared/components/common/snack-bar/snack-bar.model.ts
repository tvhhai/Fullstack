export interface IDataSnackbar {
  action?: () => void;
  dismiss?: boolean;
  message: string;
  titleAction?: string;
}
