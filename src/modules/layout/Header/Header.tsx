import { useContext } from 'react';

import { RiMoonClearLine, RiSunLine } from '@meronex/icons/ri';
import Link from 'next/link';

import { ThemeContext } from '@/contexts';

import { MobileNav } from '../Nav';
import styles from './Header.module.scss';

export function Header() {
  const { theme, setTheme } = useContext(ThemeContext);

  const themeHandler = () => {
    if (theme === `light`) {
      setTheme(`dark`);
    } else {
      setTheme(`light`);
    }
  };

  return (
    <header className={styles.header} id="header">
      <h1 className="h1">
        <Link href={`/`}>PokéRef</Link>
      </h1>
      <div className={styles.buttons}>
        <button
          className={styles.theme}
          onClick={themeHandler}
          aria-label="Switch Theme"
          data-testid="themeBtn"
        >
          {theme === `dark` ? (
            <RiSunLine data-testid="sun" />
          ) : (
            <RiMoonClearLine data-testid="moon" />
          )}
        </button>
        <MobileNav />
      </div>
    </header>
  );
}
