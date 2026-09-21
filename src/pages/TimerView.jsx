import React, { useState } from 'react';
import { Timer, CheckCircle, Target } from 'lucide-react';
import { PomodoroTimer } from '../components/PomodoroTimer';

export const TimerView = ({
  timerState = {
    mode: 'focus',
    isRunning: false,
    formattedTime: '25:00',
    progressPercent: 0,
    sessionsCompleted: 0,
  },
  timerActions = {
    startTimer: () => {},
    pauseTimer: () => {},
    resetTimer: () => {},
    switchMode: () => {},
  },
  tasks = [],
  onToggleComplete = () => {},
} = {}) => {
  const [selectedTaskId, setSelectedTaskId] = useState('');

  const pendingTasks = tasks.filter((t) => !t.completed);
  const selectedTask = pendingTasks.find((t) => t.id === selectedTaskId);

  return (
    <div id="timer-view" className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center sm:text-left pb-2 border-b border-zinc-100 dark:border-zinc-800">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center justify-center sm:justify-start gap-2">
          <Timer className="w-5 h-5 text-amber-500" />
          <span>Focus Room</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
          Eliminate multitasking with timed sprints and deliberate rest intervals.
        </p>
      </div>

      {/* Target Task Selector */}
      {pendingTasks.length > 0 && (
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-zinc-400" />
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Focus Objective:
            </span>
          </div>

          <div className="flex-1 max-w-md">
            <select
              id="focus-target-task-select"
              value={selectedTaskId}
              onChange={(e) => setSelectedTaskId(e.target.value)}
              className="w-full px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-colors"
            >
              <option value="">General Deep Work (No specific task)</option>
              {pendingTasks.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.priority === 'High' ? '🔴 ' : ''}
                  {t.title}
                </option>
              ))}
            </select>
          </div>

          {selectedTask && (
            <button
              type="button"
              onClick={() => {
                onToggleComplete(selectedTask.id);
                setSelectedTaskId('');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 transition-colors shrink-0"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Mark Done</span>
            </button>
          )}
        </div>
      )}

      {/* Full Timer Component */}
      <PomodoroTimer
        timerState={timerState}
        onStart={timerActions.startTimer}
        onPause={timerActions.pauseTimer}
        onReset={timerActions.resetTimer}
        onSwitchMode={timerActions.switchMode}
      />

      {/* Pomodoro Technique Explanation Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-900/30">
          <span className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">
            1. Single-Task Sprint
          </span>
          Commit to one specific deliverable for 25 uninterrupted minutes.
        </div>
        <div className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-900/30">
          <span className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">
            2. 5-Minute Recharge
          </span>
          Disconnect completely from your screen to restore cognitive bandwidth.
        </div>
        <div className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-900/30">
          <span className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">
            3. Stack Momentum
          </span>
          After four cycles, reward yourself with a longer 15–30 minute break.
        </div>
      </div>
    </div>
  );
};

export default TimerView;
