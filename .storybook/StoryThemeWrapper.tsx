import React, { FC, ReactNode, useEffect } from 'react';
import { addons } from '@storybook/preview-api';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';
import { useTheme } from '../src/ui-kit';

interface IStoryThemeWrapperProps {
  children: ReactNode
}

const channel = addons.getChannel();

export const StoryThemeWrapper: FC<IStoryThemeWrapperProps> = ({ children  }) => {
  const { setTheme } = useTheme();

  const setUiTheme = () => {
    const persitedTheme = window.localStorage.getItem('sb-addon-themes-3');
    const theme = JSON.parse(persitedTheme || '').current

    setTheme(theme);
  };

  useEffect(() => {
    // listen to DARK_MODE event
    channel.on(DARK_MODE_EVENT_NAME, setUiTheme);
    return () => channel.off(DARK_MODE_EVENT_NAME, setUiTheme);
  }, [channel, setUiTheme]);

  return (
    <div>
      {children}
    </div>
  );
}



