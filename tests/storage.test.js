import { describe, it, expect, beforeEach } from 'vitest';
import { getStoredItem, setStoredItem, removeStoredItem } from '../src/utils/storage';

describe('Storage Helpers', () => {
  // Mock localStorage for test environment
  const store = {};
  beforeEach(() => {
    global.window = {
      localStorage: {
        getItem: (key) => store[key] || null,
        setItem: (key, val) => {
          store[key] = String(val);
        },
        removeItem: (key) => {
          delete store[key];
        },
      },
    };
  });

  it('returns fallback value if key does not exist', () => {
    const result = getStoredItem('non_existent_key', 'fallback_val');
    expect(result).toBe('fallback_val');
  });

  it('safely parses stored JSON object', () => {
    setStoredItem('user_settings', { theme: 'dark', sound: false });
    const result = getStoredItem('user_settings', {});
    expect(result).toEqual({ theme: 'dark', sound: false });
  });

  it('recovers with fallback when stored data is malformed/corrupted', () => {
    // Manually inject invalid JSON string
    window.localStorage.setItem('corrupted_data', '{invalid_json');
    const result = getStoredItem('corrupted_data', ['default']);
    expect(result).toEqual(['default']);
  });

  it('removes stored item cleanly', () => {
    setStoredItem('temp_item', 'hello');
    expect(getStoredItem('temp_item')).toBe('hello');
    removeStoredItem('temp_item');
    expect(getStoredItem('temp_item', null)).toBeNull();
  });
});
