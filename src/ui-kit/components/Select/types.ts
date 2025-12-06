import type { ReactNode } from 'react';
import { type CreatableProps } from 'react-select/creatable';
import { type GroupBase, type Props as ReactSelectProps } from 'react-select';

export interface ISelectOption {
  label: ReactNode;
  value: string | number;
  __isNew__?: boolean;
  disabled?: boolean;
}

export interface ISelectProps<OptionType extends ISelectOption, IsMulti extends boolean = false>
  extends ReactSelectProps<OptionType, IsMulti>, CreatableProps<OptionType, IsMulti, GroupBase<OptionType>> {
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
