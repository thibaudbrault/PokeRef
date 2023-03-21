import { GenNav } from '@/components/common/styles/Navbars';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  pokemonId: number;
  setGame: Dispatch<SetStateAction<string | null>>;
  setVersion: Dispatch<SetStateAction<string | null>>;
  setFormat: Dispatch<SetStateAction<string | null>>;
};

function PokemonNav({ pokemonId, setGame, setVersion, setFormat }: Props) {
  return (
    <GenNav>
      <ul>
        {(pokemonId < 152 || pokemonId > 10000) && (
          <li>
            <button>Gen I</button>
            <div>
              <button
                onClick={() => {
                  setGame(`red`);
                  setVersion(`red-blue`);
                  setFormat('gen1');
                }}
              >
                Red
              </button>
              <button
                onClick={() => {
                  setGame(`blue`);
                  setVersion(`red-blue`);
                  setFormat('gen1');
                }}
              >
                Blue
              </button>
              <button
                onClick={() => {
                  setGame(`yellow`);
                  setVersion(`yellow`);
                  setFormat('gen1');
                }}
              >
                Yellow
              </button>
            </div>
          </li>
        )}
        {(pokemonId < 252 || pokemonId > 10000) && (
          <li>
            <button>Gen II</button>
            <div>
              <button
                onClick={() => {
                  setGame(`gold`);
                  setVersion(`gold-silver`);
                  setFormat('gen2');
                }}
              >
                Gold
              </button>
              <button
                onClick={() => {
                  setGame(`silver`);
                  setVersion(`gold-silver`);
                  setFormat('gen2');
                }}
              >
                Silver
              </button>
              <button
                onClick={() => {
                  setGame(`crystal`);
                  setVersion(`crystal`);
                  setFormat('gen2');
                }}
              >
                Crystal
              </button>
            </div>
          </li>
        )}
        {(pokemonId < 387 || pokemonId > 10000) && (
          <li>
            <button>Gen III</button>
            <div>
              <button
                onClick={() => {
                  setGame(`ruby`);
                  setVersion(`ruby-sapphire`);
                  setFormat('gen3');
                }}
              >
                Ruby
              </button>
              <button
                onClick={() => {
                  setGame(`sapphire`);
                  setVersion(`ruby-sapphire`);
                  setFormat('gen3');
                }}
              >
                Sapphire
              </button>
              <button
                onClick={() => {
                  setGame(`emerald`);
                  setVersion(`emerald`);
                  setFormat('gen3');
                }}
              >
                Emerald
              </button>
              <button
                onClick={() => {
                  setGame(`firered`);
                  setVersion(`firered-leafgreen`);
                  setFormat('gen3');
                }}
              >
                Fire Red
              </button>
              <button
                onClick={() => {
                  setGame(`leafgreen`);
                  setVersion(`firered-leafgreen`);
                  setFormat('gen3');
                }}
              >
                Leaf Green
              </button>
            </div>
          </li>
        )}
        {(pokemonId < 494 || pokemonId > 10000) && (
          <li>
            <button>Gen IV</button>
            <div>
              <button
                onClick={() => {
                  setGame(`diamond`);
                  setVersion(`diamond-pearl`);
                  setFormat('gen4');
                }}
              >
                Diamond
              </button>
              <button
                onClick={() => {
                  setGame(`pearl`);
                  setVersion(`diamond-pearl`);
                  setFormat('gen4');
                }}
              >
                Pearl
              </button>
              <button
                onClick={() => {
                  setGame(`platinum`);
                  setVersion(`platinum`);
                  setFormat('gen4');
                }}
              >
                Platinum
              </button>
              <button
                onClick={() => {
                  setGame(`heartgold`);
                  setVersion(`heartgold-soulsilver`);
                  setFormat('gen4');
                }}
              >
                Heart Gold
              </button>
              <button
                onClick={() => {
                  setGame(`soulsilver`);
                  setVersion(`heartgold-soulsilver`);
                  setFormat('gen4');
                }}
              >
                Soul Silver
              </button>
            </div>
          </li>
        )}
        {(pokemonId < 650 || pokemonId > 10000) && (
          <li>
            <button>Gen V</button>
            <div>
              <button
                onClick={() => {
                  setGame(`black`);
                  setVersion(`black-white`);
                  setFormat('gen5');
                }}
              >
                Black
              </button>
              <button
                onClick={() => {
                  setGame(`white`);
                  setVersion(`black-white`);
                  setFormat('gen5');
                }}
              >
                White
              </button>
              <button
                onClick={() => {
                  setGame(`black-2`);
                  setVersion(`black-2-white-2`);
                  setFormat('gen5');
                }}
              >
                Black 2
              </button>
              <button
                onClick={() => {
                  setGame(`white-2`);
                  setVersion(`black-2-white-2`);
                  setFormat('gen5');
                }}
              >
                White 2
              </button>
            </div>
          </li>
        )}
        {(pokemonId < 722 || pokemonId > 10000) && (
          <li>
            <button>Gen VI</button>
            <div>
              <button
                onClick={() => {
                  setGame(`x`);
                  setVersion(`x-y`);
                  setFormat('gen6');
                }}
              >
                X
              </button>
              <button
                onClick={() => {
                  setGame(`y`);
                  setVersion(`x-y`);
                  setFormat('gen6');
                }}
              >
                Y
              </button>
              <button
                onClick={() => {
                  setGame(`omega-ruby`);
                  setVersion(`omega-ruby-alpha-sapphire`);
                  setFormat('gen6');
                }}
              >
                Omega Ruby
              </button>
              <button
                onClick={() => {
                  setGame(`alpha-sapphire`);
                  setVersion(`omega-ruby-alpha-sapphire`);
                  setFormat('gen6');
                }}
              >
                Alpha Sapphire
              </button>
            </div>
          </li>
        )}
        {(pokemonId < 810 || pokemonId > 10000) && (
          <li>
            <button>Gen VII</button>
            <div>
              <button
                onClick={() => {
                  setGame(`sun`);
                  setVersion(`sun-moon`);
                  setFormat('gen7');
                }}
              >
                Sun
              </button>
              <button
                onClick={() => {
                  setGame(`moon`);
                  setVersion(`sun-moon`);
                  setFormat('gen7');
                }}
              >
                Moon
              </button>
              <button
                onClick={() => {
                  setGame(`ultra-sun`);
                  setVersion(`ultra-sun-ultra-moon`);
                  setFormat('gen7');
                }}
              >
                Ultra Sun
              </button>
              <button
                onClick={() => {
                  setGame(`ultra-moon`);
                  setVersion(`ultra-sun-ultra-moon`);
                  setFormat('gen7');
                }}
              >
                Ultra Moon
              </button>
              <button
                onClick={() => {
                  setGame(`lets-go-pikachu`);
                  setVersion(`lets-go-pikachu-lets-go-eevee`);
                  setFormat('gen7');
                }}
              >
                Let's Go Pikachu
              </button>
              <button
                onClick={() => {
                  setGame(`lets-go-eevee`);
                  setVersion(`lets-go-pikachu-lets-go-eevee`);
                  setFormat('gen7');
                }}
              >
                Let's Go Eevee
              </button>
            </div>
          </li>
        )}
        {(pokemonId < 905 || pokemonId > 10000) && (
          <li>
            <button>Gen VIII</button>
            <div>
              {pokemonId < 898 && (
                <>
                  <button
                    onClick={() => {
                      setGame(`sword`);
                      setVersion(`sword-shield`);
                      setFormat('gen8');
                    }}
                  >
                    Sword
                  </button>
                  <button
                    onClick={() => {
                      setGame(`shield`);
                      setVersion(`sword-shield`);
                      setFormat('gen8');
                    }}
                  >
                    Shield
                  </button>
                </>
              )}
              <button
                onClick={() => {
                  setGame(`legends-arceus`);
                  setVersion(`legends-arceus`);
                  setFormat('gen8');
                }}
              >
                Legends Arceus
              </button>
            </div>
          </li>
        )}
        {(pokemonId < 1011 || pokemonId > 10000) && (
          <li>
            <button>Gen IX</button>
            <div>
              <button
                onClick={() => {
                  setGame(`scarlet`);
                  setVersion(`scarlet-violet`);
                  setFormat('gen9');
                }}
              >
                Scarlet
              </button>
              <button
                onClick={() => {
                  setGame(`violet`);
                  setVersion(`scarlet-violet`);
                  setFormat('gen9');
                }}
              >
                Violet
              </button>
            </div>
          </li>
        )}
      </ul>
    </GenNav>
  );
}

export default PokemonNav;
