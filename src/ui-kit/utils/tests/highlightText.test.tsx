import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { highlightText } from '../highlightText';

describe('highlightText', () => {
  it('should highlight text', () => {
    render(highlightText({ highlight: 'highlight', text: 'highlight this text' }));

    const highlightedText = screen.getByText('highlight');

    expect(highlightedText).toHaveStyle({ color: 'var(--orange-3)', fontWeight: 'bolder' });
  });
});
