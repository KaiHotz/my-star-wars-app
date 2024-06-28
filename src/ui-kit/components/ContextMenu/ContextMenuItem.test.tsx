import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FaArrowDown } from 'react-icons/fa6';

import { ContextMenuItem, MenuItemProps } from './ContextMenuItem';

const defaultProps: { item: MenuItemProps } = {
  item: {
    label: 'Set Start',
    icon: <FaArrowDown />,
    onSelect: vi.fn(),
  },
};

describe('<ContextMenuItem />', () => {
  const user = userEvent.setup();
  it('should have icon', () => {
    const props = {
      ...defaultProps,
    };
    const { container } = render(<ContextMenuItem {...props} />);
    const elements = container.getElementsByClassName('ui-context-menu__item-icon');

    expect(elements[0]).toBeInTheDocument();
  });

  it('should call onSelect function', async () => {
    const props = {
      ...defaultProps,
    };
    render(<ContextMenuItem {...props} />);

    const element = screen.getByRole('button');

    await user.click(element);

    expect(props.item.onSelect).toHaveBeenCalled();
  });
});
