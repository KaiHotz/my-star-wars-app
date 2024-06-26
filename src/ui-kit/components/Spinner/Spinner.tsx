import { FC } from 'react';
import { FaSpinner } from 'react-icons/fa6';
import './Spinner.scss';

interface SpinnerProps {
  size?: number | string;
  color?: string;
  speedMultiplier?: number;
}

export const Spinner: FC<SpinnerProps> = ({ size = 35, color, speedMultiplier = 1.5 }) => {
  return (
    <div
      style={{
        ['--ui-spinner-color' as 'color']: color,
        ['--ui-spinner-speed' as 'animation']: `${1.5 / speedMultiplier}s`,
      }}
      className="ui-spinner"
    >
      <FaSpinner size={size} title="LoadingSpinner" />
    </div>
  );
};
