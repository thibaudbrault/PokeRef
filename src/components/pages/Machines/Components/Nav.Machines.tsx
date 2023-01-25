import React, { Dispatch, SetStateAction } from 'react';
import { genNav } from '@/utils/DataArrays';

type Props = {
  setVersion: Dispatch<SetStateAction<string>>;
};

function NavMachines({ setVersion }: Props) {
  return (
    <ol>
      {genNav.map((g) => (
        <li key={g.gen}>
          <button>{g.gen}</button>
          <div>
            {g.details.map((gd) => (
              <button
                key={gd.version}
                onClick={() => {
                  setVersion(gd.version);
                }}
              >
                {gd.game}
              </button>
            ))}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default NavMachines;