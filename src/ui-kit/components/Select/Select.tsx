import { ReactNode } from 'react';
import cx from 'clsx';
import Creatable, { CreatableProps } from 'react-select/creatable';
import SelectComp, { GroupBase, Props as SelectProps } from 'react-select';

import { Label } from '../Label';
import { Hint } from '../Hint';
import { useCommonProps } from './useCommonProps';
import { ISelectOption } from './types';
import './Select.scss';

export interface ISelectProps<OptionType extends ISelectOption, IsMulti extends boolean = false>
  extends SelectProps<OptionType, IsMulti>,
    CreatableProps<OptionType, IsMulti, GroupBase<OptionType>> {
  small?: boolean;
  label?: string;
  required?: boolean;
  hintText?: string;
  errorMsg?: string;
  disabled?: boolean;
  reserveSpaceForError?: boolean;
  isCreatable?: boolean;
  centerOptinons?: boolean;
  labelEndAdornment?: ReactNode;
  options: OptionType[];
}

export const Select = <OptionType extends ISelectOption>({
  name,
  label,
  hintText,
  errorMsg,
  disabled,
  reserveSpaceForError,
  required,
  isCreatable,
  onChange,
  menuPlacement = 'auto',
  menuPosition = 'fixed',
  formatOptionLabel,
  options,
  small,
  labelEndAdornment,
  centerOptinons,
  ...rest
}: ISelectProps<OptionType>) => {
  const shouldShowValidationWrapper = Boolean(reserveSpaceForError || errorMsg || hintText);

  const commonProps = useCommonProps({
    disabled,
    menuPlacement,
    menuPosition,
    onChange,
    formatOptionLabel,
    options,
    small,
    centerOptinons,
    ...rest,
  });

  return (
    <div className="ui-select">
      {label && (
        <Label
          htmlFor={name}
          required={required}
          disabled={disabled}
          isError={!!errorMsg}
          endAdornment={labelEndAdornment}
          small={small}
          className="ui-select__label"
        >
          {label}
        </Label>
      )}
      <div
        className={cx(`ui-select__container `, {
          'ui-select__container--small': small,
          'ui-select__container--disabled': disabled,
          'ui-select__container--error': !!errorMsg,
        })}
      >
        {isCreatable ? <Creatable isCreatable {...commonProps} /> : <SelectComp {...commonProps} />}
      </div>
      {shouldShowValidationWrapper && (
        <div className="ui-select__validation-wrapper">
          {errorMsg && <Hint variant="error">{errorMsg}</Hint>}
          {!errorMsg && hintText && <Hint>{hintText}</Hint>}
        </div>
      )}
    </div>
  );
};
