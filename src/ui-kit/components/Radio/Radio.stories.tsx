import { ChangeEvent, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Radio } from './Radio';
import { RadioOption } from './RadioOption';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  argTypes: {
    selected: {
      control: false,
    },
    labelPosition: {
      options: ['left', 'right'],
    },
    variant: { options: [undefined, 'text'] },
  },
};

type Story = StoryObj<typeof Radio>;
export const Default: Story = {
  render: function useRadio(args) {
    const [checkedValue, setCheckedValue] = useState('option_1');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setCheckedValue(value);
    };

    return (
      <div>
        <Radio {...args} name="radioExample" selected={checkedValue} onChange={handleChange}>
          <RadioOption value="option_1" label="Label 1" />
          <RadioOption value="option_2" label="Label 2" />
          <RadioOption value="option_3" label="Label 3" />
          <RadioOption value="option_4" label="Label 4" disabled />
        </Radio>
      </div>
    );
  },
  args: {
    variant: undefined,
    labelPosition: 'left',
    hintText: '',
    errorMsg: '',
    disabled: false,
    isInline: false,
    small: false,
    reserveSpaceForError: false,
  },
};
export default meta;
