// Base API Response
export interface BaseApiResponse<T = unknown> {
  status: "success" | "fail" | "error";
  message?: string;
  data?: T;
}

// Paginated Response
export interface PaginatedResponse<T> extends BaseApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ID-based Entity
export interface EntityWithId {
  id: string | number;
}

// Timestamps
export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

// Select Option
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

// Async State
export interface AsyncState<T = unknown> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Component Props
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Form Field Props
export interface FieldProps {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}
