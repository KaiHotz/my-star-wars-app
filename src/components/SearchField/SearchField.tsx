import { ChangeEvent, ReactNode } from 'react';
import { isEmpty } from 'lodash';
import { Button, Input, Spinner } from 'src/ui-kit';
import { FaSistrix } from 'react-icons/fa6';
import cx from 'clsx';
import './SearchField.scss';

export interface ISearchFieldProps<T extends NonNullable<unknown> | ReactNode> {
  value: string;
  isLoading: boolean;
  data?: T;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onViewAll?: (key: string) => void;
}

export const SearchField = <T extends NonNullable<unknown> | ReactNode>({
  value,
  data,
  isLoading,
  onChange,
  onViewAll,
}: ISearchFieldProps<T>) => {
  const showResults = isLoading || data;
  const noData = isEmpty(data) && !isLoading;

  return (
    <>
      <Input value={value} onChange={onChange} placeholder="Search..." startAdornment={<FaSistrix />} />
      {showResults && (
        <div
          className={cx('results', {
            'results--no-data': noData,
            'results--loading': isLoading,
          })}
        >
          {isLoading && <Spinner size={30} />}
          {data &&
            Object.entries(data).map(([key, value]) => {
              return (
                <div key={key}>
                  <div className="results__title">{key}</div>
                  <ul className="results__list">
                    {Array.isArray(value) ? (
                      value.map((item: { name?: string; title?: string }) => (
                        <li key={item.name} className="results__list-item">
                          {item.name || item.title}
                        </li>
                      ))
                    ) : (
                      <li>{value}</li>
                    )}
                    {onViewAll && (
                      <div className="results__view-all">
                        <Button variant="ghost" onClick={() => onViewAll(key)}>
                          View all
                        </Button>
                      </div>
                    )}
                  </ul>
                </div>
              );
            })}
          {noData && <div>Oops!! No results where found for your search</div>}
        </div>
      )}
    </>
  );
};
