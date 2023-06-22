import React from 'react';

export const initialThemeState = {
  theme: `light`,
  setTheme: () => null,
};

export const ThemeContext = React.createContext(initialThemeState);
