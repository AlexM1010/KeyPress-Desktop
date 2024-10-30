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
