import { pokemonNatures } from '@/utils';

import { type IStatsForm } from '../calculator/Calculator';
import styles from '../Stats.module.scss';

import type { IPokemonStat } from '@/types';

type Props = {
  stats: IStatsForm;
  baseStat: IPokemonStat[];
};

export function Results({ stats, baseStat }: Props) {
  const getNatureInfluence = (stat: string) => {
    if (
      pokemonNatures.find((n) => n.name === stats.nature)?.positive === stat
    ) {
      return 1.1;
    } else if (
      pokemonNatures.find((n) => n.name === stats.nature)?.negative === stat
    ) {
      return 0.9;
    }
    return 1;
  };

  return (
    <table className={styles.results}>
      <thead className="tHead">
        <tr>
          <th>Hp</th>
          <th>Attack</th>
          <th>Defense</th>
          <th>Special Attack</th>
          <th>Special Defense</th>
          <th>Speed</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {Math.floor(
              (stats.level / 100) *
                (baseStat[0].base_stat * 2 + stats.hpIv + stats.hpEv / 4) +
                stats.level +
                10,
            )}
          </td>
          <td>
            {Math.floor(
              ((stats.level / 100) *
                (baseStat[1].base_stat * 2 +
                  stats.attackIv +
                  stats.attackEv / 4) +
                5) *
                getNatureInfluence(`Attack`),
            )}
          </td>
          <td>
            {Math.floor(
              ((stats.level / 100) *
                (baseStat[2].base_stat * 2 +
                  stats.defenseIv +
                  stats.defenseEv / 4) +
                5) *
                getNatureInfluence(`Defense`),
            )}
          </td>
          <td>
            {Math.floor(
              ((stats.level / 100) *
                (baseStat[3].base_stat * 2 +
                  stats.specialAttackIv +
                  stats.specialAttackEv / 4) +
                5) *
                getNatureInfluence(`Sp-Atk`),
            )}
          </td>
          <td>
            {Math.floor(
              ((stats.level / 100) *
                (baseStat[4].base_stat * 2 +
                  stats.specialDefenseIv +
                  stats.specialDefenseEv / 4) +
                5) *
                getNatureInfluence(`Sp-Def`),
            )}
          </td>
          <td>
            {Math.floor(
              ((stats.level / 100) *
                (baseStat[5].base_stat * 2 +
                  stats.speedIv +
                  stats.speedEv / 4) +
                5) *
                getNatureInfluence(`Speed`),
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
