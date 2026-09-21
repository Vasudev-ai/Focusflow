import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Timer,
  BarChart3,
  Tag,
  Flame,
} from 'lucide-react';
import { CATEGORIES } from '../data/constants';

export const Sidebar = ({
  currentView,
  onNavigate,
  categoryFilter,
  onSelectCategory,
  tasks = [],
  sessionsCompleted = 0,
  streak = 1,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Task Manager', icon: CheckSquare },
    { id: 'timer', label: 'Focus Timer', icon: Timer },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const content = (
    <div className="flex flex-col h-full justify-between p-4 space-y-6">
      <div className="space-y-6">
        {/* Main Navigation links */}
        <div>
          <span className="text-3xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-3 block mb-2">
            Navigation
          </span>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors text-left ${
                    isActive
                      ? 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-50 font-semibold'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-900/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Categories Section */}
        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-3xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Categories
            </span>
            {categoryFilter !== 'all' && (
              <button
                type="button"
                onClick={() => onSelectCategory('all')}
                className="text-3xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 underline"
              >
                Reset
              </button>
            )}
          </div>
          <div className="space-y-1">
            <button
              id="sidebar-category-all"
              type="button"
              onClick={() => {
                onSelectCategory('all');
                if (currentView !== 'tasks') onNavigate('tasks');
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg transition-colors ${
                categoryFilter === 'all'
                  ? 'bg-zinc-100/70 dark:bg-zinc-800/50 font-medium text-zinc-900 dark:text-zinc-100'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Tag className="w-3 h-3 text-zinc-400" />
                <span>All Categories</span>
              </div>
              <span className="text-2xs text-zinc-400">{totalTasks}</span>
            </button>

            {Object.values(CATEGORIES).map((cat) => {
              const count = tasks.filter((t) => t.category === cat).length;
              const isCatActive = categoryFilter === cat;
              return (
                <button
                  key={cat}
                  id={`sidebar-category-${cat.toLowerCase()}`}
                  type="button"
                  onClick={() => {
                    onSelectCategory(cat);
                    if (currentView !== 'tasks') onNavigate('tasks');
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg transition-colors ${
                    isCatActive
                      ? 'bg-zinc-100/70 dark:bg-zinc-800/50 font-medium text-zinc-900 dark:text-zinc-100'
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
                    <span>{cat}</span>
                  </div>
                  <span className="text-2xs text-zinc-400">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Momentum Card */}
      <div className="p-3.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/50 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Daily Streak</span>
          </span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">
            {streak} {streak === 1 ? 'day' : 'days'}
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-2xs text-zinc-500 dark:text-zinc-400">
            <span>Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="text-3xs text-zinc-400 dark:text-zinc-500 pt-1 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between">
          <span>Focus Sessions:</span>
          <span className="font-medium text-zinc-700 dark:text-zinc-300">{sessionsCompleted}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        id="desktop-sidebar"
        className="hidden md:flex flex-col w-60 shrink-0 border-r border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 min-h-[calc(100vh-4rem)] transition-colors"
      >
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          id="mobile-sidebar-backdrop"
          className="md:hidden fixed inset-0 z-50 bg-zinc-950/50 backdrop-blur-xs flex"
          onClick={onCloseMobile}
        >
          <aside
            id="mobile-sidebar-drawer"
            className="w-72 bg-white dark:bg-zinc-950 h-full border-r border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </aside>
        </div>
      )}
    </>
  );
};
