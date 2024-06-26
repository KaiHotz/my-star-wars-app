import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './Input';

const baseProps = {
  name: 'input name',
};

describe('<Input />', () => {
  const user = userEvent.setup();

  describe('when there is an error and a hint', () => {
    it('should display error', () => {
      const props = {
        errorMsg: 'This is an error',
        ...baseProps,
      };

      render(<Input {...props} />);
      const errorMsg = screen.getByText(props.errorMsg);

      expect(errorMsg).toBeInTheDocument();
    });
    it('should hide hint', () => {
      const props = {
        hintText: 'This is an error',
        ...baseProps,
      };

      render(<Input {...props} />);
      const hintText = screen.getByText(props.hintText);

      expect(hintText).toBeInTheDocument();
    });
  });

  it('should call onChange', async () => {
    const props = {
      ...baseProps,
      onChange: vi.fn(),
    };
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');

    await user.click(input);
    await user.keyboard('jane');

    expect(props.onChange).toHaveBeenCalled();
  });

  it('should display label', () => {
    const props = {
      label: 'This is a label',
    };
    render(<Input {...props} />);

    const label = screen.getByText(props.label);

    expect(label).toBeInTheDocument();
  });

  it('should be disabled', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveProperty('disabled');
  });

  it('should be required', () => {
    render(<Input required />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveProperty('required');
  });
});
