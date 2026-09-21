import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { DashboardStats } from '../components/DashboardStats';
import { PomodoroTimer } from '../components/PomodoroTimer';
import { TaskItem } from '../components/TaskItem';
import { EmptyState } from '../components/EmptyState';
import { PRIORITIES } from '../data/constants';

export const DashboardView = ({
  tasks = [],
  stats = { pending: 0, highPriority: 0, completed: 0, total: 0 },
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
  onToggleComplete = () => {},
  onEditTask = () => {},
  onDeleteTask = () => {},
  onOpenCreateModal = () => {},
  onNavigateToTasks = () => {},
} = {}) => {
  // Top 4 active/pending tasks, prioritizing high priority
  const activeTasks = tasks
    .filter((t) => !t.completed)
    .sort((a, b) => {
      if (a.priority === PRIORITIES.HIGH && b.priority !== PRIORITIES.HIGH) return -1;
      if (a.priority !== PRIORITIES.HIGH && b.priority === PRIORITIES.HIGH) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, 4);

  return (
    <div id="dashboard-view" className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-zinc-900 text-white dark:bg-zinc-900 dark:border dark:border-zinc-800 shadow-xs">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Welcome back to FocusFlow</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
            You have <strong className="text-zinc-200">{stats.pending} pending tasks</strong>, with{' '}
            <strong className="text-rose-400">{stats.highPriority} high priority</strong> needing your focus.
          </p>
        </div>

        <button
          id="dashboard-new-task-cta"
          type="button"
          onClick={onOpenCreateModal}
          className="self-start sm:self-auto px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-white text-zinc-950 hover:bg-zinc-100 transition-colors shadow-xs"
        >
          Add New Task
        </button>
      </div>

      {/* 6 Core Metrics Grid */}
      <DashboardStats stats={stats} />

      {/* 2-Column Split: Active Tasks & Pomodoro Quick Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Tasks (8 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Action Items
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Prioritized tasks awaiting your attention
              </p>
            </div>

            <button
              id="view-all-tasks-link"
              type="button"
              onClick={onNavigateToTasks}
              className="inline-flex items-center gap-1 text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              <span>View all ({tasks.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {activeTasks.length === 0 ? (
            <EmptyState
              type={tasks.length === 0 ? 'no-tasks' : 'no-completed-tasks'}
              onAction={onOpenCreateModal}
              actionLabel="Add Next Task"
            />
          ) : (
            <div className="space-y-2">
              {activeTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Pomodoro Focus Session (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <PomodoroTimer
            timerState={timerState}
            onStart={timerActions.startTimer}
            onPause={timerActions.pauseTimer}
            onReset={timerActions.resetTimer}
            onSwitchMode={timerActions.switchMode}
            compact
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
