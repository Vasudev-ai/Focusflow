import React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ListTodo,
  TrendingUp,
  CalendarCheck,
} from 'lucide-react';

export const DashboardStats = ({ stats }) => {
  const {
    total = 0,
    completed = 0,
    pending = 0,
    highPriority = 0,
    todayTotal = 0,
    todayCompleted = 0,
    todayProgressPercent = 0,
    productivityPercentage = 0,
  } = stats || {};

  const statItems = [
    {
      id: 'stat-total',
      label: 'Total Tasks',
      value: total,
      sublabel: `${pending} remaining`,
      icon: ListTodo,
      iconColor: 'text-zinc-700 dark:text-zinc-300',
      bgColor: 'bg-zinc-100 dark:bg-zinc-800/80',
    },
    {
      id: 'stat-completed',
      label: 'Completed',
      value: completed,
      sublabel: `${productivityPercentage}% of all tasks`,
      icon: CheckCircle2,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      id: 'stat-pending',
      label: 'Pending Tasks',
      value: pending,
      sublabel: 'Awaiting execution',
      icon: Clock,
      iconColor: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/40',
    },
    {
      id: 'stat-high-priority',
      label: 'High Priority',
      value: highPriority,
      sublabel: 'Requires immediate focus',
      icon: AlertTriangle,
      iconColor: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-950/40',
    },
    {
      id: 'stat-today-progress',
      label: "Today's Progress",
      value: `${todayCompleted}/${todayTotal}`,
      sublabel: `${todayProgressPercent}% scheduled today`,
      progress: todayProgressPercent,
      icon: CalendarCheck,
      iconColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/40',
    },
    {
      id: 'stat-productivity',
      label: 'Productivity Rate',
      value: `${productivityPercentage}%`,
      sublabel: total > 0 ? 'Overall efficiency score' : 'Add tasks to measure',
      progress: productivityPercentage,
      icon: TrendingUp,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/40',
    },
  ];

  return (
    <div
      id="dashboard-stats-grid"
      className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 mb-6"
    >
      {statItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            id={item.id}
            className="flex flex-col justify-between p-3.5 sm:p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate">
                {item.label}
              </span>
              <div className={`p-1.5 rounded-lg ${item.bgColor} shrink-0`}>
                <Icon className={`w-3.5 h-3.5 ${item.iconColor}`} />
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-1">
                {item.value}
              </div>

              {item.progress !== undefined ? (
                <div className="space-y-1">
                  <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <p className="text-2xs text-zinc-400 dark:text-zinc-500 truncate">
                    {item.sublabel}
                  </p>
                </div>
              ) : (
                <p className="text-2xs text-zinc-400 dark:text-zinc-500 truncate">
                  {item.sublabel}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
