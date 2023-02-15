import { H3 } from '@/components/common/styles/Headings';
import { IEvolutionChain } from '@/types/Evolution/EvolutionChain';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { IPokemonSpecies } from '@/types/Pokemon/PokemonSpecies';
import { InfoTable } from '../Utils/DataTables';
import { PokemonInfoSection, PokemonInfoTable } from './Styled.Info.PokemonCard';

type Props = {
  pokemon: IPokemon;
  species: IPokemonSpecies;
  evolution: IEvolutionChain;
};

function Info({ pokemon, species, evolution }: Props) {

  const female = (species?.gender_rate / 8) * 100;
  const male = 100 - (species?.gender_rate / 8) * 100;

  return (
    <PokemonInfoSection>
      {InfoTable.map(data =>
        <div>
          <H3>{data.category}</H3>
          <PokemonInfoTable>
            <tbody>
              {Array(Object.keys(data).length - 1).fill(true).map((_, i) =>
                <tr>
                  <th>
                    {data['desc_' + (i + 1)]?.title}
                  </th>
                  <td>
                    {data['desc_' + (i + 1)]?.value({
                      pokemon: pokemon, species: species, evolution: evolution, male: male, female: female
                    })}
                  </td>
                </tr>
              )}
            </tbody>
          </PokemonInfoTable>
        </div>
      )}
    </PokemonInfoSection>
  );
}

export default Info;
