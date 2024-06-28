import { FC, ReactNode, useCallback, useRef } from 'react';
import cx from 'clsx';

export interface MenuItemProps {
  label: string | ReactNode;
  disabled?: boolean;
  title?: string;
  icon?: ReactNode;
  hide?: boolean;
  onSelect?: () => void;
  endAdornment?: ReactNode;
  active?: boolean;
}

interface ContextMenuItemProps {
  item: MenuItemProps;
  onClick?: () => void;
  onClose?: () => void;
}

export const ContextMenuItem: FC<ContextMenuItemProps> = ({ item, onClick, onClose }) => {
  const itemRef = useRef<HTMLButtonElement | null>(null);

  const onItemClicked = useCallback(() => {
    if (!item.disabled) {
      if (item.onSelect) {
        item.onSelect();
      }
      if (onClick) {
        onClick();
      }
      if (onClose) {
        onClose();
      }
    }
  }, [item, onClick, onClose]);

  return (
    <div>
      {!item.hide ? (
        <button
          className={cx('ui-context-menu__item', {
            'ui-context-menu__item--disabled': item.disabled,
            'ui-context-menu__item--active': item.active,
          })}
          ref={itemRef}
          type="button"
          title={item.title}
          onClick={onItemClicked}
        >
          {item.icon && <span className="ui-context-menu__item-icon">{item.icon}</span>}
          <span className="ui-context-menu__item-label">{item.label}</span>
          {item.endAdornment && <span className="ui-context-menu__item-end-adornment">{item.endAdornment}</span>}
        </button>
      ) : null}
    </div>
  );
};
