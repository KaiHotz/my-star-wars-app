import { FC, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { HiMoon, HiSun } from 'react-icons/hi2';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, EThemeOptions, MenuButton, useTheme } from 'src/ui-kit';
import { routePath } from 'src/routes';
import { messages } from 'src/dictionary';

import './Header.scss';

const categories = ['people', 'films', 'starships', 'vehicles', 'species', 'planets'];

export const Header: FC = () => {
  const { formatMessage: fm } = useIntl();
  const { theme, setTheme } = useTheme();
  const { pathname } = useLocation();
  const { category } = useParams();
  const navigate = useNavigate();

  const menuItems = categories.map((category) => ({
    label: fm(messages[category as keyof typeof messages]),
    onSelect: () => navigate(`${routePath.category}/${category}`),
  }));

  const onChangeTheme = useCallback(() => {
    const themeValue = theme === EThemeOptions.LIGHT ? EThemeOptions.DARK : EThemeOptions.LIGHT;
    setTheme(themeValue);
  }, [setTheme, theme]);

  const pageInfo = category || 'search';

  return (
    <header className="header">
      <div className="header--left">
        <Link to={routePath.search} className="header__logo header__link">
          {fm(messages.title)}
        </Link>
      </div>
      <div className="header--center">{`${fm(messages[pageInfo as keyof typeof messages])}`}</div>
      <div className="header--right">
        {pathname !== routePath.search && (
          <Link to={routePath.search} className="header__link">
            {fm(messages.search)}
          </Link>
        )}
        <MenuButton items={menuItems}>{fm(messages.categories)}</MenuButton>
        <div className="header__theme-toggle">
          <Button
            variant="ghost"
            onClick={onChangeTheme}
            icon={theme === EThemeOptions.LIGHT ? <HiMoon size={25} /> : <HiSun size={25} />}
          />
        </div>
      </div>
    </header>
  );
};
