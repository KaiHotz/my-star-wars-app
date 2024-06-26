import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Label } from './Label';

describe('<Label />', () => {
  it('should display text', () => {
    const props = {
      children: 'This is a Label',
    };
    render(<Label {...props} />);
    const label = screen.getByText(props.children);

    expect(label).toBeInTheDocument();
  });

  it('should allow custom className', () => {
    const props = {
      children: 'This is a Label',
      className: 'custom',
    };
    render(<Label {...props} />);
    const label = screen.getByText(props.children);

    expect(label).toHaveClass(props.className);
  });
});
