import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import cx from 'clsx';
import './Button.scss';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  number?: boolean;
  iconPosition?: 'left' | 'right';
  small?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
}

export const Button: FC<IButtonProps> = ({
  icon,
  number,
  iconPosition = 'left',
  small,
  type = 'button',
  disabled,
  children,
  onClick,
  variant = 'primary',
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cx('ui-btn', {
        [`ui-btn--${variant}`]: variant,
        'ui-btn--small': small,
        'ui-btn--number': !icon && number,
        'ui-btn--icon': !!icon && !children,
        'ui-btn--icon-text-left': !!icon && children,
        'ui-btn--icon-text-right': !!icon && children && iconPosition === 'right',
        'ui-btn--disabled': disabled,
      })}
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
};
