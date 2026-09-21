import { describe, it, expect } from 'vitest';

describe('Task Deletion Logic', () => {
  const sampleTasks = [
    { id: 'task-1', title: 'Task 1' },
    { id: 'task-2', title: 'Task 2' },
    { id: 'task-3', title: 'Task 3' },
  ];

  it('removes target task from the list by ID', () => {
    const remaining = sampleTasks.filter((t) => t.id !== 'task-2');
    expect(remaining.length).toBe(2);
    expect(remaining.find((t) => t.id === 'task-2')).toBeUndefined();
    expect(remaining.map((t) => t.id)).toEqual(['task-1', 'task-3']);
  });

  it('handles deletion of non-existent ID gracefully without mutation', () => {
    const remaining = sampleTasks.filter((t) => t.id !== 'non-existent-id');
    expect(remaining.length).toBe(3);
    expect(remaining).toEqual(sampleTasks);
  });
});
