// src/wails.d.ts
export {};

declare global {
    interface Window {
        backend: {
            Login(request: LoginRequest): Promise<LoginResponse>;
            Logout(): Promise<LogoutResponse>;
            GetSession(): Promise<GetSessionResponse>;
            Greet(name: string): Promise<string>;
            // Add other bound methods as needed
        };
    }
}
