import { v4 as uuidv4 } from 'uuid';

import { IList, IListparams, IResources, ISearch } from './types';
import { httpClient } from '../httpClient';
export const getResources = async (): Promise<IResources> => {
  const { data } = await httpClient.get<IResources>('/api');

  return data;
};

export const getList = async ({ recource, pageParam, signal }: IListparams): Promise<IList> => {
  const { data } = await httpClient.get<IList>(`/api/${recource}/?page=${pageParam}`, { signal });

  return { ...data, results: data.results.map((item) => ({ ...item, id: uuidv4() })) };
};

export const getSearchAll = async (search: string, signal: AbortSignal): Promise<ISearch> => {
  const resources = await getResources();
  const keys = Object.keys(resources);
  const data = await Promise.all(keys.map((key) => httpClient.get(`/api/${key}/?search=${search}`, { signal })));

  const response = data.reduce((acc, item, index) => {
    if (!item.data.results.length) {
      return acc;
    } else {
      return { ...acc, [keys[index]]: item.data.results.slice(0, 3) };
    }
  }, {} as ISearch);

  return response;
};
