package main

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"sync"

	"github.com/supabase-community/auth-go"
	"github.com/supabase-community/auth-go/types"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// AuthStore manages authentication state
type AuthStore struct {
	mu            sync.RWMutex
	currentUser   *types.UserResponse
	isInitialized bool
}

// Extended App struct with AuthStore
type App struct {
	ctx        context.Context
	authClient auth.Client
	authStore  *AuthStore
}

// NewApp creates a new App application struct with AuthStore
func NewApp() *App {
	authClient := auth.New( //os.Getenv("SUPABASE_URL"), os.Getenv("SUPABASE_KEY"))
		"fuobfyypdlixgvwzrvoy", //https://*.supabase.co
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1b2JmeXlwZGxpeGd2d3pydm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0MjAyOTQsImV4cCI6MjA0Mzk5NjI5NH0.qJv20Jw7E8F0OJR_-AwWOw8Mal0pbthtHddKhzo3afk",
	)
	return &App{
		authClient: authClient,
		authStore:  &AuthStore{},
	}
}

// EmitAuthState sends the current auth state to frontend
func (a *App) emitAuthState() {
	a.authStore.mu.RLock()
	defer a.authStore.mu.RUnlock()

	authState := map[string]interface{}{
		"user":          a.authStore.currentUser,
		"isInitialized": a.authStore.isInitialized,
	}

	// Emit the auth state change event to frontend
	runtime.EventsEmit(a.ctx, "auth:stateChange", authState)
}

// Initialize auth state on startup
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.authStore.isInitialized = true
	a.emitAuthState()
}

// SignIn with updated store management
func (a *App) SignIn(email, password string) (*types.TokenResponse, error) {
	response, err := a.authClient.SignInWithEmailPassword(email, password)
	if err != nil {
		return nil, fmt.Errorf("signin failed: %w", err)
	}

	// Get user details with the new token
	authedClient := a.authClient.WithToken(response.AccessToken)
	user, err := authedClient.GetUser()
	if err != nil {
		return nil, fmt.Errorf("get user failed: %w", err)
	}

	// Update store
	a.authStore.mu.Lock()
	a.authStore.currentUser = user
	a.authStore.mu.Unlock()

	// Emit state change
	a.emitAuthState()

	return response, nil
}

// SignOut with store update
func (a *App) SignOut(token string) error {
	authedClient := a.authClient.WithToken(token)

	err := authedClient.Logout()
	if err != nil {
		return fmt.Errorf("signout failed: %w", err)
	}

	// Clear store
	a.authStore.mu.Lock()
	a.authStore.currentUser = nil
	a.authStore.mu.Unlock()

	// Emit state change
	a.emitAuthState()

	return nil
}

// GetAuthState returns current auth state
func (a *App) GetAuthState() map[string]interface{} {
	a.authStore.mu.RLock()
	defer a.authStore.mu.RUnlock()

	return map[string]interface{}{
		"user":          a.authStore.currentUser,
		"isInitialized": a.authStore.isInitialized,
	}
}

// InitializeFromToken initializes the auth state from a stored token
func (a *App) InitializeFromToken(token string) error {
	if token == "" {
		a.authStore.mu.Lock()
		a.authStore.currentUser = nil
		a.authStore.mu.Unlock()
		a.emitAuthState()
		return nil
	}

	authedClient := a.authClient.WithToken(token)
	user, err := authedClient.GetUser()
	if err != nil {
		return fmt.Errorf("initialize from token failed: %w", err)
	}

	a.authStore.mu.Lock()
	a.authStore.currentUser = user
	a.authStore.mu.Unlock()

	a.emitAuthState()
	return nil
}

func (a *App) RunSimpleClick() map[string]interface{} {
	// Create a simple TagUI script for a single click
	script := "click element"

	// Write to temporary file
	tmpFile, err := os.CreateTemp("", "tagui-*.tag")
	if err != nil {
		return map[string]interface{}{"success": false, "error": err.Error()}
	}
	defer os.Remove(tmpFile.Name())

	if _, err := tmpFile.WriteString(script); err != nil {
		return map[string]interface{}{"success": false, "error": err.Error()}
	}

	// Run TagUI
	cmd := exec.Command("tagui", tmpFile.Name(), "live") // "live" flag so dosen't open new browser
	err = cmd.Run()
	if err != nil {
		return map[string]interface{}{"success": false, "error": err.Error()}
	}

	return map[string]interface{}{"success": true}
}
