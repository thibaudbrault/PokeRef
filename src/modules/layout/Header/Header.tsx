import { useContext } from 'react';

import { FiMenu } from '@meronex/icons/fi';
import { RiMoonClearLine, RiSunLine } from '@meronex/icons/ri';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { Button, Avatar, AvatarImage, AvatarFallback } from '@/components';
import { ThemeContext } from '@/contexts';

import { MobileNav } from '../Nav';
import styles from './Header.module.scss';

export function Header() {
  const { status, data: session } = useSession();

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
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Avatar>
                <AvatarImage src={session.user?.image || ``} />
                <AvatarFallback>
                  <FiMenu />
                </AvatarFallback>
              </Avatar>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              className="DropdownMenuContent"
              sideOffset={10}
            >
              <DropdownMenu.Item className="DropdownMenuItem">
                <Link href="/profile">Profile</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="DropdownMenuItem" onClick={logout}>
                Sign Out
              </DropdownMenu.Item>
              <DropdownMenu.Arrow className="DropdownMenuArrow" />
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ) : (
          <div className={styles.auth}>
            <Button intent="primary" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        )}
        <MobileNav />
      </div>
    </header>
  );
}
