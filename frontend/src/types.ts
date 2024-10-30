// src/types.ts

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = {
    success: boolean;
    message: string;
};

export type LogoutResponse = {
    success: boolean;
    message: string;
};

export type GetSessionResponse = {
    userEmail: string;
    isLoggedIn: boolean;
};
