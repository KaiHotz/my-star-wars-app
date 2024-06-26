import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from './Checkbox';

describe('<Checkbox />', () => {
  const user = userEvent.setup();

  it('should display hint text', () => {
    const props = {
      hintText: 'This is a hint',
    };
    render(<Checkbox {...props} />);

    expect(screen.getByText(props.hintText)).toBeInTheDocument();
  });

  it('should display error message', () => {
    const props = {
      errorMsg: 'This is an error',
    };
    render(<Checkbox {...props} />);

    expect(screen.getByText(props.errorMsg)).toBeInTheDocument();
  });

  it('should display label', () => {
    const props = {
      label: 'This is a label',
    };
    render(<Checkbox {...props} />);
    expect(screen.getByText(props.label)).toBeInTheDocument();
  });

  it('should be disabled', () => {
    render(<Checkbox disabled />);

    expect(screen.getByRole('checkbox', { hidden: true })).toHaveProperty('disabled');
  });

  it('should call onChange', async () => {
    const props = {
      onChange: vi.fn(),
    };

    render(<Checkbox {...props} />);

    const element = screen.getByRole('checkbox', { hidden: true });

    await user.click(element);

    expect(props.onChange).toHaveBeenCalled();
  });
});
