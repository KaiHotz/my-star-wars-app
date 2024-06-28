import { FC } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'src/ui-kit';
import cx from 'clsx';
import { TCategory } from 'src/api';
import { messages } from 'src/dictionary';
import './Card.scss';

export interface CardProps {
  data: TCategory;
  variant?: 'grid' | 'list';
  onDelte?: (id: TCategory['id']) => void;
  onEdit?: (data: TCategory) => void;
}

export const Card: FC<CardProps> = ({ data, variant = 'grid', onDelte, onEdit }) => {
  const { formatMessage: fm } = useIntl();
  const hasBtns = !!onDelte || !!onEdit;
  const hasInfo = !!data.gender || !!data.birth_year;

  return (
    <div className={cx(`card card--${variant}`)}>
      <div>
        <h2>{data.name || data.title}</h2>
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
            <Button variant="danger" onClick={() => onDelte(data.id)}>
              {fm(messages.delete)}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
