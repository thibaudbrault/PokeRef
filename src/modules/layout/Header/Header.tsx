import { useContext, type Dispatch, type SetStateAction } from 'react';

import { FiMenu, FiX } from '@meronex/icons/fi';
import { RiMoonClearLine, RiSunLine } from '@meronex/icons/ri';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { Button } from '@/components';
import { ThemeContext } from '@/contexts';

import styles from './Header.module.scss';

type Props = {
  navOpen: boolean;
  setNavOpen: Dispatch<SetStateAction<boolean>>;
};

export function Header({ navOpen, setNavOpen }: Props) {
  const { status } = useSession();

  const { theme, setTheme } = useContext(ThemeContext);

  const logout = async () => {
    await signOut();
  };

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
        {status === `authenticated` ? (
          <div className={styles.auth}>
            <Button intent="secondary" onClick={logout}>
              Sign Out
            </Button>
            <Button intent="primary" asChild>
              <Link href="/profile">Profile</Link>
            </Button>
          </div>
        ) : (
          <div className={styles.auth}>
            <Button intent="secondary" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button intent="primary" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        )}
        {navOpen ? (
          <button
            className={styles.open}
            aria-label="Open menu"
            onClick={() => setNavOpen(!navOpen)}
          >
            <FiX />
          </button>
        ) : (
          <button
            className={styles.close}
            aria-label="Close menu"
            onClick={() => setNavOpen(!navOpen)}
          >
            <FiMenu />
          </button>
        )}
      </div>
    </header>
  );
}
