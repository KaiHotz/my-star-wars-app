import type { Meta } from '@storybook/react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';

import { ContextMenu } from './ContextMenu';
import { MenuItemProps } from './ContextMenuItem';

const meta: Meta<typeof ContextMenu> = {
  title: 'components/ContextMenu',
  component: ContextMenu,
};

const menuItems: MenuItemProps[] = [
  {
    label: 'First Item',
    icon: <FaArrowDown />,
    onSelect() {},
  },
  {
    label: 'Second Item',
    disabled: true,
    icon: <FaArrowUp />,
    onSelect() {},
  },
  {
    label: 'Third Item',
    onSelect() {},
  },
];

export const Default = {
  args: {
    menuItems,
  },
};

export default meta;
