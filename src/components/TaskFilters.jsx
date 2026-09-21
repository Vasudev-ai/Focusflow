import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { FILTER_OPTIONS, SORT_OPTIONS, CATEGORIES } from '../data/constants';

export const TaskFilters = ({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
}) => {
  const filterTabs = [
    { id: FILTER_OPTIONS.ALL, label: 'All' },
    { id: FILTER_OPTIONS.ACTIVE, label: 'Active' },
    { id: FILTER_OPTIONS.COMPLETED, label: 'Completed' },
    { id: FILTER_OPTIONS.HIGH_PRIORITY, label: 'High Priority' },
  ];

  return (
    <div id="task-filters-container" className="space-y-4 mb-6">
      {/* Search and Sort row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500 pointer-events-none" />
          <input
            id="task-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks by title..."
            className="w-full pl-9 pr-9 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-colors"
          />
          {searchQuery && (
            <button
              id="clear-search-btn"
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search input"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category selector & Sort selector */}
        <div className="flex items-center gap-2">
          {/* Category filter */}
          <div className="relative flex items-center">
            <SlidersHorizontal className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 pointer-events-none" />
            <select
              id="task-category-select"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              aria-label="Filter tasks by category"
              className="pl-8 pr-7 py-2 text-xs sm:text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-colors appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {Object.values(CATEGORIES).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort selector */}
          <div className="relative flex items-center">
            <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 pointer-events-none" />
            <select
              id="task-sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sort tasks order"
              className="pl-8 pr-7 py-2 text-xs sm:text-sm rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 transition-colors appearance-none cursor-pointer"
            >
              <option value={SORT_OPTIONS.NEWEST}>Newest</option>
              <option value={SORT_OPTIONS.OLDEST}>Oldest</option>
              <option value={SORT_OPTIONS.PRIORITY}>Priority</option>
              <option value={SORT_OPTIONS.DUE_DATE}>Due Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-zinc-100 dark:border-zinc-800 scrollbar-none">
        {filterTabs.map((tab) => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              id={`filter-tab-${tab.id}`}
              type="button"
              onClick={() => onFilterChange(tab.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/60'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
