import { TLink } from '@/components/common/styles/Table';
import { ILocationAreaEncounter, IPokemon } from '@/types/Pokemon/Pokemon';
import { IPokemonSpecies } from '@/types/Pokemon/PokemonSpecies';
import { removeDash } from '@/utils/Typography';
import { PokemonDataTable } from '../Styled.Data.PokemonCard';

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

  const filterGenera =
    pokemon.id < 10000
      ? species.genera.find((sg) => sg.language.name === `en`)
      : ``;

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
        <tr>
          <th>locations</th>
          <td>
            {location?.length !== 0 ? (
              location?.map((l) =>
                l.version_details?.map(
                  (lv) =>
                    lv.version.name === game && (
                      <p key={l.location_area.name}>
                        {removeDash(l.location_area.name)}
                      </p>
                    ),
                ),
              )
            ) : (
             'Not found in the wild'
           )}
          </td>
        </tr>
        <tr>
          <th>abilities</th>
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
                  {removeDash(pa.ability.name)}
                </TLink>
                {pa.is_hidden && <>‌‌ (hidden ability)</>}
              </p>
            ))}
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
        <tr>
          <th>category</th>
          <td>
            <p>{filterGenera?.genus}</p>
          </td>
        </tr>
        {pokemon.id < 10000 && (
        <tr>
          <th>shape</th>
          <td>{species?.shape.name}</td>
        </tr>
        <tr>
          <th>color</th>
          <td>{species?.color.name}</td>
        </tr>
        )}
      </tbody>
    </PokemonDataTable>
  );
}

export default Base;
