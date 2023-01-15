import { useCallback, useState } from 'react';

export function useStateWithCallback<T>(
  initialState: T,
): [T, (state: T, cb?: (state: T) => void) => void] {
  const [state, setState] = useState(initialState);

  const setStateCallback = useCallback((state: T, cb?: (state: T) => void) => {
    setState(state);
  }, []);

  return [state, setStateCallback];
}
