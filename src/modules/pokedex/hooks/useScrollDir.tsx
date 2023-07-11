import { useEffect, useState } from 'react';

import { FaAngleDown, FaAngleUp } from '@meronex/icons/fa';

import styles from '@/modules/pokedex/Pokedex.module.scss';

export const useScrollDir = () => {
  const [scrollDir, setScrollDir] = useState(`down`);

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? `down` : `up`);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener(`scroll`, onScroll);
    return () => window.removeEventListener(`scroll`, onScroll);
  }, [scrollDir]);

  const scrollBtn = () => {
    if (scrollDir === `down`) {
      return (
        <a className={styles.scroll} href="#footer" aria-label="To Bottom">
          <FaAngleDown />
        </a>
      );
    } else {
      return (
        <a className={styles.scroll} href="#header" aria-label="To Top">
          <FaAngleUp />
        </a>
      );
    }
  };

  return { scrollBtn };
};
