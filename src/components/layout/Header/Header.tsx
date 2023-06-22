import {
  BurgerClose,
  BurgerOpen,
  HeaderBtnConnect,
  HeaderBtnConnected,
  HeaderBtnContainer,
  HeaderBtnTheme,
  HeaderContainer,
} from '@/components/layout/Header/Styled.Header';
import { ThemeContext } from '@/contexts/Theme';
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

type Props = {
  navOpen: boolean;
  setNavOpen: Dispatch<SetStateAction<boolean>>;
};

function Header({ navOpen, setNavOpen }: Props) {
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
    <HeaderContainer id="header">
      <h1 className="h1">
        <Link href={`/`}>PokéRef</Link>
      </h1>
      <HeaderBtnContainer>
        <HeaderBtnTheme
          onClick={themeHandler}
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
            <Link href="/profile">Profile</Link>
          </HeaderBtnConnected>
        ) : (
          <HeaderBtnConnect>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </HeaderBtnConnect>
        )}
        {navOpen ? (
          <BurgerOpen
            aria-label="Open menu"
            onClick={() => setNavOpen(!navOpen)}
          >
            <FiX />
          </BurgerOpen>
        ) : (
          <BurgerClose
            aria-label="Close menu"
            onClick={() => setNavOpen(!navOpen)}
          >
            <FiMenu />
          </BurgerClose>
        )}
      </HeaderBtnContainer>
    </HeaderContainer>
  );
}

export default Header;
