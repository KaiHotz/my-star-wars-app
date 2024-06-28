import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteCategoryItem, getCategoryList, getSearchAll, updateCategoryItem } from './swapi';
import { ICategoryList, TCategory } from './types';

export const useSearchAll = (search: string) => {
  return useQuery({
    queryKey: ['search', search],
    queryFn: async ({ signal }) => await getSearchAll(search, signal),
    enabled: !!search,
  });
};

export const useCategoryList = (category?: string) => {
  return useInfiniteQuery({
    queryKey: [category],
    queryFn: async ({ pageParam, signal }) => await getCategoryList({ category, pageParam, signal }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.next) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });
};

export const useUpdateCategoryItem = (category?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<TCategory>) => {
      const queryData = queryClient.getQueryData<InfiniteData<ICategoryList>>([category]);

      return await updateCategoryItem(data, queryData);
    },
    onSuccess: async (data) => {
      await queryClient.setQueryData([category], data);
    },
  });
};

export const useDeleteCategoryItem = (category?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const queryData = queryClient.getQueryData<InfiniteData<ICategoryList>>([category]);

      return await deleteCategoryItem(id, queryData);
    },
    onSuccess: async (data) => {
      await queryClient.setQueryData([category], data);
    },
    onError: (error) => {
      console.error(error);
      throw new Error('Error deleting category item');
    },
  });
};
