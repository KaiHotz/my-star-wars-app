import { ChangeEvent, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    label: 'Get notified',
    labelPosition: 'right',
    hintText: '',
    errorMsg: '',
    required: false,
    disabled: false,
    variant: 'checkmark',
    reserveSpaceForError: false,
  },
  argTypes: {
    checked: {
      control: false,
    },
  },
};

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: function useCheckbox(args) {
    const [checkedValue, setCheckedValue] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;
      setCheckedValue(checked);
    };

    return (
      <div>
        <Checkbox {...args} name="checkboxExample" checked={checkedValue} onChange={handleChange} />
      </div>
    );
  },
};

export default meta;
