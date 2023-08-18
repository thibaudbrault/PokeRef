// @ts-nocheck

import { capitalize } from '@/utils';

import { InfoTable } from '../../utils';
import styles from './Info.module.scss';

import type { IEvolutionChain, IPokemon, IPokemonSpecies } from '@/types';

type Props = {
  pokemon: IPokemon;
  species: IPokemonSpecies;
  evolution: IEvolutionChain;
};

export function Info({ pokemon, species, evolution }: Props) {
  const female = (species?.gender_rate / 8) * 100;
  const male = 100 - (species?.gender_rate / 8) * 100;

  return (
    <section className={styles.section} id="information">
      {InfoTable.map((data) => (
        <div key={data.category}>
          <h3 className="h3">{capitalize(data.category)}</h3>
          <table className={styles.table}>
            <tbody>
              {Array(Object.keys(data).length - 1)
                .fill(true)
                .map((_, i) => (
                  <tr key={i}>
                    <th>{data[`desc_` + i++]?.title}</th>
                    <td>
                      {data[`desc_` + i++]?.value({
                        pokemon: pokemon,
                        species: species,
                        evolution: evolution,
                        male: male,
                        female: female,
                      })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </section>
  );
}
