/**
 * Safe localStorage wrapper with graceful fallbacks.
 * Prevents client crashes in private browsing or quota-exceeded situations.
 */

export const getStoredItem = (key, fallback = null) => {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const item = window.localStorage.getItem(key);
    if (!item) {
      return fallback;
    }
    return JSON.parse(item);
  } catch (error) {
    console.warn(`[FocusFlow Storage] Failed to read "${key}" from localStorage:`, error);
    return fallback;
  }
};

export const setStoredItem = (key, value) => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`[FocusFlow Storage] Failed to write "${key}" to localStorage:`, error);
    return false;
  }
};

export const removeStoredItem = (key) => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`[FocusFlow Storage] Failed to remove "${key}" from localStorage:`, error);
    return false;
  }
};
