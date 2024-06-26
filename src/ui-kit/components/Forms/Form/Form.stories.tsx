/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import * as yup from 'yup';
import { FieldErrors, UseFormReset } from 'react-hook-form';

import { Button } from '../../Button';
import { Form } from './Form';
import { FormInput } from '../FormInput';
import { capitalizeWords } from '../../../utils';

const validationModes = ['onBlur', 'onChange', 'onSubmit', 'onTouched', 'all'] as const;

const meta: Meta<typeof Form> = {
  title: 'Components/Forms/Form',
  component: Form,
  args: {
    submitOnChange: false,
    shouldValidateOnChange: true,
    validationMode: 'onChange',
  },
  argTypes: {
    children: {
      control: false,
    },
    validationSchema: {
      control: false,
    },
    defaultValues: {
      control: false,
    },
    onSubmit: {
      control: false,
    },
    onError: {
      control: false,
    },
    shouldValidateOnChange: {
      control: false,
    },
    validationMode: {
      options: validationModes,
      control: {
        type: 'select',
        labels: validationModes,
      },
    },
  },
};
type Story = StoryObj<typeof Form>;
export const Default: Story = {
  render: (args) => {
    const schema = yup
      .object({
        firstName: yup.string().required('this field is required'),
        lastName: yup.string().required('this field is required'),
        email: yup.string().email().required('this field is required'),
        user: yup.object({
          label: yup.string().required('this field is required'),
          value: yup.string().required('this field is required'),
        }),
        password: yup.string().required('this field is required'),
        formRadioExample: yup.string(),
        notification: yup.boolean(),
      })
      .required();
    type TFormData = yup.InferType<typeof schema>;
    const onSubmit = (data: TFormData, reset: UseFormReset<TFormData>) => {
      console.log(data);
      reset();
    };
    const onError = (errors: FieldErrors<TFormData>) => {
      console.log(errors);
      //Handle form error here
    };

    return (
      <Form<TFormData>
        {...args}
        validationSchema={schema}
        defaultValues={{
          firstName: '',
          lastName: '',
          email: '',
          user: { label: '', value: '' },
          password: '',
          formRadioExample: 'opt_1',
          notification: false,
        }}
        onSubmit={onSubmit}
        onError={onError}
      >
        {({ setValue }) => {
          return (
            <>
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <div style={{ width: '100%' }}>
                  <FormInput
                    name="firstName"
                    label="First name"
                    placeholder="First name"
                    required
                    reserveSpaceForError
                    onChange={(e) => {
                      setValue('firstName', capitalizeWords(e.target.value));
                    }}
                  />
                </div>
                <div style={{ width: '100%' }}>
                  <FormInput
                    name="lastName"
                    label="Last name"
                    placeholder="Last name"
                    required
                    reserveSpaceForError
                    onChange={(e) => {
                      setValue('lastName', capitalizeWords(e.target.value));
                    }}
                  />
                </div>
              </div>
              <FormInput name="email" label="Email" placeholder="E-mail" required reserveSpaceForError />
              {/* <FormSelect
                name="user"
                label="User"
                required
                reserveSpaceForError
                options={[
                  { value: 'user-1', label: 'User 1' },
                  { value: 'user-2', label: 'User 2' },
                  { value: 'user-3', label: 'User 3' },
                  { value: 'user-4', label: 'User 4' },
                ]}
              /> */}
              <FormInput
                name="password"
                label="Password"
                placeholder="Password"
                type="password"
                passwordToggle
                required
                reserveSpaceForError
              />
              {/* <FormRadio name="formRadioExample" reserveSpaceForError isInline>
                <RadioOption value="option_1" label="Label 1" />
                <RadioOption value="option_2" label="Label 2" />
                <RadioOption value="option_3" label="Label 3" />
                <RadioOption value="option_4" label="Label 4" disabled />
              </FormRadio>
              <FormCheckbox name="notification" reserveSpaceForError label="Get notified" /> */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '10px',
                }}
              >
                <Button type="reset" variant="secondary">
                  Reset
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </>
          );
        }}
      </Form>
    );
  },
};
export default meta;
