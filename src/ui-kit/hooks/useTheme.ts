import { useContext } from 'react';

import { ThemeContext } from '../providers/theme/ThemeProvider';

export const useTheme = () => {
  const { theme, setTheme, isDark } = useContext(ThemeContext);

  return { theme, isDark, setTheme };
};
