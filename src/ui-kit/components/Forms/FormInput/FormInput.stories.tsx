/* eslint-disable no-console */
import * as yup from 'yup';
import { type FieldErrors } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FaCircleInfo, FaEye, FaEyeSlash, FaSistrix } from 'react-icons/fa6';

import { Form, type IOnsubmitProps } from '../Form';
import { Button } from '../../Button';
import { FormInput } from './FormInput';

const iconOptions = {
  none: undefined,
  searchIcon: <FaSistrix />,
  eyeIcon: <FaEye />,
  eyeSlashIcon: <FaEyeSlash />,
  infoIcon: <FaCircleInfo size={13} />,
};

const iconMap = {
  none: 'None',
  searchIcon: 'Search',
  infoIcon: 'Information',
  eyeIcon: 'Eye',
  eyeSlashIcon: 'Eye Slash',
};

const meta: Meta<typeof FormInput> = {
  title: 'Components/Forms/FormInput',
  component: FormInput,
  args: {
    label: '',
    type: 'text',
    small: false,
    disabled: false,
    required: false,
    placeholder: 'value',
    hintText: '',
    reserveSpaceForError: false,
  },
  argTypes: {
    name: {
      control: false,
    },
    type: {
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
      control: { type: 'select' },
    },
    startAdornment: {
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      control: {
        type: 'select',
        labels: iconMap,
      },
    },
    endAdornment: {
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      control: {
        type: 'select',
        labels: iconMap,
      },
    },
  },
};

type Story = StoryObj<typeof FormInput>;

export const Default: Story = {
  render: (args) => {
    const schema = yup
      .object({
        textinput: args.required ? yup.string().required() : yup.string(),
      })
      .required();

    type TFormData = yup.InferType<typeof schema>;

    const onSubmit = ({ data }: IOnsubmitProps<TFormData>) => {
      console.log(JSON.stringify(data));
    };

    const onError = (errors: FieldErrors<TFormData>) => {
      console.log(errors);
      //Handle form error here
    };

    return (
      <Form<TFormData>
        validationSchema={schema}
        defaultValues={{ textinput: '' }}
        onSubmit={onSubmit}
        onError={onError}
        validationMode="onChange"
      >
        <FormInput {...args} name="textinput" reserveSpaceForError />

        <Button type="submit">Submit</Button>
      </Form>
    );
  },
};

export default meta;
