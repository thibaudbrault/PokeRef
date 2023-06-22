import {
  AutocompleteContainer,
  AutocompleteId,
  AutocompleteInput,
  AutocompleteLink,
} from '@/components/common/styles/Autocomplete';
import { IAbility } from '@/types';
import { capitalize, removeDash } from '@/utils';
import Fuse from 'fuse.js';
import { useState } from 'react';

type Props = {
  abilities?: IAbility[];
};

export function Search({ abilities }: Props) {
  const [searchRes, setSearchRes] = useState<Fuse.FuseResult<IAbility>[]>([]);
  const [searchText, setSearchText] = useState(``);

  const searchAbilities = (text: string) => {
    if (abilities) {
      const fuse = new Fuse(abilities, {
        keys: [`name`],
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
        placeholder="Ability Name"
        onChange={(e) => searchAbilities(e.target.value)}
      />
      {searchText && (
        <AutocompleteContainer>
          <ul>
            {searchRes &&
              searchRes?.map((res) => (
                <li key={res.item.name}>
                  <AutocompleteLink
                    href={{
                      pathname: `/ability/[name]`,
                      query: { name: res.item.name },
                    }}
                    className="bold"
                  >
                    {capitalize(removeDash(res.item.name))}
                  </AutocompleteLink>
                  <AutocompleteId>
                    {res.item.pokemon.length} Pokémon
                  </AutocompleteId>
                </li>
              ))}
          </ul>
        </AutocompleteContainer>
      )}
    </AutocompleteInput>
  );
}
