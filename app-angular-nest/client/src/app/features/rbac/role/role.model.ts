export interface Role {
    [prop: string]: any;
  
    id: number | string;
    name?: string;
    description?: string;
    permissions?: any[];
  }
  
  export interface RoleResponse {
    data: Role;
    message: string;
    statusCode: number;
  }
  