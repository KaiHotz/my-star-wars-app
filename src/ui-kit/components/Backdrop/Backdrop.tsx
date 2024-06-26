import { FC } from 'react';
import cx from 'clsx';

import './Backdrop.scss';

interface IBackdropProps {
  isFrosted?: boolean;
}
export const Backdrop: FC<IBackdropProps> = ({ isFrosted }) => {
  return <div className={cx('ui-backdrop', { 'ui-backdrop--frosted': isFrosted })} role="presentation" />;
};
