import qs from 'qs';
import { cleanObj } from 'src/ui-kit/utils';

export const getQueryParams = <T extends NonNullable<unknown>>(params: T) =>
  qs.stringify(cleanObj(params), {
    addQueryPrefix: true,
    indices: false,
    arrayFormat: 'comma',
    skipNulls: true,
  });
