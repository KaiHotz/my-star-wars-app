import { useQuery } from '@tanstack/react-query';

import { getList, getSearchAll } from './swapi';

export const useSearchAll = (search: string) => {
  return useQuery({
    queryKey: ['search', search],
    queryFn: async ({ signal }) => await getSearchAll(search, signal),
    enabled: !!search,
  });
};

export const useList = ({ recource }: { recource?: string }) => {
  return useQuery({
    queryKey: [recource],
    queryFn: async ({ signal }) => await getList({ recource, signal }),
    enabled: !!recource,
  });
};
