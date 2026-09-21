import { PRIORITIES, CATEGORIES } from './constants';

export const INITIAL_TASKS = [
  {
    id: 'task-init-1',
    title: 'Review system design for new distributed API module',
    description: 'Go over caching strategy, rate limits, and latency budgets for upcoming services.',
    completed: false,
    priority: PRIORITIES.HIGH,
    category: CATEGORIES.DEVELOPMENT,
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'task-init-2',
    title: 'Complete chapter 4 on discrete math & graphs',
    description: 'Work through problem set 4.2 focusing on topological sort and cycle detection.',
    completed: false,
    priority: PRIORITIES.MEDIUM,
    category: CATEGORIES.STUDY,
    dueDate: new Date().toISOString().split('T')[0], // Today
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'task-init-3',
    title: 'Refactor state persistence helper to handle JSON errors',
    description: 'Ensure corrupted localStorage data does not crash the client application.',
    completed: true,
    priority: PRIORITIES.HIGH,
    category: CATEGORIES.DEVELOPMENT,
    dueDate: new Date().toISOString().split('T')[0], // Today
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-init-4',
    title: 'Afternoon hydration and posture reset',
    description: 'Step away from monitors for 10 minutes, stretch lower back, and hydrate.',
    completed: true,
    priority: PRIORITIES.LOW,
    category: CATEGORIES.PERSONAL,
    dueDate: new Date().toISOString().split('T')[0], // Today
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-init-5',
    title: 'Prepare quarterly OKR update for engineering team sync',
    description: 'Summarize migration timeline, latency benchmarks, and upcoming deliverables.',
    completed: false,
    priority: PRIORITIES.HIGH,
    category: CATEGORIES.WORK,
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];
