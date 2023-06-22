// @ts-nocheck

import { H3 } from '@/components/common/styles/Headings';
import { IEvolutionChain, IPokemon, IPokemonSpecies } from '@/types';
import { capitalize } from '@/utils';
import { InfoTable } from '../../utils';
import {
  PokemonInfoSection,
  PokemonInfoTable,
} from './Styled.Info.PokemonCard';

type Props = {
  pokemon: IPokemon;
  species: IPokemonSpecies;
  evolution: IEvolutionChain;
};

export function Info({ pokemon, species, evolution }: Props) {
  const female = (species?.gender_rate / 8) * 100;
  const male = 100 - (species?.gender_rate / 8) * 100;

  return (
    <PokemonInfoSection id="information">
      {InfoTable.map((data) => (
        <div key={data.category}>
          <H3>{capitalize(data.category)}</H3>
          <PokemonInfoTable>
            <tbody>
              {Array(Object.keys(data).length - 1)
                .fill(true)
                .map((_, i) => (
                  <tr key={i}>
                    <th>{data[`desc_` + (i + 1)]?.title}</th>
                    <td>
                      {data[`desc_` + (i + 1)]?.value({
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
          </PokemonInfoTable>
        </div>
      ))}
    </PokemonInfoSection>
  );
}
