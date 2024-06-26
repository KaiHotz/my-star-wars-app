import { forwardRef, InputHTMLAttributes } from 'react';
import cx from 'clsx';

import { Label } from '../Label';
import { Hint } from '../Hint';
import './Checkbox.scss';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelPosition?: 'left' | 'right';
  variant?: 'checkmark' | 'square';
  hintText?: string;
  errorMsg?: string;
  reserveSpaceForError?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      name,
      label,
      required,
      disabled,
      hintText,
      checked,
      labelPosition = 'right',
      errorMsg,
      variant = 'checkmark',
      reserveSpaceForError,
      ...rest
    },
    ref,
  ) => {
    const shouldShowValidationWrapper = Boolean(reserveSpaceForError || errorMsg || hintText);

    return (
      <div
        className={cx('ui-checkbox', {
          'ui-checkbox--disabled': disabled,
          'ui-checkbox--square-checked': checked && variant === 'square',
          'ui-checkbox--checkmark-checked': checked && variant === 'checkmark',
        })}
      >
        <div className="ui-checkbox__wrapper">
          <Label
            text={label}
            required={required}
            disabled={disabled}
            className={cx('ui-checkbox__label', {
              'ui-checkbox__label--left': labelPosition === 'left',
            })}
          >
            <div className="ui-checkbox__input-wrapper">
              <input
                id={name}
                required={required}
                disabled={disabled}
                checked={checked}
                ref={ref}
                {...rest}
                type="checkbox"
                aria-hidden="true"
              />
              <div className="ui-checkbox__icon" />
            </div>
          </Label>
        </div>
        {shouldShowValidationWrapper && (
          <div className="ui-checkbox__validation-wrapper">
            {errorMsg && <Hint variant="error">{errorMsg}</Hint>}
            {!errorMsg && hintText && <Hint>{hintText}</Hint>}
          </div>
        )}
      </div>
    );
  },
);
