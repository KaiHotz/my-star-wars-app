import { FC, ReactNode } from 'react';
import { omit } from 'lodash';
import cx from 'clsx';

import { useRadioOption } from './context';
import { Label } from '../Label';
import './RadioOption.scss';

export interface RadioOptionProps {
  value: string | number;
  label: ReactNode;
  disabled?: boolean;
}

export const RadioOption: FC<RadioOptionProps> = ({ value, label, disabled }) => {
  const optionsAttr = useRadioOption();
  const isOptionDisabled = disabled || optionsAttr?.disabled;
  const isChecked = value === optionsAttr?.selected;
  const rest = omit(optionsAttr, ['disabled', 'selected', 'labelPosition', 'onChange', 'name', 'variant', 'isInline']);

  return (
    <div
      key={value}
      className={cx('ui-radio-option', {
        'ui-radio-option--disabled': isOptionDisabled,
        'ui-radio-option--small': optionsAttr?.small,
        'ui-radio-option--checked': isChecked,
        'ui-radio-option--inline': optionsAttr?.isInline,
        'ui-radio-option--text': optionsAttr?.variant === 'text',
      })}
    >
      <Label
        className={cx('ui-radio-option__label', {
          'ui-radio-option__label--small': optionsAttr?.small,
          'ui-radio-option__label--right': optionsAttr?.labelPosition === 'right',
        })}
        text={label}
        small={optionsAttr?.small}
        disabled={isOptionDisabled}
      >
        <div className="ui-radio-option__input-wrapper">
          <input
            onChange={isOptionDisabled ? undefined : optionsAttr?.onChange}
            name={optionsAttr?.name}
            checked={isChecked}
            value={value}
            disabled={isOptionDisabled}
            {...rest}
            type="radio"
          />
          <span className={cx('ui-radio-option__icon', { 'ui-radio-option__icon--small': optionsAttr?.small })} />
        </div>
      </Label>
    </div>
  );
};
