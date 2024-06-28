import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MenuButton } from './MenuButton';

const menuItems = [
  {
    label: 'First Item',
    onSelect: vi.fn(),
  },
  {
    label: 'Second Item',
    disabled: true,
    onSelect: vi.fn(),
  },
  {
    label: 'Third Item',
    onSelect: vi.fn(),
  },
];

describe('MenuButton', () => {
  const user = userEvent.setup();

  describe('when menu is closed', () => {
    it('should show just the button', () => {
      render(<MenuButton items={menuItems}>Action</MenuButton>);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
  describe('when menu is open', () => {
    it('should show menu', async () => {
      render(<MenuButton items={menuItems}>Action</MenuButton>);

      await user.click(screen.getByRole('button', { name: 'Action' }));

      expect(screen.getByText(menuItems[0].label)).toBeInTheDocument();
    });
  });
});
