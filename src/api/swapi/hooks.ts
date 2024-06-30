import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCategoriesContext } from 'src/providers';

import { deleteCategoryItem, getCategories, getCategoryList, getSearchAll, updateCategoryItem } from './swapi';
import { ICategoryList, TCategory } from './types';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async ({ signal }) => await getCategories(signal),
  });
};

export const useSearchAll = (search: string) => {
  const { categories } = useCategoriesContext();

  return useQuery({
    queryKey: ['search', search],
    queryFn: async ({ signal }) => await getSearchAll({ categories, search, signal }),
    enabled: !!search && categories.length > 0,
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
