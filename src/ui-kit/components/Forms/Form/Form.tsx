import { type ReactNode, useCallback, useEffect, useRef } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import type {
  DefaultValues,
  FieldValues,
  Resolver,
  SubmitErrorHandler,
  UseFormReset,
  UseFormResetField,
  UseFormReturn,
  ValidationMode,
} from 'react-hook-form';

export interface IOnsubmitProps<T extends FieldValues> {
  data: T;
  reset: UseFormReset<T>;
  resetField: UseFormResetField<T>;
}

export interface IFormProps<T extends FieldValues> {
  onSubmit: ({ data, reset, resetField }: IOnsubmitProps<T>) => void;
  children?: ((props: UseFormReturn<T, unknown, T>) => ReactNode) | ReactNode;
  validationSchema?: yup.ObjectSchema<T>;
  defaultValues?: DefaultValues<T>;
  onError?: SubmitErrorHandler<T>;
  disabled?: boolean;
  validationMode?: keyof ValidationMode;
  submitOnChange?: boolean;
}

export function Form<T extends FieldValues>({
  children,
  onSubmit,
  onError,
  validationSchema,
  defaultValues,
  disabled,
  validationMode = 'onSubmit',
  submitOnChange,
  ...rest
}: IFormProps<T>) {
  const hasMounted = useRef(false);
  const methods = useForm<T>({
    resolver: validationSchema ? (yupResolver(validationSchema) as unknown as Resolver<T>) : undefined,
    defaultValues,
    disabled,
    mode: validationMode,
  });

  const { handleSubmit, reset, resetField } = methods;

  const watchedValues = useWatch<T>({ control: methods.control });

  const handleFormSubmit = useCallback(
    (data: T) => onSubmit({ data, reset, resetField }),
    [onSubmit, reset, resetField],
  );

  const handleFormReset = useCallback(() => reset(), [reset]);

  useEffect(() => {
    if (!submitOnChange) {
      return;
    }

    if (!hasMounted.current) {
      hasMounted.current = true;

      return;
    }

    void handleSubmit(handleFormSubmit)();
  }, [watchedValues, handleFormSubmit, handleSubmit, submitOnChange]);

  return (
    <FormProvider {...methods}>
      <form {...rest} onSubmit={handleSubmit(handleFormSubmit, onError)} onReset={handleFormReset}>
        {typeof children === 'function' ? children({ ...methods }) : children}
      </form>
    </FormProvider>
  );
}
