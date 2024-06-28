import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';
import { ISelectOption } from './types';

const optionsDefault: ISelectOption[] = [
  { value: 'opt-1', label: 'Option 1' },
  { value: 'opt-2', label: 'Option 2' },
  { value: 'opt-3', label: 'Option 3' },
  { value: 'opt-4', label: 'Option 4' },
];

const meta: Meta<typeof Select> = {
  title: 'components/Select',
  component: Select,
  argTypes: {},
  args: {
    label: '',
    placeholder: '',
    hintText: '',
    errorMsg: '',
    small: false,
    required: false,
    disabled: false,
    isCreatable: false,
    reserveSpaceForError: false,
    isClearable: false,
    isMulti: false,
  },
};

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: function useSelect(args) {
    return <Select {...args} options={optionsDefault} />;
  },
};

export default meta;
