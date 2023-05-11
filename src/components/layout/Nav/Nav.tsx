import { Divider } from '@/components/common/ui/Divider';
import { auth } from '@/firebase-config';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HeaderBtnConnect, HeaderBtnConnected } from '../Header/Styled.Header';
import {
  MainNav,
  MainNavList,
  ResponsiveNav,
  ResponsiveNavContainer,
  ResponsiveNavList,
} from './Styled.Nav';

type Props = {
  navOpen: boolean;
  setNavOpen: Dispatch<SetStateAction<boolean>>;
};

type NavArray = {
  name: string;
}[];

function Nav({ navOpen, setNavOpen }: Props) {
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
    <ResponsiveNav>
      <ResponsiveNavContainer>
        <ResponsiveNavList>
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
        </ResponsiveNavList>
        <Divider />
        {user ? (
          <HeaderBtnConnected>
            <button onClick={logout}>Sign Out</button>
            <Link href="/profile" onClick={() => setNavOpen(false)}>
              Profile
            </Link>
          </HeaderBtnConnected>
        ) : (
          <HeaderBtnConnect>
            <Link href="/login" onClick={() => setNavOpen(false)}>
              Login
            </Link>
            <Link href="/register" onClick={() => setNavOpen(false)}>
              Register
            </Link>
          </HeaderBtnConnect>
        )}
      </ResponsiveNavContainer>
    </ResponsiveNav>
  ) : (
    <MainNav>
      <MainNavList>
        {navArray.map((nav) => (
          <li key={nav.name}>
            <Link href={nav.name === `pokémon` ? `/` : `/${nav.name}`}>
              {nav.name}
            </Link>
          </li>
        ))}
      </MainNavList>
    </MainNav>
  );
}

export default Nav;
