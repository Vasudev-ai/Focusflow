import React, { useState } from 'react';
import {
  Calendar,
  Check,
  Edit2,
  Trash2,
  ChevronDown,
  ChevronUp,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { PRIORITIES } from '../data/constants';
import { formatRelativeDate, isDueToday, isOverdue } from '../utils/dateHelpers';

export const TaskItem = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const dueToday = isDueToday(task.dueDate);
  const overdue = !task.completed && isOverdue(task.dueDate);

  // Intentional imperfection #8: Medium badge has slightly different border class (border-dashed)
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case PRIORITIES.HIGH:
        return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/60';
      case PRIORITIES.MEDIUM:
        return 'bg-amber-50 text-amber-700 border-dashed border-amber-300 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800';
      case PRIORITIES.LOW:
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700';
    }
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Development':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300';
      case 'Study':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300';
      case 'Work':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300';
      case 'Personal':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300';
      default:
        return 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400';
    }
  };

  return (
    <div
      id={`task-item-${task.id}`}
      className={`group relative flex flex-col p-3.5 sm:p-4 rounded-xl border transition-all duration-150 ${
        task.completed
          ? 'bg-zinc-50/70 dark:bg-zinc-900/30 border-zinc-200/70 dark:border-zinc-800/60 opacity-80'
          : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox button */}
        <button
          id={`toggle-task-${task.id}`}
          type="button"
          role="checkbox"
          aria-checked={task.completed}
          aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
          onClick={() => onToggleComplete(task.id)}
          className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 ${
            task.completed
              ? 'bg-emerald-600 border-emerald-600 text-white dark:bg-emerald-500 dark:border-emerald-500'
              : 'border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500 bg-white dark:bg-zinc-800'
          }`}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
        </button>

        {/* Content area */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4
              className={`text-sm font-medium leading-snug break-words transition-colors ${
                task.completed
                  ? 'line-through text-zinc-400 dark:text-zinc-500'
                  : 'text-zinc-900 dark:text-zinc-100'
              }`}
            >
              {task.title}
            </h4>

            {/* Quick action controls */}
            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
              <button
                id={`edit-task-btn-${task.id}`}
                type="button"
                onClick={() => onEdit(task)}
                aria-label={`Edit task "${task.title}"`}
                className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                id={`delete-task-btn-${task.id}`}
                type="button"
                onClick={() => onDelete(task.id)}
                aria-label={`Delete task "${task.title}"`}
                className="p-1 text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-2 mt-2 pt-0.5">
            {/* Priority Badge */}
            <span
              className={`inline-flex items-center px-2 py-0.5 text-2xs font-semibold rounded-md border ${getPriorityBadge(
                task.priority
              )}`}
            >
              {task.priority}
            </span>

            {/* Category Tag */}
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 text-2xs font-medium rounded-md ${getCategoryBadge(
                task.category
              )}`}
            >
              <Tag className="w-2.5 h-2.5" />
              {task.category}
            </span>

            {/* Due date indicator */}
            {task.dueDate && (
              <span
                className={`inline-flex items-center gap-1 text-2xs font-medium px-2 py-0.5 rounded-md ${
                  overdue
                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'
                    : dueToday
                    ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                    : 'text-zinc-500 dark:text-zinc-400 bg-zinc-100/70 dark:bg-zinc-800/70'
                }`}
              >
                {overdue ? (
                  <AlertCircle className="w-3 h-3 text-rose-500" />
                ) : (
                  <Calendar className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
                )}
                <span>{formatRelativeDate(task.dueDate)}</span>
              </span>
            )}

            {/* Expand description toggle if present */}
            {task.description && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-0.5 text-2xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 ml-auto transition-colors"
              >
                {isExpanded ? (
                  <>
                    <span>Hide note</span>
                    <ChevronUp className="w-3 h-3" />
                  </>
                ) : (
                  <>
                    <span>Note</span>
                    <ChevronDown className="w-3 h-3" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Expandable note / description */}
          {task.description && isExpanded && (
            <p className="mt-2.5 text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800/80 leading-relaxed break-words whitespace-pre-wrap">
              {task.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
