import { useEffect, useRef } from 'react';
import { noop } from 'lodash';

type TUseEventListenerSignature = <T extends keyof GlobalEventHandlersEventMap>(
  eventName: T,
  handler: (e: GlobalEventHandlersEventMap[T]) => void,
  element?: Node | Window | null,
) => void;

export const useEventListener: TUseEventListenerSignature = (eventName, handler, element = window) => {
  const savedHandler = useRef<typeof handler>(noop);

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      if (element === null) return undefined;

      // Create event listener that calls handler function stored in ref
      const eventListener = (event: Event) => savedHandler.current(event as GlobalEventHandlersEventMap[typeof eventName]);
      element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element], // Re-run if eventName or element changes
  );
};
