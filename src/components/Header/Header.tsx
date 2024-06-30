import { FC, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { HiBars3, HiMoon, HiSun } from 'react-icons/hi2';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, EThemeOptions, MenuButton, useTheme } from 'src/ui-kit';
import { routePath } from 'src/routes';
import { messages } from 'src/dictionary';
import { useCategoriesContext } from 'src/providers';

import './Header.scss';

export const Header: FC = () => {
  const { formatMessage: fm } = useIntl();
  const { theme, setTheme } = useTheme();
  const { pathname } = useLocation();
  const { category } = useParams();
  const navigate = useNavigate();
  const { categories } = useCategoriesContext();

  const menuItems = categories.map((category) => ({
    label: fm(messages[category as keyof typeof messages]),
    onSelect: () => navigate(`${routePath.category}/${category}`),
    active: pathname.includes(category),
  }));

  const onChangeTheme = useCallback(() => {
    const themeValue = theme === EThemeOptions.LIGHT ? EThemeOptions.DARK : EThemeOptions.LIGHT;
    setTheme(themeValue);
  }, [setTheme, theme]);

  const pageInfo = category || 'search';

  return (
    <>
      <div className="header header__mobile">
        <div className="header--left">
          <MenuButton
            items={[
              {
                label: fm(messages.search),
                onSelect: () => navigate(routePath.search),
                active: pathname === routePath.search,
              },
              ...menuItems,
            ]}
            icon={<HiBars3 size={25} />}
          />
        </div>
        <div className="header--center">{`${fm(messages[pageInfo as keyof typeof messages])}`}</div>
        <div className="header--right">
          <div className="header__theme-toggle">
            <Button
              variant="ghost"
              onClick={onChangeTheme}
              icon={theme === EThemeOptions.LIGHT ? <HiMoon size={20} /> : <HiSun size={20} />}
            />
          </div>
        </div>
      </div>
      <div className="header header__desktop">
        <div className="header--left">
          <Link to={routePath.search} className="header__link header__logo">
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
      </div>
    </>
  );
};
