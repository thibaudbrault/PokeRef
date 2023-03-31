import { getPokedexResults } from '@/utils/DataFetch';
import ImageWithFallback from '@/utils/ImageWithFallback';
import { removeDash, removeLongName } from '@/utils/Typography';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import Fuse from 'fuse.js';
import { useState } from 'react';
import { INamedApiResource } from '../../../../../types/Utility/NamedApiResourceList';
import {
  AutocompleteContainer,
  AutocompleteId,
  AutocompleteInput,
  AutocompleteLink,
} from './Styled.Autocomplete.Pokemon';

function Autocomplete() {
  const { data: pokedex }: UseQueryResult<INamedApiResource[]> = useQuery({
    queryKey: [`pokedex`],
    queryFn: getPokedexResults,
  });

  const [searchRes, setSearchRes] = useState<
    Fuse.FuseResult<INamedApiResource>[]
  >([]);
  const [searchText, setSearchText] = useState(``);

  const searchPokedex = (text: string) => {
    if (pokedex) {
      const fuse = new Fuse(pokedex, {
        keys: ['name'],
        includeMatches: true,
      });
      setSearchText(text);
      setSearchRes(fuse.search(text).slice(0, 5));
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
            {searchRes &&
              searchRes?.map((res) => (
                <li key={res.item.name}>
                  <ImageWithFallback
                    src={
                      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${res.item.url
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
                      query: { name: res.item.name },
                    }}
                    className="bold"
                  >
                    {removeLongName(removeDash(res.item.name))}
                  </AutocompleteLink>
                  <AutocompleteId>
                    #
                    {res.item.url
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
