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
        app.js
        matchers.js
      server/
        internal.js
      root.js
      root.svelte
    output/
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
    types.ts
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


## main.go

```go
// main.go
package main

import (
	"embed"
	"log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	app := NewApp()

	err := wails.Run(&options.App{
		Title:  "KeyPress",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		OnStartup:  app.Startup,
		OnShutdown: app.Shutdown,
		Bind: []interface{}{
			app,
		},
	})
	if err != nil {
		log.Fatal(err)
	}
}
```


## app.go

```go
// app.go
package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/supabase-community/supabase-go"
)

// App struct encapsulates the application state
type App struct {
	supabaseClient *supabase.Client
	ctx            context.Context
	currentSession *supabase.Session
}

// NewApp initializes the App with a Supabase client
func NewApp() *App {
	// Load environment variables from .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	supabaseUrl := os.Getenv("SUPABASE_URL")
	supabaseKey := os.Getenv("SUPABASE_KEY")
	client := supabase.CreateClient(supabaseUrl, supabaseKey)

	return &App{
		supabaseClient: client,
	}
}

// LoginRequest represents the login form data
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// LoginResponse represents the response after attempting to log in
type LoginResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

// Login handles user authentication using Supabase
func (a *App) Login(ctx context.Context, req LoginRequest) (LoginResponse, error) {
	// Example authentication logic with Supabase
	session, err := a.supabaseClient.Auth.SignIn(ctx, req.Email, req.Password)
	if err != nil || session == nil {
		return LoginResponse{Success: false, Message: "Invalid credentials"}, err
	}
	a.currentSession = session
	// Emit an auth state change event to the frontend
	// Assuming you have a method to emit events
	// For example:
	// a.ctx.Emit("authStateChange", a.currentSession)
	return LoginResponse{Success: true, Message: "Login successful"}, nil
}

// LogoutResponse represents the response after attempting to log out
type LogoutResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

// Logout handles user sign-out
func (a *App) Logout(ctx context.Context) (LogoutResponse, error) {
	err := a.supabaseClient.Auth.SignOut(ctx)
	if err != nil {
		return LogoutResponse{Success: false, Message: "Logout failed"}, err
	}
	a.currentSession = nil
	// Emit an auth state change event to the frontend
	// a.ctx.Emit("authStateChange", a.currentSession)
	return LogoutResponse{Success: true, Message: "Logout successful"}, nil
}

// GetSessionResponse represents the current session data
type GetSessionResponse struct {
	UserEmail  string `json:"userEmail,omitempty"`
	IsLoggedIn bool   `json:"isLoggedIn"`
}

// GetSession retrieves the current session information
func (a *App) GetSession(ctx context.Context) (GetSessionResponse, error) {
	if a.currentSession != nil && a.currentSession.User != nil {
		return GetSessionResponse{
			UserEmail:  a.currentSession.User.Email,
			IsLoggedIn: true,
		}, nil
	}
	return GetSessionResponse{
		UserEmail:  "",
		IsLoggedIn: false,
	}, nil
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// Startup is called when the app starts
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	// Optionally, fetch the initial session
	session, err := a.supabaseClient.Auth.GetSession(ctx)
	if err == nil && session != nil {
		a.currentSession = session
	}
}

// Shutdown is called when the app is shutting down
func (a *App) Shutdown(ctx context.Context) {}
```


## frontend\tsconfig.json

```json
{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true,
		"moduleResolution": "bundler",
		"types": ["svelte", "@sveltejs/kit"]
	},
	"include": ["src/**/*", "src/**/*.svelte", "src/node_modules/**/*"],
	"exclude": ["node_modules", "__sapper__/*", "public/*"]
	// Path aliases are handled by https://svelte.dev/docs/kit/configuration#alias
	// except $lib which is handled by https://svelte.dev/docs/kit/configuration#files
	//
	// If you want to overwrite includes/excludes, make sure to copy over the relevant includes/excludes
	// from the referenced tsconfig.json - TypeScript does not merge them in
}
```


## frontend\src\routes\login\Login.svelte

```svelte
<script lang="ts">
  import "./login.scss";
  import { z } from "zod";
  import { CircleX } from "lucide-svelte";
  import { onMount } from "svelte";
  import { writable, get } from "svelte/store";
  import type { LoginRequest, LoginResponse } from "../../types"; // Adjust path as needed

  // Define the form schema using Zod
  const formSchema = z.object({
      email: z.string().email({ message: "Invalid email address" }),
      password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  });

  // Define types based on the schema
  type FormData = z.infer<typeof formSchema>;
  type ErrorsData = Partial<Record<keyof FormData, string>>;

  // Initialize Svelte stores
  const form = writable<FormData>({ email: '', password: '' });
  const errors = writable<ErrorsData>({});
  const message = writable<string>('');

  let modal: HTMLElement;
  let modalButton: HTMLElement;
  let closeButton: HTMLElement;
  let scrollDown: HTMLElement;
  let isOpened = false;

  // Modal control functions
  const openModal = () => {
      if (modal) {
          modal.classList.add("is-open");
          document.body.style.overflow = "hidden";
      }
  };

  const closeModal = () => {
      if (modal) {
          modal.classList.remove("is-open");
          document.body.style.overflow = "initial";
      }
  };

  const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 3 && !isOpened) {
          isOpened = true;
          if (scrollDown) {
              scrollDown.style.display = "none";
          }
          openModal();
      }
  };

  const handleKeydown = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
          closeModal();
      }
  };

  onMount(() => {
      window.addEventListener("scroll", handleScroll);
      document.addEventListener("keydown", handleKeydown);

      return () => {
          window.removeEventListener("scroll", handleScroll);
          document.removeEventListener("keydown", handleKeydown);
      };
  });

  // Form validation function
  const validateForm = (): boolean => {
      const currentForm: FormData = get(form);
      const result = formSchema.safeParse(currentForm);
      if (result.success) {
          errors.set({});
          return true;
      } else {
          const formattedErrors: ErrorsData = {};
          result.error.errors.forEach(err => {
              const field = err.path[0] as keyof FormData;
              formattedErrors[field] = err.message;
          });
          errors.set(formattedErrors);
          return false;
      }
  };

  // Handle form submission
  const handleSubmit = async (event: Event) => {
      event.preventDefault();
      if (validateForm()) {
          const loginRequest: LoginRequest = get(form);
          try {
              const response: LoginResponse = await window.backend.Login(loginRequest);
              if (response.success) {
                  message.set(response.message);
                  // Handle successful login (e.g., close modal, redirect)
                  closeModal();
              } else {
                  message.set(response.message);
              }
          } catch (error) {
              message.set("An error occurred during login.");
              console.error(error);
          }
      }
  };
</script>

<div class="modal" bind:this={modal}>
  <div class="modal-container">
      <div class="modal-left">
          <h1 class="modal-title">Welcome!</h1>
          <p class="modal-desc">
              Fanny pack hexagon food truck, street art waistcoat kitsch.
          </p>

          <form on:submit|preventDefault={handleSubmit}>
              {#if $message}
                  <div class="alert alert-error mb-4">
                      {$message}
                  </div>
              {/if}

              <div class="input-block">
                  <label class="input-label" for="email">Email</label>
                  <input
                      type="email"
                      id="email"
                      name="email"
                      class="input"
                      placeholder="Email"
                      bind:value={$form.email}
                  />
                  {#if $errors.email}
                      <div class="text-red-500 text-sm mt-1">{$errors.email}</div>
                  {/if}
              </div>

              <div class="input-block">
                  <label class="input-label" for="password">Password</label>
                  <input
                      type="password"
                      id="password"
                      name="password"
                      class="input"
                      placeholder="Password"
                      bind:value={$form.password}
                  />
                  {#if $errors.password}
                      <div class="text-red-500 text-sm mt-1">{$errors.password}</div>
                  {/if}
              </div>

              <div class="modal-buttons">
                  <a href="/forgot-password">Forgot your password?</a>
                  <button type="submit" class="input-button">Login</button>
              </div>

              <button class="input-button">Sign In With GitHub</button>
          </form>

          <p class="sign-up">
              Don't have an account? <a href="/register">Sign up now</a>
          </p>
      </div>

      <div class="modal-right">
          <img
              src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?ixlib=rb-0.3.5..."
              alt=""
          />
      </div>

      <button
          class="icon-button close-button"
          aria-label="Close"
          on:click={closeModal}
          bind:this={closeButton}
      >
          <CircleX strokeWidth="1.5" size="32" />
      </button>
  </div>
  <button class="modal-button" on:click={openModal} bind:this={modalButton}>
      Click here to login
  </button>
</div>
```


## frontend\src\routes\+layout.svelte

```svelte
<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { ModeWatcher } from "mode-watcher";
    import { generateUserId } from '$lib/utils';
    import ThemeToggle from './ThemeToggle.svelte';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import type { LoginResponse, LogoutResponse, GetSessionResponse } from '../types'; // Adjust the path as needed

    // Initialize Svelte stores
    const session = writable<{ userEmail: string; isLoggedIn: boolean }>({
        userEmail: "",
        isLoggedIn: false
    });
    const message = writable<string>("");

    let modal: HTMLElement;
    let modalButton: HTMLElement;
    let closeButton: HTMLElement;
    let scrollDown: HTMLElement;
    let isOpened = false;

    // Reactive variables
    $: userEmail = $session.userEmail || "user@example.com"; // Default email if user is not set
    $: userId = $session.isLoggedIn ? generateUserId(userEmail) : ""; // Generate unique user ID

    /**
     * Fetch the current session from the backend
     */
    async function fetchSession() {
        try {
            const currentSession: GetSessionResponse = await window.backend.GetSession();
            session.set({
                userEmail: currentSession.userEmail,
                isLoggedIn: currentSession.isLoggedIn
            });
        } catch (error) {
            console.error("Error fetching session:", error);
            session.set({
                userEmail: "",
                isLoggedIn: false
            });
        }
    }

    /**
     * Handle user logout by calling the backend's Logout method
     */
    async function handleLogout() {
        console.log("Logout button clicked");
        try {
            const response: LogoutResponse = await window.backend.Logout();
            if (response.success) {
                message.set(response.message);
                // Update session state
                session.set({
                    userEmail: "",
                    isLoggedIn: false
                });
            } else {
                message.set(response.message);
            }
        } catch (error) {
            console.error("Error logging out:", error);
            message.set("An error occurred during logout.");
        }
    }

    /**
     * Setup event listeners for authentication state changes
     * Assumes the backend emits an 'authStateChange' event with session data
     */
    function setupAuthListeners() {
        window.runtime.EventsOn("authStateChange", (newSession: GetSessionResponse) => {
            session.set({
                userEmail: newSession.userEmail,
                isLoggedIn: newSession.isLoggedIn
            });
        });
    }

    onMount(() => {
        // Initial session fetch
        fetchSession();

        // Setup auth state change listeners
        setupAuthListeners();

        // Modal scroll and keydown event listeners
        window.addEventListener("scroll", handleScroll);
        document.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("keydown", handleKeydown);
            window.runtime.EventsOff("authStateChange");
        };
    });

    /**
     * Modal control functions
     */
    const openModal = () => {
        if (modal) {
            modal.classList.add("is-open");
            document.body.style.overflow = "hidden";
        }
    };

    const closeModal = () => {
        if (modal) {
            modal.classList.remove("is-open");
            document.body.style.overflow = "initial";
        }
    };

    const handleScroll = () => {
        if (window.scrollY > window.innerHeight / 3 && !isOpened) {
            isOpened = true;
            if (scrollDown) {
                scrollDown.style.display = "none";
            }
            openModal();
        }
    };

    const handleKeydown = (evt: KeyboardEvent) => {
        if (evt.key === "Escape") {
            closeModal();
        }
    };
</script>

<ModeWatcher /> <!-- Automatically detect user preference for dark mode -->

<!-- Navbar -->
<div class="bg-background border-b text-black dark:text-white">
    <div class="max-w-3xl mx-auto flex justify-between items-center py-4 px-4">
        <!-- Left side of navbar -->
        <div class="flex items-center space-x-4">
            <a href="/">
                <img src="/src/lib/assets/logo-no-background.png" alt="KeyPress Logo" class="h-10 w-auto max-w-full object-contain" />
            </a>
            {#if $session.isLoggedIn}
                <Button href={`/workspace/${userId}`} variant="ghost">
                    Workspace
                </Button>
            {/if}
        </div>
        <!-- Right side of navbar -->
        <div class="flex items-center space-x-4">
            {#if $session.isLoggedIn}
                <span class="text-foreground">{userEmail}</span>
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
<slot></slot>
```

