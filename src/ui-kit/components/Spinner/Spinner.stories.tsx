import type { Meta } from '@storybook/react-vite';

import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
};

export const Default = {
  args: {
    size: 35,
  },
};

export default meta;
