import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import cx from 'clsx';
import { useList } from 'src/api';
import { Button, Spinner } from 'src/ui-kit';
import { FaGrip, FaList } from 'react-icons/fa6';
import { Card } from 'src/components/Card';
import { messages } from 'src/dictionary';
import './List.scss';

export const List: FC = () => {
  const { formatMessage: fm } = useIntl();
  const { recource } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data, fetchNextPage, isLoading, isFetching, hasNextPage } = useList({ recource });

  const isGrid = viewMode === 'grid';

  const inProgress = isLoading || isFetching;

  return (
    <div className="list">
      <div className="list__header">
        <Button
          variant="ghost"
          onClick={() => setViewMode(isGrid ? 'list' : 'grid')}
          icon={isGrid ? <FaList size={18} /> : <FaGrip size={18} />}
        />
      </div>
      <div className={cx(`list__body, list__body--${viewMode}`)}>
        {data?.pages.map(({ results }) =>
          results.map((item) => <Card key={item.name} data={item} variant={viewMode} />),
        )}
      </div>
      <div className="list__footer">
        <Button variant="secondary" onClick={() => fetchNextPage()} disabled={!hasNextPage || inProgress}>
          {inProgress ? <Spinner size={16} /> : fm(messages.loadMore)}
        </Button>
      </div>
    </div>
  );
};

export default List;
