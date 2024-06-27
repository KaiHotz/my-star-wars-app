import React from 'react';
import * as yup from 'yup';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../Button';
import { Form } from '../Form';
import { FormDatepicker } from './FormDatepicker';

const meta: Meta<typeof FormDatepicker> = {
  title: 'Components/Forms/FormDatepicker',
  component: FormDatepicker,
  argTypes: {
    dropdownMode: {
      description: 'type for year and month dropdown',
    },
  },
};

type Story = StoryObj<typeof FormDatepicker>;

export const Default: Story = {
  render: (args) => {
    const schema = yup.object().shape({
      my_date: args.required ? yup.date().required('Required') : yup.date(),
    });

    type TFormData = yup.InferType<typeof schema>;

    const onSubmit = (data: TFormData) => {
      alert(JSON.stringify(data));
    };

    return (
      <div style={{ padding: '10px 10px 250px 10px' }}>
        <Form validationSchema={schema} defaultValues={{ my_date: new Date() }} onSubmit={onSubmit}>
          <FormDatepicker {...args} name="my_date" />
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  },
  args: {
    label: '',
    placeholder: 'Select a date',
    hintText: '',
    required: false,
    disabled: false,
    reserveSpaceForError: true,
    showMonthDropdown: false,
    showYearDropdown: false,
    showTimeSelect: false,
    showTimeInput: false,
    dropdownMode: 'select',
    autoComplete: 'off',
  },
};

export default meta;
