import { Bold } from '@/components/common/styles/Headings';
import { IPokemonStat } from '@/types/Pokemon/Pokemon';
import { pokemonNatures } from '@/utils/DataArrays';
import { removeDash } from '@/utils/Typography';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PokemonCalcTable } from '../Styled.Stats.PokemonCard';

type Props = {
  baseStat: IPokemonStat[];
};

interface IStatsForm {
  [key: string]: number;
}

function CalculatorStats({ baseStat }: Props) {
  const [stats, setStats] = useState<IStatsForm | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: IStatsForm) => setStats(data);

  const getNatureInfluence = (stat: string) => {
    if (stats) {
      if (
        pokemonNatures.find((m) => m.name === stats.nature)?.positive === stat
      ) {
        return 1.1;
      } else if (
        pokemonNatures.find((m) => m.name === stats.nature)?.negative === stat
      ) {
        return 0.9;
      }
      return 1;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PokemonCalcTable>
          <tr>
            <th>
              <label htmlFor="level">Level</label>
            </th>
            <td>
              <input
                type="number"
                min={1}
                max={100}
                {...register('level', { valueAsNumber: true })}
                required
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
                {...register('hpEv', { valueAsNumber: true })}
                required
                placeholder="EV"
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={31}
                {...register('hpIv', { valueAsNumber: true })}
                required
                placeholder="IV"
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
                {...register('attackEv', { valueAsNumber: true })}
                required
                placeholder="EV"
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={31}
                {...register('attackIv', { valueAsNumber: true })}
                required
                placeholder="IV"
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
                {...register('defenseEv', { valueAsNumber: true })}
                required
                placeholder="EV"
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={31}
                {...register('defenseIv', { valueAsNumber: true })}
                required
                placeholder="IV"
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
                {...register('specialAttackEv', { valueAsNumber: true })}
                required
                placeholder="EV"
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={31}
                {...register('specialAttackIv', { valueAsNumber: true })}
                required
                placeholder="IV"
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
                {...register('specialDefenseEv', { valueAsNumber: true })}
                required
                placeholder="EV"
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={31}
                {...register('specialDefenseIv', { valueAsNumber: true })}
                required
                placeholder="IV"
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
                {...register('speedEv', { valueAsNumber: true })}
                required
                placeholder="EV"
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={31}
                {...register('speedIv', { valueAsNumber: true })}
                required
                placeholder="IV"
              />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="nature">Nature</label>
            </th>
            <td colSpan={2}>
              <select {...register('nature')} required>
                {pokemonNatures.map((n) => (
                  <option value={n.name}>
                    {n.name} : + {removeDash(n.positive)} / -{' '}
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
        </PokemonCalcTable>
      </form>
      {stats && (
        <div>
          <p>
            <Bold>Hp</Bold>: {''}
            {Math.floor(
              (stats.level / 100) *
                (baseStat[0].base_stat * 2 + stats.hpIv + stats.hpEv / 4) +
                stats.level +
                10,
            )}
          </p>
          <p>
            <Bold>Attack</Bold>: {''}
            {Math.floor(
              ((stats.level / 100) *
                (baseStat[1].base_stat * 2 +
                  stats.attackIv +
                  stats.attackEv / 4) +
                5) *
                getNatureInfluence(stats.nature),
            )}
          </p>
          <p>
            <Bold>Defense</Bold>: {''}
            {Math.floor(
              ((stats.level / 100) *
                (baseStat[2].base_stat * 2 +
                  stats.defenseIv +
                  stats.defenseEv / 4) +
                5) *
                getNatureInfluence(stats.nature),
            )}
          </p>
          <p>
            <Bold>Special Attack</Bold>: {''}
            {Math.floor(
              ((stats.level / 100) *
                (baseStat[3].base_stat * 2 +
                  stats.specialAttackIv +
                  stats.specialAttackEv / 4) +
                5) *
                getNatureInfluence(stats.nature),
            )}
          </p>
          <p>
            <Bold>Special Defense</Bold>: {''}
            {Math.floor(
              ((stats.level / 100) *
                (baseStat[4].base_stat * 2 +
                  stats.specialDefenseIv +
                  stats.specialDefenseEv / 4) +
                5) *
                getNatureInfluence(stats.nature),
            )}
          </p>
          <p>
            <Bold>Speed</Bold>: {''}
            {Math.floor(
              ((stats.level / 100) *
                (baseStat[5].base_stat * 2 + stats.speed + stats.speed / 4) +
                5) *
                getNatureInfluence(stats.nature),
            )}
          </p>
          <p>
            <Bold>Total</Bold>: {''}
          </p>
        </div>
      )}
    </>
  );
}

export default CalculatorStats;
