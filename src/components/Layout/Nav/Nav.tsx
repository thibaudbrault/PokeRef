import React from 'react';
import Link from 'next/link';
import { MainNav, MainNavList } from './Styled.Nav';

type NavArray = {
  name: string;
}[];

function Nav() {
  const navArray: NavArray = [
    { name: `pokémon` },
    { name: `moves` },
    { name: `abilities` },
    { name: `types` },
    { name: `items` },
    { name: `machines` },
    { name: `locations` },
  ];

  return (
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
