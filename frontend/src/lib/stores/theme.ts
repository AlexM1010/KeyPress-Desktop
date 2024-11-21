// src/lib/stores/themeStore.ts
import { derived } from 'svelte/store';
import { userPrefersMode, systemPrefersMode } from 'mode-watcher';
import type { ColorMode } from '@xyflow/svelte';
import { browser } from '$app/environment'; // Add this import

function updateThemeAttribute(theme: boolean): void {
  if (browser) {
    document.documentElement.setAttribute('data-theme', theme ? 'dark' : 'light');
  }
}

// Create a derived store that combines mode-watcher states
export const theme = derived(
    [userPrefersMode, systemPrefersMode],
    ([$userPrefersMode, $systemPrefersMode]) => {
        const theme = $userPrefersMode === 'dark' || 
        ($userPrefersMode === 'light' ? false : $systemPrefersMode === 'dark');
        updateThemeAttribute(theme);
        return theme;
    }
);

// More efficient store for Svelte Flow - directly derives from userPrefersMode
export const flowTheme = derived<typeof userPrefersMode, ColorMode>(
    userPrefersMode,
    ($userPrefersMode) => $userPrefersMode || 'system'
);