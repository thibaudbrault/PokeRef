import React from 'react';
import Link from 'next/link';

import { H1 } from '../../Common/Headings';
import {
  HeaderBtnConnect,
  HeaderBtnConnected,
  HeaderBtnContainer,
  HeaderBtnTheme,
  HeaderContainer,
} from './StyledHeader';
import { RiMoonClearLine } from '@meronex/icons/ri';
import { RiSunLine } from '@meronex/icons/ri';
import { useSession, signOut } from 'next-auth/react';

type Props = {
  themeToggler: () => void;
  theme: string;
};

function Header({ themeToggler, theme }: Props) {
  const { data: session } = useSession();

  return (
    <HeaderContainer id="header">
      <H1>PokéRef</H1>
      <HeaderBtnContainer>
        <HeaderBtnTheme onClick={themeToggler} aria-label="Switch Theme">
          {theme === `dark` ? <RiSunLine /> : <RiMoonClearLine />}
        </HeaderBtnTheme>
        {session ? (
          <HeaderBtnConnected>
            <button onClick={signOut}>Log Out</button>
            <Link href="/profile">Profile</Link>
          </HeaderBtnConnected>
        ) : (
          <HeaderBtnConnect>
            <Link href="/login" passHref>
              Login
            </Link>
            <Link href="/register">Register</Link>
          </HeaderBtnConnect>
        )}
      </HeaderBtnContainer>
    </HeaderContainer>
  );
}

export default Header;
