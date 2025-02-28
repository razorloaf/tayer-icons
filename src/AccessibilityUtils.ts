import * as React from 'react';

export interface OSAccessibilityPreferences {
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  forcedColors: boolean;
  colorScheme: 'light' | 'dark';
}

let accessibilityPreferences: OSAccessibilityPreferences = {
  prefersReducedMotion: false,
  prefersHighContrast: false,
  forcedColors: false,
  colorScheme: 'light'
};

let initialized = false;
let subscribers: Set<() => void> = new Set();

function updatePreferences(): void {
  if (typeof window === 'undefined') return;

  const newPreferences: OSAccessibilityPreferences = {
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    prefersHighContrast: window.matchMedia('(prefers-contrast: more)').matches,
    forcedColors: window.matchMedia('(forced-colors: active)').matches,
    colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  };

  accessibilityPreferences = newPreferences;
  subscribers.forEach(notify => notify());
}

function initializeIfNeeded(): void {
  if (initialized || typeof window === 'undefined') return;
  
  // Initial detection
  updatePreferences();
  
  // Add listeners
  const queries = [
    '(prefers-reduced-motion: reduce)',
    '(prefers-contrast: more)',
    '(forced-colors: active)',
    '(prefers-color-scheme: dark)'
  ];
  
  queries.forEach(query => {
    const mediaQuery = window.matchMedia(query);
    const listener = () => updatePreferences();
    mediaQuery.addEventListener('change', listener);
  });
  
  initialized = true;
}

export function useOSAccessibility(): OSAccessibilityPreferences {
  const [preferences, setPreferences] = React.useState(accessibilityPreferences);
  
  React.useEffect(() => {
    // Initialize on first use
    initializeIfNeeded();
    
    // Subscribe to updates
    const handleUpdate = () => setPreferences({...accessibilityPreferences});
    subscribers.add(handleUpdate);
    
    // Clean up
    return () => {
      subscribers.delete(handleUpdate);
    };
  }, []);
  
  return preferences;
}