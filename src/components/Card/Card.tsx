import { forwardRef, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Button, capitalizeWords, highlightText } from 'src/ui-kit';
import { omit } from 'lodash';
import cx from 'clsx';
import { TCategory } from 'src/api';
import { messages } from 'src/dictionary';
import './Card.scss';

export interface ICardProps {
  data: TCategory;
  searchTerm?: string;
  variant?: 'grid' | 'list';
  onDelte?: (id: TCategory['url']) => void;
  onEdit?: (data: TCategory) => void;
}

export const Card = forwardRef<HTMLDivElement, ICardProps>(
  ({ data, variant = 'grid', onDelte, onEdit, searchTerm }, ref) => {
    const { formatMessage: fm } = useIntl();
    const hasBtns = !!onDelte || !!onEdit;

    const details = useMemo(
      () =>
        Object.entries(omit(data, ['created', 'edited', 'name', 'title'])).reduce((acc, [key, value]) => {
          if (Array.isArray(value) || (typeof value === 'string' && value.includes('http'))) {
            return acc;
          }

          return {
            ...acc,
            [key]: value,
          };
        }, {}),
      [data],
    );

    return (
      <div className={cx(`card card--${variant}`)} ref={ref}>
        <div>
          <h2>
            {searchTerm
              ? highlightText({ highlight: searchTerm, text: data.name || data.title })
              : data.name || data.title}
          </h2>
          <div className="card__info">
            {Object.entries(details).map(([key, value]) => {
              return (
                <div key={key} className="card__info-item">
                  <span className="bold">{capitalizeWords(key.replace(/_/g, ' '))}: </span>
                  <span>{value as string}</span>
                </div>
              );
            })}
          </div>
        </div>
        {hasBtns && (
          <div className="card__btns">
            {onEdit && <Button onClick={() => onEdit(data)}>{fm(messages.edit)}</Button>}
            {onDelte && (
              <Button variant="danger" onClick={() => onDelte(data.url)}>
                {fm(messages.delete)}
              </Button>
            )}
          </div>
        )}
      </div>
    );
  },
);
