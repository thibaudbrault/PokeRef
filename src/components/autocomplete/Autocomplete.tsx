import React, { useState } from 'react';
import { getPokedex, usePokedex } from '@/utils/DataFetch';
import {
  AutocompleteContainer,
  AutocompleteId,
  AutocompleteInput,
  AutocompleteLink,
} from './Styled.Autocomplete';
import { Pokemon } from '@/types/types';
import ImageWithFallback from '@/utils/ImageWithFallback';
import { useQuery } from 'react-query';
import { IPokemon } from '@/types/Pokemon/Pokemon';

function Autocomplete() {
  const {
    data: pokedex,
  } = useQuery({
    queryKey: ['pokedex'],
    queryFn: () => getPokedex(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1008`),
  });

  const [pokedexMatch, setPokedexMatch] = useState<
    IPokemon[] | undefined
  >([]);
  const [searchText, setSearchText] = useState(``);

  const searchPokedex = (text: string) => {
    let matches: IPokemon[] | undefined = [];
    setSearchText(text);
    if (text.length > 0) {
      matches =
        pokedexMatch &&
        pokedex?.filter((pokedex: IPokemon) => {
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
                    src={pm.sprites.front_default || ``}
                    alt=""
                    width={39}
                    height={39}
                    fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
                  />
                  <AutocompleteLink
                    href={{
                      pathname: `/pokemon/[name]`,
                      query: { name: pm.name },
                    }}
                    className="bold"
                  >
                    {pm.name}
                  </AutocompleteLink>
                  <AutocompleteId>
                    #{pm.id.toString().padStart(3, `0`)}
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
