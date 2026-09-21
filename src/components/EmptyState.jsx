import React from 'react';
import { ClipboardList, SearchX, CheckCircle2, CalendarCheck2 } from 'lucide-react';

export const EmptyState = ({
  type = 'no-tasks',
  searchQuery = '',
  onAction,
  actionLabel,
}) => {
  const configs = {
    'no-tasks': {
      icon: ClipboardList,
      title: 'No tasks found',
      description: 'Your workspace is clear. Create your first task to start planning your workflow.',
      defaultAction: 'Create New Task',
    },
    'no-search-results': {
      icon: SearchX,
      title: 'No matching tasks found',
      description: searchQuery
        ? `We couldn't find any tasks matching "${searchQuery}". Try a different keyword.`
        : 'No tasks match your search criteria.',
      defaultAction: 'Clear Search',
    },
    'no-completed-tasks': {
      icon: CheckCircle2,
      title: 'No completed tasks yet',
      description: 'Check off your tasks as you finish them to build momentum and track your output.',
      defaultAction: null,
    },
    'no-tasks-today': {
      icon: CalendarCheck2,
      title: 'No tasks due today',
      description: 'You have no scheduled deadlines for today. Plan ahead or take on high-priority items.',
      defaultAction: 'Add Task for Today',
    },
  };

  const config = configs[type] || configs['no-tasks'];
  const Icon = config.icon;

  return (
    <div
      id={`empty-state-${type}`}
      className="flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 my-4"
    >
      <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-3 text-zinc-500 dark:text-zinc-400">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
        {config.title}
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-4 leading-relaxed">
        {config.description}
      </p>
      {onAction && (actionLabel || config.defaultAction) && (
        <button
          id={`empty-state-action-btn-${type}`}
          type="button"
          onClick={onAction}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
        >
          {actionLabel || config.defaultAction}
        </button>
      )}
    </div>
  );
};
