import type { FC } from 'react';
import cx from 'clsx';
import { Backdrop, Spinner } from 'src/ui-kit';

import './LoaderContainer.scss';

export interface ILoaderContainerProps {
  width?: string;
  height?: string;
  size?: number;
  className?: string;
  hasBackdrop?: boolean;
  position?: 'fixed' | 'absolute';
  color?: string;
  speedMultiplier?: number;
}

export const LoaderContainer: FC<ILoaderContainerProps> = ({
  height = '100vh',
  width = '100vw',
  position = 'fixed',
  size,
  className,
  hasBackdrop,
  color,
  speedMultiplier,
}) => (
  <div className={cx('loader-container', className)} style={{ height, width, position }}>
    {hasBackdrop && <Backdrop />}
    <Spinner size={size} color={color} speedMultiplier={speedMultiplier} />
  </div>
);
