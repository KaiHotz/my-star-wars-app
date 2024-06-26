import { describe, expect, it } from 'vitest';

import { cleanObj } from '../cleanObj';

const initialObj = { test_1: 'test', test_2: null, test_3: undefined, test_4: false };

describe('createDictionary', () => {
  it('should return object with valid values', () => {
    expect(cleanObj(initialObj)).toEqual({ test_1: 'test' });
  });
});
