import { writable } from 'svelte/store';
import { goto } from '$app/navigation';
import type { User, LoginResponse, SessionResponse, LogoutResponse } from '../../global';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: User | null;
    isInitialized: boolean;
}

function createAuthStore() {
    const { subscribe, set, update } = writable<AuthState>({
        isAuthenticated: false,
        token: null,
        user: null,
        isInitialized: false
    });

    const isWailsAvailable = () => {
        return typeof window !== 'undefined' && window.backend && window.backend.GetSession;
    };

    async function validateStoredAuth() {
        const stored = localStorage.getItem('auth');
        if (!stored) return false;

        try {
            const { token } = JSON.parse(stored);
            if (!token) return false;

            // Check if ValidateStoredToken is available
            if (window.backend.ValidateStoredToken) {
                const response = await window.backend.ValidateStoredToken(token);
                return response.valid ? response : false;
            } else {
                // Fallback to GetSession if ValidateStoredToken is not available
                const sessionResponse = await window.backend.GetSession();
                return sessionResponse.valid ? sessionResponse : false;
            }
        } catch {
            return false;
        }
    }

    return {
        subscribe,
        setAuth: (token: string, user: User) => {
            set({
                isAuthenticated: true,
                token,
                user,
                isInitialized: true
            });
            localStorage.setItem('auth', JSON.stringify({ token, user }));
        },
        clearAuth: async () => {
            try {
                if (isWailsAvailable()) {
                    await window.backend.Logout();
                }
            } catch (error) {
                console.error('Logout error:', error);
            }
            
            localStorage.removeItem('auth');
            set({
                isAuthenticated: false,
                token: null,
                user: null,
                isInitialized: true
            });
            goto('/login');
        },
        init: async () => {
            try {
                if (!isWailsAvailable()) {
                    console.log('Wails backend not available');
                    set({ isAuthenticated: false, token: null, user: null, isInitialized: true });
                    return;
                }

                // First try to validate stored token
                const validatedSession = await validateStoredAuth();
                if (validatedSession) {
                    set({
                        isAuthenticated: true,
                        token: validatedSession.token ?? null,
                        user: validatedSession.user ?? null,
                        isInitialized: true
                    });
                    return;
                }

                // If no stored token or invalid, check current session
                const response = await window.backend.GetSession();
                if (response.valid && response.user && response.token) {
                    set({
                        isAuthenticated: true,
                        token: response.token,
                        user: response.user,
                        isInitialized: true
                    });
                    localStorage.setItem('auth', JSON.stringify({ 
                        token: response.token, 
                        user: response.user 
                    }));
                } else {
                    localStorage.removeItem('auth');
                    set({
                        isAuthenticated: false,
                        token: null,
                        user: null,
                        isInitialized: true
                    });
                }
            } catch (error) {
                console.error('Failed to initialize auth store:', error);
                localStorage.removeItem('auth');
                set({
                    isAuthenticated: false,
                    token: null,
                    user: null,
                    isInitialized: true
                });
            }
        }
    };
}

export const authStore = createAuthStore();