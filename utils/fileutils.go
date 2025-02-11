package utils

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/adrg/xdg"
)

const (
	AppName = "Keypress"
)

// GetAppConfigDir returns the application-specific config directory
func GetAppConfigDir() (string, error) {
	configPath := filepath.Join(AppName, "configs")
	path, err := xdg.ConfigFile(configPath)
	if err != nil {
		return "", fmt.Errorf("failed to get config directory: %w", err)
	}
	// Ensure the directory exists
	dir := filepath.Dir(path)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return "", fmt.Errorf("failed to create config directory: %w", err)
	}
	return dir, nil
}

// GetAppDataDir returns the application-specific data directory
func GetAppDataDir() (string, error) {
	dataPath := filepath.Join(AppName, "data")
	path, err := xdg.DataFile(dataPath)
	if err != nil {
		return "", fmt.Errorf("failed to get data directory: %w", err)
	}
	// Ensure the directory exists
	dir := filepath.Dir(path)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return "", fmt.Errorf("failed to create data directory: %w", err)
	}
	return dir, nil
}

// SaveFlowData saves the flow data to the specified location
func SaveFlowData(data interface{}, filename string) (string, error) {
	// Get the app data directory
	dataDir, err := GetAppDataDir()
	if err != nil {
		return "", err
	}

	// Ensure filename has .json extension
	if filepath.Ext(filename) != ".json" {
		filename += ".json"
	}

	// Create the full file path
	fullPath := filepath.Join(dataDir, filename)

	// Convert data to JSON
	jsonData, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return "", fmt.Errorf("failed to marshal data: %w", err)
	}

	// Write the file
	if err := os.WriteFile(fullPath, jsonData, 0644); err != nil {
		return "", fmt.Errorf("failed to write file: %w", err)
	}

	return fullPath, nil
}

// LoadFlowData loads flow data from a file
func LoadFlowData(filename string) ([]byte, error) {
	// Get the app data directory
	dataDir, err := GetAppDataDir()
	if err != nil {
		return nil, err
	}

	// Ensure filename has .json extension
	if filepath.Ext(filename) != ".json" {
		filename += ".json"
	}

	// Create the full file path
	fullPath := filepath.Join(dataDir, filename)

	// Read the file
	data, err := os.ReadFile(fullPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read file: %w", err)
	}

	return data, nil
}
