import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import cx from 'clsx';
import { FaGrip, FaList, FaSistrix, FaXmark } from 'react-icons/fa6';
import { TCategory, useCategoryList, useDeleteCategoryItem, useUpdateCategoryItem } from 'src/api';
import { Button, Input, Modal, Spinner } from 'src/ui-kit';
import { Card } from 'src/components/Card';
import { LoaderContainer } from 'src/components/LoaderContainer';
import { messages } from 'src/dictionary';

import { EditForm } from './components';
import './Category.scss';

export const Category: FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { formatMessage: fm } = useIntl();
  const { category } = useParams();
  const { state } = useLocation();
  const [search, setSearch] = useState<string>(state?.searchTerm || '');
  const [entryToEdit, setEntryToEdit] = useState<TCategory | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data, fetchNextPage, isLoading, isFetching, hasNextPage } = useCategoryList(category);
  const { mutateAsync: updateItem, isPending: isUpdating } = useUpdateCategoryItem(category);
  const { mutateAsync: deleteItem, isPending: isDeleting } = useDeleteCategoryItem(category);

  useEffect(() => {
    if (cardRef.current && (data?.pages.length ?? 0) > 1) {
      cardRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), []);

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
    async (id: TCategory['url']) => {
      await deleteItem(id);
    },
    [deleteItem],
  );

  const categoryItems = data?.pages.map(({ results }) => results).flat();
  const filteredItems = categoryItems?.filter(({ name, title }) =>
    (name?.toLowerCase() || title?.toLowerCase())?.includes(search.toLowerCase()),
  );
  const isGrid = viewMode === 'grid';
  const isPerson = category === 'people';
  const hasReluts = !!filteredItems?.length;
  const inProgress = isLoading || isFetching || isUpdating || isDeleting;
  const showLoader = isDeleting || (!hasReluts && inProgress);
  const noResultMsg = hasNextPage ? fm(messages.noResultsSofar) : fm(messages.noSearchResults);

  return (
    <>
      <div className="category">
        {showLoader && <LoaderContainer hasBackdrop />}
        <div className="category__header">
          <div>
            <Input
              small
              value={search}
              onChange={handleSearch}
              placeholder={fm(messages.searchPlaceholder)}
              startAdornment={<FaSistrix />}
              endAdornment={
                search && <Button variant="ghost" onClick={() => setSearch('')} icon={<FaXmark size={16} />} />
              }
            />
          </div>
          <Button
            variant="ghost"
            onClick={() => setViewMode(isGrid ? 'list' : 'grid')}
            icon={isGrid ? <FaList size={18} /> : <FaGrip size={18} />}
          />
        </div>
        <div className={cx(`category__body category__body--${viewMode}`)}>
          {filteredItems?.map((item, index) => {
            const isLast = index === filteredItems.length - 1;

            return (
              <Card
                key={item.url}
                ref={isLast ? cardRef : undefined}
                data={item}
                searchTerm={search}
                variant={viewMode}
                onEdit={isPerson ? handleEntrytoEdit : undefined}
                onDelte={hanldeDeleteItem}
              />
            );
          })}
        </div>
        <div className="category__footer">
          {!hasReluts && !inProgress && <span>{noResultMsg}</span>}
          {hasNextPage && (
            <Button variant="secondary" onClick={() => fetchNextPage()} disabled={inProgress}>
              {inProgress ? <Spinner size={16} /> : fm(messages.loadMore)}
            </Button>
          )}
        </div>
      </div>
      {entryToEdit && isPerson && (
        <Modal onClose={handleCloseModal} disableCoseOnClickOutside hasFrozenBackdrop>
          <EditForm entry={entryToEdit} onSubmit={hanldeUpdateItem} inProgress={inProgress} />
        </Modal>
      )}
    </>
  );
};

export default Category;
