import { describe, expect, it } from 'vitest';

import { createDictionary } from './createDictionary';

describe('createDictionary', () => {
  it('should return propper message object', () => {
    expect(
      createDictionary('test', {
        title: 'Title text',
      }),
    ).toEqual({
      title: {
        id: 'test_title',
        defaultMessage: 'Title text',
      },
    });
  });
});
