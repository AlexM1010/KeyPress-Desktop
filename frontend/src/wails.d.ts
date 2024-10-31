export { };

// Define the Wails runtime interface
export interface WailsRuntime {
    EventsOn: (eventName: string, callback: (...args: any[]) => void) => void;
    EventsOff: (eventName: string) => void;
    EventsEmit(eventName: string, ...data: any[]): void;
}

// Mouse position interface
interface MousePosition {
    x: number;
    y: number;
}

// Backend interface with all available methods
interface Backend {
    // Existing auth methods
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

    // New RobotGo methods
    MouseMove(x: number, y: number): Promise<void>;
    MouseClick(button: 'left' | 'right' | 'center'): Promise<void>;
    TypeString(text: string): Promise<void>;
    KeyTap(key: string): Promise<void>;
    GetMousePosition(): Promise<MousePosition>;
    StartExecution(nodesJSON: string): Promise<void>;
}

// Single consolidated Window interface declaration
declare global {
    interface Window {
        backend: Backend;
        go: {
            main: {
                App: Backend;
            };
        };
        runtime: WailsRuntime;
    }
}