import React from 'react';

import { MainBig } from '@/components/common/styles/Sizing';
import { MethodNav } from '@/components/common/styles/Navbars';
import Loader from '@/components/common/ui/Loader/Loader';
import HeadingMoves from '@/components/pages/Moves/Heading';
import { useToggleTable } from '@/components/pages/Moves/Hooks/useToggleTable';

function Moves() {
  const { isLoading, error, toggle, setToggle, pageShown } = useToggleTable();

  if (error instanceof Error) {
    return { error };
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <HeadingMoves />
      <MainBig>
        <MethodNav id="head">
          <button
            id="btnMoves"
            className={toggle === 1 ? `button_active` : ``}
            onClick={() => setToggle(1)}
          >
            <p>Moves</p>
          </button>
          <button
            className={toggle === 2 ? `button_active` : ``}
            onClick={() => setToggle(2)}
          >
            <p>Status</p>
          </button>
        </MethodNav>

        {pageShown()}
      </MainBig>
    </>
  );
}

export default Moves;
