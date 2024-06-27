import React, { FC, useEffect } from 'react';
import { FieldError, useController, useFormContext } from 'react-hook-form';

import { Datepicker, IDatepickerProps } from '../../DatePicker';

export interface IFormDatepickerProps extends Omit<IDatepickerProps, 'onChange' | 'errorMsg'> {
  name: string;
  onChange?: (date: Date | [Date | null, Date | null] | null) => void;
  errorMsg?: FieldError;
}

export const FormDatepicker: FC<IFormDatepickerProps> = ({ name, required, errorMsg, ...rest }) => {
  const { control, setError } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  useEffect(() => {
    if (errorMsg) {
      setError(name, errorMsg);
    }
  }, [name, setError, errorMsg]);

  return (
    <Datepicker
      {...rest}
      name={name}
      required={required}
      onChange={(date) => onChange(date)}
      value={value}
      errorMsg={error?.message}
      selected={value}
    />
  );
};
