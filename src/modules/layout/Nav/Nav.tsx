import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import Link from 'next/link';

import { Separator } from '@/components';
import { useMediaQuery } from '@/hooks';
import header from '@/modules/layout/Header/Header.module.scss';

import styles from './Nav.module.scss';

type Props = {
  navOpen: boolean;
  setNavOpen: Dispatch<SetStateAction<boolean>>;
};

type NavArray = {
  name: string;
}[];

export function Nav({ navOpen, setNavOpen }: Props) {
  // will have the user's info
  const [user, setUser] = useState();
  const isBreakpoint = useMediaQuery(890);

  const logout = async () => {
    // will be used to logout
    setNavOpen(false);
  };

  useEffect(() => {
    if (!isBreakpoint) {
      setNavOpen(false);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBreakpoint]);

  const navArray: NavArray = [
    { name: `pokémon` },
    { name: `moves` },
    { name: `abilities` },
    { name: `types` },
    { name: `items` },
    { name: `machines` },
    { name: `locations` },
  ];

  return navOpen && isBreakpoint ? (
    <nav className={styles.mobileNav}>
      <div className={styles.mobileInner}>
        <ul className={styles.mobileList}>
          {navArray.map((nav) => (
            <li key={nav.name}>
              <Link
                href={nav.name === `pokémon` ? `/` : `/${nav.name}`}
                onClick={() => setNavOpen(false)}
              >
                {nav.name}
              </Link>
            </li>
          ))}
        </ul>
        <Separator />
        {user ? (
          <div className={header.connected}>
            <button onClick={logout}>Sign Out</button>
            <Link href="/profile" onClick={() => setNavOpen(false)}>
              Profile
            </Link>
          </div>
        ) : (
          <div className={header.connect}>
            <Link href="/login" onClick={() => setNavOpen(false)}>
              Login
            </Link>
            <Link href="/register" onClick={() => setNavOpen(false)}>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  ) : (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {navArray.map((nav) => (
          <li key={nav.name}>
            <Link href={nav.name === `pokémon` ? `/` : `/${nav.name}`}>
              {nav.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
