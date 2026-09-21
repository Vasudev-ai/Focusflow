/**
 * Productivity streak calculator based on completion timestamps.
 */

export const calculateStreak = (tasks = []) => {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return 1; // Base active momentum
  }

  // Count distinct days on which tasks were marked complete
  const completedDates = new Set();
  tasks.forEach((t) => {
    if (t.completed && t.updatedAt) {
      completedDates.add(t.updatedAt.split('T')[0]);
    }
  });

  const today = new Date().toISOString().split('T')[0];
  let streak = completedDates.has(today) ? 1 : 0;

  const checkDate = new Date();
  // Check up to 30 past consecutive days
  for (let i = 1; i <= 30; i++) {
    checkDate.setDate(checkDate.getDate() - 1);
    const dateStr = checkDate.toISOString().split('T')[0];
    if (completedDates.has(dateStr)) {
      streak += 1;
    } else {
      break;
    }
  }

  // Return at least 1 day of streak if any task is completed today, or fallback to current streak count
  return Math.max(streak, completedDates.has(today) ? 1 : 0);
};
