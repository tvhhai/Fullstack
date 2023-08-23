export interface User {
  [prop: string]: any;

  id: number | string;
  username?: string;
  email?: string;
  avatar?: string;
  roles: string[];
  password?: string;
  confirmPassword?: string;
  systemDefine: boolean;
}

export interface UserRequest {
  id?: number;
  username?: string;
  email?: string;
  roles?: string[];
  password?: string;
  confirmPassword?: string;
}

export interface UserResponse {
  data: User;
  message: string;
  statusCode: number;
}
