import { PropsWithChildren, useState } from 'react';
import { Meta } from '@storybook/react';

import { IModalProps, Modal } from './Modal';
import { Button } from '../Button';

const ModalBody = () => (
  <div
    style={{
      display: 'flex',
      fontFamily: 'sans-serif',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    }}
  >
    <h1>Welcome</h1>
    <p>Get in touch for with us</p>
    <Button style={{ width: 180 }}>Sign Up</Button>
    <Button style={{ width: 180 }} variant="tertiary">
      Contact Us
    </Button>
  </div>
);
const childrenOptions = {
  normalModal: <ModalBody />,
};
const childrenMap = {
  normalModal: 'Simple Modal',
  largeModal: 'Huge Modal with large Form',
};
const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    children: {
      options: Object.keys(childrenOptions),
      mapping: childrenOptions,
      control: {
        type: 'radio',
        labels: childrenMap,
      },
    },
  },
};
export const Default = {
  render: function useModal(args: PropsWithChildren<Omit<IModalProps, 'onClose'>>) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        {isOpen && (
          <Modal {...args} onClose={() => setIsOpen(false)}>
            {args.children}
          </Modal>
        )}
      </>
    );
  },
  args: {
    disableCloseButton: false,
    disableBackdrop: false,
    disableCoseOnClickOutside: true,
    children: childrenOptions.normalModal,
  },
};
export default meta;
