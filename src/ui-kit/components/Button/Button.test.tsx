import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

const defaultProps = {
  onClick: vi.fn(),
  children: 'This is a button',
};

describe('<Button />', () => {
  const user = userEvent.setup();

  it('should render', () => {
    render(<Button {...defaultProps} />);
    const btn = screen.getByRole('button');

    expect(btn).toBeInTheDocument();
  });

  it('should display children', () => {
    render(<Button {...defaultProps} />);
    const btn = screen.getByText(defaultProps.children);

    expect(btn).toBeInTheDocument();
  });

  it('should call onClick', async () => {
    render(<Button {...defaultProps} />);
    const btn = screen.getByRole('button');
    await user.click(btn);

    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('should be disabled', () => {
    render(<Button {...defaultProps} disabled />);
    const btn = screen.getByRole('button');

    expect(btn).toHaveProperty('disabled');
    expect(btn).toHaveClass('ui-btn--disabled');
  });

  it('should render as number btn', () => {
    render(<Button number />);
    const btn = screen.getByRole('button');

    expect(btn).toHaveClass('ui-btn--number');
  });
});
