import React from 'react';
import { Play, Pause, RotateCcw, Flame, Sparkles } from 'lucide-react';
import { TIMER_MODES } from '../data/constants';

export const PomodoroTimer = ({
  timerState,
  onStart,
  onPause,
  onReset,
  onSwitchMode,
  compact = false,
}) => {
  const {
    mode,
    isRunning,
    formattedTime,
    progressPercent,
    sessionsCompleted,
  } = timerState;

  return (
    <div
      id="pomodoro-timer-card"
      className={`rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs transition-all ${
        compact ? 'p-4' : 'p-6 sm:p-8'
      }`}
    >
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span>Focus Session</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-2xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/80">
              <Flame className="w-3 h-3 text-amber-500" />
              {sessionsCompleted} completed
            </span>
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Structured intervals for distraction-free deep work.
          </p>
        </div>

        {/* Mode toggle pills */}
        <div className="inline-flex p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/70 border border-zinc-200/50 dark:border-zinc-700/50 self-start sm:self-auto">
          <button
            id="timer-mode-focus"
            type="button"
            onClick={() => onSwitchMode(TIMER_MODES.FOCUS.id)}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              mode === TIMER_MODES.FOCUS.id
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            25m Focus
          </button>
          <button
            id="timer-mode-break"
            type="button"
            onClick={() => onSwitchMode(TIMER_MODES.SHORT_BREAK.id)}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              mode === TIMER_MODES.SHORT_BREAK.id
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            5m Break
          </button>
        </div>
      </div>

      {/* Timer Display */}
      <div className="flex flex-col items-center justify-center py-4 sm:py-6">
        {/* Large Digits */}
        <div
          id="timer-countdown-display"
          className="text-5xl sm:text-6xl md:text-7xl font-mono font-bold tracking-tight text-zinc-900 dark:text-zinc-50 select-none mb-3"
        >
          {formattedTime}
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-6">
          <div
            className={`h-full transition-all duration-300 rounded-full ${
              mode === TIMER_MODES.FOCUS.id
                ? 'bg-zinc-900 dark:bg-zinc-100'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {isRunning ? (
            <button
              id="timer-pause-btn"
              type="button"
              onClick={onPause}
              aria-label="Pause timer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
            >
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              id="timer-start-btn"
              type="button"
              onClick={onStart}
              aria-label="Start timer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start</span>
            </button>
          )}

          <button
            id="timer-reset-btn"
            type="button"
            onClick={onReset}
            aria-label="Reset timer to beginning"
            className="inline-flex items-center justify-center p-2.5 text-sm font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Helpful Focus Tip */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 mt-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        <span>
          {mode === TIMER_MODES.FOCUS.id
            ? 'Tip: Silence non-critical notifications. Focus on one single task until the bell rings.'
            : 'Break time: Stand up, grab a glass of water, and stretch your shoulders.'}
        </span>
      </div>
    </div>
  );
};
