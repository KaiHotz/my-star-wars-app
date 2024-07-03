import { ChangeEvent, ReactNode } from 'react';
import { isEmpty } from 'lodash';
import { useIntl } from 'react-intl';
import { FaSistrix } from 'react-icons/fa6';
import { Button, highlightText, Input, Spinner } from 'src/ui-kit';
import cx from 'clsx';
import { messages } from 'src/dictionary';
import './SearchField.scss';

export interface ISearchFieldProps<T extends NonNullable<unknown> | ReactNode> {
  value: string;
  isLoading: boolean;
  data?: T;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onViewAll?: (key: string) => void;
}

export const SearchField = <T extends NonNullable<unknown> | ReactNode>({
  value,
  data,
  isLoading,
  onChange,
  onClear,
  disabled,
  onViewAll,
}: ISearchFieldProps<T>) => {
  const { formatMessage: fm } = useIntl();
  const showResults = isLoading || data;
  const noData = isEmpty(data) && !isLoading;

  return (
    <>
      <Input
        value={value}
        onChange={onChange}
        placeholder={fm(messages.searchPlaceholder)}
        startAdornment={<FaSistrix />}
        disabled={disabled}
        onClear={onClear}
      />
      {showResults && (
        <div
          className={cx('results', {
            'results--no-data': noData,
            'results--loading': isLoading,
          })}
        >
          {isLoading && <Spinner size={30} />}
          {data &&
            Object.entries(data).map(([key, reslut]) => {
              return (
                <div key={key}>
                  <div className="results__title">{fm(messages[key as keyof typeof messages]) || key}</div>
                  <ul className="results__list">
                    {Array.isArray(reslut) ? (
                      reslut.map((item: { name?: string; title?: string }) => (
                        <li key={item.name || item.title} className="results__list-item">
                          {highlightText({ highlight: value, text: item.name || item.title })}
                        </li>
                      ))
                    ) : (
                      <li>{reslut}</li>
                    )}
                    {onViewAll && (
                      <div className="results__view-all">
                        <Button variant="ghost" onClick={() => onViewAll(key)}>
                          {fm(messages.viewAll)}
                        </Button>
                      </div>
                    )}
                  </ul>
                </div>
              );
            })}
          {noData && <div>{fm(messages.noSearchResults)}</div>}
        </div>
      )}
    </>
  );
};
