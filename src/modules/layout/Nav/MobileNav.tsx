import { FiMenu } from '@meronex/icons/fi';
import Link from 'next/link';
import { Drawer } from 'vaul';

import { navArray } from './helpers';
import styles from './Nav.module.scss';

export const MobileNav = () => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button className={styles.burger} aria-label="Open menu">
          <FiMenu />
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="DrawerOverlay" />
        <Drawer.Content className="DrawerContent">
          <div className="DrawerHandle" />
          <nav className={styles.mobileNav}>
            <ul className={styles.mobileList}>
              {navArray.map((nav, i) => (
                <li key={i}>
                  <Link href={nav.name === `pokémon` ? `/` : `/${nav.name}`}>
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
