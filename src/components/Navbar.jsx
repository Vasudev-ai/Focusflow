import React from 'react';
import {
  Plus,
  Sun,
  Moon,
  Menu,
  X,
  Layers,
  Sparkles,
} from 'lucide-react';
import { formatDate, getTodayString } from '../utils/dateHelpers';

export const Navbar = ({
  theme,
  onToggleTheme,
  onOpenCreateModal,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onResetDemoData,
}) => {
  const todayFormatted = formatDate(getTodayString());

  return (
    <header
      id="focusflow-navbar"
      className="sticky top-0 z-40 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={onToggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold shadow-xs">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-900 dark:text-zinc-50">
                  FocusFlow
                </span>
                <span className="text-3xs font-semibold px-1.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                  v0.1.0
                </span>
              </div>
              <p className="text-3xs text-zinc-400 dark:text-zinc-500 hidden sm:block">
                Open Source Productivity
              </p>
            </div>
          </div>
        </div>

        {/* Middle: Date indicator (Desktop) */}
        <div className="hidden md:flex items-center text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          <span>{todayFormatted}</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick reset sample tasks button for testing / arena contributors */}
          <button
            id="reset-demo-tasks-btn"
            type="button"
            onClick={onResetDemoData}
            title="Reset to initial sample tasks"
            className="hidden lg:inline-flex items-center gap-1 text-2xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Reset Demo</span>
          </button>

          {/* Theme toggle */}
          <button
            id="theme-toggle-btn"
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-600" />
            )}
          </button>

          {/* Create Task Button */}
          <button
            id="navbar-create-task-btn"
            type="button"
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden xs:inline">New Task</span>
          </button>
        </div>
      </div>
    </header>
  );
};
