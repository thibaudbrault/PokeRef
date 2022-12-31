import React, { useState } from 'react';
import Link from 'next/link';

import { H1 } from '@/components/common/styles/Headings';
import {
  HeaderBtnConnect,
  HeaderBtnConnected,
  HeaderBtnContainer,
  HeaderBtnTheme,
  HeaderContainer,
} from '@/components/layout/Header/Styled.Header';
import { RiMoonClearLine } from '@meronex/icons/ri';
import { RiSunLine } from '@meronex/icons/ri';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/firebase';

type Props = {
  themeToggler: () => void;
  theme: string;
};

function Header({ themeToggler, theme }: Props) {
  const [user, setUser] = useState<User | null>();

  onAuthStateChanged(auth, (currentUser) => {
    return setUser(currentUser);
  });

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <HeaderContainer id="header">
      <H1>PokéRef</H1>
      <HeaderBtnContainer>
        <HeaderBtnTheme
          onClick={themeToggler}
          aria-label="Switch Theme"
          data-testid="themeBtn"
        >
          {theme === `dark` ? (
            <RiSunLine data-testid="sun" />
          ) : (
            <RiMoonClearLine data-testid="moon" />
          )}
        </HeaderBtnTheme>
        {user ? (
          <HeaderBtnConnected>
            <button onClick={logout}>Sign Out</button>
            <Link href="/">Profile</Link>
          </HeaderBtnConnected>
        ) : (
          <HeaderBtnConnect>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </HeaderBtnConnect>
        )}
      </HeaderBtnContainer>
    </HeaderContainer>
  );
}

export default Header;
