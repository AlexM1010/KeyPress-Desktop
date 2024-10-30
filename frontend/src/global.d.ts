// frontend/src/global.d.ts

// Import the types we need
interface User {
  id: string;
  email: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

interface LogoutResponse {
  success: boolean;
  message: string;
}

interface SessionResponse {
  valid: boolean;
  user?: User;
  token?: string;
}

declare global {
  interface Window {
    backend: {
      Login: (request: LoginRequest) => Promise<LoginResponse>;
      Logout: () => Promise<LogoutResponse>;
      GetSession: () => Promise<SessionResponse>;
      ValidateStoredToken: (token: string) => Promise<SessionResponse>;
    };
    runtime: {
      EventsOn: (eventName: string, callback: (...args: any[]) => void) => void;
      EventsOff: (eventName: string) => void;
    };
  }
}

export type {
  User,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  SessionResponse
};