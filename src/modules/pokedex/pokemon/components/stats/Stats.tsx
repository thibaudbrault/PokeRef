import { Tooltip } from '@/components';
import { IPokemon } from '@/types';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './Stats.module.scss';
import { Calculator } from './calculator';

type Props = {
  pokemon: IPokemon;
};

export function Stats({ pokemon }: Props) {
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
    } else {
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
    } else {
      return Math.floor(value * 2 + 31 + 252 / 4 + 100 + 10);
    }
  };

  return (
    <>
      <section className="section" id="stats">
        <h3 className="h3">Base stats</h3>
        <nav className="methodNav">
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
            <p
              data-tooltip-id="stat-tooltip"
              data-tooltip-content="0 IV, 0 EV and negative nature"
            >
              Min -
            </p>
          </button>
          <button
            className={toggle === 3 ? `button_active` : ``}
            onClick={() => setToggle(3)}
          >
            <p
              data-tooltip-id="stat-tooltip"
              data-tooltip-content="0 IV, 0 EV and neutral nature"
            >
              Min
            </p>
          </button>
          <button
            className={toggle === 4 ? `button_active` : ``}
            onClick={() => setToggle(4)}
          >
            <p
              data-tooltip-id="stat-tooltip"
              data-tooltip-content="31 IV, 252 EV and neutral nature"
            >
              Max
            </p>
          </button>
          <button
            className={toggle === 5 ? `button_active` : ``}
            onClick={() => setToggle(5)}
          >
            <p
              data-tooltip-id="stat-tooltip"
              data-tooltip-content="31 IV, 252 EV and positive nature"
            >
              Max +
            </p>
          </button>
        </nav>
        <div className={styles.circles}>
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
        </div>
        {toggle === 1 && (
          <p className={styles.total}>
            <span className="bold">Total</span>: {percentageTotal}
          </p>
        )}
        <details className={styles.details}>
          <summary>Stats calculator</summary>
          <Calculator baseStat={pokemon.stats} />
        </details>
      </section>
      <Tooltip id="stat-tooltip" />
    </>
  );
}