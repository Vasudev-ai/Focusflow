import { useState, useEffect, useRef } from 'react';
import { TIMER_MODES, STORAGE_KEYS } from '../data/constants';
import { getStoredItem, setStoredItem } from '../utils/storage';

export const useTimer = () => {
  const [mode, setMode] = useState(TIMER_MODES.FOCUS.id);
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(TIMER_MODES.FOCUS.seconds);
  const [sessionsCompleted, setSessionsCompleted] = useState(() => {
    return getStoredItem(STORAGE_KEYS.POMODORO_SESSIONS, 0);
  });

  const timerRef = useRef(null);

  // Sync completed sessions to storage
  useEffect(() => {
    setStoredItem(STORAGE_KEYS.POMODORO_SESSIONS, sessionsCompleted);
  }, [sessionsCompleted]);

  // Interval loop
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);

            // If a focus session just completed, increment session counter
            if (mode === TIMER_MODES.FOCUS.id) {
              setSessionsCompleted((count) => count + 1);
            }

            // Return 0 for end of session
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, mode]);

  const startTimer = () => {
    // If timer reached 0, reset before starting
    if (timeRemaining === 0) {
      const currentConfig = mode === TIMER_MODES.FOCUS.id ? TIMER_MODES.FOCUS : TIMER_MODES.SHORT_BREAK;
      setTimeRemaining(currentConfig.seconds);
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    const currentConfig = mode === TIMER_MODES.FOCUS.id ? TIMER_MODES.FOCUS : TIMER_MODES.SHORT_BREAK;
    setTimeRemaining(currentConfig.seconds);
  };

  /**
   * Switch between Focus (25m) and Break (5m)
   * Note (Intentional imperfection #6): Switching mode while actively running keeps isRunning true
   * and updates timeRemaining, but doesn't pause the timer or announce the mode change to screen readers.
   */
  const switchMode = (newModeId) => {
    if (newModeId === mode) return;
    setMode(newModeId);
    const targetConfig = newModeId === TIMER_MODES.FOCUS.id ? TIMER_MODES.FOCUS : TIMER_MODES.SHORT_BREAK;
    setTimeRemaining(targetConfig.seconds);
  };

  const totalDuration = mode === TIMER_MODES.FOCUS.id ? TIMER_MODES.FOCUS.seconds : TIMER_MODES.SHORT_BREAK.seconds;
  const progressPercent = Math.min(100, Math.max(0, Math.round(((totalDuration - timeRemaining) / totalDuration) * 100)));

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return {
    mode,
    isRunning,
    timeRemaining,
    formattedTime: formatTime(timeRemaining),
    progressPercent,
    sessionsCompleted,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
    totalDuration,
  };
};
