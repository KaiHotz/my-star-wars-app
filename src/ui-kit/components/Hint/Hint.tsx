import { FC, PropsWithChildren } from 'react';
import cx from 'clsx';
import './Hint.scss';

export interface IHintProps {
  variant?: 'error' | 'info';
  className?: string;
}

export const Hint: FC<PropsWithChildren<IHintProps>> = ({ children, variant, className }) => (
  <span className={cx('ui-hint', { [`ui-hint--${variant}`]: Boolean(variant) }, className)}>{children}</span>
);
