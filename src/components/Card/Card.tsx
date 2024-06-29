import { forwardRef } from 'react';
import { useIntl } from 'react-intl';
import { Button, highlightText } from 'src/ui-kit';
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
    const hasInfo = !!data.gender || !!data.birth_year;

    return (
      <div className={cx(`card card--${variant}`)} ref={ref}>
        <div>
          <h2>
            {searchTerm
              ? highlightText({ highlight: searchTerm, text: data.name || data.title })
              : data.name || data.title}
          </h2>
          {hasInfo && (
            <div className="card__info">
              {fm(messages.personInfo, {
                gender: <span className="bold">{data.gender}</span>,
                birthYear: <span className="bold">{data.birth_year}</span>,
              })}
            </div>
          )}
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
