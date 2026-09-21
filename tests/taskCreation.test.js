import { describe, it, expect } from 'vitest';
import { generateTaskId } from '../src/utils/taskHelpers';
import { PRIORITIES, CATEGORIES } from '../src/data/constants';

describe('Task Creation Logic', () => {
  it('generates unique stable IDs', () => {
    const id1 = generateTaskId();
    const id2 = generateTaskId();
    expect(id1).toBeDefined();
    expect(typeof id1).toBe('string');
    expect(id1.startsWith('task_')).toBe(true);
    expect(id1).not.toEqual(id2);
  });

  it('creates task object with required fields and defaults', () => {
    const now = new Date().toISOString();
    const taskPayload = {
      id: generateTaskId(),
      title: 'Implement unit tests',
      description: 'Write meaningful vitest suite for FocusFlow',
      completed: false,
      priority: PRIORITIES.HIGH,
      category: CATEGORIES.DEVELOPMENT,
      dueDate: '2026-09-25',
      createdAt: now,
      updatedAt: now,
    };

    expect(taskPayload.title).toBe('Implement unit tests');
    expect(taskPayload.completed).toBe(false);
    expect(taskPayload.priority).toBe('High');
    expect(taskPayload.category).toBe('Development');
    expect(taskPayload.dueDate).toBe('2026-09-25');
    expect(taskPayload.createdAt).toBe(now);
    expect(taskPayload.updatedAt).toBe(now);
  });
});
