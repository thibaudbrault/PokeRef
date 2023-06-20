import { ReactNode, useEffect, useState } from 'react';
import ThemeContext, { initialThemeState } from './ThemeContext';

type Props = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(initialThemeState.theme);

  const localStorage = globalThis.window?.localStorage;

  useEffect(() => {
    const savedThemeLocal = localStorage.getItem(`globalTheme`);

    if (!!savedThemeLocal) {
      setTheme(savedThemeLocal);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`globalTheme`, theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme--${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
