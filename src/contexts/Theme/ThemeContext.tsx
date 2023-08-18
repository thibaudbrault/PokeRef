import React, { type Dispatch, type SetStateAction } from 'react';

export const initialThemeState = {
  theme: `dark`,
  setTheme: (() => null) as Dispatch<SetStateAction<string>>,
};

export const ThemeContext = React.createContext(initialThemeState);
