import { describe, it, expect } from 'vitest';
import { filterTasks } from '../src/utils/taskHelpers';
import { PRIORITIES, CATEGORIES, FILTER_OPTIONS } from '../src/data/constants';

describe('Task Filtering Logic', () => {
  const testTasks = [
    {
      id: '1',
      title: 'Write unit tests',
      completed: false,
      priority: PRIORITIES.HIGH,
      category: CATEGORIES.DEVELOPMENT,
    },
    {
      id: '2',
      title: 'Math homework chapter 4',
      completed: true,
      priority: PRIORITIES.MEDIUM,
      category: CATEGORIES.STUDY,
    },
    {
      id: '3',
      title: 'Work team meeting preparation',
      completed: false,
      priority: PRIORITIES.HIGH,
      category: CATEGORIES.WORK,
    },
    {
      id: '4',
      title: 'Gym workout routine',
      completed: true,
      priority: PRIORITIES.LOW,
      category: CATEGORIES.PERSONAL,
    },
  ];

  it('filters all tasks', () => {
    const result = filterTasks(testTasks, { filter: FILTER_OPTIONS.ALL });
    expect(result.length).toBe(4);
  });

  it('filters active tasks', () => {
    const result = filterTasks(testTasks, { filter: FILTER_OPTIONS.ACTIVE });
    expect(result.length).toBe(2);
    expect(result.every((t) => !t.completed)).toBe(true);
  });

  it('filters completed tasks', () => {
    const result = filterTasks(testTasks, { filter: FILTER_OPTIONS.COMPLETED });
    expect(result.length).toBe(2);
    expect(result.every((t) => t.completed)).toBe(true);
  });

  it('filters high priority tasks', () => {
    const result = filterTasks(testTasks, { filter: FILTER_OPTIONS.HIGH_PRIORITY });
    expect(result.length).toBe(2);
    expect(result.every((t) => t.priority === PRIORITIES.HIGH)).toBe(true);
  });

  it('filters by category', () => {
    const result = filterTasks(testTasks, { category: CATEGORIES.DEVELOPMENT });
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Write unit tests');
  });

  it('filters by search title query case-insensitively', () => {
    const result = filterTasks(testTasks, { searchQuery: 'math' });
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('2');
  });
});
