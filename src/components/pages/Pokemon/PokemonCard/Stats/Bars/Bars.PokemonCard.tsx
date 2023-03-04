import { H3 } from '@/components/common/styles/Headings';
import { MethodNav } from '@/components/common/styles/Navbars';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { PokemonStatsCircles } from '../Styled.Stats.PokemonCard';

type Props = {
  pokemon: IPokemon;
};

function Bars({ pokemon }: Props) {
  const [toggle, setToggle] = useState<number>(1);

  const percentageHp = pokemon.stats[0].base_stat;
  const percentageAtk = pokemon.stats[1].base_stat;
  const percentageDef = pokemon.stats[2].base_stat;
  const percentageSpAtk = pokemon.stats[3].base_stat;
  const percentageSpDef = pokemon.stats[4].base_stat;
  const percentageSpd = pokemon.stats[5].base_stat;
  const percentageTotal =
    pokemon?.stats?.[0]?.base_stat +
    pokemon?.stats?.[1]?.base_stat +
    pokemon?.stats?.[2]?.base_stat +
    pokemon?.stats?.[3]?.base_stat +
    pokemon?.stats?.[4]?.base_stat +
    pokemon?.stats?.[5]?.base_stat;

  const statCalc = (value: number) => {
    if (toggle === 1) {
      return value;
    } else if (toggle === 2) {
      return Math.floor((value * 2 + 5) * 0.9);
    } else if (toggle === 3) {
      return Math.floor(value * 2 + 5);
    } else if (toggle === 4) {
      return Math.floor(value * 2 + 31 + 252 / 4 + 5);
    } else if (toggle === 5) {
      return Math.floor((value * 2 + 31 + 252 / 4 + 5) * 1.1);
    }
  };

  const hpCalc = (value: number) => {
    if (toggle === 1) {
      return value;
    } else if (toggle === 2) {
      return Math.floor(value * 2 + 100 + 10);
    } else if (toggle === 3) {
      return Math.floor(value * 2 + 100 + 10);
    } else if (toggle === 4) {
      return Math.floor(value * 2 + 31 + 252 / 4 + 100 + 10);
    } else if (toggle === 5) {
      return Math.floor(value * 2 + 31 + 252 / 4 + 100 + 10);
    }
  };

  return (
    <div>
      <H3>Base stats</H3>
      <MethodNav>
        <button
          className={toggle === 1 ? `button_active` : ``}
          onClick={() => setToggle(1)}
        >
          <p>Base</p>
        </button>
        <button
          className={toggle === 2 ? `button_active` : ``}
          onClick={() => setToggle(2)}
        >
          <p>Min-</p>
        </button>
        <button
          className={toggle === 3 ? `button_active` : ``}
          onClick={() => setToggle(3)}
        >
          <p>Min</p>
        </button>
        <button
          className={toggle === 4 ? `button_active` : ``}
          onClick={() => setToggle(4)}
        >
          <p>Max</p>
        </button>
        <button
          className={toggle === 5 ? `button_active` : ``}
          onClick={() => setToggle(5)}
        >
          <p>Max+</p>
        </button>
      </MethodNav>
      <PokemonStatsCircles>
        <CircularProgressbar
          maxValue={toggle === 1 ? 255 : 720}
          value={hpCalc(percentageHp)}
          text={`${hpCalc(percentageHp)} Hp`}
          strokeWidth={5}
        />
        <CircularProgressbar
          maxValue={toggle === 1 ? 255 : 720}
          value={statCalc(percentageAtk)}
          text={`${statCalc(percentageAtk)} Atk`}
          strokeWidth={5}
        />
        <CircularProgressbar
          maxValue={toggle === 1 ? 255 : 720}
          value={statCalc(percentageDef)}
          text={`${statCalc(percentageDef)} Def`}
          strokeWidth={5}
        />
        <CircularProgressbar
          maxValue={toggle === 1 ? 255 : 720}
          value={statCalc(percentageSpAtk)}
          text={`${statCalc(percentageSpAtk)} Sp Atk`}
          strokeWidth={5}
        />
        <CircularProgressbar
          maxValue={toggle === 1 ? 255 : 720}
          value={statCalc(percentageSpDef)}
          text={`${statCalc(percentageSpDef)} Sp Def`}
          strokeWidth={5}
        />
        <CircularProgressbar
          maxValue={toggle === 1 ? 255 : 720}
          value={statCalc(percentageSpd)}
          text={`${statCalc(percentageSpd)} Spd`}
          strokeWidth={5}
        />
      </PokemonStatsCircles>
      {/* <table>
        <tbody>
          <tr>
            <PokemonStatsText>
              {pokemon?.stats?.[0]?.stat?.name.toUpperCase()}
            </PokemonStatsText>
            <PokemonStatsText>
              {pokemon?.stats?.[0]?.base_stat}
            </PokemonStatsText>
            <PokemonStatsBars>
              <div>
                <span
                  style={{
                    width: `calc(${pokemon?.stats?.[0]?.base_stat} / 255 * 100%)`,
                  }}
                ></span>
              </div>
            </PokemonStatsBars>
            <PokemonStatsText>
              {pokemon?.stats?.[0]?.base_stat * 2 + 110}
            </PokemonStatsText>
            <PokemonStatsText>
              {pokemon?.stats?.[0]?.base_stat * 2 + 204}
            </PokemonStatsText>
          </tr>
          <tr>
            <PokemonStatsText>
              {pokemon?.stats?.[1]?.stat?.name}
            </PokemonStatsText>
            <PokemonStatsText>
              {pokemon?.stats?.[1]?.base_stat}
            </PokemonStatsText>
            <PokemonStatsBars>
              <div>
                <span
                  style={{
                    width: `calc(${pokemon?.stats?.[1]?.base_stat} / 255 * 100%)`,
                  }}
                ></span>
              </div>
            </PokemonStatsBars>
            <PokemonStatsText>
              {Math.floor(
                (((2 * pokemon?.stats?.[1]?.base_stat + 0 + 0 / 4) * 100) /
                  100 +
                  5) *
                  0.9,
              ).toFixed(0)}
            </PokemonStatsText>
            <PokemonStatsText>
              {Math.floor(
                (pokemon?.stats?.[1]?.base_stat * 2 + 99) * 1.1,
              ).toFixed(0)}
            </PokemonStatsText>
          </tr>
          <tr>
            <PokemonStatsText>
              {pokemon?.stats?.[2]?.stat?.name}
            </PokemonStatsText>
            <PokemonStatsText>
              {pokemon?.stats?.[2]?.base_stat}
            </PokemonStatsText>
            <PokemonStatsBars>
              <div>
                <span
                  style={{
                    width: `calc(${pokemon?.stats?.[2]?.base_stat} / 255 * 100%)`,
                  }}
                ></span>
              </div>
            </PokemonStatsBars>
            <PokemonStatsText>
              {Math.floor(
                (((2 * pokemon?.stats?.[2]?.base_stat + 0 + 0 / 4) * 100) /
                  100 +
                  5) *
                  0.9,
              ).toFixed(0)}
            </PokemonStatsText>
            <PokemonStatsText>
              {Math.floor(
                (pokemon?.stats?.[2]?.base_stat * 2 + 99) * 1.1,
              ).toFixed(0)}
            </PokemonStatsText>
          </tr>
          <tr>
            <PokemonStatsText>
              {removeDash(pokemon?.stats?.[3]?.stat?.name)}
            </PokemonStatsText>
            <PokemonStatsText>
              {pokemon?.stats?.[3]?.base_stat}
            </PokemonStatsText>
            <PokemonStatsBars>
              <div>
                <span
                  style={{
                    width: `calc(${pokemon?.stats?.[3]?.base_stat} / 255 * 100%)`,
                  }}
                ></span>
              </div>
            </PokemonStatsBars>
            <PokemonStatsText>
              {Math.floor(
                (((2 * pokemon?.stats?.[3]?.base_stat + 0 + 0 / 4) * 100) /
                  100 +
                  5) *
                  0.9,
              ).toFixed(0)}
            </PokemonStatsText>
            <PokemonStatsText>
              {Math.floor(
                (pokemon?.stats?.[3]?.base_stat * 2 + 99) * 1.1,
              ).toFixed(0)}
            </PokemonStatsText>
          </tr>
          <tr>
            <PokemonStatsText>
              {removeDash(pokemon?.stats?.[4]?.stat?.name).replace(
                `special`,
                `sp.`,
              )}
            </PokemonStatsText>
            <PokemonStatsText>
              {pokemon?.stats?.[4]?.base_stat}
            </PokemonStatsText>
            <PokemonStatsBars>
              <div>
                <span
                  style={{
                    width: `calc(${pokemon?.stats?.[4]?.base_stat} / 255 * 100%)`,
                  }}
                ></span>
              </div>
            </PokemonStatsBars>
            <PokemonStatsText>
              {Math.floor(
                (((2 * pokemon?.stats?.[4]?.base_stat + 0 + 0 / 4) * 100) /
                  100 +
                  5) *
                  0.9,
              ).toFixed(0)}
            </PokemonStatsText>
            <PokemonStatsText>
              {Math.floor(
                (pokemon?.stats?.[4]?.base_stat * 2 + 99) * 1.1,
              ).toFixed(0)}
            </PokemonStatsText>
          </tr>
          <tr>
            <PokemonStatsText>
              {pokemon?.stats?.[5]?.stat?.name}
            </PokemonStatsText>
            <PokemonStatsText>
              {pokemon?.stats?.[5]?.base_stat}
            </PokemonStatsText>
            <PokemonStatsBars>
              <div>
                <span
                  style={{
                    width: `calc(${pokemon?.stats?.[5]?.base_stat} / 255 * 100%)`,
                  }}
                ></span>
              </div>
            </PokemonStatsBars>
            <PokemonStatsText>
              {Math.floor(
                (((2 * pokemon?.stats?.[5]?.base_stat + 0 + 0 / 4) * 100) /
                  100 +
                  5) *
                  0.9,
              ).toFixed(0)}
            </PokemonStatsText>
            <PokemonStatsText>
              {Math.floor(
                (pokemon?.stats?.[5]?.base_stat * 2 + 99) * 1.1,
              ).toFixed(0)}
            </PokemonStatsText>
          </tr>
          <tr>
            <PokemonStatsTotal>Total</PokemonStatsTotal>
            <PokemonStatsTotal>{statsTotal}</PokemonStatsTotal>
            <PokemonStatsBars>
              <div>
                <span
                  style={{
                    width: `calc(${statsTotal} / 720 * 100%)`,
                  }}
                ></span>
              </div>
            </PokemonStatsBars>
            <PokemonStatsTotal>Min.</PokemonStatsTotal>
            <PokemonStatsTotal>Max.</PokemonStatsTotal>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}

export default Bars;
