import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const useRouterIsReady = () => {
  const router = useRouter();
  const [name, setName] = useState<string | string[] | undefined>(``);

  useEffect(() => {
    if (router.isReady) {
      setName(router.query.name);
    }
  }, [router.isReady]);

  return { name };
};
