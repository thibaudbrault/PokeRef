import { H3 } from '@/components/common/styles/Headings';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { IPokemonSpecies } from '@/types/Pokemon/PokemonSpecies';
import { removeDash } from '@/utils/Typography';
import Link from 'next/link';
import { PokemonInfoTable } from '../Styled.Info.PokemonCard';

type Props = {
  pokemon: IPokemon;
  species: IPokemonSpecies;
};

function Forms({ pokemon, species }: Props) {
  return (
    <div>
      <H3>Forms</H3>
      <PokemonInfoTable>
        <tbody>
          <tr>
            <th>Alternative forms</th>
            <td>
              {pokemon.id < 10000
                ? species.forms_switchable === true
                  ? `Yes`
                  : `No`
                : `⠀`}
            </td>
          </tr>
          <tr>
            <th>Varieties</th>
            <td>
              {pokemon.id < 10000
                ? species.varieties?.map((sv) => (
                    <Link
                      href={{
                        pathname: `/pokemon/[name]`,
                        query: { name: sv.pokemon.name },
                      }}
                      key={sv.pokemon.name}
                    >
                      <span>{removeDash(sv.pokemon.name)}</span>
                    </Link>
                  ))
                : `⠀`}
            </td>
          </tr>
          <tr>
            <th>Gender differences</th>
            <td>
              {pokemon.id < 10000
                ? species.has_gender_differences === true
                  ? `Yes`
                  : `No`
                : `⠀`}
            </td>
          </tr>
        </tbody>
      </PokemonInfoTable>
    </div>
  );
}

export default Forms;
