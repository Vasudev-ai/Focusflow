import React from 'react';
import { Plus, CheckSquare } from 'lucide-react';
import { TaskFilters } from '../components/TaskFilters';
import { TaskList } from '../components/TaskList';

export const TasksView = ({
  tasks = [],
  filteredTasks = [],
  searchQuery = '',
  onSearchChange = () => {},
  filter = 'all',
  onFilterChange = () => {},
  category = 'all',
  onCategoryChange = () => {},
  sortBy = 'newest',
  onSortChange = () => {},
  onToggleComplete = () => {},
  onEditTask = () => {},
  onDeleteTask = () => {},
  onOpenCreateModal = () => {},
} = {}) => {
  return (
    <div id="tasks-view" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
            <span>Task Manager</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Organize, prioritize, and track your deliverables across all projects.
          </p>
        </div>

        <button
          id="tasks-view-create-btn"
          type="button"
          onClick={onOpenCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Filters, Search & Sorting Bar */}
      <TaskFilters
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        filter={filter}
        onFilterChange={onFilterChange}
        category={category}
        onCategoryChange={onCategoryChange}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        allTasksCount={tasks.length}
        searchQuery={searchQuery}
        filter={filter}
        onToggleComplete={onToggleComplete}
        onEdit={onEditTask}
        onDelete={onDeleteTask}
        onOpenCreateModal={onOpenCreateModal}
        onClearSearch={() => onSearchChange('')}
      />
    </div>
  );
};

export default TasksView;
