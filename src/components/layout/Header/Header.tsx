import { ThemeContext } from '@/contexts';
import { auth } from '@/firebase-config';
import { FiMenu, FiX } from '@meronex/icons/fi';
import { RiMoonClearLine, RiSunLine } from '@meronex/icons/ri';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import styles from './Header.module.scss';

type Props = {
  navOpen: boolean;
  setNavOpen: Dispatch<SetStateAction<boolean>>;
};

export function Header({ navOpen, setNavOpen }: Props) {
  const [user, setUser] = useState<User | null>();
  // const usersCollectionRef = collection(db, `users`);

  const { theme, setTheme } = useContext(ThemeContext);

  const logout = async () => {
    await signOut(auth);
  };

  const themeHandler = () => {
    if (theme === `light`) {
      setTheme(`dark`);
    } else {
      setTheme(`light`);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      return setUser(currentUser);
    });
  }, []);

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
        {user ? (
          <div className={styles.connected}>
            <button onClick={logout}>Sign Out</button>
            <Link href="/profile">Profile</Link>
          </div>
        ) : (
          <div className={styles.connect}>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
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
