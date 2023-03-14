import { IPokemon } from '@/types/Pokemon/Pokemon';
import { getPokedex, getPokedexResults } from '@/utils/DataFetch';
import ImageWithFallback from '@/utils/ImageWithFallback';
import { removeDash } from '@/utils/Typography';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { INamedApiResource } from '../../types/Utility/NamedApiResourceList';
import {
  AutocompleteContainer,
  AutocompleteId,
  AutocompleteInput,
  AutocompleteLink,
} from './Styled.Autocomplete';

function Autocomplete() {
  const { data: pokedex }: UseQueryResult<INamedApiResource[]> = useQuery({
    queryKey: [`pokedex`],
    queryFn: getPokedexResults,
  });

  const [pokedexMatch, setPokedexMatch] = useState<
    INamedApiResource[] | undefined
  >([]);
  const [searchText, setSearchText] = useState(``);

  const searchPokedex = (text: string) => {
    let matches: INamedApiResource[] | undefined = [];
    setSearchText(text);
    if (text.length > 0) {
      matches =
        pokedexMatch &&
        pokedex?.filter((pokedex: INamedApiResource) => {
          const regex = new RegExp(`${text}`, `gi`);
          return pokedex.name.match(regex);
        });
      setPokedexMatch(matches?.slice(0, 5));
    }
  };

  return (
    <AutocompleteInput>
      <label htmlFor="search">Search</label>
      <input
        type="text"
        placeholder="Pokémon Name"
        onChange={(e) => searchPokedex(e.target.value)}
      />
      {searchText && (
        <AutocompleteContainer>
          <ul>
            {pokedexMatch &&
              pokedexMatch?.map((pm) => (
                <li key={pm.name}>
                  <ImageWithFallback
                    src={
                      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pm.url
                        .replace('https://pokeapi.co/api/v2/pokemon/', '')
                        .slice(0, -1)}.png` || ``
                    }
                    alt=""
                    width={48}
                    height={48}
                    fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
                  />
                  <AutocompleteLink
                    href={{
                      pathname: `/pokemon/[name]`,
                      query: { name: pm.name },
                    }}
                    className="bold"
                  >
                    {removeDash(pm.name)}
                  </AutocompleteLink>
                  <AutocompleteId>
                    #
                    {pm.url
                      .replace('https://pokeapi.co/api/v2/pokemon/', '')
                      .slice(0, -1)
                      .padStart(3, `0`)}
                  </AutocompleteId>
                </li>
              ))}
          </ul>
        </AutocompleteContainer>
      )}
    </AutocompleteInput>
  );
}

export default Autocomplete;
