import { Divider } from '@/components/common/styles/Misc';
import { auth } from '@/firebase-config';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HeaderBtnConnect, HeaderBtnConnected } from '../Header/Styled.Header';
import {
  MainNav,
  MainNavList,
  ResponsiveNav,
  ResponsiveNavList,
} from './Styled.Nav';

type Props = {
  navOpen: boolean;
  setNavOpen: Dispatch<SetStateAction<boolean>>;
};

type NavArray = {
  name: string;
  delay: number;
  exitDelay: number;
}[];

function Nav({ navOpen, setNavOpen }: Props) {
  const [user, setUser] = useState<User | null>();
  // const usersCollectionRef = collection(db, `users`);

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      return setUser(currentUser);
    });
  }, []);

  const navArray: NavArray = [
    { name: `pokémon`, delay: 0.9, exitDelay: 1 },
    { name: `moves`, delay: 0.8, exitDelay: 0.85 },
    { name: `abilities`, delay: 0.7, exitDelay: 0.7 },
    { name: `types`, delay: 0.6, exitDelay: 0.55 },
    { name: `items`, delay: 0.5, exitDelay: 0.4 },
    { name: `machines`, delay: 0.4, exitDelay: 0.25 },
    { name: `locations`, delay: 0.3, exitDelay: 0.1 },
  ];

  const item = {
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        ease: `easeInOut`,
        duration: 0.3,
        delay: 1.2,
      },
    },
  };

  return navOpen ? (
    <AnimatePresence>
      <ResponsiveNav
        variants={item}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: `100vh`, opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit="exit"
      >
        <ResponsiveNavList>
          {navArray.map((nav) => (
            <motion.li
              key={nav.name}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: nav.delay }}
              exit={{
                opacity: 0,
                y: 90,
                transition: {
                  ease: `easeInOut`,
                  delay: nav.exitDelay,
                },
              }}
            >
              <Link
                href={nav.name === `pokémon` ? `/` : `/${nav.name}`}
                onClick={() => setNavOpen(false)}
              >
                {nav.name}
              </Link>
            </motion.li>
          ))}
          <Divider />
          {user ? (
            <HeaderBtnConnected>
              <button onClick={logout}>Sign Out</button>
              <Link href="/profile">Profile</Link>
            </HeaderBtnConnected>
          ) : (
            <HeaderBtnConnect>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </HeaderBtnConnect>
          )}
        </ResponsiveNavList>
      </ResponsiveNav>
    </AnimatePresence>
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
