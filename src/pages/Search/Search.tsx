import { ChangeEvent, FC, useCallback, useState } from 'react';
import { TSearch, useSearchAll } from 'src/api';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'src/ui-kit';
import { SearchField } from 'src/components/SearchField';
import { routePath } from 'src/routes';
import { useIsFetching } from '@tanstack/react-query';

import './Search.scss';

const Search: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 200);
  const navigate = useNavigate();

  const isFetchingCategories = useIsFetching({ queryKey: ['categories'] });

  const { data, isLoading, isFetching: isFetchingSearch } = useSearchAll(debouncedSearch);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value), []);
  const handleViewAll = useCallback(
    (category: string) => navigate(`${routePath.category}/${category}`, { state: { searchTerm } }),
    [navigate, searchTerm],
  );
  const inProgress = isLoading || isFetchingSearch;

  return (
    <div className="search">
      <SearchField<TSearch>
        onChange={handleSearch}
        value={searchTerm}
        data={data}
        disabled={!!isFetchingCategories}
        isLoading={inProgress}
        onViewAll={handleViewAll}
      />
    </div>
  );
};

export default Search;
