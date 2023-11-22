import { type ReactNode, useEffect, useState } from 'react';

import { ThemeContext, initialThemeState } from './ThemeContext';

type Props = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(initialThemeState.theme);

  const localStorage = globalThis.window?.localStorage;

  useEffect(() => {
    const savedThemeLocal = localStorage.getItem(`globalTheme`);

    if (!!savedThemeLocal) {
      setTheme(savedThemeLocal);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(`globalTheme`, theme);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`${theme}-theme`}>{children}</div>
    </ThemeContext.Provider>
  );
};
