import { type FC, type PropsWithChildren, useRef } from 'react';
import { createPortal } from 'react-dom';
import { noop } from 'lodash';
import { FaXmark } from 'react-icons/fa6';
import cx from 'clsx';

import { useClickOutside, useCloseByEscape } from '../../hooks';
import { isEditableElement } from '../../utils';
import { Backdrop } from '../Backdrop';
import { Button } from '../Button';
import './Modal.scss';

export interface IModalProps {
  size?: 'small' | 'medium' | 'large' | 'full-page';
  disableBackdrop?: boolean;
  hasFrozenBackdrop?: boolean;
  disableCloseButton?: boolean;
  disableCoseOnClickOutside?: boolean;
  onClose: () => void;
}

export const Modal: FC<PropsWithChildren<IModalProps>> = ({
  size = 'small',
  onClose,
  disableCloseButton,
  disableBackdrop,
  disableCoseOnClickOutside,
  hasFrozenBackdrop,
  children,
}) => {
  const modalRef = useRef(null);
  useCloseByEscape(() => {
    // to avoid loosing user's input = close by escape disabled when editable element is in focus
    if (!isEditableElement(document.activeElement)) {
      onClose();
    }
  });
  useClickOutside(modalRef, disableCoseOnClickOutside ? noop : onClose);

  return createPortal(
    <>
      {(!disableBackdrop || hasFrozenBackdrop) && <Backdrop isFrosted={hasFrozenBackdrop} />}
      <div className={cx('ui-modal', `ui-modal--${size}`)} ref={modalRef}>
        {!disableCloseButton && (
          <div className="ui-modal__close-icon">
            <Button icon={<FaXmark size={18} />} iconPosition="left" variant="ghost" onClick={onClose} />
          </div>
        )}
        {children}
      </div>
    </>,
    document.body,
  );
};
