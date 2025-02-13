package utils

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/adrg/xdg"
)

const (
	AppName           = "Keypress"
	LastOpenedFileKey = "last_opened_file.txt"
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

// SaveLastOpenedFile saves the path of the last opened file
func SaveLastOpenedFile(filePath string) error {
	configDir, err := GetAppConfigDir()
	if err != nil {
		return err
	}

	lastOpenedPath := filepath.Join(configDir, LastOpenedFileKey)
	return os.WriteFile(lastOpenedPath, []byte(filePath), 0644)
}

// GetLastOpenedFile retrieves the path of the last opened file
func GetLastOpenedFile() (string, error) {
	configDir, err := GetAppConfigDir()
	if err != nil {
		return "", err
	}

	lastOpenedPath := filepath.Join(configDir, LastOpenedFileKey)
	data, err := os.ReadFile(lastOpenedPath)
	if err != nil {
		if os.IsNotExist(err) {
			return "", nil
		}
		return "", err
	}

	return string(data), nil
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

	// Save as last opened file
	if err := SaveLastOpenedFile(fullPath); err != nil {
		return "", fmt.Errorf("failed to save last opened file: %w", err)
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
