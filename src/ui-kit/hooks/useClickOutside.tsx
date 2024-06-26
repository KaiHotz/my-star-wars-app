import { RefObject, useCallback } from 'react';

import { useEventListener } from './useEventListener';

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T> | null,
  handler: (e: MouseEvent | TouchEvent) => void,
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (ref?.current?.contains(event.target as Node)) {
        return;
      }

      handler(event);
    },
    [ref, handler],
  );
  useEventListener('mousedown', handleClickOutside, document);
  useEventListener('touchstart', handleClickOutside, document);
};
