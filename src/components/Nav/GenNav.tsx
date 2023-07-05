import { genNav, removeDash } from '@/utils';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  setGame: Dispatch<SetStateAction<string | null>>;
  setVersion: Dispatch<SetStateAction<string | null>>;
};

export function Nav({ setGame, setVersion }: Props) {
  return (
    <nav className="genNav">
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
    </nav>
  );
}
