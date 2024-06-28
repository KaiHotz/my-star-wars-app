import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';

import { MenuItemProps } from './ContextMenuItem';
import { ContextMenu } from './ContextMenu';

const defaultProps: { menuItems: MenuItemProps[] } = {
  menuItems: [
    {
      label: 'First Item',
      icon: <FaArrowDown />,
      onSelect: vi.fn(),
    },
  ],
};

describe('<ContextMenu />', () => {
  const user = userEvent.setup();

  it('should render correct amount of items', () => {
    const props = {
      ...defaultProps,
      onClick: vi.fn(),
    };
    const { container } = render(<ContextMenu {...props} />);

    const elements = container.getElementsByClassName('ui-context-menu__item');

    expect(elements.length).toBe(defaultProps.menuItems.length);
  });

  it('should render correct list of items when some item is hidden', () => {
    const props = {
      menuItems: [
        {
          label: 'First Item',
          icon: <FaArrowDown />,
          onSelect: vi.fn(),
        },
        {
          label: 'Second Item',
          icon: <FaArrowUp />,
          hide: true,
          onSelect: vi.fn(),
        },
      ],
      onClick: vi.fn(),
    };
    const { container } = render(<ContextMenu {...props} />);

    const elements = container.getElementsByClassName('ui-context-menu__item');
    const nrOfElements = props.menuItems.filter((el) => !el.hide).length;

    expect(elements.length).toBe(nrOfElements);
    expect(screen.getByRole('button', { name: props.menuItems[0].label })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: props.menuItems[1].label })).not.toBeInTheDocument();
  });

  it('should call onClick function', async () => {
    const props = {
      ...defaultProps,
      onClick: vi.fn(),
    };
    render(<ContextMenu {...props} />);
    const element = screen.getByRole('button');
    await user.click(element);

    expect(props.onClick).toHaveBeenCalled();
  });
});
