'use client';

import { useState, useEffect } from 'react';

type SetValue<T> = (value: T | ((val: T) => T)) => void;

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Prevent build errors
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: SetValue<T> = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
        
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        // Dispatch a custom event so other instances can update
        window.dispatchEvent(new Event('local-storage-update'));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Listen for changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage value:`, error);
        }
      }
    };

    // Listen for localStorage changes in other windows
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for our custom event
    window.addEventListener('local-storage-update', () => {
      const item = window.localStorage.getItem(key);
      if (item) {
        try {
          setStoredValue(JSON.parse(item));
        } catch (error) {
          console.error(`Error parsing localStorage value:`, error);
        }
      }
    });

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-update', () => {});
    };
  }, [key]);

  return [storedValue, setValue];
}