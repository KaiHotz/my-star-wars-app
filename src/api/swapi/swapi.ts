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

export const getAllLinkedData = async (url: string[] | string) => {
  const urls = Array.isArray(url) ? url : [url];
  // Convert http to https to avoid mixed content issues on GitHub Pages
  const secureUrls = urls.map((link) => link.replace(/^http:/, 'https:'));
  const response = await Promise.allSettled(secureUrls.map((link) => httpClient.get(link)));

  const fullfilled = response.filter((item) => item.status === 'fulfilled').map((item) => item.value.data);

  return fullfilled;
};

export const getCategoryList = async ({ category, pageParam, signal }: ICategoryListParams): Promise<ICategoryList> => {
  const { data } = await httpClient.get<ICategoryList>(`/${category}/?page=${pageParam}`, { signal });
  // Process results to resolve linked data
  const detailedResults = await Promise.all(
    data.results.map(async (item) => {
      const entries = Object.entries(item);
      const result: TCategory = { ...item };

      for (const [key, value] of entries) {
        if (key !== 'url' && (Array.isArray(value) || (typeof value === 'string' && value.startsWith('https://')))) {
          // Convert http to https for secure requests
          const secureValue =
            typeof value === 'string' ? value.replace(/^http:/, 'https:') : value.map((v: string) => v.replace(/^http:/, 'https:'));
          const linkedData = await getAllLinkedData(secureValue);
          (result as unknown as Record<string, unknown>)[key] = linkedData.map((data) => data.name || data.title).join(', ');
        }
      }

      return result;
    }),
  );

  return { ...data, results: detailedResults };
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
