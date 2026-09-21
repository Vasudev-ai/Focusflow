import { describe, it, expect } from 'vitest';
import { sortTasks } from '../src/utils/taskHelpers';
import { PRIORITIES, SORT_OPTIONS } from '../src/data/constants';

describe('Task Sorting Logic', () => {
  const testTasks = [
    {
      id: 'task-a',
      title: 'Task A',
      priority: PRIORITIES.LOW,
      dueDate: '2026-09-30',
      createdAt: '2026-09-18T10:00:00.000Z',
    },
    {
      id: 'task-b',
      title: 'Task B',
      priority: PRIORITIES.HIGH,
      dueDate: '2026-09-21',
      createdAt: '2026-09-20T10:00:00.000Z',
    },
    {
      id: 'task-c',
      title: 'Task C',
      priority: PRIORITIES.MEDIUM,
      dueDate: '2026-09-25',
      createdAt: '2026-09-19T10:00:00.000Z',
    },
  ];

  it('sorts by newest first', () => {
    const sorted = sortTasks(testTasks, SORT_OPTIONS.NEWEST);
    expect(sorted.map((t) => t.id)).toEqual(['task-b', 'task-c', 'task-a']);
  });

  it('sorts by oldest first', () => {
    const sorted = sortTasks(testTasks, SORT_OPTIONS.OLDEST);
    expect(sorted.map((t) => t.id)).toEqual(['task-a', 'task-c', 'task-b']);
  });

  it('sorts by priority (High > Medium > Low)', () => {
    const sorted = sortTasks(testTasks, SORT_OPTIONS.PRIORITY);
    expect(sorted.map((t) => t.id)).toEqual(['task-b', 'task-c', 'task-a']);
  });

  it('sorts by due date chronologically', () => {
    const sorted = sortTasks(testTasks, SORT_OPTIONS.DUE_DATE);
    expect(sorted.map((t) => t.id)).toEqual(['task-b', 'task-c', 'task-a']);
  });
});
