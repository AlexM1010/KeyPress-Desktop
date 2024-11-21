// src/lib/stores/themeStore.ts
import { derived } from 'svelte/store';
import { userPrefersMode, systemPrefersMode } from 'mode-watcher';
import type { ColorMode } from '@xyflow/svelte';

// Create a derived store that combines mode-watcher states
export const theme = derived(
    [userPrefersMode, systemPrefersMode],
    ([$userPrefersMode, $systemPrefersMode]) => {
        if ($userPrefersMode === 'dark') return true;
        if ($userPrefersMode === 'light') return false;
        return $systemPrefersMode === 'dark';
    }
);

// More efficient store for Svelte Flow - directly derives from userPrefersMode
export const flowTheme = derived<typeof userPrefersMode, ColorMode>(
    userPrefersMode,
    ($userPrefersMode) => $userPrefersMode || 'system'
);