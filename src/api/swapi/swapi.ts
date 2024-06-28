import { v4 as uuidv4 } from 'uuid';
import { InfiniteData } from '@tanstack/react-query';

import { ICategoryList, ICategoryListParams, IResources, TCategory, TSearch } from './types';
import { httpClient } from '../httpClient';
export const getResources = async (): Promise<IResources> => {
  const { data } = await httpClient.get<IResources>('/api');

  return data;
};

export const getCategoryList = async ({ category, pageParam, signal }: ICategoryListParams): Promise<ICategoryList> => {
  const { data } = await httpClient.get<ICategoryList>(`/api/${category}/?page=${pageParam}`, { signal });

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

export const updateCategoryItem = (data: Partial<TCategory>, queryData: InfiniteData<ICategoryList, unknown> | undefined) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const pages = queryData?.pages.map((page) => {
        return { ...page, results: page.results.map((item) => (item.id === data.id ? data : item)) };
      });

      return resolve({ ...queryData, pages });
    }, 1000),
  );
};

export const deleteCategoryItem = (id: string, queryData: InfiniteData<ICategoryList, unknown> | undefined) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const pages = queryData?.pages.map((page) => {
        return { ...page, results: page.results.filter((item) => item.id !== id) };
      });

      return resolve({ ...queryData, pages });
    }, 1000),
  );
};
