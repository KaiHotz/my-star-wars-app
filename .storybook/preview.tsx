import React from 'react';
import type { Preview, StoryFn } from '@storybook/react';
import { ThemeProvider } from '../src/ui-kit/providers';
import { StoryThemeWrapper } from './StoryThemeWrapper';
import './preview.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      stylePreview: true,
      classTarget: 'html'
    },
  },
  decorators: [
    (Story: StoryFn) => (
      <ThemeProvider name="storybook">
        <StoryThemeWrapper>
          <Story />
        </StoryThemeWrapper>
      </ThemeProvider>
    ),
  ]};

export default preview;
