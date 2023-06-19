export interface User {
  [prop: string]: any;

  id: number | string;
  username?: string;
  email?: string;
  avatar?: string;
  roles?: any[];
  permissions?: any[];
  password?: string;
}

export interface UserResponse {
  data: User;
  message: string;
  statusCode: number;
}
