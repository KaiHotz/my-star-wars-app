import { createContext } from 'react';
import { noop } from 'lodash';

import { EThemeOptions } from './types';

export const ThemeContext = createContext<{
  theme: EThemeOptions;
  setTheme: (theme: EThemeOptions) => void;
  isDark: boolean;
}>({
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? EThemeOptions.DARK : EThemeOptions.LIGHT,
  setTheme: noop,
  isDark: window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false,
});
