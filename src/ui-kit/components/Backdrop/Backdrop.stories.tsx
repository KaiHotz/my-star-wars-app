import { Meta } from '@storybook/react';

import { Backdrop } from './Backdrop';

const meta: Meta<typeof Backdrop> = {
  title: 'Components/Backdrop',
  component: Backdrop,
  argTypes: {},
};

export const Default = {
  args: {
    isFrosted: false,
  },
};

export default meta;
