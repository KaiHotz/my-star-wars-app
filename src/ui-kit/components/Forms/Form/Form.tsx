import { ReactNode, useCallback, useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  Resolver,
  SubmitErrorHandler,
  useForm,
  UseFormReset,
  UseFormReturn,
  ValidationMode,
} from 'react-hook-form';

export interface IFormProps<T extends FieldValues> {
  onSubmit: (data: T, reset: UseFormReset<T>) => void;
  children?: ((props: UseFormReturn<T>) => ReactNode) | ReactNode;
  validationSchema?: yup.ObjectSchema<T>;
  defaultValues?: DefaultValues<T>;
  onError?: SubmitErrorHandler<T>;
  shouldValidateOnChange?: boolean;
  validationMode?: keyof ValidationMode;
  submitOnChange?: boolean;
}

export function Form<T extends FieldValues>({
  children,
  onSubmit,
  onError,
  validationSchema,
  shouldValidateOnChange,
  defaultValues,
  validationMode,
  submitOnChange,
  ...rest
}: IFormProps<T>) {
  const methods = useForm<T>({
    //due to a type error in react-hook-form/resolvers, we need to cast the yupResolver to Resolver<T>
    resolver: validationSchema ? (yupResolver(validationSchema) as unknown as Resolver<T>) : undefined,
    defaultValues,
    mode: shouldValidateOnChange ? 'onChange' : validationMode ? validationMode : 'onSubmit',
  });
  const { handleSubmit, reset, watch } = methods;

  const handleFormSubmit = useCallback((data: T) => onSubmit(data, reset), [onSubmit, reset]);

  const handleFormReset = useCallback(() => reset(), [reset]);

  useEffect(() => {
    if (submitOnChange) {
      const subscription = watch(() => handleSubmit(handleFormSubmit)());

      return () => subscription.unsubscribe();
    }
  }, [handleFormSubmit, handleSubmit, submitOnChange, watch]);

  return (
    <FormProvider {...methods}>
      <form {...rest} onSubmit={handleSubmit(handleFormSubmit, onError)} onReset={handleFormReset}>
        {typeof children === 'function' ? children({ ...methods }) : children}
      </form>
    </FormProvider>
  );
}
