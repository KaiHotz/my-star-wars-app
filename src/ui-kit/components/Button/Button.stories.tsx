import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';

import { Button } from './Button';

const iconOptions = {
  none: undefined,
  arowDown: <FaArrowDown />,
  arrowUp: <FaArrowUp />,
};

const iconMap = {
  none: 'None',
  arowDown: 'Arrow Down',
  arrowUp: 'Arrow Up',
};

export default {
  title: 'Components/Button',
  component: Button,
  args: {
    iconPosition: 'left',
    variant: 'primary',
    type: 'button',
    small: false,
    number: false,
    disabled: false,
  },
  argTypes: {
    icon: {
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      control: {
        type: 'select',
        labels: iconMap,
      },
    },
  },
};

export const Default = {
  args: {
    children: `I'm a Button`,
  },
};

export const Icon = {
  args: {
    icon: <FaArrowDown />,
  },
};
