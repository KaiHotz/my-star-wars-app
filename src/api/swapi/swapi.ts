import { v4 as uuidv4 } from 'uuid';
import { InfiniteData } from '@tanstack/react-query';

import { ICategoryList, ICategoryListParams, IResources, TCategory, TSearch } from './types';
import { httpClient } from '../httpClient';
export const getResources = async (): Promise<IResources> => {
  const { data } = await httpClient.get<IResources>('/api');

  return data;
};

export const getSearchAll = async (search: string, signal: AbortSignal): Promise<TSearch> => {
  const resources = await getResources();
  const categories = Object.keys(resources);
  const response = await Promise.allSettled(categories.map((category) => httpClient.get(`/api/${category}/?search=${search}`, { signal })));

  const fullfilled = response.filter((item) => item.status === 'fulfilled');

  const newData = fullfilled.reduce((acc, item, index) => {
    if (!item.value.data.results.length) {
      return acc;
    } else {
      return { ...acc, [categories[index]]: item.value.data.results.slice(0, 3) };
    }
  }, {} as TSearch);

  return newData;
};

export const getCategoryList = async ({ category, pageParam, signal }: ICategoryListParams): Promise<ICategoryList> => {
  if (pageParam === 0) {
    // since the api does not support pagination we need to load 2 pages at once to retrun 20 items intially
    const response = await Promise.allSettled([
      httpClient.get<ICategoryList>(`/api/${category}/?page=1`, { signal }),
      httpClient.get<ICategoryList>(`/api/${category}/?page=2`, { signal }),
    ]);

    const fullfilled = response.filter((item) => item.status === 'fulfilled');

    const newData = fullfilled.reduce((acc, item) => {
      return {
        ...acc,
        ...item.value.data,
        results: [...acc.value.data.results, ...item.value.data.results.map((item) => ({ ...item, id: uuidv4() }))],
      };
    });

    return newData.value.data;
  } else {
    const { data } = await httpClient.get<ICategoryList>(`/api/${category}/?page=${pageParam}`, { signal });

    return { ...data, results: data.results.map((item) => ({ ...item, id: uuidv4() })) };
  }
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
