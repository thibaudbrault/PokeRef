import { Bold, H3 } from '@/components/common/styles/Headings';
import { MethodNav } from '@/components/common/styles/Navbars';
import { Section } from '@/components/common/styles/Sizing';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CalculatorStats from './Calculator/Calculator.Stats.PokemonCard';
import {
  PokemonStatsCircles,
  PokemonStatsDetails,
  PokemonStatsTotal,
} from './Styled.Stats.PokemonCard';

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
    <Section>
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
          <p title="0 IV, 0 EV and negative nature">Min-</p>
        </button>
        <button
          className={toggle === 3 ? `button_active` : ``}
          onClick={() => setToggle(3)}
        >
          <p title="0 IV, 0 EV and neutral nature">Min</p>
        </button>
        <button
          className={toggle === 4 ? `button_active` : ``}
          onClick={() => setToggle(4)}
        >
          <p title="31 IV, 252 EV and neutral nature">Max</p>
        </button>
        <button
          className={toggle === 5 ? `button_active` : ``}
          onClick={() => setToggle(5)}
        >
          <p title="31 IV, 252 EV and positive nature">Max+</p>
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
      {toggle === 1 && (
        <PokemonStatsTotal>
          <Bold>Total</Bold>: {percentageTotal}
        </PokemonStatsTotal>
      )}
      <PokemonStatsDetails>
        <summary>Stats calculator</summary>
        <CalculatorStats baseStat={pokemon.stats} />
      </PokemonStatsDetails>
    </Section>
  );
}

export default Bars;
