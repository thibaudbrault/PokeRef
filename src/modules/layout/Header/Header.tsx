import {
  useContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';

import { FiMenu, FiX } from '@meronex/icons/fi';
import { RiMoonClearLine, RiSunLine } from '@meronex/icons/ri';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { Button } from '@/components';
import { ThemeContext } from '@/contexts';

import styles from './Header.module.scss';
import { useMediaQuery } from '@/hooks';
import { MobileNav } from '../Nav';

export function Header() {
  const { status } = useSession();

  const { theme, setTheme } = useContext(ThemeContext);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const isBreakpoint = useMediaQuery(890);

  useEffect(() => {
    if (!isBreakpoint) {
      setIsNavOpen(false);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBreakpoint]);

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
        <MobileNav />
        {/* {isNavOpen ? (
          <button
            className={styles.close}
            aria-label="Close menu"
            onClick={() => setIsNavOpen(false)}
          >
            <FiX />
          </button>
        ) : (
          <button
            className={styles.open}
            aria-label="Open menu"
            onClick={() => setIsNavOpen(true)}
          >
            <FiMenu />
          </button>
        )} */}
      </div>
    </header>
  );
}
