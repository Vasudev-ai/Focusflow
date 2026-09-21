import { afterEach, describe, expect, it, vi } from 'vitest';
import { registerEscapeKeyHandler } from '../src/utils/modalKeyboard';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('TaskFormModal keyboard dismissal', () => {
  it('registers Escape handling only while the modal is open', () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    vi.stubGlobal('document', { addEventListener, removeEventListener });

    expect(registerEscapeKeyHandler(false, vi.fn())).toBeUndefined();
    expect(addEventListener).not.toHaveBeenCalled();
  });

  it('closes on Escape and removes the listener when the modal closes', () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    const onClose = vi.fn();
    vi.stubGlobal('document', { addEventListener, removeEventListener });

    const cleanup = registerEscapeKeyHandler(true, onClose);
    const [eventName, handleKeyDown] = addEventListener.mock.calls[0];

    expect(eventName).toBe('keydown');
    handleKeyDown({ key: 'Enter' });
    expect(onClose).not.toHaveBeenCalled();

    handleKeyDown({ key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();

    cleanup();
    expect(removeEventListener).toHaveBeenCalledWith('keydown', handleKeyDown);
  });
});
