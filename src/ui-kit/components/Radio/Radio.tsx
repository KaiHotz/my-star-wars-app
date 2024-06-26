import { Children, FC, InputHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import cx from 'clsx';

import { Hint } from '../Hint';
import { RadioOptionContext } from './context';
import './Radio.scss';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  selected?: string | number;
  errorMsg?: ReactNode;
  hintText?: string;
  reserveSpaceForError?: boolean;
  labelPosition?: 'left' | 'right';
  variant?: 'text';
  isInline?: boolean;
  small?: boolean;
}

export const Radio: FC<PropsWithChildren<RadioProps>> = ({
  children,
  errorMsg,
  hintText,
  onChange,
  disabled,
  reserveSpaceForError,
  labelPosition = 'left',
  selected,
  isInline,
  variant,
  small,
  ...rest
}) => {
  const shouldShowValidationWrapper = Boolean(reserveSpaceForError || errorMsg || hintText);

  return (
    <>
      <div
        className={cx('ui-radio', {
          'ui-radio--inline': isInline,
          'ui-radio--small': small,
        })}
      >
        {Children.map(children, (child) => {
          return (
            <RadioOptionContext.Provider
              value={{ onChange, disabled, selected, labelPosition, variant, isInline, small, ...rest }}
            >
              {child}
            </RadioOptionContext.Provider>
          );
        })}
      </div>
      {shouldShowValidationWrapper && (
        <div className="ui-radio__validation-wrapper">
          {errorMsg && <Hint variant="error">{errorMsg}</Hint>}
          {!errorMsg && hintText && <Hint>{hintText}</Hint>}
        </div>
      )}
    </>
  );
};
