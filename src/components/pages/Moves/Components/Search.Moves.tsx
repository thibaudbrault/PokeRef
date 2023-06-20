import {
  AutocompleteContainer,
  AutocompleteId,
  AutocompleteInput,
  AutocompleteLink,
} from '@/components/common/styles/Autocomplete';
import { IMove } from '@/types/Moves/Move';
import ImageWithFallback from '@/utils/ImageWithFallback';
import { capitalize, removeDash } from '@/utils/Typography';
import Fuse from 'fuse.js';
import { useState } from 'react';

type Props = {
  moves?: IMove[];
};

function SearchMoves({ moves }: Props) {
  const [searchRes, setSearchRes] = useState<Fuse.FuseResult<IMove>[]>([]);
  const [searchText, setSearchText] = useState(``);

  const searchMoves = (text: string) => {
    if (moves) {
      const fuse = new Fuse(moves, {
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
        placeholder="Move Name"
        onChange={(e) => searchMoves(e.target.value)}
      />
      {searchText && (
        <AutocompleteContainer>
          <ul>
            {searchRes &&
              searchRes?.map((res) => (
                <li key={res.item.name}>
                  <ImageWithFallback
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-${res.item.type.name}.png`}
                    alt=""
                    width={32}
                    height={32}
                    fallbackSrc={`/images/other/unknown.png`}
                  />
                  <AutocompleteLink
                    href={{
                      pathname: `/move/[name]`,
                      query: { name: res.item.name },
                    }}
                    className="bold"
                  >
                    {capitalize(removeDash(res.item.name))}
                  </AutocompleteLink>
                  <AutocompleteId>
                    {capitalize(res.item.type.name)}
                  </AutocompleteId>
                </li>
              ))}
          </ul>
        </AutocompleteContainer>
      )}
    </AutocompleteInput>
  );
}

export default SearchMoves;
