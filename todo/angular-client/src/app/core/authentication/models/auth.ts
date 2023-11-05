export interface User {
    id: number | string;

    [prop: string]: any;

    avatar: string;
    email: string;
    firstName: string;
    lastName: string;
    permissions: any[];
    roles: any[];
    username: string;
}

export interface UserResponse {
    data: User;
    message: string;
    statusCode: number;
}
