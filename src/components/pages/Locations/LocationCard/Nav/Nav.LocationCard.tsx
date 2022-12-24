import React, { Dispatch, SetStateAction } from 'react';
import { GenNav } from '@/components/common/styles/Navbars';
import { genNav } from '@/utils/DataArrays';

type Props = {
  setGame: Dispatch<SetStateAction<string>>;
};

console.log(genNav);

function Nav({ setGame }: Props) {
  return (
    <GenNav>
      <ol>
        {genNav.map((g) => (
          <li key={g.gen}>
            <button>{g.gen}</button>
            <div>
              {g.details.map((gd) => (
                <button
                  key={gd.game}
                  onClick={() => {
                    setGame(gd.game);
                  }}
                >
                  {gd.game}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </GenNav>
  );
}

export default Nav;
