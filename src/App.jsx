'use client';

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { TaskFormModal } from './components/TaskFormModal';
import { DashboardView } from './pages/DashboardView';
import { TasksView } from './pages/TasksView';
import { TimerView } from './pages/TimerView';
import { StatsView } from './pages/StatsView';

import { useTheme } from './hooks/useTheme';
import { useTasks } from './hooks/useTasks';
import { useTimer } from './hooks/useTimer';
import { useProductivity } from './hooks/useProductivity';

export const App = () => {
  const { theme, toggleTheme } = useTheme();
  const [currentView, setCurrentView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  // Hooks
  const {
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
  } = useTasks();

  const timer = useTimer();
  const productivity = useProductivity(tasks, timer.sessionsCompleted);

  // Modal Handlers
  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleModalSubmit = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      showToast('Task updated successfully');
    } else {
      createTask(taskData);
      showToast('New task added to workspace');
    }
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
    showToast('Task removed');
  };

  const handleResetData = () => {
    resetToSampleData();
    showToast('Demo tasks reset');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors">
      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCreateModal={handleOpenCreateModal}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
        onResetDemoData={handleResetData}
      />

      {/* Main Body with Sidebar + View */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={setCurrentView}
          categoryFilter={category}
          onSelectCategory={setCategory}
          tasks={tasks}
          sessionsCompleted={timer.sessionsCompleted}
          streak={productivity.streak}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {currentView === 'dashboard' && (
            <DashboardView
              tasks={tasks}
              stats={stats}
              timerState={timer}
              timerActions={timer}
              onToggleComplete={toggleTaskComplete}
              onEditTask={handleOpenEditModal}
              onDeleteTask={handleDeleteTask}
              onOpenCreateModal={handleOpenCreateModal}
              onNavigateToTasks={() => setCurrentView('tasks')}
            />
          )}

          {currentView === 'tasks' && (
            <TasksView
              tasks={tasks}
              filteredTasks={filteredTasks}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filter={filter}
              onFilterChange={setFilter}
              category={category}
              onCategoryChange={setCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onToggleComplete={toggleTaskComplete}
              onEditTask={handleOpenEditModal}
              onDeleteTask={handleDeleteTask}
              onOpenCreateModal={handleOpenCreateModal}
            />
          )}

          {currentView === 'timer' && (
            <TimerView
              timerState={timer}
              timerActions={timer}
              tasks={tasks}
              onToggleComplete={toggleTaskComplete}
            />
          )}

          {currentView === 'analytics' && (
            <StatsView productivityData={productivity} />
          )}
        </main>
      </div>

      {/* Task Creation & Edit Modal */}
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialTask={editingTask}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          id="focusflow-toast"
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs sm:text-sm font-medium shadow-lg border border-zinc-700/40 dark:border-zinc-300 animate-in fade-in slide-in-from-bottom-2 duration-150"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default App;
