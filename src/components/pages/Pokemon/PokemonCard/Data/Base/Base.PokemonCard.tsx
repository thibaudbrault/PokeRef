import { TLink } from '@/components/common/styles/Table';
import { IPokemon } from '@/types/Pokemon/Pokemon';
import { IGenus, IPokemonSpecies } from '@/types/Pokemon/PokemonSpecies';
import { removeDash } from '@/utils/Typography';
import { PokemonDataTable } from '../Styled.Data.PokemonCard';

type Props = {
  pokemon: IPokemon;
  species: IPokemonSpecies;
};

function Base({ pokemon, species }: Props) {
  // Convert height and weight to meters and kilograms and round the number
  const height = (pokemon.height * 0.1).toFixed(2);
  const weight = (pokemon.weight * 0.1).toFixed(2);

  const filterGenera: IGenus | undefined =
    species && species.genera.find((sg) => sg.language.name === `en`);

  return (
    <PokemonDataTable>
      <tbody>
        <tr>
          <th>pokédex number</th>
          <td>
            {pokemon?.id < 10000
              ? `# ${pokemon?.id?.toString()?.padStart(3, `0`)}`
              : `# ${pokemon.species.url.match(/\d/g)?.slice(1).join('')}`}
          </td>
        </tr>
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
              <td>{filterGenera && filterGenera?.genus}</td>
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
