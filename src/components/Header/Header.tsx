import { FC, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { HiMoon, HiSun } from 'react-icons/hi2';
import { Link, useParams } from 'react-router-dom';
import { Button, EThemeOptions, useTheme } from 'src/ui-kit';
import { routePath } from 'src/routes';
import { messages } from 'src/dictionary';

import './Header.scss';

export const Header: FC = () => {
  const { formatMessage: fm } = useIntl();
  const { theme, setTheme } = useTheme();
  const { category } = useParams();

  const onChangeTheme = useCallback(() => {
    const themeValue = theme === EThemeOptions.LIGHT ? EThemeOptions.DARK : EThemeOptions.LIGHT;
    setTheme(themeValue);
  }, [setTheme, theme]);

  const pageInfo = category || 'search';

  return (
    <header className="header">
      <div className="header--left">
        <Link to={routePath.search} className="header__logo">
          {fm(messages.title)}
        </Link>
      </div>
      <div className="header--center">{`${fm(messages[pageInfo as keyof typeof messages])}`}</div>
      <div className="header--right">
        <div className="header__theme-toggle">
          <Button
            variant="ghost"
            onClick={onChangeTheme}
            icon={theme === EThemeOptions.LIGHT ? <HiMoon /> : <HiSun size={18} />}
          />
        </div>
      </div>
    </header>
  );
};
