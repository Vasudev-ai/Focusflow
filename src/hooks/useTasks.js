import { useState, useEffect, useMemo } from 'react';
import { STORAGE_KEYS, FILTER_OPTIONS, SORT_OPTIONS } from '../data/constants';
import { INITIAL_TASKS } from '../data/initialTasks';
import { getStoredItem, setStoredItem } from '../utils/storage';
import { generateTaskId, filterTasks, sortTasks, calculateTaskStats } from '../utils/taskHelpers';

export const useTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const stored = getStoredItem(STORAGE_KEYS.TASKS, null);
    if (stored && Array.isArray(stored)) {
      return stored;
    }
    return INITIAL_TASKS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState(FILTER_OPTIONS.ALL);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NEWEST);

  // Sync tasks to localStorage whenever they change
  useEffect(() => {
    setStoredItem(STORAGE_KEYS.TASKS, tasks);
  }, [tasks]);

  const stats = useMemo(() => {
    return calculateTaskStats(tasks);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const filtered = filterTasks(tasks, { filter, category, searchQuery });
    return sortTasks(filtered, sortBy);
  }, [tasks, filter, category, searchQuery, sortBy]);

  const createTask = (taskData) => {
    const now = new Date().toISOString();
    const newTask = {
      id: generateTaskId(),
      title: (taskData.title || '').trim(),
      description: (taskData.description || '').trim(),
      completed: false,
      priority: taskData.priority,
      category: taskData.category,
      dueDate: taskData.dueDate || '',
      createdAt: now,
      updatedAt: now,
    };

    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            ...updatedFields,
            updatedAt: new Date().toISOString(),
          };
        }
        return task;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTaskComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
            updatedAt: new Date().toISOString(),
          };
        }
        return task;
      })
    );
  };

  const resetToSampleData = () => {
    setTasks(INITIAL_TASKS);
  };

  return {
    tasks,
    filteredTasks,
    stats,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    category,
    setCategory,
    sortBy,
    setSortBy,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    resetToSampleData,
  };
};
