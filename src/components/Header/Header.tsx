import { FC, useCallback } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi2';
import { Link, useParams } from 'react-router-dom';
import { Button, EThemeOptions, useTheme } from 'src/ui-kit';
import { routePath } from 'src/routes';

import './Header.scss';

export const Header: FC = () => {
  const { theme, setTheme } = useTheme();
  const { recource } = useParams();

  const onChangeTheme = useCallback(() => {
    const themeValue = theme === EThemeOptions.LIGHT ? EThemeOptions.DARK : EThemeOptions.LIGHT;
    setTheme(themeValue);
  }, [setTheme, theme]);

  const pageInfo = recource || 'Search';

  return (
    <header className="header">
      <div className="header--left">
        <Link to={routePath.search} className="header__logo">
          Star Wars
        </Link>
      </div>
      <div className="header--center">{`${pageInfo}`}</div>
      <div className="header--right">
        <div className="header__theme-toggle">
          <Button
            variant="ghost"
            onClick={onChangeTheme}
            title="Change theme to light mode"
            icon={theme === EThemeOptions.LIGHT ? <HiMoon /> : <HiSun size={18} />}
          />
        </div>
      </div>
    </header>
  );
};
