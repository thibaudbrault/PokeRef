import Link from 'next/link';

import { removeDash } from '@/utils';

import type { IItem, IItemHolderPokemon } from '@/types';

type Props = {
  item?: IItem;
};

export function Held({ item }: Props) {
  return (
    <>
      {item?.held_by_pokemon.length !== 0 && (
        <p className="held">
          <span>Held by :</span>
          {item?.held_by_pokemon?.map((ih: IItemHolderPokemon) => (
            <Link
              href={{
                pathname: `/pokemon/[name]`,
                query: { name: ih.pokemon.name },
              }}
              key={ih.pokemon.name}
            >
              {removeDash(ih.pokemon.name)}
            </Link>
          ))}
        </p>
      )}
    </>
  );
}
