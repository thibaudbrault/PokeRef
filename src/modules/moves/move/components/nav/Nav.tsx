/* eslint-disable react/no-unescaped-entities */
import { IMove } from '@/types';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  move: IMove;
  setVersion: Dispatch<SetStateAction<string>>;
};

export function Nav({ move, setVersion }: Props) {
  return (
    <nav className="genNav">
      <ul>
        {move?.generation?.name === `generation-i` && (
          <li>
            <button className="gen">Gen I</button>
            <div>
              <button onClick={() => setVersion(`red-blue`)}>Red / Blue</button>
              <button onClick={() => setVersion(`yellow`)}>Yellow</button>
            </div>
          </li>
        )}
        {(move?.generation?.name === `generation-i` ||
          move?.generation?.name === `generation-ii`) && (
          <li>
            <button className="gen">Gen II</button>
            <div>
              <button onClick={() => setVersion(`gold-silver`)}>
                Gold / Silver
              </button>
              <button onClick={() => setVersion(`crystal`)}>Crystal</button>
            </div>
          </li>
        )}
        {(move?.generation?.name === `generation-i` ||
          move?.generation?.name === `generation-ii` ||
          move?.generation?.name === `generation-iii`) && (
          <li>
            <button className="gen">Gen III</button>
            <div>
              <button onClick={() => setVersion(`ruby-sapphire`)}>
                Ruby / Sapphire
              </button>
              <button onClick={() => setVersion(`emerald`)}>Emerald</button>
              <button onClick={() => setVersion(`firered-greenleaf`)}>
                Fire Red / Green Leaf
              </button>
            </div>
          </li>
        )}
        {(move?.generation?.name === `generation-i` ||
          move?.generation?.name === `generation-ii` ||
          move?.generation?.name === `generation-iii` ||
          move?.generation?.name === `generation-iv`) && (
          <li>
            <button className="gen">Gen IV</button>
            <div>
              <button onClick={() => setVersion(`diamond-pearl`)}>
                Diamond / Pearl
              </button>
              <button onClick={() => setVersion(`platinum`)}>Platinum</button>
              <button onClick={() => setVersion(`heartgold-soulsilver`)}>
                Heart Gold / Soul Silver
              </button>
            </div>
          </li>
        )}
        {(move?.generation?.name === `generation-i` ||
          move?.generation?.name === `generation-ii` ||
          move?.generation?.name === `generation-iii` ||
          move?.generation?.name === `generation-iv` ||
          move?.generation?.name === `generation-v`) && (
          <li>
            <button className="gen">Gen V</button>
            <div>
              <button onClick={() => setVersion(`black-white`)}>
                Black / White
              </button>
              <button onClick={() => setVersion(`black-2-white-2`)}>
                Black 2 / White 2
              </button>
            </div>
          </li>
        )}
        {(move?.generation?.name === `generation-i` ||
          move?.generation?.name === `generation-ii` ||
          move?.generation?.name === `generation-iii` ||
          move?.generation?.name === `generation-iv` ||
          move?.generation?.name === `generation-v` ||
          move?.generation?.name === `generation-vi`) && (
          <li>
            <button className="gen">Gen VI</button>
            <div>
              <button onClick={() => setVersion(`x-y`)}>X / Y</button>
              <button onClick={() => setVersion(`omega-ruby-alpha-sapphire`)}>
                Omega Ruby / Alpha Sapphire
              </button>
            </div>
          </li>
        )}
        {(move?.generation?.name === `generation-i` ||
          move?.generation?.name === `generation-ii` ||
          move?.generation?.name === `generation-iii` ||
          move?.generation?.name === `generation-iv` ||
          move?.generation?.name === `generation-v` ||
          move?.generation?.name === `generation-vi` ||
          move?.generation?.name === `generation-vii`) && (
          <li>
            <button className="gen">Gen VII</button>
            <div>
              <button onClick={() => setVersion(`sun-moon`)}>Sun / Moon</button>
              <button onClick={() => setVersion(`ultra-sun-ultra-moon`)}>
                Ultra Sun / Ultra Moon
              </button>
              <button
                onClick={() => setVersion(`lets-go-pikachu-lets-go-eevee`)}
              >
                Let's Go Pikachu / Let's Go Eevee
              </button>
            </div>
          </li>
        )}
        {(move?.generation?.name === `generation-i` ||
          move?.generation?.name === `generation-ii` ||
          move?.generation?.name === `generation-iii` ||
          move?.generation?.name === `generation-iv` ||
          move?.generation?.name === `generation-v` ||
          move?.generation?.name === `generation-vi` ||
          move?.generation?.name === `generation-vii` ||
          move?.generation?.name === `generation-viii`) && (
          <li>
            <button className="gen">Gen VIII</button>
            <div>
              <button onClick={() => setVersion(`sword-shield`)}>
                Sword / Shield
              </button>
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
}
