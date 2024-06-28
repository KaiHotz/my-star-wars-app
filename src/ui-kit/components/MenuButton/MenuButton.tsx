import { FC, MouseEvent, useCallback, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { FaChevronDown } from 'react-icons/fa6';

import { Button, IButtonProps } from '../Button';
import { ContextMenu, MenuItemProps } from '../ContextMenu';
import { useClickOutside } from '../../hooks';

interface MenuButtonProps extends IButtonProps {
  items: MenuItemProps[];
}

export const MenuButton: FC<MenuButtonProps> = ({ children, variant = 'ghost', items, ...rest }) => {
  const menu = useRef(null);
  const [menuElement, setMenuElement] = useState<HTMLElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(menuElement, popperElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [5, 5],
        },
      },
    ],
  });

  const openMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    setMenuElement(event.currentTarget as HTMLElement);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuElement(null);
  }, []);

  useClickOutside(menu, closeMenu);

  return (
    <>
      <Button
        variant={variant}
        small
        icon={<FaChevronDown />}
        iconPosition="right"
        {...rest}
        className="ui-menu-button"
        onClick={openMenu}
      >
        {children}
      </Button>
      {menuElement &&
        ReactDOM.createPortal(
          <div ref={setPopperElement} style={styles.popper} {...attributes.popper} className="ui-menu-button__menu">
            <ContextMenu ref={menu} menuItems={items} onClose={closeMenu} />
          </div>,
          document.body,
        )}
    </>
  );
};
