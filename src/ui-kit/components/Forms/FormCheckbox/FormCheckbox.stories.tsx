/* eslint-disable no-console */
import * as yup from 'yup';
import { FieldErrors } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '../Form';
import { Button } from '../../Button';
import { FormCheckbox } from './FormCheckbox';

const meta: Meta<typeof FormCheckbox> = {
  title: 'Components/Forms/FormCheckbox',
  component: FormCheckbox,
  argTypes: {
    name: {
      control: false,
    },
    checked: {
      control: false,
    },
  },
};

type Story = StoryObj<typeof FormCheckbox>;

export const Default: Story = {
  render: (args) => {
    const schema = yup
      .object({
        notification: args.required ? yup.boolean().oneOf([true], 'Checkbox selection is required') : yup.boolean(),
      })
      .required();

    type TFormData = yup.InferType<typeof schema>;

    const onSubmit = (data: TFormData) => {
      alert(JSON.stringify(data));
    };

    const onError = (errors: FieldErrors<TFormData>) => {
      console.log(errors);
      //Handle form error here
    };

    return (
      <Form<TFormData>
        validationSchema={schema}
        defaultValues={{ notification: false }}
        onSubmit={onSubmit}
        onError={onError}
      >
        <FormCheckbox {...args} name="notification" reserveSpaceForError />

        <Button type="submit">Submit</Button>
      </Form>
    );
  },
  args: {
    label: 'Get notified',
    labelPosition: 'right',
    hintText: '',
    required: false,
    disabled: false,
    variant: 'checkmark',
    reserveSpaceForError: false,
  },
};

export default meta;
