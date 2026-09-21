/**
 * Date manipulation and formatting utilities for FocusFlow.
 */

export const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

export const isDueToday = (dueDateStr) => {
  if (!dueDateStr) return false;
  const today = getTodayString();
  return dueDateStr === today;
};

export const isOverdue = (dueDateStr) => {
  if (!dueDateStr) return false;
  const today = getTodayString();
  return dueDateStr < today;
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('-');
    if (!year || !month || !day) return dateStr;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    });
  } catch {
    return dateStr;
  }
};

export const formatRelativeDate = (dateStr) => {
  if (!dateStr) return 'No due date';
  const today = getTodayString();
  if (dateStr === today) return 'Today';
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  if (dateStr === tomorrowStr) return 'Tomorrow';

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  if (dateStr === yesterdayStr) return 'Yesterday';

  return formatDate(dateStr);
};
