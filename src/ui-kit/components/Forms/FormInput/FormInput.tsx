import { forwardRef, useEffect } from 'react';
import { type FieldError, type RegisterOptions, useController, useFormContext } from 'react-hook-form';

import { type IInputProps, Input } from '../../Input';

export interface IFormInputProps extends Omit<IInputProps, 'errorMsg'> {
  name: string;
  onChange?: RegisterOptions['onChange'];
  errorMsg?: FieldError;
}

export const FormInput = forwardRef<HTMLInputElement, IFormInputProps>(
  ({ name, required, disabled, errorMsg, onChange, ...rest }, ref) => {
    const {
      formState: { errors },
      setError,
      control,
    } = useFormContext();

    const {
      field: { value, onChange: onChangeField },
    } = useController({ name, control, disabled });

    useEffect(() => {
      if (errorMsg?.message) {
        setError(name, errorMsg);
      }
    }, [name, setError, errorMsg]);

    return (
      <Input
        {...rest}
        onChange={onChange ? onChange : (e) => onChangeField(e.target.value)}
        errorMsg={errors?.[name] ? (errors[name]?.message as string) : undefined}
        required={required}
        value={value}
        ref={ref}
      />
    );
  },
);
