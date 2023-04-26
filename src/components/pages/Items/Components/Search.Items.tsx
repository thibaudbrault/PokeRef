import {
  AutocompleteContainer,
  AutocompleteId,
  AutocompleteInput,
  AutocompleteLink,
} from '@/components/common/styles/Autocomplete';
import { IItem } from '@/types/Items/Item';
import ImageWithFallback from '@/utils/ImageWithFallback';
import { capitalize, removeDash } from '@/utils/Typography';
import Fuse from 'fuse.js';
import { useState } from 'react';

type Props = {
  items?: IItem[];
};

function SearchItems({ items }: Props) {
  const [searchRes, setSearchRes] = useState<Fuse.FuseResult<IItem>[]>([]);
  const [searchText, setSearchText] = useState(``);

  const searchItems = (text: string) => {
    if (items) {
      const fuse = new Fuse(items, {
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
        placeholder="Item Name"
        onChange={(e) => searchItems(e.target.value)}
      />
      {searchText && (
        <AutocompleteContainer>
          <ul>
            {searchRes &&
              searchRes?.map((res) => (
                <li key={res.item.name}>
                  <ImageWithFallback
                    src={res.item.sprites.default || ``}
                    alt=""
                    width={32}
                    height={32}
                    fallbackSrc={`https://play.pokemonshowdown.com/sprites/gen5/0.png`}
                  />
                  <AutocompleteLink
                    href={{
                      pathname: `/item/[name]`,
                      query: { name: res.item.name },
                    }}
                    className="bold"
                  >
                    {capitalize(removeDash(res.item.name))}
                  </AutocompleteLink>
                  <AutocompleteId>
                    {capitalize(removeDash(res.item.category.name))}
                  </AutocompleteId>
                </li>
              ))}
          </ul>
        </AutocompleteContainer>
      )}
    </AutocompleteInput>
  );
}

export default SearchItems;
