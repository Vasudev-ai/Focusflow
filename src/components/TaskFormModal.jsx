import React, { useState } from 'react';
import { X, Calendar, Tag, AlertTriangle } from 'lucide-react';
import { PRIORITIES, CATEGORIES } from '../data/constants';
import { getTodayString } from '../utils/dateHelpers';

const TaskFormContent = ({ initialTask, onClose, onSubmit }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [priority, setPriority] = useState(initialTask?.priority || PRIORITIES.MEDIUM);
  const [category, setCategory] = useState(initialTask?.category || CATEGORIES.DEVELOPMENT);
  const [dueDate, setDueDate] = useState(initialTask?.dueDate || getTodayString());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate,
    });
    onClose();
  };

  const isFormValid = title.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      {/* Title input */}
      <div>
        <label
          htmlFor="task-title-input"
          className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
        >
          Task Title <span className="text-rose-500">*</span>
        </label>
        <input
          id="task-title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Review PR for auth module"
          autoFocus
          className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-colors"
        />
      </div>

      {/* Description input */}
      <div>
        <label
          htmlFor="task-desc-input"
          className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
        >
          Description <span className="text-zinc-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="task-desc-input"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add key context, links, or checklist items..."
          className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-colors resize-none"
        />
      </div>

      {/* Priority, Category, Due Date Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Priority */}
        <div>
          <label
            htmlFor="task-priority-input"
            className="flex items-center gap-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-zinc-400" />
            Priority
          </label>
          <select
            id="task-priority-input"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-colors cursor-pointer"
          >
            {Object.values(PRIORITIES).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="task-category-input"
            className="flex items-center gap-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
          >
            <Tag className="w-3.5 h-3.5 text-zinc-400" />
            Category
          </label>
          <select
            id="task-category-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-colors cursor-pointer"
          >
            {Object.values(CATEGORIES).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label
            htmlFor="task-due-date-input"
            className="flex items-center gap-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            Due Date
          </label>
          <input
            id="task-due-date-input"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-colors"
          />
        </div>
      </div>

      {/* Modal Footer */}
      <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2">
        <button
          id="cancel-modal-btn"
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-xs sm:text-sm font-medium rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          Cancel
        </button>
        <button
          id="submit-task-btn"
          type="submit"
          disabled={!isFormValid}
          className="px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs"
        >
          {initialTask ? 'Update Task' : 'Save Task'}
        </button>
      </div>
    </form>
  );
};

export const TaskFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialTask = null,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="task-form-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/50 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
    >
      <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <h3
            id="task-modal-title"
            className="text-base font-semibold text-zinc-900 dark:text-zinc-100"
          >
            {initialTask ? 'Edit Task' : 'Create New Task'}
          </h3>
          <button
            id="close-modal-btn"
            type="button"
            onClick={onClose}
            aria-label="Close modal dialog"
            className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body keyed by initialTask */}
        <TaskFormContent
          key={initialTask ? initialTask.id : 'new-task'}
          initialTask={initialTask}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default TaskFormModal;
