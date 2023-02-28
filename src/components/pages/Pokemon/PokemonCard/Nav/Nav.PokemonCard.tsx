import { GenNav } from '@/components/common/styles/Navbars';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  pokemonId: number;
  setGame: Dispatch<SetStateAction<string | null>>;
  setVersion: Dispatch<SetStateAction<string | null>>;
};

function PokemonNav({ pokemonId, setGame, setVersion }: Props) {
  return (
    <GenNav>
      <ol>
        {(pokemonId < 152 || pokemonId > 10000) && (
          <li>
            <button>Gen I</button>
            <div>
              <button
                onClick={() => {
                  setGame(`red`);
                  setVersion(`red-blue`);
                }}
              >
                Red
              </button>
              <button
                onClick={() => {
                  setGame(`blue`);
                  setVersion(`red-blue`);
                }}
              >
                Blue
              </button>
              <button
                onClick={() => {
                  setGame(`yellow`);
                  setVersion(`yellow`);
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
                }}
              >
                Gold
              </button>
              <button
                onClick={() => {
                  setGame(`silver`);
                  setVersion(`gold-silver`);
                }}
              >
                Silver
              </button>
              <button
                onClick={() => {
                  setGame(`crystal`);
                  setVersion(`crystal`);
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
                }}
              >
                Ruby
              </button>
              <button
                onClick={() => {
                  setGame(`sapphire`);
                  setVersion(`ruby-sapphire`);
                }}
              >
                Sapphire
              </button>
              <button
                onClick={() => {
                  setGame(`emerald`);
                  setVersion(`emerald`);
                }}
              >
                Emerald
              </button>
              <button
                onClick={() => {
                  setGame(`firered`);
                  setVersion(`firered-leafgreen`);
                }}
              >
                Fire Red
              </button>
              <button
                onClick={() => {
                  setGame(`leafgreen`);
                  setVersion(`firered-leafgreen`);
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
                }}
              >
                Diamond
              </button>
              <button
                onClick={() => {
                  setGame(`pearl`);
                  setVersion(`diamond-pearl`);
                }}
              >
                Pearl
              </button>
              <button
                onClick={() => {
                  setGame(`platinum`);
                  setVersion(`platinum`);
                }}
              >
                Platinum
              </button>
              <button
                onClick={() => {
                  setGame(`heartgold`);
                  setVersion(`heartgold-soulsilver`);
                }}
              >
                Heart Gold
              </button>
              <button
                onClick={() => {
                  setGame(`soulsilver`);
                  setVersion(`heartgold-soulsilver`);
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
                }}
              >
                Black
              </button>
              <button
                onClick={() => {
                  setGame(`white`);
                  setVersion(`black-white`);
                }}
              >
                White
              </button>
              <button
                onClick={() => {
                  setGame(`black-2`);
                  setVersion(`black-2-white-2`);
                }}
              >
                Black 2
              </button>
              <button
                onClick={() => {
                  setGame(`white-2`);
                  setVersion(`black-2-white-2`);
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
                }}
              >
                X
              </button>
              <button
                onClick={() => {
                  setGame(`y`);
                  setVersion(`x-y`);
                }}
              >
                Y
              </button>
              <button
                onClick={() => {
                  setGame(`omega-ruby`);
                  setVersion(`omega-ruby-alpha-sapphire`);
                }}
              >
                Omega Ruby
              </button>
              <button
                onClick={() => {
                  setGame(`alpha-sapphire`);
                  setVersion(`omega-ruby-alpha-sapphire`);
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
                }}
              >
                Sun
              </button>
              <button
                onClick={() => {
                  setGame(`moon`);
                  setVersion(`sun-moon`);
                }}
              >
                Moon
              </button>
              <button
                onClick={() => {
                  setGame(`ultra-sun`);
                  setVersion(`ultra-sun-ultra-moon`);
                }}
              >
                Ultra Sun
              </button>
              <button
                onClick={() => {
                  setGame(`ultra-moon`);
                  setVersion(`ultra-sun-ultra-moon`);
                }}
              >
                Ultra Moon
              </button>
              <button
                onClick={() => {
                  setGame(`lets-go-pikachu`);
                  setVersion(`lets-go-pikachu-lets-go-eevee`);
                }}
              >
                Let's Go Pikachu
              </button>
              <button
                onClick={() => {
                  setGame(`lets-go-eevee`);
                  setVersion(`lets-go-pikachu-lets-go-eevee`);
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
              <button
                onClick={() => {
                  setGame(`sword`);
                  setVersion(`sword-shield`);
                }}
              >
                Sword
              </button>
              <button
                onClick={() => {
                  setGame(`shield`);
                  setVersion(`sword-shield`);
                }}
              >
                Shield
              </button>
            </div>
          </li>
        )}
      </ol>
    </GenNav>
  );
}

export default PokemonNav;
