import { FC, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Button, capitalizeWords, Form, FormInput, FormSelect } from 'src/ui-kit';
import { TCategory } from 'src/api';
import * as yup from 'yup';
import { messages } from 'src/dictionary';

interface IPersonEditFormProps {
  entry: TCategory | null;
  onSubmit: (values: Partial<TCategory>) => void;
}

export const PersonEditForm: FC<IPersonEditFormProps> = ({ entry, onSubmit }) => {
  const { formatMessage: fm } = useIntl();

  const schema = yup.object().shape({
    name: yup.string().required(fm(messages.validationRequired)),
    birth_year: yup.string().required(fm(messages.validationRequired)),
    gender: yup
      .object({
        label: yup.string().required(fm(messages.validationRequired)),
        value: yup.string().required(fm(messages.validationRequired)),
      })
      .required(fm(messages.validationRequired)),
  });

  type TFormData = yup.InferType<typeof schema>;

  const handleSubmit = useCallback(
    (data: TFormData) => {
      onSubmit({
        ...entry,
        gender: data.gender.value,
        birth_year: data.birth_year,
        name: data.name,
      });
    },
    [entry, onSubmit],
  );

  const genderOptions = [
    { value: 'male', label: fm(messages.genderMale) },
    { value: 'female', label: fm(messages.genderFemale) },
    { value: 'unknown', label: fm(messages.genderUnknown) },
  ];

  return (
    <Form
      defaultValues={{
        name: entry?.name || '',
        birth_year: entry?.birth_year || '',
        gender: entry?.gender
          ? {
              value: entry.gender,
              label: capitalizeWords(entry.gender) || '',
            }
          : undefined,
      }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <FormInput name="name" label={fm(messages.name)} placeholder={fm(messages.name)} required reserveSpaceForError />
      <FormSelect
        name="gender"
        label={fm(messages.gender)}
        placeholder={fm(messages.gender)}
        options={genderOptions}
        required
        reserveSpaceForError
      />
      <FormInput
        name="birth_year"
        label={fm(messages.birthYear)}
        placeholder={fm(messages.birthYear)}
        required
        reserveSpaceForError
      />
      <Button type="submit">{fm(messages.submit)}</Button>
    </Form>
  );
};
