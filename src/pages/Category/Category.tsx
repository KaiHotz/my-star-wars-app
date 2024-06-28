import { FC, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import cx from 'clsx';
import { TCategory, useCategoryList, useDeleteCategoryItem, useUpdateCategoryItem } from 'src/api';
import { Button, Modal, Spinner } from 'src/ui-kit';
import { FaGrip, FaList } from 'react-icons/fa6';
import { Card } from 'src/components/Card';
import { messages } from 'src/dictionary';

import { EditForm } from './components';
import './Category.scss';

export const Category: FC = () => {
  const { formatMessage: fm } = useIntl();
  const { category } = useParams();
  const [entryToEdit, setEntryToEdit] = useState<TCategory | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data, fetchNextPage, isLoading, isFetching, hasNextPage } = useCategoryList(category);
  const { mutateAsync: updateItem, isPending: isUpdating } = useUpdateCategoryItem(category);
  const { mutateAsync: deleteItem, isPending: isDeleting } = useDeleteCategoryItem(category);

  const handleCloseModal = useCallback(() => {
    setEntryToEdit(null);
  }, []);

  const handleEntrytoEdit = useCallback((data: TCategory) => {
    setEntryToEdit(data);
  }, []);

  const hanldeUpdateItem = useCallback(
    async (data: Partial<TCategory>) => {
      await updateItem(data);
      handleCloseModal();
    },
    [updateItem, handleCloseModal],
  );

  const hanldeDeleteItem = useCallback(
    async (id: string) => {
      await deleteItem(id);
    },
    [deleteItem],
  );

  const isGrid = viewMode === 'grid';
  const isPerson = category === 'people';
  const inProgress = isLoading || isFetching || isUpdating || isDeleting;

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
                key={item.id}
                data={item}
                variant={viewMode}
                onEdit={isPerson ? handleEntrytoEdit : undefined}
                onDelte={hanldeDeleteItem}
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
        <Modal onClose={handleCloseModal}>
          <EditForm entry={entryToEdit} onSubmit={hanldeUpdateItem} inProgress={inProgress} />
        </Modal>
      )}
    </>
  );
};

export default Category;
