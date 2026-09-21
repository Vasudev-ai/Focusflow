import React from 'react';
import {
  Trophy,
  Flame,
  CheckCircle2,
  Timer,
  PieChart,
  BarChart2,
} from 'lucide-react';

export const ProductivityStats = ({ productivityData }) => {
  const {
    total,
    completed,
    completionRate,
    todayCompleted,
    streak,
    sessionsCompleted,
    categoryCounts = {},
    priorityCounts = {},
  } = productivityData;

  return (
    <div id="productivity-stats-wrapper" className="space-y-6">
      {/* 4 Core Highlight Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Completed Today */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Completed Today
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {todayCompleted}
          </div>
          <p className="text-2xs text-zinc-400 dark:text-zinc-500 mt-1">
            Tasks finished today
          </p>
        </div>

        {/* Completion Rate */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Completion Rate
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
              <Trophy className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {completionRate}%
          </div>
          <p className="text-2xs text-zinc-400 dark:text-zinc-500 mt-1">
            {completed} of {total} total resolved
          </p>
        </div>

        {/* Focus Sessions */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Focus Sessions
            </span>
            <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
              <Timer className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {sessionsCompleted}
          </div>
          <p className="text-2xs text-zinc-400 dark:text-zinc-500 mt-1">
            ~{sessionsCompleted * 25} mins deep work
          </p>
        </div>

        {/* Current Streak */}
        <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Current Streak
            </span>
            <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <Flame className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {streak} {streak === 1 ? 'day' : 'days'}
          </div>
          <p className="text-2xs text-zinc-400 dark:text-zinc-500 mt-1">
            Active daily momentum
          </p>
        </div>
      </div>

      {/* Breakdown Grid: Category & Priority */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Breakdown */}
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-4 h-4 text-zinc-400" />
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Tasks by Category
            </h4>
          </div>

          <div className="space-y-3">
            {Object.entries(categoryCounts).map(([cat, data]) => {
              const pct = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      {cat}
                    </span>
                    <span className="text-zinc-400">
                      {data.completed}/{data.total} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-zinc-800 dark:bg-zinc-200 rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-4 h-4 text-zinc-400" />
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Tasks by Priority
            </h4>
          </div>

          <div className="space-y-3">
            {Object.entries(priorityCounts).map(([prio, data]) => {
              const pct = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;
              const colorClass =
                prio === 'High'
                  ? 'bg-rose-500'
                  : prio === 'Medium'
                  ? 'bg-amber-500'
                  : 'bg-emerald-500';

              return (
                <div key={prio} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      {prio} Priority
                    </span>
                    <span className="text-zinc-400">
                      {data.completed}/{data.total} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colorClass} rounded-full transition-all duration-300`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
