// frontend/src/global.d.ts

export {};

declare global {
  interface Window {
    runtime: {
      EventsOn: (event: string, callback: (...args: any[]) => void) => void;
      EventsOff: (event: string) => void;
    };
    backend: {
      Login: (email: string, password: string) => Promise<LoginResponse>;
      Logout: () => Promise<LogoutResponse>;
      GetSession: () => Promise<GetSessionResponse>;
      // Add other backend methods here
    };
  }
}
