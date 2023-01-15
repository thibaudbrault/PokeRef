import React from 'react';
import { Pokemon, Species } from '@/types/types';
import { TLink } from '@/components/common/styles/Table';
import {
  PokemonDataLocation,
  PokemonDataTable,
} from '../Styled.Data.PokemonCard';

type Props = {
  pokemon: Pokemon.Pokemon;
  species: Species.Species;
  location: Pokemon.PokemonLocation[];
  game: string;
};

function Base({ pokemon, species, game, location }: Props) {
  // Convert height and weight to meters and kilograms and round the number
  const height = (pokemon.height * 0.1).toFixed(2);
  const weight = (pokemon.weight * 0.1).toFixed(2);

  const filterGenera =
    pokemon.id < 10000
      ? species.genera.find((sg) => sg.language.name === `en`)
      : ``;

  return (
    <PokemonDataTable>
      <tbody>
        <tr>
          <th>National number</th>
          <td>
            {pokemon?.id > 10000
              ? ``
              : `# ${pokemon?.id?.toString()?.padStart(3, `0`)}`}
          </td>
        </tr>
        <PokemonDataLocation>
          <th>Locations</th>
          <td>
            {location?.length !== 0 &&
              location?.map((l) =>
                l.version_details?.map(
                  (lv) =>
                    lv.version.name === game && (
                      <p key={l.location_area.name}>
                        {l.location_area.name.replace(/-/g, ` `)}
                      </p>
                    ),
                ),
              )}
          </td>
          <td>Not found in the wild</td>
        </PokemonDataLocation>
        <tr>
          <th>Abilities</th>
          <td>
            {pokemon.abilities?.map((pa) => (
              <p key={pa.ability.name}>
                <TLink
                  href={{
                    pathname: `/ability/[name]`,
                    query: { name: pa.ability.name },
                  }}
                  key={pa.ability.name}
                >
                  {pa.ability.name.replace(/-/g, ` `)}
                </TLink>
                {pa.is_hidden && <>‌‌ (hidden ability)</>}
              </p>
            ))}
          </td>
        </tr>
        <tr>
          <th>Height</th>
          <td>{height.toString()} m</td>
        </tr>
        <tr>
          <th>Weight</th>
          <td>{weight.toString()} kg</td>
        </tr>
        <tr>
          <th>Category</th>
          <td>
            <p>{filterGenera.genus}</p>
          </td>
        </tr>
        <tr>
          <th>Shape</th>
          <td>{pokemon.id < 10000 ? <p>{species?.shape.name}</p> : `⠀`}</td>
        </tr>
        <tr>
          <th>Color</th>
          <td>{pokemon.id < 10000 ? <p>{species?.color.name}</p> : `⠀`}</td>
        </tr>
      </tbody>
    </PokemonDataTable>
  );
}

export default Base;
