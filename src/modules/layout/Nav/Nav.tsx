import Link from 'next/link';

import { navArray } from './helpers';
import styles from './Nav.module.scss';

export function Nav() {
  return (
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
