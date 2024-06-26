import { keyNames } from '../utils';
import { useEventListener } from './useEventListener';

export const useCloseByEscape = (onClose: () => void) => {
  const handleClose = (e: KeyboardEvent) => {
    if (e.key === keyNames.escape) {
      onClose();
    }
  };
  useEventListener('keydown', handleClose);
};
