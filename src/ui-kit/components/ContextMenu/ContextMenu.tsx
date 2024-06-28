import { forwardRef } from 'react';

import { ContextMenuItem, MenuItemProps } from './ContextMenuItem';
import './ContextMenu.scss';

export interface ContextMenuProps {
  menuItems: MenuItemProps[];
  onClick?: () => void;
  onClose?: () => void;
}

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(({ menuItems, onClick, onClose }, ref) => (
  <div ref={ref} className="ui-context-menu" role="presentation">
    {menuItems.map((item, index) => (
      <ContextMenuItem key={`ui-menu-item-${index + 1}`} item={item} onClick={onClick} onClose={onClose} />
    ))}
  </div>
));
