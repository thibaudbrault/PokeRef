import { Input, Separator } from '@/components';
import { IPokemonStat } from '@/types';
import { pokemonNatures, removeDash } from '@/utils';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from '../Stats.module.scss';
import { Results } from '../results';
import * as Label from '@radix-ui/react-label';

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
                <Label.Root htmlFor="level">Level</Label.Root>
              </th>
              <td colSpan={2}>
                <Input
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
                <Label.Root htmlFor="hp">Hp</Label.Root>
              </th>
              <td>
                <Input
                  type="number"
                  min={0}
                  max={252}
                  {...register(`hpEv`, { valueAsNumber: true })}
                  required
                  placeholder="EV (max 252)"
                />
              </td>
              <td>
                <Input
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
                <Label.Root htmlFor="attack">Attack</Label.Root>
              </th>
              <td>
                <Input
                  type="number"
                  min={0}
                  max={252}
                  {...register(`attackEv`, { valueAsNumber: true })}
                  required
                  placeholder="EV (max 252)"
                />
              </td>
              <td>
                <Input
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
                <Label.Root htmlFor="defense">Defense</Label.Root>
              </th>
              <td>
                <Input
                  type="number"
                  min={0}
                  max={252}
                  {...register(`defenseEv`, { valueAsNumber: true })}
                  required
                  placeholder="EV (max 252)"
                />
              </td>
              <td>
                <Input
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
                <Label.Root htmlFor="specialAttack">Special Attack</Label.Root>
              </th>
              <td>
                <Input
                  type="number"
                  min={0}
                  max={252}
                  {...register(`specialAttackEv`, { valueAsNumber: true })}
                  required
                  placeholder="EV (max 252)"
                />
              </td>
              <td>
                <Input
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
                <Label.Root htmlFor="specialDefense">
                  Special Defense
                </Label.Root>
              </th>
              <td>
                <Input
                  type="number"
                  min={0}
                  max={252}
                  {...register(`specialDefenseEv`, { valueAsNumber: true })}
                  required
                  placeholder="EV (max 252)"
                />
              </td>
              <td>
                <Input
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
                <Label.Root htmlFor="speed">Speed</Label.Root>
              </th>
              <td>
                <Input
                  type="number"
                  min={0}
                  max={252}
                  {...register(`speedEv`, { valueAsNumber: true })}
                  required
                  placeholder="EV (max 252)"
                />
              </td>
              <td>
                <Input
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
                <Label.Root htmlFor="nature">Nature</Label.Root>
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
