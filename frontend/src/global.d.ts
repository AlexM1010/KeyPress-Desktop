// frontend/src/global.d.ts

interface User { //TODO update to full user structure
  id?: string;    
  email?: string; 
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

interface AuthState {
  user: User | null;
  isInitialized: boolean;
}

export type { 
  User, 
  LoginRequest, 
  LoginResponse, 
  LogoutResponse, 
  SessionResponse, 
  SaveFlowRequest, 
  SaveFlowResponse, 
  AuthState 
};
