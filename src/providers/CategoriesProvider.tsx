import { createContext, FC, ReactNode, useMemo } from 'react';
import { useCategories } from 'src/api/swapi/hooks';

export const CategoriesContext = createContext<{
  categories: string[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
}>({
  categories: [],
  isLoading: false,
  isError: false,
  error: null,
});

export const CategoriesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { data, isLoading, isError, error } = useCategories();

  const categories = useMemo(() => data || [], [data]);

  return (
    <CategoriesContext.Provider value={{ categories, isLoading, isError, error }}>
      {children}
    </CategoriesContext.Provider>
  );
};
