// frontend/src/global.d.ts

interface User {
  ID: string;    
  Email: string; 
}

interface LoginRequest {
  Email: string;    
  Password: string; 
}

interface LoginResponse {
  Success: boolean;  
  Message: string;   
  Token?: string;    
  User?: User;       
}

interface LogoutResponse {
  Success: boolean;  
  Message: string;   
}

interface SessionResponse {
  Valid: boolean;   
  User?: User;      
  Token?: string;   
}

interface SaveFlowRequest {
  userId: string;
  flowName: string;
  flowData: string;
}

interface SaveFlowResponse {
  Success: boolean;
  Message: string;
}

export type {
  User,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  SessionResponse
};

// Define the structure of your Go backend methods
export interface Backend {
  InitializeFromToken(token: string): Promise<void>;
  SignIn(email: string, password: string): Promise<{
      access_token: string;
      refresh_token: string;
      // Add other properties returned by SignIn
  }>;
  SignOut(token: string): Promise<void>;
  // Add other backend methods as needed
}

// Define the Wails runtime interface
export interface WailsRuntime {
  EventsOn(eventName: string, callback: (data: any) => void): void;
  EventsEmit(eventName: string, ...data: any[]): void;
  // Add other runtime methods as needed
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