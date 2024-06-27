import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getList, getSearchAll } from './swapi';

export const useSearchAll = (search: string) => {
  return useQuery({
    queryKey: ['search', search],
    queryFn: async ({ signal }) => await getSearchAll(search, signal),
    enabled: !!search,
  });
};

export const useList = ({ recource }: { recource?: string }) => {
  return useInfiniteQuery({
    queryKey: [recource],
    queryFn: async ({ pageParam, signal }) => await getList({ recource, pageParam, signal }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.next) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });
};
