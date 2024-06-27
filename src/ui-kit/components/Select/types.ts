import { ReactNode } from 'react';

export interface ISelectOption {
  label: ReactNode;
  value: string | number;
  __isNew__?: boolean;
  disabled?: boolean;
}
