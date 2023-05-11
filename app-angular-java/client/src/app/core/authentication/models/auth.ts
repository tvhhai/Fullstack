export interface Auth {
}

export interface User {
    [prop: string]: any;

    id?: number | string | null;
    username?: string;
    email?: string;
    avatar?: string;
    roles?: any[];
    permissions?: any[];
}

export interface UserResponse {
    data: User,
    message: string,
    statusCode: number
}

