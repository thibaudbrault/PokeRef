import React from 'react';

export const initialThemeState = {
  theme: `dark`,
  setTheme: () => null,
};

export const ThemeContext = React.createContext(initialThemeState);
