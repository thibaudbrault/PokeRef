import { ScrollBtn } from '@/components/pages/Pokemon/Styled.Pokemon';
import { FaAngleDown, FaAngleUp } from '@meronex/icons/fa';
import { useEffect, useState } from 'react';

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
        <ScrollBtn href="#footer" aria-label="To Bottom">
          <FaAngleDown />
        </ScrollBtn>
      );
    } else {
      return (
        <ScrollBtn href="#header" aria-label="To Top">
          <FaAngleUp />
        </ScrollBtn>
      );
    }
  };

  return { scrollBtn };
};
