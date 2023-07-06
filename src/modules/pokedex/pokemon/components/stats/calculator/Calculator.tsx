import { Separator } from '@/components';
import { IPokemonStat } from '@/types';
import { pokemonNatures, removeDash } from '@/utils';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from '../Stats.module.scss';
import { Results } from '../results';

type Props = {
  baseStat: IPokemonStat[];
};

export interface IStatsForm {
  attackEv: number;
  attackIv: number;
  defenseEv: number;
  defenseIv: number;
  hpEv: number;
  hpIv: number;
  level: number;
  specialAttackEv: number;
  specialAttackIv: number;
  specialDefenseEv: number;
  specialDefenseIv: number;
  speedEv: number;
  speedIv: number;
  nature: string;
}

export function Calculator({ baseStat }: Props) {
  const [stats, setStats] = useState<IStatsForm | null>(null);

  const { register, handleSubmit } = useForm<IStatsForm>();
  const onSubmit: SubmitHandler<IStatsForm> = (data) => setStats(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <th>
                <label htmlFor="level">Level</label>
              </th>
              <td colSpan={2}>
                <input
                  type="number"
                  min={1}
                  max={100}
                  {...register(`level`, { valueAsNumber: true })}
                  required
                  placeholder="LVL (max 100)"
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="hp">Hp</label>
              </th>
              <td>
                <input
                  type="number"
                  min={0}
                  max={252}
                  {...register(`hpEv`, { valueAsNumber: true })}
                  required
                  placeholder="EV (max 252)"
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  max={31}
                  {...register(`hpIv`, { valueAsNumber: true })}
                  required
                  placeholder="IV (max 31)"
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="attack">Attack</label>
              </th>
              <td>
                <input
                  type="number"
                  min={0}
                  max={252}
                  {...register(`attackEv`, { valueAsNumber: true })}
                  required
                  placeholder="EV (max 252)"
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  max={31}
                  {...register(`attackIv`, { valueAsNumber: true })}
                  required
                  placeholder="IV (max 31)"
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="defense">Defense</label>
              </th>
              <td>
                <input
                  type="number"
                  min={0}
                  max={252}
                  {...register(`defenseEv`, { valueAsNumber: true })}
                  required
                  placeholder="EV (max 252)"
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  max={31}
                  {...register(`defenseIv`, { valueAsNumber: true })}
                  required
                  placeholder="IV (max 31)"
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="specialAttack">Special Attack</label>
              </th>
              <td>
                <input
                  type="number"
                  min={0}
                  max={252}
                  {...register(`specialAttackEv`, { valueAsNumber: true })}
                  required
                  placeholder="EV (max 252)"
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  max={31}
                  {...register(`specialAttackIv`, { valueAsNumber: true })}
                  required
                  placeholder="IV (max 31)"
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="specialDefense">Special Defense</label>
              </th>
              <td>
                <input
                  type="number"
                  min={0}
                  max={252}
                  {...register(`specialDefenseEv`, { valueAsNumber: true })}
                  required
                  placeholder="EV (max 252)"
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  max={31}
                  {...register(`specialDefenseIv`, { valueAsNumber: true })}
                  required
                  placeholder="IV (max 31)"
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="speed">Speed</label>
              </th>
              <td>
                <input
                  type="number"
                  min={0}
                  max={252}
                  {...register(`speedEv`, { valueAsNumber: true })}
                  required
                  placeholder="EV (max 252)"
                />
              </td>
              <td>
                <input
                  type="number"
                  min={0}
                  max={31}
                  {...register(`speedIv`, { valueAsNumber: true })}
                  required
                  placeholder="IV (max 31)"
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="nature">Nature</label>
              </th>
              <td colSpan={2}>
                <select {...register(`nature`)} required>
                  {pokemonNatures.map((n) => (
                    <option key={n.name} value={n.name}>
                      {n.name} : + {removeDash(n.positive)} / -{` `}
                      {removeDash(n.negative)}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <button>Calculate</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      {stats && (
        <>
          <Separator />
          <Results stats={stats} baseStat={baseStat} />
        </>
      )}
    </>
  );
}
