export const PRIORITIES = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

export const CATEGORIES = {
  STUDY: 'Study',
  DEVELOPMENT: 'Development',
  PERSONAL: 'Personal',
  WORK: 'Work',
  OTHER: 'Other',
};

export const FILTER_OPTIONS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  HIGH_PRIORITY: 'high_priority',
};

export const SORT_OPTIONS = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  PRIORITY: 'priority',
  DUE_DATE: 'dueDate',
};

export const TIMER_MODES = {
  FOCUS: {
    id: 'focus',
    label: 'Focus Session',
    durationMinutes: 25,
    seconds: 25 * 60,
  },
  SHORT_BREAK: {
    id: 'short_break',
    label: 'Short Break',
    durationMinutes: 5,
    seconds: 5 * 60,
  },
};

export const STORAGE_KEYS = {
  TASKS: 'focusflow_tasks_v1',
  THEME: 'focusflow_theme_v1',
  POMODORO_SESSIONS: 'focusflow_pomodoro_sessions_v1',
  STREAK: 'focusflow_streak_v1',
};
