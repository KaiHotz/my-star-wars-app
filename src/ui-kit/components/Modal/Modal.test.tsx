import { PropsWithChildren } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { keyNames } from '../../utils';
import { IModalProps, Modal } from './Modal';

const modalProps: PropsWithChildren<IModalProps> = {
  onClose: vi.fn(),
  children: 'This is a modal child',
};

describe('<Modal />', () => {
  const user = userEvent.setup();
  describe('default renders', () => {
    render(<Modal {...modalProps} />);

    const children = screen.getByText(modalProps.children as string);

    const closeButton = screen.getByRole('button');
    const backdrop = screen.getByRole('presentation');
    it('shows children inside the modal body', () => {
      expect(children).toBeInTheDocument();
    });
    it('shows close button by default', () => {
      expect(closeButton).toBeTruthy();
    });
    it('shows backdrop by default', () => {
      expect(backdrop).toBeTruthy();
    });
  });

  describe('onClose is called', () => {
    it('when ESC key is pressed', async () => {
      render(<Modal {...modalProps} />);
      await user.keyboard(`{${keyNames.escape}}`);
      expect(modalProps.onClose).toHaveBeenCalled();
    });
    it('when close button is clicked', async () => {
      render(<Modal {...modalProps} />);
      const closeBtn = screen.getByRole('button');
      await user.click(closeBtn);
      expect(modalProps.onClose).toBeCalledTimes(2);
    });
  });

  describe('renders without close btn and without backdrop', () => {
    render(<Modal {...modalProps} disableCloseButton disableBackdrop />);
    const closeBtn = screen.getByRole('button');
    const backdrop = screen.getByRole('presentation');

    it('does not show the close button when showCloseButton is false', () => {
      expect(closeBtn).not.toBeVisible();
    });
    it('does not show the backdrop when showBackdrop is false', () => {
      expect(backdrop).not.toBeVisible();
    });
  });
});
