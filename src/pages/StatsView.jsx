import React from 'react';
import { BarChart3 } from 'lucide-react';
import { ProductivityStats } from '../components/ProductivityStats';

export const StatsView = ({
  productivityData = {
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0,
    todayTotal: 0,
    todayCompleted: 0,
    streak: 0,
    sessionsCompleted: 0,
    categoryCounts: {},
    priorityCounts: {},
  },
} = {}) => {
  return (
    <div id="stats-view" className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-zinc-100 dark:border-zinc-800">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-500" />
          <span>Productivity Analytics</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
          Real-time metrics on your throughput, focus sessions, and active work habits.
        </p>
      </div>

      {/* Analytics Visualizer */}
      <ProductivityStats productivityData={productivityData} />
    </div>
  );
};

export default StatsView;
