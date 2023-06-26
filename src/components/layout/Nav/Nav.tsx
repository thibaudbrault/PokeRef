import { Divider } from '@/components/common/ui/Divider';
import header from '@/components/layout/Header/Header.module.scss';
import { auth } from '@/firebase-config';
import { useMediaQuery } from '@/hooks';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './Nav.module.scss';

type Props = {
  navOpen: boolean;
  setNavOpen: Dispatch<SetStateAction<boolean>>;
};

type NavArray = {
  name: string;
}[];

export function Nav({ navOpen, setNavOpen }: Props) {
  const [user, setUser] = useState<User | null>();
  const isBreakpoint = useMediaQuery(890);

  const logout = async () => {
    await signOut(auth);
    setNavOpen(false);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      return setUser(currentUser);
    });
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
        <Divider />
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
