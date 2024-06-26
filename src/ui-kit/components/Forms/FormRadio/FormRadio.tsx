import { FC, useEffect } from 'react';
import { FieldError, useController, useFormContext } from 'react-hook-form';

import { Radio, RadioProps } from '../../Radio';
interface IFormRadioProps extends Omit<RadioProps, 'errorMsg'> {
  name: string;
  errorMsg?: FieldError;
}

export const FormRadio: FC<IFormRadioProps> = ({ name, errorMsg, children, ...rest }) => {
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
    <Radio {...rest} selected={value} onChange={onChange} errorMsg={error?.message}>
      {children}
    </Radio>
  );
};
