import React from 'react';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';
import { FILTER_OPTIONS } from '../data/constants';

export const TaskList = ({
  tasks,
  allTasksCount,
  searchQuery,
  filter,
  onToggleComplete,
  onEdit,
  onDelete,
  onOpenCreateModal,
  onClearSearch,
}) => {
  // Determine if empty and which empty state to show
  if (tasks.length === 0) {
    if (allTasksCount === 0) {
      return (
        <EmptyState
          type="no-tasks"
          onAction={onOpenCreateModal}
          actionLabel="Create Your First Task"
        />
      );
    }

    if (searchQuery && searchQuery.trim() !== '') {
      return (
        <EmptyState
          type="no-search-results"
          searchQuery={searchQuery}
          onAction={onClearSearch}
          actionLabel="Clear Search Filter"
        />
      );
    }

    if (filter === FILTER_OPTIONS.COMPLETED) {
      return <EmptyState type="no-completed-tasks" />;
    }

    // Default fallback empty state
    return (
      <EmptyState
        type="no-tasks"
        onAction={onOpenCreateModal}
        actionLabel="Add a New Task"
      />
    );
  }

  return (
    <div id="task-list-container" className="space-y-2.5">
      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1 mb-1">
        <span>
          Showing {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
          {allTasksCount > tasks.length && ` of ${allTasksCount} total`}
        </span>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
