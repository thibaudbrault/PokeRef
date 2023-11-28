import { ReactNode } from 'react';

import { Footer, Header, Nav } from '@/modules/layout';

type Props = {
  children: ReactNode;
};

export function PageLayout({ children }: Props) {
  return (
    <>
      <Header />
      <Nav />
      {children}
      <Footer />
    </>
  );
}
