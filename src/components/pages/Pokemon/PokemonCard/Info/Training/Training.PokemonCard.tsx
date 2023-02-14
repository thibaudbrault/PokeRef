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

function Training({ pokemon, species }: Props) {
  const filterEffort =
    pokemon.stats && pokemon.stats.find((ps) => ps.effort !== 0);

  return (
    <div>
      <H3>Training</H3>
      <PokemonInfoTable>
        <tbody>
          <tr>
            <th>EV yield</th>
            <td>
              <p>
                {filterEffort?.effort}
                {` `}
                {removeDash(filterEffort?.stat.name)}
              </p>
            </td>
          </tr>
          <tr>
            <th>Catch rate</th>
            <td>{pokemon.id < 10000 ? <p>{species.capture_rate}</p> : `⠀`}</td>
          </tr>
          <tr>
            <th>Base happiness</th>
            <td>
              {pokemon.id < 10000 ? <p>{species.base_happiness}</p> : `⠀`}
            </td>
          </tr>
          <tr>
            <th>Base experience</th>
            <td>
              <p>{pokemon.base_experience}</p>
            </td>
          </tr>
          <tr>
            <th>Growth rate</th>
            <td>
              {pokemon.id < 10000 ? (
                <p>{removeDash(species.growth_rate.name)}</p>
              ) : (
                `⠀`
              )}
            </td>
          </tr>
          <tr>
            <th>Held items</th>
            <td>
              {pokemon?.held_items?.length > 0
                ? pokemon?.held_items?.map((ph) => (
                    <Link
                      href={{
                        pathname: `/item/[name]`,
                        query: { name: ph.item.name },
                      }}
                      key={ph.item.name}
                    >
                      <span>{removeDash(ph.item.name)}</span>
                    </Link>
                  ))
                : `None`}
            </td>
          </tr>
        </tbody>
      </PokemonInfoTable>
    </div>
  );
}

export default Training;
