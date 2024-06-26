import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { Radio } from './Radio';
import { RadioOption } from './RadioOption';

describe('<Radio />', () => {
  const defaultProps = {
    selected: 'Option 1',
    onChange: vi.fn(),
  };
  it('should display hint', () => {
    const props = {
      ...defaultProps,
      hintText: 'This is a hint',
    };
    render(
      <Radio {...props}>
        <RadioOption value="option_1" label="Label 1" />
        <RadioOption value="option_2" label="Label 2" />
        <RadioOption value="option_3" label="Label 3" />
      </Radio>,
    );

    expect(screen.getByText(props.hintText)).toBeInTheDocument();
  });
  it('should display error', () => {
    const props = {
      ...defaultProps,
      errorMsg: 'This is an error',
    };
    render(
      <Radio {...props}>
        <RadioOption value="option_1" label="Label 1" />
        <RadioOption value="option_2" label="Label 2" />
        <RadioOption value="option_3" label="Label 3" />
      </Radio>,
    );

    expect(screen.getByText(props.errorMsg)).toBeInTheDocument();
  });
  it('should be disabled', () => {
    render(
      <Radio disabled {...defaultProps}>
        <RadioOption value="option_1" label="Label 1" />
        <RadioOption value="option_2" label="Label 2" />
        <RadioOption value="option_3" label="Label 3" />
      </Radio>,
    );

    screen.getAllByRole('radio').forEach((node) => {
      expect(node).toHaveProperty('disabled');
    });
  });

  it('should call onChange', () => {
    render(
      <Radio {...defaultProps}>
        <RadioOption value="option_1" label="Label 1" />
        <RadioOption value="option_2" label="Label 2" />
        <RadioOption value="option_3" label="Label 3" />
      </Radio>,
    );

    screen.getAllByRole('radio').forEach((node) => {
      fireEvent.click(node);
      expect(defaultProps.onChange).toHaveBeenCalled();
    });
  });
});
