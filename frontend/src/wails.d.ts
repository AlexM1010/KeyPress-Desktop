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
    // RobotGo methods
    MouseMove(x: number, y: number): Promise<void>;
    MouseClick(button: 'left' | 'right' | 'center'): Promise<void>;
    TypeString(text: string): Promise<void>;
    KeyTap(key: string): Promise<void>;
    GetMousePosition(): Promise<MousePosition>;
    StartExecution(nodesJSON: string): Promise<void>;

    // methods for task and execution events
    StartExecution(data: string): Promise<void>;
    OnTaskStarted(callback: (taskId: string) => void): void;
    OnTaskCompleted(callback: (taskId: string) => void): void;
    OnTaskError(callback: (payload: { taskID: string; error: string }) => void): void;
    OnExecutionCompleted(callback: () => void): void;
    OnExecutionError(callback: (errorMsg: string) => void): void;
    OnExecutionStopped(callback: () => void): void;
    OnExecutionTimedOut(callback: () => void): void;
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