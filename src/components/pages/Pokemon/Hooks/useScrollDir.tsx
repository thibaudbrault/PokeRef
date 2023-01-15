import { useState, useEffect } from 'react';
import { FaAngleDown, FaAngleUp } from '@meronex/icons/fa';
import { ToBottom } from '@/components/pages/Pokemon/Styled.Pokemon';

export const useScrollDir = () => {
  const [scrollDir, setScrollDir] = useState(`down`);

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

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
        <ToBottom href="#footer" aria-label="To Bottom">
          <FaAngleDown />
        </ToBottom>
      );
    } else {
      return (
        <ToBottom href="#header" aria-label="To Top">
          <FaAngleUp />
        </ToBottom>
      );
    }
  };

  return { scrollBtn };
};
