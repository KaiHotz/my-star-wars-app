import { type FC, type MouseEvent, useCallback, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { flip, offset, shift, useFloating } from '@floating-ui/react';
import { FaChevronDown } from 'react-icons/fa6';

import { Button, type IButtonProps } from '../Button';
import { ContextMenu, type MenuItemProps } from '../ContextMenu';
import { useClickOutside } from '../../hooks';

interface MenuButtonProps extends IButtonProps {
  items: MenuItemProps[];
}

export const MenuButton: FC<MenuButtonProps> = ({ children, variant = 'ghost', items, ...rest }) => {
  const menuRef = useRef<HTMLDivElement>(undefined as unknown as HTMLDivElement);
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset({ mainAxis: 5, crossAxis: 5 }), flip(), shift()],
  });

  const openMenu = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      refs.setReference(event.currentTarget as HTMLElement);
      setIsOpen(true);
    },
    [refs],
  );

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useClickOutside(menuRef, closeMenu);

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
      {isOpen &&
        ReactDOM.createPortal(
          <div ref={(node) => refs.setFloating(node)} style={floatingStyles} className="ui-menu-button__menu">
            <ContextMenu ref={menuRef} menuItems={items} onClose={closeMenu} />
          </div>,
          document.body,
        )}
    </>
  );
};
