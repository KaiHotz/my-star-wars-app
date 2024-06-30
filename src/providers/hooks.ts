import { useContext } from 'react';
import { CategoriesContext } from 'src/providers/CategoriesProvider';

export const useCategoriesContext = () => {
  return useContext(CategoriesContext);
};
