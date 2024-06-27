import { ChangeEvent, FC, useCallback, useState } from 'react';
import { ISearch, useSearchAll } from 'src/api';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'src/ui-kit';
import { SearchField } from 'src/components/SearchField';
import { routePath } from 'src/routes';

const Search: FC = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 200);
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useSearchAll(debouncedSearch);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), []);
  const handleViewAll = useCallback((resource: string) => navigate(`${routePath.list}/${resource}`), [navigate]);
  const inProgress = isLoading || isFetching;

  return (
    <div className="search">
      <SearchField<ISearch>
        onChange={handleSearch}
        value={search}
        data={data}
        isLoading={inProgress}
        onViewAll={handleViewAll}
      />
    </div>
  );
};

export default Search;
