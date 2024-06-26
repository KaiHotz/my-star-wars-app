import { FC, useEffect } from 'react';
import { FieldError, useController, useFormContext } from 'react-hook-form';

import { Checkbox, CheckboxProps } from '../../Checkbox';

interface FormCheckboxProps extends Omit<CheckboxProps, 'errorMsg'> {
  name: string;
  errorMsg?: FieldError;
}

export const FormCheckbox: FC<FormCheckboxProps> = ({ name, required, errorMsg, ...rest }) => {
  const { control, setError } = useFormContext();
  const {
    field: { value: checked, onChange, ref },
    fieldState: { error },
  } = useController({ name, control, rules: { required } });

  useEffect(() => {
    if (errorMsg?.message) {
      setError(name, errorMsg);
    }
  }, [name, setError, errorMsg]);

  return (
    <Checkbox {...rest} ref={ref} required={required} checked={checked} onChange={onChange} errorMsg={error?.message} />
  );
};
