import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Hint } from './Hint';

describe('<Hint />', () => {
  it('should display text', () => {
    const props = {
      children: 'This is a hint',
    };
    render(<Hint {...props} />);
    const element = screen.getByText(props.children);

    expect(element).toBeInTheDocument();
  });

  it('should display as error', () => {
    const props = {
      children: 'This is an error',
    };
    render(<Hint {...props} variant="error" />);

    const element = screen.getByText(props.children);

    expect(element).toHaveClass('ui-hint--error');
  });
});
