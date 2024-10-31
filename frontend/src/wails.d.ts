// src/wails.d.ts
export {};

declare global {
    interface Window {
      backend: {
        Login: (request: LoginRequest) => Promise<LoginResponse>;
        Logout: () => Promise<LogoutResponse>;
        GetSession: () => Promise<SessionResponse>;
        ValidateStoredToken: (token: string) => Promise<SessionResponse>;
        SaveFlow: (request: SaveFlowRequest) => Promise<SaveFlowResponse>;
      };
      runtime: {
        EventsOn: (eventName: string, callback: (...args: any[]) => void) => void;
        EventsOff: (eventName: string) => void;
      };
    }
  }