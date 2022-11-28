import React, { useState } from 'react';
import { usePokedex } from '../../hooks/DataFetch';
import {
  AutocompleteContainer,
  AutocompleteId,
  AutocompleteInput,
  AutocompleteLink,
} from './StyledAutocomplete';
import Image from 'next/image';
import { Pokemon } from '@/types/types';

function Autocomplete() {
  const { data: pokedex } = usePokedex(
    `https://pokeapi.co/api/v2/pokemon?offset=0&limit=905`,
  );

  const [pokedexMatch, setPokedexMatch] = useState<Pokemon[] | null>(null);

  const searchPokedex = (text: string) => {
    if (!text) {
      setPokedexMatch([]);
    } else {
      const matches =
        pokedexMatch &&
        pokedex?.filter((pokedex) => {
          const regex = new RegExp(`${text}`, `gi`);
          return pokedex?.name?.match(regex);
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
      <AutocompleteContainer>
        <ul>
          {pokedexMatch &&
            pokedexMatch.map((pm) => (
              <li key={pm.name}>
                <Image
                  src={pm?.sprites?.front_default}
                  alt=""
                  width={39}
                  height={39}
                />
                <AutocompleteLink
                  href={{
                    pathname: `/pokemon/[name]`,
                    query: { name: pm.name },
                  }}
                  className="bold"
                >
                  {pm?.name}
                </AutocompleteLink>
                <AutocompleteId>
                  #{pm?.id?.toString()?.padStart(3, `0`)}
                </AutocompleteId>
              </li>
            ))}
        </ul>
      </AutocompleteContainer>
    </AutocompleteInput>
  );
}

export default Autocomplete;
