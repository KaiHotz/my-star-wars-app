import type { InfiniteData } from '@tanstack/react-query';

import type { ICategoryList, ICategoryListParams, IResources, TCategory, TSearch } from './types';
import { httpClient } from '../httpClient';

export const getCategories = async (signal: AbortSignal): Promise<string[]> => {
  const { data } = await httpClient.get<IResources>('', { signal });
  const categories = Object.keys(data);

  return categories;
};

export const getSearchAll = async ({
  categories,
  search,
  signal,
}: {
  categories: string[];
  search: string;
  signal: AbortSignal;
}): Promise<TSearch> => {
  const response = await Promise.allSettled(categories.map((category) => httpClient.get(`/${category}/?search=${search}`, { signal })));

  const fullfilled = response.filter((item) => item.status === 'fulfilled');

  const data = fullfilled.reduce((acc, item, index) => {
    if (!item.value.data.results.length) {
      return acc;
    } else {
      return { ...acc, [categories[index]]: item.value.data.results.slice(0, 3) };
    }
  }, {} as TSearch);

  return data;
};

export const getCategoryList = async ({ category, signal }: ICategoryListParams): Promise<ICategoryList> => {
  const { data } = await httpClient.get<ICategoryList>(`/${category}`, { signal });

  return data;
};

export const updateCategoryItem = (data: Partial<TCategory>, queryData: InfiniteData<ICategoryList, unknown> | undefined) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const pages = queryData?.pages.map((page) => {
        return { ...page, results: page.results.map((item) => (item.url === data.url ? data : item)) };
      });

      return resolve({ ...queryData, pages });
    }, 1000),
  );
};

export const deleteCategoryItem = (id: TCategory['url'], queryData: InfiniteData<ICategoryList, unknown> | undefined) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const pages = queryData?.pages.map((page) => {
        return { ...page, results: page.results.filter((item) => item.url !== id) };
      });

      return resolve({ ...queryData, pages });
    }, 1000),
  );
};
