// src/lib/stores/auth.ts
import { writable, derived } from 'svelte/store';
import type { User } from '../../global.d.ts';

interface AuthState {
    user: User | null;
    isInitialized: boolean;
}

function createAuthStore() {
    const { subscribe, set, update } = writable<AuthState>({
        user: null,
        isInitialized: false
    });

    // Initialize the store
    async function init() {
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                await window.go.main.App.InitializeFromToken(token);
            } else {
                set({ user: null, isInitialized: true });
            }
        } catch (error) {
            console.error('Failed to initialize auth store:', error);
            set({ user: null, isInitialized: true });
        }
    }

    // Listen for auth state changes from backend
    window.runtime.EventsOn("auth:stateChange", (newState: AuthState) => {
        set(newState);
    });

    async function signIn(email: string, password: string) {
        try {
            const response = await window.go.main.App.SignIn(email, password);
            localStorage.setItem('authToken', response.access_token);
            return response;
        } catch (error) {
            console.error('Sign in failed:', error);
            throw error;
        }
    }

    async function signOut() {
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                await window.go.main.App.SignOut(token);
                localStorage.removeItem('authToken');
            }
        } catch (error) {
            console.error('Sign out failed:', error);
            throw error;
        }
    }

    return {
        subscribe,
        signIn,
        signOut,
        init
    };
}

// Create the main auth store
export const auth = createAuthStore();

// Derived stores for convenience
export const user = derived(auth, $auth => $auth.user);
export const isAuthenticated = derived(auth, $auth => !!$auth.user);
export const isInitialized = derived(auth, $auth => $auth.isInitialized);