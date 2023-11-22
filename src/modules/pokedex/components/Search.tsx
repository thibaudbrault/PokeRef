import { useState } from 'react';

import * as Label from '@radix-ui/react-label';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import Fuse, { FuseResult } from 'fuse.js';
import Link from 'next/link';

import { Input } from '@/components';
import {
  BASE_URL,
  ImageWithFallback,
  QueryKeys,
  getPokedexResults,
  removeDash,
  removeLongName,
} from '@/utils';

import type { INamedApiResource } from '@/types';

export function Search() {
  const { data: pokedex }: UseQueryResult<INamedApiResource[]> = useQuery({
    queryKey: [QueryKeys.SEARCH],
    queryFn: getPokedexResults,
  });

  const [searchRes, setSearchRes] = useState<FuseResult<INamedApiResource>[]>(
    [],
  );
  const [searchText, setSearchText] = useState(``);

  const searchPokedex = (text: string) => {
    if (pokedex) {
      const fuse = new Fuse(pokedex, {
        keys: [`name`],
        includeMatches: true,
      });
      setSearchText(text);
      setSearchRes(fuse.search(text).slice(0, 5));
    }
  };

  return (
    <div className="search">
      <Label.Root htmlFor="search">Search</Label.Root>
      <Input
        type="text"
        id="search"
        placeholder="Pokémon Name"
        onChange={(e) => searchPokedex(e.target.value)}
      />
      {searchText && (
        <div className="searchContainer">
          <ul>
            {searchRes &&
              searchRes?.map((res) => (
                <li key={res.item.name}>
                  <ImageWithFallback
                    src={
                      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${res.item.url
                        .replace(`${BASE_URL}/pokemon/`, ``)
                        .slice(0, -1)}.png` || ``
                    }
                    alt=""
                    width={48}
                    height={48}
                    fallbackSrc={`/images/other/unknown.png`}
                  />
                  <Link
                    href={{
                      pathname: `/pokemon/[name]`,
                      query: { name: res.item.name },
                    }}
                    className="searchLink bold"
                  >
                    {removeLongName(removeDash(res.item.name))}
                  </Link>
                  <span className="searchId">
                    #
                    {res.item.url
                      .replace(`${BASE_URL}/pokemon/`, ``)
                      .slice(0, -1)
                      .padStart(3, `0`)}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
