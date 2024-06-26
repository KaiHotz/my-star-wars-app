import { createContext, useContext } from 'react';

import { RadioProps } from './Radio';

export type RadioContext = Omit<RadioProps, 'errorMsg' | 'hintText' | 'reserveSpaceForError'>;

export const RadioOptionContext = createContext<RadioContext | null>(null);

export const useRadioOption = () => {
  const radioContextData = useContext(RadioOptionContext);
  if (RadioOptionContext === null) {
    throw Error('A Radio Option must have a Radio or FormRadio parent');
  }

  return radioContextData;
};
