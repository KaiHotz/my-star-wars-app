import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { highlightText } from '../highlightText';

vi.mock('../getCSSVariable', () => ({
  getCSSVariable: vi.fn(() => '#ff6b35'),
}));

describe('highlightText', () => {
  it('should highlight text', () => {
    render(highlightText({ highlight: 'highlight', text: 'highlight this text' }));

    const highlightedText = screen.getByText('highlight');

    expect(highlightedText).toHaveStyle({ color: '#ff6b35', fontWeight: 'bolder' });
  });
});
