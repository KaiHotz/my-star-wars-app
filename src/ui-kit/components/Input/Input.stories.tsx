import { FaCircleInfo, FaEye, FaEyeSlash, FaSistrix } from 'react-icons/fa6';

import { Input } from './Input';

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

export default {
  title: 'Components/Input',
  component: Input,
  args: {
    label: '',
    disabled: false,
    required: false,
    small: false,
    reserveSpaceForError: false,
    hintText: '',
    errorMsg: '',
  },
  argTypes: {
    type: {
      options: [
        'text',
        'password',
        'button',
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'hidden',
        'image',
        'month',
        'number',
        'radio',
        'range',
        'reset',
        'search',
        'submit',
        'tel',
        'time',
        'url',
        'week',
      ],
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
    labelEndAdornment: {
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
    type: 'text',
    placeholder: 'value',
    passwordToggleTooltip: '',
    passwordToggle: false,
  },
};

export const Password = {
  args: {
    type: 'password',
    placeholder: 'Password',
    passwordToggleTooltip: 'Show/Hide password',
    passwordToggle: true,
  },
};
