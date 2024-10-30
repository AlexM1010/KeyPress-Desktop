# Project Structure

```
frontend/
  .svelte-kit/
    generated/
      client/
        nodes/
          0.js
          1.js
          2.js
          3.js
          4.js
          5.js
          6.js
          7.js
          8.js
          9.js
        app.js
        matchers.js
      client-optimized/
        nodes/
          0.js
          1.js
          2.js
          3.js
          4.js
          5.js
        app.js
        matchers.js
      server/
        internal.js
      root.js
      root.svelte
    output/
      client/
        _app/
          immutable/
            assets/
              _layout.BV1eDtrG.css
              _page.BJBHtx96.css
              _page.CpIm1qZx.css
              0.BV1eDtrG.css
              3.BJBHtx96.css
              5.DuvDVzS5.css
              app.v5By6zoX.css
            chunks/
              app.CTiCmxGO.js
              authStore.bUMFgHRS.js
              entry.kikB5_OM.js
              Icon.0c9ThxFu.js
              index.B0pppUlX.js
              index.BYxlUQlx.js
              index.Dk3C_s6U.js
              scheduler.CXTpCuy5.js
              spread.CgU5AtxT.js
              themeStore.C16bqr0X.js
            entry/
              app.BRvt2-64.js
              start.XOTwc-BC.js
            nodes/
              0.BtFHPqEa.js
              1.CdP74P0d.js
              2.Q4_rkqAm.js
              3.CPOwhpPR.js
              4.CCacLRr8.js
              5.ChKHVYTl.js
          version.json
        .vite/
          manifest.json
        favicon.png
      prerendered/
        dependencies/
          _app/
            env.js
        pages/
          index.html
          login.html
          profile.html
          workspace.html
      server/
        _app/
          immutable/
            assets/
              _layout.BV1eDtrG.css
              _page.BJBHtx96.css
              _page.CpIm1qZx.css
              app.v5By6zoX.css
        .vite/
          manifest.json
        chunks/
          client.js
          exports.js
          Icon.js
          index.js
          index2.js
          internal.js
          names.js
          ssr.js
          themeStore.js
        entries/
          fallbacks/
            error.svelte.js
          pages/
            login/
              _page.svelte.js
            profile/
              _page.svelte.js
            workspace/
              _page.svelte.js
            _layout.svelte.js
            _layout.ts.js
            _page.svelte.js
        nodes/
          0.js
          1.js
          2.js
          3.js
          4.js
          5.js
        stylesheets/
        index.js
        internal.js
        manifest-full.js
        manifest.js
    types/
      src/
        routes/
          (workspace)/
            [userId]/
          [email]/
          [userId]/
          auth/
            confirm/
            error/
          design/
          login/
            $types.d.ts
          private/
            [userId]/
          profile/
            $types.d.ts
          register/
          workspace/
            [userId]/
            $types.d.ts
          $types.d.ts
      route_meta_data.json
    ambient.d.ts
    non-ambient.d.ts
    tsconfig.json
  src/
    Data/
    lib/
      assets/
        logo-no-background.png
        moon.svg
        sun.svg
      components/
        customNodes/
          BinNode.svelte
          ColorPickerNode.svelte
          ContextMenu.svelte
          Input.svelte
          KeyPressNode.svelte
          MouseClickNode.svelte
          nodes-and-edges.ts
          NodeSVGStore.ts
          nodeTypes.ts
          NodeWrapper.svelte
          Select.svelte
          Slider.svelte
          SVGNode.svelte
          types.ts
        ui/
          button/
            button.svelte
            index.ts
          form/
            form-button.svelte
            form-description.svelte
            form-element-field.svelte
            form-field-errors.svelte
            form-field.svelte
            form-fieldset.svelte
            form-label.svelte
            form-legend.svelte
            index.ts
          input/
            index.ts
            input.svelte
          label/
            index.ts
            label.svelte
      stores/
        authStore.ts
        themeStore.ts
      theme/
      types/
        block.ts
        edge.ts
        manifest.ts
        nodeProps.ts
        tailwind.ts
      utils/
        tailwind.ts
        textWrap.ts
        util.ts
      wailsjs/
        go/
          main/
            App.d.ts
            App.js
          models.ts
        runtime/
          package.json
          runtime.d.ts
          runtime.js
      index.ts
      utils.ts
    routes/
      login/
        +page.svelte
        login.scss
        Login.svelte
        schema.ts
      profile/
        +page.svelte
      workspace/
        +page.svelte
        ConnectionLine.svelte
        CustomEdge.svelte
        DnDProvider.svelte
        Flow.svelte
        Sidebar.svelte
        utils.ts
      +layout.svelte
      +layout.ts
      +page.svelte
      dark-light.scss
      ThemeToggle.svelte
    app.css
    app.html
    global.d.ts
    routes.ts
    wails.d.ts
  static/
    favicon.png
  supabase/
    .branches/
      _current_branch
    .temp/
      cli-latest
    migrations/
      init.sql
    .gitignore
    config.toml
  wailsjs/
    go/
      main/
        App.d.ts
        App.js
    runtime/
      package.json
      runtime.d.ts
      runtime.js
  .env
  .env.local
  .gitignore
  .npmrc
  components.json
  export.md
  package-lock.json
  package.json
  package.json.md5
  postcss.config.cjs
  postcss.config.js
  README.md
  svelte.config.js
  tailwind.config.js
  tsconfig.json
  vite.config.ts
.gitignore
app.go
export.md
go.mod
go.sum
main.go
package-lock.json
package.json
README.md
wails.json
```


# Active Tabs Content


## frontend\src\routes\+layout.svelte

```svelte
<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { ModeWatcher } from "mode-watcher";
    import { generateUserId } from '$lib/utils';
    import ThemeToggle from './ThemeToggle.svelte';
    import { onMount } from 'svelte';
    import { authStore } from '$lib/stores/authStore';
    import type { User } from '../global';
    import "../app.css";

    let isReady = false;
    
    // Use the $ prefix to automatically subscribe to the store
    $: isAuthenticated = $authStore.isAuthenticated;
    $: currentUser = $authStore.user;

    onMount(() => {
        // Check if we're in dev mode (no Wails)
        if (!window.runtime) {
            console.log('Running in dev mode');
            isReady = true;
            return;
        }

        // Initialize if Wails is available
        if (window.backend) {
            const init = async () => {
                await authStore.init();
                isReady = true;
            };
            init();
        } else {
            // Fallback for when backend isn't available
            console.log('No backend available');
            isReady = true;
        }
    });

    // Handle logout
    async function handleLogout() {
        await authStore.clearAuth();
    }
</script>

<ModeWatcher />

<!-- Navbar -->
<div class="bg-background border-b text-black dark:text-white">
    <div class="max-w-3xl mx-auto flex justify-between items-center py-4 px-4">
        <!-- Left side of navbar -->
        <div class="flex items-center space-x-4">
            <a href="/">
                <img 
                    src="/src/lib/assets/logo-no-background.png" 
                    alt="KeyPress Logo" 
                    class="h-10 w-auto max-w-full object-contain" 
                />
            </a>
            {#if isAuthenticated && currentUser}
                <Button href={`/workspace`} variant="ghost">
                    Workspace
                </Button>
            {/if}
        </div>
        <!-- Right side of navbar -->
        <div class="flex items-center space-x-4">
            {#if isAuthenticated && currentUser}
                <span class="text-foreground">{currentUser.email}</span>
                <Button on:click={handleLogout} variant="ghost">
                    Logout
                </Button>
            {:else}
                <Button href="/register" variant="ghost">
                    Register
                </Button>
                <Button href="/login" variant="ghost">
                    Login
                </Button>
            {/if}
            <ThemeToggle />
        </div>
    </div>
</div>

{#if !isReady}
    <div class="flex items-center justify-center h-screen">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
{:else}
    <slot />
{/if}
```


## app.go

```go
package main

import (
	"context"
	"fmt"
	"sync"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// App struct
type App struct {
	ctx     context.Context
	session *Session
	mu      sync.RWMutex
}

type Session struct {
	User  *User
	Token string
}

type User struct {
	ID    string `json:"id"`
	Email string `json:"email"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
	Token   string `json:"token,omitempty"`
	User    *User  `json:"user,omitempty"`
}

type LogoutResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type SessionResponse struct {
	Valid bool   `json:"valid"`
	User  *User  `json:"user,omitempty"`
	Token string `json:"token,omitempty"`
}

// JWT claims structure
type Claims struct {
	UserID string `json:"user_id"`
	Email  string `json:"email"`
	jwt.RegisteredClaims
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// Startup is called when the app starts
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
}

// Login handles user authentication
func (a *App) Login(request LoginRequest) LoginResponse {
	// TODO: Replace with actual authentication logic
	if request.Email == "test@example.com" && request.Password == "password123" {
		user := &User{
			ID:    "1",
			Email: request.Email,
		}

		// Create claims with expiry
		claims := &Claims{
			UserID: user.ID,
			Email:  user.Email,
			RegisteredClaims: jwt.RegisteredClaims{
				ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
				IssuedAt:  jwt.NewNumericDate(time.Now()),
			},
		}

		// Create token
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		tokenString, err := token.SignedString([]byte("your-secret-key"))
		if err != nil {
			return LoginResponse{
				Success: false,
				Message: "Failed to generate token",
			}
		}

		// Store session
		a.mu.Lock()
		a.session = &Session{
			User:  user,
			Token: tokenString,
		}
		a.mu.Unlock()

		return LoginResponse{
			Success: true,
			Message: "Login successful",
			Token:   tokenString,
			User:    user,
		}
	}

	return LoginResponse{
		Success: false,
		Message: "Invalid credentials",
	}
}

// Logout handles user logout
func (a *App) Logout() LogoutResponse {
	a.mu.Lock()
	a.session = nil
	a.mu.Unlock()

	return LogoutResponse{
		Success: true,
		Message: "Logout successful",
	}
}

// GetSession checks if a user session is valid
func (a *App) GetSession() SessionResponse {
	a.mu.RLock()
	defer a.mu.RUnlock()

	if a.session == nil || a.session.User == nil {
		return SessionResponse{
			Valid: false,
		}
	}

	// Validate the token
	token, err := a.validateToken(a.session.Token)
	if err != nil || !token.Valid {
		// Clear invalid session
		a.mu.RUnlock()
		a.mu.Lock()
		a.session = nil
		a.mu.Unlock()
		a.mu.RLock()

		return SessionResponse{
			Valid: false,
		}
	}

	return SessionResponse{
		Valid: true,
		User:  a.session.User,
		Token: a.session.Token,
	}
}

// validateToken validates a JWT token
func (a *App) validateToken(tokenString string) (*jwt.Token, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte("your-secret-key"), nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(*Claims); ok {
		// Check if token is expired
		if claims.ExpiresAt != nil && claims.ExpiresAt.Before(time.Now()) {
			return nil, fmt.Errorf("token expired")
		}
	}

	return token, nil
}

// ValidateStoredToken validates a token from the frontend
func (a *App) ValidateStoredToken(tokenString string) SessionResponse {
	token, err := a.validateToken(tokenString)
	if err != nil || !token.Valid {
		return SessionResponse{
			Valid: false,
		}
	}

	claims, ok := token.Claims.(*Claims)
	if !ok {
		return SessionResponse{
			Valid: false,
		}
	}

	user := &User{
		ID:    claims.UserID,
		Email: claims.Email,
	}

	// Update session with valid token
	a.mu.Lock()
	a.session = &Session{
		User:  user,
		Token: tokenString,
	}
	a.mu.Unlock()

	return SessionResponse{
		Valid: true,
		User:  user,
		Token: tokenString,
	}
}
```


## frontend\src\lib\stores\authStore.ts

```ts
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
```


## frontend\src\global.d.ts

```ts
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
```

