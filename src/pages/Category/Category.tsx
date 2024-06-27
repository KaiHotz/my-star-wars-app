import { FC, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import cx from 'clsx';
import { TCategory, useCategoryList } from 'src/api';
import { Button, Modal, Spinner } from 'src/ui-kit';
import { FaGrip, FaList } from 'react-icons/fa6';
import { Card } from 'src/components/Card';
import { messages } from 'src/dictionary';

import { PersonEditForm } from './components';
import './Category.scss';

export const Category: FC = () => {
  const { formatMessage: fm } = useIntl();
  const { category } = useParams();
  const [entryToEdit, setEntryToEdit] = useState<TCategory | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data, fetchNextPage, isLoading, isFetching, hasNextPage } = useCategoryList(category);

  const onEdit = useCallback((data: TCategory) => {
    setEntryToEdit(data);
  }, []);

  const handleDelete = useCallback((id: TCategory['id']) => {
    // eslint-disable-next-line no-console
    console.log({ id });
  }, []);

  const isGrid = viewMode === 'grid';
  const isPerson = category === 'people';
  const inProgress = isLoading || isFetching;

  return (
    <>
      <div className="category">
        <div className="category__header">
          <Button
            variant="ghost"
            onClick={() => setViewMode(isGrid ? 'list' : 'grid')}
            icon={isGrid ? <FaList size={18} /> : <FaGrip size={18} />}
          />
        </div>
        <div className={cx(`category__body category__body--${viewMode}`)}>
          {data?.pages.map(({ results }) =>
            results.map((item) => (
              <Card
                key={item.name}
                data={item}
                variant={viewMode}
                onEdit={isPerson ? onEdit : undefined}
                onDelte={handleDelete}
              />
            )),
          )}
        </div>
        <div className="category__footer">
          <Button variant="secondary" onClick={() => fetchNextPage()} disabled={!hasNextPage || inProgress}>
            {inProgress ? <Spinner size={16} /> : fm(messages.loadMore)}
          </Button>
        </div>
      </div>
      {entryToEdit && isPerson && (
        <Modal onClose={() => setEntryToEdit(null)}>
          <PersonEditForm entry={entryToEdit} onSubmit={() => {}} />
        </Modal>
      )}
    </>
  );
};

export default Category;
