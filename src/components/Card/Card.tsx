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

  return (
    <div className={cx(`card card--${variant}`)}>
      <h2>{data.name || data.title}</h2>
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
