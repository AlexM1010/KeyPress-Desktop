// src/wails.d.ts
export { };

// Define the Wails runtime interface
export interface WailsRuntime {
    EventsOn: (eventName: string, callback: (...args: any[]) => void) => void;
    EventsOff: (eventName: string) => void;
    EventsEmit(eventName: string, ...data: any[]): void;
}

declare global {
    interface Window {
        backend: {
            GetSession: () => Promise<SessionResponse>;
            ValidateStoredToken: (token: string) => Promise<SessionResponse>;
            SaveFlow: (request: SaveFlowRequest) => Promise<SaveFlowResponse>;
            InitializeFromToken(token: string): Promise<void>;
            SignIn(email: string, password: string): Promise<{
                access_token: string;
                refresh_token: string;
                // Add other properties returned by SignIn
            }>;
            SignOut(token: string): Promise<void>;
            RunSimpleClick: () => Promise<{ success: boolean; error?: string }>;
        };
        runtime: WailsRuntime;
    }
}

// Extend the window interface
declare global {
    interface Window {
        go: {
            main: {
                App: Backend;
            };
        };
        runtime: WailsRuntime;
    }
}