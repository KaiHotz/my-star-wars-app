import { describe, expect, it } from 'vitest';

import { getQueryParams } from './getQueryParams';

const initialObj: Record<string, unknown> = {
  param_1: 'foo',
  param_2: 'bar',
  param_3: false,
  params_4: null,
  params_5: undefined,
  params_6: '',
};

describe('getQueryParams', () => {
  it('should return a query string', () => {
    expect(getQueryParams(initialObj)).toEqual(`?param_1=foo&param_2=bar`);
  });
});
