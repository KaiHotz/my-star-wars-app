/* eslint-disable no-console */
import type { Meta } from '@storybook/react-vite';
import { FaInfo, FaSistrix } from 'react-icons/fa6';

import { MenuButton } from './MenuButton';

const iconOptions = {
  none: undefined,
  search: <FaSistrix />,
  information: <FaInfo />,
};

const meta: Meta<typeof MenuButton> = {
  title: 'components/MenuButton',
  component: MenuButton,
  argTypes: {
    icon: {
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      control: {
        type: 'select',
        labels: {
          none: 'None',
          search: 'Search',
          information: 'Information',
        },
      },
    },
  },
};

const menuItems = [
  {
    label: 'First Item',
    icon: <FaInfo size={24} />,
    onSelect() {
      console.log('clicked First Item');
    },
  },
  {
    label: 'Second Item',
    disabled: true,
    onSelect() {},
  },
  {
    label: 'Third Item',
    onSelect() {
      console.log('clicked Third Item');
    },
  },
];

export const Default = {
  args: {
    variant: 'transparent',
    size: 'large',
    children: 'Button',
    disabled: false,
    isLoading: false,
    items: menuItems,
  },
};

export default meta;
