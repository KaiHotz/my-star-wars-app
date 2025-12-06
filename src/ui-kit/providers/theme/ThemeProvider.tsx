import { type FC, type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { ThemeContext } from './context';
import { EThemeOptions } from './types';

export const ThemeProvider: FC<{ name: string; children: ReactNode }> = ({ children, name }) => {
  const themeName = `${name}-theme`;
  const localStorage = window.localStorage;
  const systemTheme: EThemeOptions = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? EThemeOptions.DARK
    : EThemeOptions.LIGHT;
  const persitedTheme = useMemo(() => localStorage.getItem(themeName) as EThemeOptions, [localStorage, themeName]);
  const [theme, setTheme] = useState<EThemeOptions>(persitedTheme || systemTheme);

  useEffect(() => {
    localStorage.setItem(themeName, persitedTheme || systemTheme);
    document.querySelector('html')?.setAttribute('data-theme', persitedTheme || systemTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTheme = useCallback(
    (value: EThemeOptions) => {
      setTheme(value);
      localStorage.setItem(themeName, value);
      document.querySelector('html')?.setAttribute('data-theme', value);
    },
    [localStorage, themeName],
  );

  const contextValue = useMemo(() => {
    return {
      theme,
      setTheme: handleTheme,
      isDark: theme === EThemeOptions.DARK,
    };
  }, [handleTheme, theme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
