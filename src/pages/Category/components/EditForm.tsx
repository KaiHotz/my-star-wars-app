import { type FC, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Button, capitalizeWords, Form, FormInput, FormSelect, type IOnsubmitProps } from 'src/ui-kit';
import type { TCategory } from 'src/api';
import * as yup from 'yup';
import { messages } from 'src/dictionary';

interface IEditFormProps {
  entry: TCategory | null;
  onSubmit: (values: Partial<TCategory>) => void;
  inProgress?: boolean;
}

export const EditForm: FC<IEditFormProps> = ({ entry, onSubmit, inProgress }) => {
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
    ({ data }: IOnsubmitProps<TFormData>) => {
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

  const defaultGender = entry?.gender
    ? {
        value: entry.gender,
        label: capitalizeWords(entry.gender) || '',
      }
    : undefined;

  return (
    <Form
      defaultValues={{
        name: entry?.name || '',
        birth_year: entry?.birth_year || '',
        gender: defaultGender,
      }}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <FormInput
        name="name"
        label={fm(messages.name)}
        placeholder={fm(messages.name)}
        disabled={inProgress}
        required
        reserveSpaceForError
      />
      <FormSelect
        name="gender"
        label={fm(messages.gender)}
        placeholder={fm(messages.gender)}
        options={genderOptions}
        disabled={inProgress}
        required
        reserveSpaceForError
      />
      <FormInput
        name="birth_year"
        label={fm(messages.birthYear)}
        placeholder={fm(messages.birthYear)}
        disabled={inProgress}
        required
        reserveSpaceForError
      />
      <Button disabled={inProgress} type="submit">
        {fm(messages.submit)}
      </Button>
    </Form>
  );
};
