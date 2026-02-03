import { type ReactNode, useEffect, useState } from 'react';

import { ThemeContext, initialThemeState } from './ThemeContext';

type Props = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(initialThemeState.theme);

  const localStorage = globalThis.window?.localStorage;

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('globalTheme');

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`globalTheme`, theme);
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${theme}-theme`);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
