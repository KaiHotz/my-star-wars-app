import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import cx from 'clsx';
import { useList } from 'src/api';
import { Button } from 'src/ui-kit';
import { FaGrip, FaList } from 'react-icons/fa6';
import { Card } from 'src/components/Card';
import './List.scss';

export const List: FC = () => {
  const { recource } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data, isLoading, isFetching } = useList({ recource });

  const isGrid = viewMode === 'grid';

  console.log({ data, isLoading, isFetching });

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
        {data?.results.map((item) => <Card key={item.name || item.title} data={item} variant={viewMode} />)}
      </div>
    </div>
  );
};

export default List;
