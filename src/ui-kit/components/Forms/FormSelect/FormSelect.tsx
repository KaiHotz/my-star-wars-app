import { MutableRefObject, useEffect, useImperativeHandle } from 'react';
import { ActionMeta, GroupBase, Props as SelectProps, SingleValue } from 'react-select';
import { FieldError, useController, useFormContext } from 'react-hook-form';
import { CreatableProps } from 'react-select/creatable';
import { noop } from 'lodash';

import { ISelectOption, Select } from '../../Select';

interface ICustomFieldError extends FieldError {
  label: FieldError;
  value: FieldError;
}

export interface IFormSelectProps<OptionType extends ISelectOption, IsMulti extends boolean = false>
  extends SelectProps<OptionType, IsMulti>,
    CreatableProps<OptionType, IsMulti, GroupBase<OptionType>> {
  name: string;
  small?: boolean;
  label?: string;
  required?: boolean;
  hintText?: string;
  errorMsg?: FieldError;
  disabled?: boolean;
  reserveSpaceForError?: boolean;
  isCreatable?: boolean;
  options?: OptionType[];
  selectRef?: MutableRefObject<{
    setValue?: (option: ISelectOption) => void;
    onBlur?: () => void;
  }>;
}

export const FormSelect = <OptionType extends ISelectOption>({
  name,
  options,
  required,
  reserveSpaceForError,
  errorMsg,
  onChange = noop,
  placeholder,
  selectRef,
  small,
  ...rest
}: IFormSelectProps<OptionType>) => {
  const { control, setError } = useFormContext();
  const {
    field: { value, onChange: onOptionChange, onBlur },
    fieldState: { error },
  } = useController({ name, control });

  const onHandleChange = (option: SingleValue<OptionType>, action: ActionMeta<OptionType>) => {
    onOptionChange(option);
    onChange(option, action);
  };

  useImperativeHandle(selectRef, () => ({
    setValue: onOptionChange,
    onBlur,
  }));

  useEffect(() => {
    if (errorMsg) {
      setError(name, errorMsg);
    }
  }, [name, setError, errorMsg]);

  return (
    <Select
      {...rest}
      options={options || []}
      value={value}
      errorMsg={
        error?.message || (error as ICustomFieldError)?.value.message || (error as ICustomFieldError)?.label.message
      }
      onChange={onHandleChange}
      reserveSpaceForError={reserveSpaceForError}
      placeholder={placeholder}
      required={required}
      small={small}
    />
  );
};
