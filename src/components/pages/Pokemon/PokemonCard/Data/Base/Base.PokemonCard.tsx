import { TLink } from '@/components/common/styles/Table';
import { ILocationAreaEncounter, IPokemon } from '@/types/Pokemon/Pokemon';
import { IGenus, IPokemonSpecies } from '@/types/Pokemon/PokemonSpecies';
import { removeDash } from '@/utils/Typography';
import { PokemonDataTable, PokemonDataLocation } from '../Styled.Data.PokemonCard';

type Props = {
  pokemon: IPokemon;
  species: IPokemonSpecies;
  location: ILocationAreaEncounter[];
  game: string;
};

function Base({ pokemon, species, game, location }: Props) {
  // Convert height and weight to meters and kilograms and round the number
  const height = (pokemon.height * 0.1).toFixed(2);
  const weight = (pokemon.weight * 0.1).toFixed(2);

  const filterGenera: IGenus | undefined = species.genera.find((sg) => sg.language.name === `en`)!

  return (
    <PokemonDataTable>
      <tbody>
        <tr>
          <th>pokédex number</th>
          <td>
            {pokemon?.id > 10000
              ? ``
              : `# ${pokemon?.id?.toString()?.padStart(3, `0`)}`}
          </td>
        </tr>
        <PokemonDataLocation>
          <th>locations</th>
          <td>
            <ol>
              {location?.length !== 0 && (
                location?.map((l) =>
                  l.version_details?.map(
                    (lv) =>
                      lv.version.name === game && (
                        <li key={l.location_area.name}>
                          {removeDash(l.location_area.name)
                            .replace(
                              /kanto|johto|hoenn|sinnoh|unova|kalos|alola|galar|hisui|paldea|area|sea/g,
                              ``,
                            )}
                        </li>
                      ),
                  ),
                )
              )}
            </ol>
          </td>
          <td>Not found in the wild</td>
        </PokemonDataLocation>
        <tr>
          <th>abilities</th>
          <td>
            <ol>
              {pokemon.abilities?.map((pa) => (
                <li key={pa.ability.name}>
                  <TLink
                    href={{
                      pathname: `/ability/[name]`,
                      query: { name: pa.ability.name },
                    }}
                    key={pa.ability.name}
                  >
                    {removeDash(pa.ability.name)}
                  </TLink>
                  {pa.is_hidden && <small> (hidden ability)</small>}
                </li>
              ))}
            </ol>
          </td>
        </tr>
        <tr>
          <th>height</th>
          <td>{height.toString()} m</td>
        </tr>
        <tr>
          <th>weight</th>
          <td>{weight.toString()} kg</td>
        </tr>
        {pokemon.id < 10000 && (
          <>
            <tr>
              <th>category</th>
              <td>
                {filterGenera &&
                  filterGenera?.genus
                }
              </td>
            </tr>
            <tr>
              <th>shape</th>
              <td>{species?.shape.name}</td>
            </tr>
            <tr>
              <th>color</th>
              <td>{species?.color.name}</td>
            </tr>
          </>
        )}
      </tbody>
    </PokemonDataTable>
  );
}

export default Base;
