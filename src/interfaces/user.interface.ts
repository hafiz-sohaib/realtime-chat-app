import { Request } from 'express';

export interface signUp {
    fullName: string,
    email: string,
    password: string
}

export interface signIn {
    email: string,
    password: string
}

export interface AuthRequest extends Request {
    user?: any;
}

export interface updateUser {
    fullName?: string,
    image?: string,
    isOnline?: boolean
}

export interface updatePassword {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}

export interface UserRequest extends Request {
    user?: any;
    files?: any;
}

export interface userResponse<T> {
    status: number;
    user?: T | any;
    users?: T | any;
    profile?: T | any;
    accessToken?: string;
    message?: string;
    error?: Error | any;
}