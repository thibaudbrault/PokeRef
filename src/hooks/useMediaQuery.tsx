import { useState, useCallback, useEffect } from 'react';

export function useMediaQuery(width: number) {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    console.log(e);
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener(`change`, updateTarget);

    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener(`change`, updateTarget);

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return targetReached;
}
