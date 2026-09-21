import { useMemo } from 'react';
import { calculateStreak } from '../utils/streakHelpers';
import { isDueToday } from '../utils/dateHelpers';
import { CATEGORIES, PRIORITIES } from '../data/constants';

export const useProductivity = (tasks = [], sessionsCompleted = 0) => {
  return useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Today's completed tasks
    const todayTasks = tasks.filter((t) => isDueToday(t.dueDate));
    const todayCompleted = todayTasks.filter((t) => t.completed).length;

    // Calculate streak
    const streak = calculateStreak(tasks);

    // Distribution by category
    const categoryCounts = Object.values(CATEGORIES).reduce((acc, cat) => {
      const catTasks = tasks.filter((t) => t.category === cat);
      acc[cat] = {
        total: catTasks.length,
        completed: catTasks.filter((t) => t.completed).length,
      };
      return acc;
    }, {});

    // Distribution by priority
    const priorityCounts = Object.values(PRIORITIES).reduce((acc, prio) => {
      const prioTasks = tasks.filter((t) => t.priority === prio);
      acc[prio] = {
        total: prioTasks.length,
        completed: prioTasks.filter((t) => t.completed).length,
      };
      return acc;
    }, {});

    return {
      total,
      completed,
      pending,
      completionRate,
      todayTotal: todayTasks.length,
      todayCompleted,
      streak,
      sessionsCompleted,
      categoryCounts,
      priorityCounts,
    };
  }, [tasks, sessionsCompleted]);
};
