import { GenNav } from '@/components/common/styles/Navbars';
import { genNav, removeDash } from '@/utils';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setGame: Dispatch<SetStateAction<string | null>>;
  setVersion: Dispatch<SetStateAction<string | null>>;
};

function Nav({ setGame, setVersion }: Props) {
  return (
    <GenNav>
      <ul>
        {genNav.map((g) => (
          <li key={g.gen}>
            <button>{g.gen}</button>
            <div>
              {g.details.map((gd) => (
                <button
                  key={gd.game}
                  onClick={() => {
                    setGame(gd.game);
                    setVersion(gd.version);
                  }}
                >
                  {removeDash(gd.game)}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </GenNav>
  );
}

export default Nav;
