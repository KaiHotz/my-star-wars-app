import { useContext } from 'react';

import { ThemeContext } from '../providers/theme';

export const useTheme = () => {
  const { theme, setTheme, isDark } = useContext(ThemeContext);

  return { theme, isDark, setTheme };
};
