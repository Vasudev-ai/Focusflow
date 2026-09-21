import { describe, it, expect } from 'vitest';

describe('Task Completion Logic', () => {
  const initialTasks = [
    {
      id: 'task-1',
      title: 'Review PR',
      completed: false,
      updatedAt: '2026-09-20T10:00:00.000Z',
    },
    {
      id: 'task-2',
      title: 'Fix issue',
      completed: true,
      updatedAt: '2026-09-20T11:00:00.000Z',
    },
  ];

  it('toggles an uncompleted task to completed and updates timestamp', () => {
    const targetId = 'task-1';
    const updated = initialTasks.map((task) => {
      if (task.id === targetId) {
        return {
          ...task,
          completed: !task.completed,
          updatedAt: new Date().toISOString(),
        };
      }
      return task;
    });

    const target = updated.find((t) => t.id === targetId);
    expect(target.completed).toBe(true);
    expect(target.updatedAt).not.toBe(initialTasks[0].updatedAt);
  });

  it('toggles a completed task back to incomplete', () => {
    const targetId = 'task-2';
    const updated = initialTasks.map((task) => {
      if (task.id === targetId) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });

    const target = updated.find((t) => t.id === targetId);
    expect(target.completed).toBe(false);
  });
});
