import { v4 as uuidv4 } from 'uuid';

import { ICategoryList, ICategoryListParams, IResources, TSearch } from './types';
import { httpClient } from '../httpClient';
export const getResources = async (): Promise<IResources> => {
  const { data } = await httpClient.get<IResources>('/api');

  return data;
};

export const getCategoryList = async ({ recource, pageParam, signal }: ICategoryListParams): Promise<ICategoryList> => {
  const { data } = await httpClient.get<ICategoryList>(`/api/${recource}/?page=${pageParam}`, { signal });

  return { ...data, results: data.results.map((item) => ({ ...item, id: uuidv4() })) };
};

export const getSearchAll = async (search: string, signal: AbortSignal): Promise<TSearch> => {
  const resources = await getResources();
  const categories = Object.keys(resources);
  const data = await Promise.all(categories.map((category) => httpClient.get(`/api/${category}/?search=${search}`, { signal })));

  const response = data.reduce((acc, item, index) => {
    if (!item.data.results.length) {
      return acc;
    } else {
      return { ...acc, [categories[index]]: item.data.results.slice(0, 3) };
    }
  }, {} as TSearch);

  return response;
};
