import { PRIORITIES, FILTER_OPTIONS, SORT_OPTIONS } from '../data/constants';
import { isDueToday } from './dateHelpers';

export const generateTaskId = () => {
  return `task_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Filter tasks based on active filter, category selection, and search query.
 */
export const filterTasks = (tasks = [], options = {}) => {
  const { filter = FILTER_OPTIONS.ALL, category = 'all', searchQuery = '' } = options;

  if (!Array.isArray(tasks)) return [];

  return tasks.filter((task) => {
    // 1. Status Filter
    if (filter === FILTER_OPTIONS.ACTIVE && task.completed) {
      return false;
    }
    if (filter === FILTER_OPTIONS.COMPLETED && !task.completed) {
      return false;
    }
    if (filter === FILTER_OPTIONS.HIGH_PRIORITY && task.priority !== PRIORITIES.HIGH) {
      return false;
    }

    // 2. Category Filter
    if (category && category !== 'all' && task.category !== category) {
      return false;
    }

    // 3. Search Filter (by title)
    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.trim().toLowerCase();
      const titleMatch = (task.title || '').toLowerCase().includes(query);
      if (!titleMatch) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Sort tasks based on selected sorting criteria.
 */
export const sortTasks = (tasks = [], sortBy = SORT_OPTIONS.NEWEST) => {
  if (!Array.isArray(tasks)) return [];

  const priorityWeights = {
    [PRIORITIES.HIGH]: 3,
    [PRIORITIES.MEDIUM]: 2,
    [PRIORITIES.LOW]: 1,
  };

  return [...tasks].sort((a, b) => {
    switch (sortBy) {
      case SORT_OPTIONS.NEWEST:
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();

      case SORT_OPTIONS.OLDEST:
        return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();

      case SORT_OPTIONS.PRIORITY: {
        const weightA = priorityWeights[a.priority] || 0;
        const weightB = priorityWeights[b.priority] || 0;
        return weightB - weightA;
      }

      case SORT_OPTIONS.DUE_DATE: {
        // Known contribution issue: tasks with no due date ("") sort to the top due to localeCompare
        const dateA = a.dueDate || '';
        const dateB = b.dueDate || '';
        return dateA.localeCompare(dateB);
      }

      default:
        return 0;
    }
  });
};

/**
 * Calculate dashboard productivity statistics.
 */
export const calculateTaskStats = (tasks = []) => {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return {
      total: 0,
      completed: 0,
      pending: 0,
      highPriority: 0,
      todayTotal: 0,
      todayCompleted: 0,
      todayProgressPercent: 0,
      productivityPercentage: 0,
    };
  }

  const total = tasks.length;
  let completed = 0;
  let pending = 0;
  let highPriority = 0;
  let todayTotal = 0;
  let todayCompleted = 0;

  tasks.forEach((task) => {
    if (task.completed) {
      completed += 1;
    } else {
      pending += 1;
    }

    if (task.priority === PRIORITIES.HIGH && !task.completed) {
      highPriority += 1;
    }

    if (isDueToday(task.dueDate)) {
      todayTotal += 1;
      if (task.completed) {
        todayCompleted += 1;
      }
    }
  });

  const productivityPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const todayProgressPercent = todayTotal > 0 ? Math.round((todayCompleted / todayTotal) * 100) : 0;

  return {
    total,
    completed,
    pending,
    highPriority,
    todayTotal,
    todayCompleted,
    todayProgressPercent,
    productivityPercentage,
  };
};
